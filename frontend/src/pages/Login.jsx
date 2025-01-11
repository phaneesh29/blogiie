import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axiosInstance from '../utils/axios'
import { sucessToast,errorToast } from '../utils/noti'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({ password: "", username: "" })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    

    const handleSumbit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        try {
           const response = await axiosInstance.post("/users/login",userDetails)
           sucessToast(response.data.message)
           localStorage.setItem("token",response.data.token)
            navigate("/home")
        } catch (error) {
               errorToast(error.response.data.error || error.response.data.errors[0].msg)
           }
        finally{
            setLoading(false)
        }
    }

    return (
        <section className='h-screen flex flex-col gap-5 justify-center items-center'>

            <h1 className='text-3xl'>Login</h1>
            <form className='bg-stone-950 p-5 rounded-xl bg-opacity-35 w-[350px] sm:w-[500px] sm:gap-8 flex flex-col justify-center items-center gap-5' onSubmit={handleSumbit}>
                <div className='w-full'>
                    <input value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Enter username' className='w-full rounded-full px-3 py-2 text-lg ring-2 ring-gray-500 bg-transparent focus:outline-none' />
                </div>

                <div className='w-full relative'>
                    <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} type={showPassword ? "text" : "password"} placeholder='Enter password' className='w-full rounded-full px-3 py-2 text-lg ring-2 ring-gray-500 bg-transparent focus:outline-none' />
                    <div onClick={()=>{setShowPassword(!showPassword)}} className='absolute right-3 top-2 bg-black p-1 bg-opacity-50 rounded-full'>{showPassword?<FaEyeSlash size={20}/>:<FaEye size={20}/>}</div>
                    <Link to="/forgot" className='mt-2 text-blue-300 block'>Forgot password</Link>
                    <Link to="/register" className='mt-2 text-blue-300 block'>Don't have account, Register</Link>
                </div>
                <button disabled={loading} type='sumbit' className={`bg-blue-600 p-3 rounded-full text-lg w-full hover:bg-blue-500 transition-all duration-300 ${loading?"cursor-wait":"cursor-pointer"}`}>{loading?"Logging in":"Login"}</button>
            </form>

        </section>
    )
}

export default Login