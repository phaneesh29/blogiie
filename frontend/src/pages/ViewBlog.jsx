import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { sucessToast, errorToast } from '../utils/noti'
import axiosInstance from '../utils/axios';
import DescBlog from './DescBlog';
import { FaHome, FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const ViewBlog = () => {
    const navigate = useNavigate()
    const { blogId } = useParams();
    const [user, setUser] = useState(null)
    const [blog, setBlog] = useState({})
    const [loading, setLoading] = useState(true)

    const getProfile = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get("/users/me")
            setUser(response.data.user)
            sucessToast("User Fetched")
        } catch (error) {
            errorToast(error.response.data.error || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    const getBlog = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get(`/blogs/blog/${blogId}`)
            setBlog(response.data.blog)
            sucessToast(response.data.message)

        } catch (error) {
            errorToast(error.response.data.error || "Something went wrong")

        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (user._id.toString() !== blog.user._id.toString()) {
            errorToast("You dont have permission to this")
            return
        }
        try {
            setLoading(true)
            const response = await axiosInstance.post(`/blogs/delete`, { blogId: blog._id })
            sucessToast(response.data.message)
            navigate("/home")
        } catch (error) {
            errorToast(error.response.data.error || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetch = async () => {
            await getBlog()
            await getProfile()
        }
        fetch()
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
            <div className='m-3 p-3 flex justify-between items-center gap-4'>
                <Link to={"/home"} className='text-lg bg-blue-600 p-2 flex items-center gap-2 rounded-lg'>Home <FaHome /></Link>
                {user && (
                    <div>
                        {user._id.toString() == blog.user._id.toString() && (

                            <div className='flex gap-3 items-center'>
                                <Link to={"/edit"} state={{ user, blog }} className='text-lg flex items-center gap-2 bg-emerald-600 p-2 rounded-lg'>Edit <FaPencilAlt /></Link>
                                <button onClick={handleDelete} className='text-lg flex items-center gap-2 bg-red-600 p-2 rounded-lg'>Delete <MdDelete /></button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className='flex flex-col justify-center gap-6 items-start p-5'>
                <img src={blog.image} alt="A Image" className='rounded-xl shadow-lg ring-2 ring-gray-500 m-auto object-conatin' />

                <p className='text-lg text-gray-400'>{new Date(blog.createdAt).toLocaleString()}</p>

                <div className='flex items-center gap-3 text-slate-300'>
                    <p>@{blog.user.username}</p>
                    <p><a href={`mailto:${blog.user.email}`}>{blog.user.email}</a></p>
                </div>

                <h1 className='text-3xl font-semibold'>{blog.title}</h1>

                <DescBlog htmlContent={blog.description} />

                <div className='flex items-center gap-4 text-lg'>
                    {blog.tags.length > 0 && (
                        blog.tags.map((tag, index) => (
                            <p key={index} className='bg-emerald-500 p-1 px-2 rounded-lg font-semibold text-black'>#{tag}</p>
                        ))
                    )}
                </div>

            </div>
        </>
    )
}

export default ViewBlog