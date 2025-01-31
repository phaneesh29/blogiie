import React, { useState } from 'react'
import axiosInstance from '../utils/axios'
import { sucessToast, errorToast } from '../utils/noti'
import { Link } from 'react-router-dom'


const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.post("/users/forgot", { email })
            sucessToast(response.data.message)
        } catch (error) {
            errorToast(error.response.data.error || error.response.data.errors[0].msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='h-screen flex justify-center items-center flex-col gap-5'>
            <h1 className='text-3xl'>Forgot passoword </h1>
            <div className='flex justify-center gap-4 items-center flex-col bg-slate-900 bg-opacity-50 p-5 rounded-xl w-[366px]'>
                <div className='w-full'>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter email' className='w-full rounded-full px-3 py-3 text-lg ring-2 ring-gray-500 bg-transparent focus:outline-none' />
                </div>
                <button onClick={handleClick} disabled={loading} type='sumbit' className={`bg-blue-600 p-3 rounded-full text-lg w-full hover:bg-blue-500 transition-all duration-300 ${loading ? "cursor-wait" : "cursor-pointer"}`}>{loading ? "Submiting" : "Submit"}</button>
                <Link to={"/login"}>Login</Link>

            </div>

        </div>
    )
}

export default ForgotPassword