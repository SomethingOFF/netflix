import Input from "@/components/Input"
import axios from "axios"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import { FaGoogle, FaGithub } from "react-icons/fa6"
const Auth = () => {
    const [varient, setVarient] = useState("LOGIN")
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const toggleVarient = useCallback(() => {
        setVarient((prev) => prev === "LOGIN" ? "REGISTER" : "LOGIN")
    }, [])
    const login = useCallback(async () => {
        try {
            await signIn("credentials", {
                email,
                password,
                redirect: false,
                callbackUrl: "/profiles"
            })
            router.push("/profiles")
        } catch (error) {
            console.log(error)
        }
    }, [email, password])
    const register = useCallback(async () => {
        try {
            await axios.post("/api/register", {
                email,
                name,
                password
            })
            login()
        } catch (error) {
            console.log(error)
        }

    }, [email, password, name, login])
    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50 sm:bg-opacity-80">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {varient === "LOGIN" ? "Sign in" : "Register"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {varient === "REGISTER" &&
                                (<Input
                                    label="user"
                                    onChange={(e: any) => setName(e.target.value)}
                                    id="user"
                                    type="text"
                                    value={name}
                                />)
                            }
                            <Input
                                label="email"
                                onChange={(e: any) => setEmail(e.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                label="password"
                                onChange={(e: any) => setPassword(e.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={varient === "LOGIN" ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">{varient === "LOGIN" ? "login" : "sign up"}</button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition" onClick={()=> signIn("google",{callbackUrl:"/profiles"})}>
                                <FaGoogle size={30} />
                            </div>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition" onClick={()=> signIn("github",{callbackUrl:"/profiles"})}>
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className=" text-neutral-500 mt-12">
                            {varient === "LOGIN" ? "fist time using nextflix ?" : "Already account"}
                            <span onClick={toggleVarient} className="text-white ml-1 hover:underline cursor-pointer">
                                {varient === "LOGIN" ? "create and account" : "Login"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
