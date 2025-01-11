import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { sucessToast, errorToast } from '../utils/noti'
import axiosInstance from '../utils/axios'

const ChangePassword = () => {
    const [searchParams] = useSearchParams()
    const tokenParamValue = searchParams.get("token")
    const navigate = useNavigate()

    const [password, setpassword] = useState("")
    const [confirmPassword, setConfrimPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setLoading(true)
        if (password !== confirmPassword) {
            errorToast("Password don't match")
        }
        if (!password || !confirmPassword) {
            errorToast("Password won't be empty")
        }
        try {
            const response = await axiosInstance.post("/users/change", {password ,confirmPassword , token:tokenParamValue})
            sucessToast(response.data.message)
            navigate("/login")

        } catch (error) {
            errorToast(error.response.data.error || error.response.data.errors[0].msg)

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center gap-5'>
            <h1 className='text-3xl'>Change Password</h1>
            <div className='w-[366px] sm:w-[400px] bg-gray-800 bg-opacity-60 p-5 rounded-lg flex flex-col justify-center items-center gap-5'>
                <div className='w-full relative'>
                    <input value={password} onChange={(e) => setpassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder='Enter password' className='w-full rounded-full px-3 py-2 text-lg ring-2 ring-gray-500 bg-transparent focus:outline-none' />
                    <div onClick={() => { setShowPassword(!showPassword) }} className='absolute right-3 top-2 bg-black p-1 bg-opacity-50 rounded-full'>{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</div>
                </div>
                <div className='w-full relative'>
                    <input value={confirmPassword} onChange={(e) => setConfrimPassword(e.target.value)} type={showConfirmPassword ? "text" : "password"} placeholder='Enter Confirm password' className='w-full rounded-full px-3 py-2 text-lg ring-2 ring-gray-500 bg-transparent focus:outline-none' />
                    <div onClick={() => { setShowConfirmPassword(!showConfirmPassword) }} className='absolute right-3 top-2 bg-black p-1 bg-opacity-50 rounded-full'>{showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</div>
                    <Link to="/login" className='text-blue-300'>Simply, Login</Link>

                </div>
                <button onClick={handleClick} disabled={loading} type='sumbit' className={`bg-blue-600 p-3 rounded-full text-lg w-full hover:bg-blue-500 transition-all duration-300 ${loading ? "cursor-wait" : "cursor-pointer"}`}>{loading ? "Changing" : "Change"}</button>
            </div>
        </div>
    )
}

export default ChangePassword