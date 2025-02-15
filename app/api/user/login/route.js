import {NextResponse} from "next/server"
import connectDB from "../../../utils/database"
import {UserModel} from "../../../utils/schemaModels"
import { SignJWT } from "jose"

export async function POST(request) {
    const reqBody = await request.json()
    
    try {
        await connectDB()
        const SavedUserData = await UserModel.findOne({"email":reqBody.email})
        if (SavedUserData) {
            if (reqBody.password === SavedUserData.password) {
                //
                const secretKey = new TextEncoder().encode("next-market-app-book")
                const payload = {
                    "email": reqBody.email
                }
                const token = await new SignJWT(payload)
                                        .setProtectedHeader({alg: "HS256"})
                                        .setExpirationTime("1d")
                                        .sign(secretKey) 
                //
                console.log(token)
                return NextResponse.json({message: "ログイン成功", token:token})    
            }
            else {
                return NextResponse.json({message: "ログイン失敗：パスワードが間違っています。"})
            }
        }
        else {
            return NextResponse.json({message: "ログイン失敗：ユーザーを登録して下さい。"})
        }
    }
    catch {
        return NextResponse.json({message: "ログイン失敗"})
    }
}
