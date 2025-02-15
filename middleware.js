import {NextResponse} from "next/server"
import { jwtVerify } from "jose"

export async function middleware(request) {
    //const token = await  requestAnimationFrame.headers.get("Authorization")?.split(" ")[1]
    //const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTcyNzE2MDU5NX0.jmCXR7oQQ6nTGnIfO25PN0dyoZgrdzh6Pff2itezboE"
    const token = await request.headers.get("Authorization")?.split(" ")[1]
    if (!token) {
        return NextResponse.json({message: "トークンがありません"})  
    }
    //
    try {
        const secretKey = new TextEncoder().encode("next-market-app-book")
        const decodedJwt = await jwtVerify(token, secretKey)
        //console.log("decodedJwt:" , decodedJwt)
        return NextResponse.next()
    }
    catch {
        return NextResponse.json({message: "トークンが正しくないので、ログオンして下さい。"}) 
    }
}

export const config = {
    matcher:  ["/api/item/create","/api/item/update/:path*", "/api/item/delete/:path*"],
    //matcher:  ["/api/item/create","/api/item/update/:path*"],
}