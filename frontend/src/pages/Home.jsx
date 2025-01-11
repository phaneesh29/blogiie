import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axios'
import { sucessToast, errorToast } from '../utils/noti'
import { Link } from 'react-router-dom'
import { MdAdd } from 'react-icons/md'
import { ImBlog } from 'react-icons/im'
import { FaRegUserCircle, FaSearch } from 'react-icons/fa'


const Home = () => {
    const [user, setUser] = useState(null)
    const [allBlogs, setAllBlogs] = useState(null)

    const [loading, setLoading] = useState(true)
    const [showUserModal, setShowUserModal] = useState(false)

    const getProfile = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get("/users/me")
            sucessToast("User Fetched")
            setUser(response.data.user)
        } catch (error) {
            errorToast(error.response.data.error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get("/users/logout")
            localStorage.setItem("token", "")
            sucessToast(response.data.message)
            setUser(null)

        } catch (error) {
            errorToast(error.response.data.error)
        } finally {
            setLoading(false)
            setShowUserModal(false)
        }
    }

    const getAllBlogs = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get("/blogs/all-blogs")
            setAllBlogs(response.data.blogs)
            sucessToast(response.data.message)

        } catch (error) {
            errorToast(error.response.data.error)

        } finally {
            setLoading(false)
            setShowUserModal(false)
        }
    }

    useEffect(() => {
        getProfile()
        getAllBlogs()
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
        <>
            <div className='flex justify-between items-center p-4'>
                <div className='flex justify-center items-center gap-3'>
                    {user ? (
                        <div className='text-xl'>
                            <Link to={"/add-blog"} state={user} className='p-2 border-2 border-gray-500 rounded-xl hover:bg-gray-600 transition-all flex justify-center items-center gap-1'>Create Project <MdAdd size={20} /></Link>
                        </div>
                    ) : (
                        <div className='flex justify-center items-center gap-4 text-xl'>
                            <Link className='ring-2 ring-gray-600 bg-blue-600 hover:bg-transparent p-2 rounded-xl font-bold' to={"/login"}>Login</Link>
                            <Link to={"/register"} className='ring-2 ring-gray-500 transition-all hover:bg-blue-600 p-2 rounded-xl font-bold'>Register</Link>
                        </div>
                    )

                    }
                    <Link to={"/search"} className='ring-2 w-10 h-10 flex justify-center items-center text-3xl ring-gray-500 transition-all bg-green-800 p-2 rounded-xl font-bold'><FaSearch className='rotate-90 hover:animate-pulse duration-75'/></Link>
                </div>

                <div className='relative'>
                    {user && (
                        <div onClick={() => setShowUserModal(!showUserModal)} className='w-12 cursor-pointer selection:bg-transparent text-black text-4xl font-semibold h-12 rounded-full flex justify-center items-center bg-emerald-500'>
                            <FaRegUserCircle/>
                        </div>
                    )}
                    {showUserModal && (
                        <div className='bg-slate-900 flex justify-center items-center right-0 top-14 flex-col gap-3 absolute p-4 rounded-lg' onBlur={() => setShowUserModal(false)}>
                            <p className='text-gray-500'>@{user.username}</p>
                            <Link to={"/me"} className='hover:bg-slate-700 block p-1 px-2 w-full rounded-lg'>Profile</Link>
                            <button onClick={handleLogout} className='hover:bg-slate-700 block p-1 px-2 w-full rounded-lg text-left'>Logout</button>
                        </div>
                    )}
                </div>
            </div>
            <div className='mt-2  font-semibold p-4'>
                <h1 className='flex text-3xl justify-start items-center gap-4'>All blogs <ImBlog /></h1>
                <div className='mt-8 flex justify-evenly items-center flex-col flex-wrap gap-6'>
                    {allBlogs && (
                        allBlogs.map((blog) => (
                            <div key={blog._id} className='w-full ring-2 ring-gray-600 p-3 flex justify-start items-start gap-5 rounded-md'>
                                <img src={blog.image} className='rounded-xl w-[250px]  object-fill overflow-hidden' />
                                <div className='flex flex-col justify-center items-start gap-2'>
                                <Link to={`/blog/${blog._id}`} className='text-xl hover:underline font-semibold'>{blog.title}</Link>
                                <h3 className='text-slate-400'>@{blog.user.username}</h3>
                                <p className='text-gray-500'>{new Date(blog.createdAt).toDateString()}</p>
                                </div>

                            </div>
                        )))}
                </div>
            </div>
        </>
    )
}

export default Home