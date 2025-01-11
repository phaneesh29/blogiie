import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { errorToast, sucessToast } from '../utils/noti'
import axiosInstance from '../utils/axios'
import { TiTick } from 'react-icons/ti'
import { MdSyncLock } from 'react-icons/md'

const Profile = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const getProfile = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get("/users/me")
            sucessToast("User Fetched")
            setUser(response.data.user)
            setLoading(false)
        } catch (error) {
            errorToast(error.response.data.error)
            navigate("/home")
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    if (loading) {
        return (
            <div className='h-screen flex justify-center items-center'>
                <div className='w-24 h-24 rounded-full m-auto mt-30 animate-spin border-e-2 border-l-2 border-emerald-500 border-l-orange-500'>
                </div>
            </div>
        )
    }

    return (
        <div className='h-screen text-xl justify-center items-center flex gap-5 flex-col'>
            <p className='flex justify-center items-center gap-1'>Username: {user.username}</p>
            <p className='flex justify-center items-center gap-1'>Email: {user.email}</p>
            <p className='flex justify-center items-center gap-1'>IsVerified: {user.isVerified ? <TiTick size={26}/> : "No"}</p>

            <Link to={"/forgot"} className='rounded-lg text-base flex justify-center items-center gap-1 text-blue-500 underline m-5'>Change password <MdSyncLock size={20}/></Link>
            <Link to={"/home"} className='p-2 rounded-lg bg-blue-600 m-5'>Home</Link>
        </div>
    )
}

export default Profile