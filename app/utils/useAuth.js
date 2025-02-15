import {useState, useEffect} from "react"
import {useRouter} from "next/navigation"
import { jwtVerify } from "jose"

const useAuth = () => {

    const [loginUserEmail, setLoginUserEmail] = useState("")
    const router = useRouter()
    
    
    useEffect(  () => {
        const checkToken = async() => {
            const token = localStorage.getItem("token")
            if (!token) {
                console.log("--- not token ---")
                router.push("/user/login")
            } 

            try {
                const secretKey = new TextEncoder().encode("next-market-app-book")
                const decodeJwt = await jwtVerify(token, secretKey)
                setLoginUserEmail(decodeJwt.payload.email)
            }catch {
                console.log("--- not valid token ---")
                router.push("/user/login")
            }
        }
        checkToken()
    }, [router]
    )
    return loginUserEmail

}

export default useAuth