import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { sucessToast, errorToast } from '../utils/noti'
import axiosInstance from '../utils/axios';
import DescBlog from './DescBlog';
import { FaHome, FaPencilAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';

const ViewBlog = () => {
    const navigate = useNavigate()
    const { blogId } = useParams();
    const [user, setUser] = useState(null)
    const [blog, setBlog] = useState({})
    const [loading, setLoading] = useState(true)
    const [commentInput, setCommentInput] = useState("")
    const [commentLoading, setCommentLoading] = useState(false)
    const [commentArray, setCommentArray] = useState([])


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

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    const handleComment = async () => {
        try {
            setCommentLoading(true)
            const response = await axiosInstance.post(`/comments/add`, { content: commentInput, blogId })
            fetchComments()
            setCommentInput("")

        } catch (error) {
            errorToast(error.response.data.error || "Something went wrong")
        } finally {
            setCommentLoading(false)
        }
    }

    const fetchComments = async () => {
        try {
            setCommentLoading(true)
            const response = await axiosInstance.post(`/comments/get`, { blogId })
            setCommentArray(response.data.comments)
            sucessToast(response.data.message)

        } catch (error) {
            errorToast(error.response.data.error || "Something went wrong")
        } finally {
            setCommentLoading(false)

        }
    }

    const handleCommentDelete = async(comment)=>{
       if (user._id.toString() !== comment.user._id.toString()) {
        errorToast("You can't delete")
        return
       }
        try {
            setCommentLoading(true)
            const response = await axiosInstance.post(`/comments/delete`, { commentId:comment._id })
            fetchComments()            
        } catch (error) {
            errorToast(error.response.data.error || "Something went wrong")
            
        }finally{
            setCommentLoading(false)

        }
    }
    useEffect(() => {
        const fetch = async () => {
            await getBlog()
            await getProfile()
            await fetchComments()
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
                    <p><Link to={`/user/@${blog.user.username}`}>@{blog.user.username}</Link></p>
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

                <div className='flex justify-center flex-col w-full mt-5 gap-5'>
                    <h2 className='text-2xl'>Comments</h2>
                    {user && (
                        <div className='w-full flex justify-center ring-2 rounded-lg ring-gray-600'>
                            <input value={commentInput} onChange={(e) => setCommentInput(e.target.value)} onKeyDown={handleKeyPress} type="text" className='p-3 bg-gray-900 ring-2 rounded-l-lg w-full focus:outline-none text-xl' placeholder='Comment...' />
                            <button disabled={commentLoading} onClick={handleComment} className={`text-3xl bg-green-950 ring-2 rounded-e-lg ring-gray-600 flex justify-center items-center border-l-2 border-l-slate-500 px-2 active:scale-90 transition-all ${commentLoading ? "cursor-wait" : "cursor-pointer"}`}><IoIosSend /></button>
                        </div>
                    )}

                    {commentLoading ? (
                        <div className='w-10 h-10 border-l-2 rounded-full m-auto mt-2 animate-spin'></div>
                    ) : (
                        <div className='flex flex-col justify-center gap-5 '>
                            {commentArray.length > 0 ? (commentArray.map((comment) => (
                                <div key={comment._id} className='bg-gray-800 p-2 rounded-lg flex flex-col gap-2'>
                                    <div className='flex items-center justify-between gap-3 text-gray-500'>
                                        <p><Link to={`/user/@${comment.user.username}`}>@{comment.user.username}</Link></p>
                                        <p>{new Date(comment.createdAt).toLocaleString()}</p>
                                        {user?._id.toString() === comment.user._id.toString() && (<button className='text-red-700' onClick={(()=>handleCommentDelete(comment))}  ><MdDelete size={20} /></button>)}
                                    </div>
                                    <p className='text-lg'>{comment.content}</p>
                                </div>
                            ))) : (
                                <p>No Comments</p>
                            )}
                        </div>
                    )}

                </div>
            </div >
        </>
    )
}

export default ViewBlog