import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { errorToast, sucessToast } from '../utils/noti'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MdClose, MdDelete } from 'react-icons/md';
import axiosInstance from '../utils/axios';

const EditBlog = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const payload = location.state
    
    const [image, setImage] = useState(payload?.blog?.image || '');
    const [title, setTitle] = useState(payload?.blog?.title || '');
    const [description, setDescription] = useState(payload?.blog?.description || '');
    const [tagInput, setTagInput] = useState('');
    const [tagArray, setTagArray] = useState(payload?.blog?.tags || [])

    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        if (!payload) {
            navigate("/home")
            return
        }
        setLoading(false)
    }, [payload])

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["code-block"],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "code-block",
        "link",
        "image",
    ];

    const handleAddTags = () => {
        if (!tagInput) {
            errorToast("Tag fieled empty")
            return
        }
        const addNewTags = tagInput.split(",")
        const existingTags = [...tagArray, ...addNewTags]
        setTagArray(existingTags)
        setTagInput("")
    }
    const handleTagDelete = (index) => {
        const existingTags = [...tagArray]
        existingTags.splice(index, 1)
        setTagArray(existingTags)
    }

    const handleEdit = async () => {
        if (payload.user._id.toString() !== payload.blog.user._id.toString()) {
            errorToast("You can't edit this blog")
            return
        }
        if (!title || !description) {
            errorToast("Title Description can't be empty")
            return
        }
        try {
            setLoading(true)
            const response = await axiosInstance.post("/blogs/edit", { image, title, description, tags: tagArray, blogId: payload.blog._id })
            sucessToast(response.data.message)

            setImage("")
            setTitle("")
            setTagInput("")
            setTagArray([])
            setDescription("")
            navigate("/home")

        } catch (error) {

            errorToast(error.response.statusText || error.response.data.error || error.response.data.errors[0].msg || "Something unexpected")
        } finally {
            setLoading(false)
        }

    }

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
            <Link to={"/home"} className='inline-block p-2'><MdClose size={29}/></Link>
    
            <div className='p-3 flex justify-between items-center mb-10'>
                <div className='text-2xl font-semibold'>Edit Blog</div>
                <div className=' text-xl'>Hello, <span className='font-bold'>{payload.user.username}</span></div>
            </div>
            <div>
                <div className='m-4 flex flex-col justify-center items-center gap-5'>
                    <input value={image} onChange={(e) => { setImage(e.target.value) }} type="text" className='w-full p-2 bg-gray-900 text-white bg-opacity-55 ring-2 ring-gray-500 rounded-lg text-xl focus:outline-none' placeholder='Image Url' />

                    <input value={title} onChange={(e) => { setTitle(e.target.value) }} type="text" className='w-full p-2 bg-gray-900 text-white bg-opacity-55 ring-2 ring-gray-500 rounded-lg text-xl focus:outline-none' placeholder='Title' />

                    <div className='w-full flex justify-between items-center gap-2'>
                        <input value={tagInput} onChange={(e) => { setTagInput(e.target.value) }} type="text" className='w-[85%] p-2 bg-gray-900 text-white bg-opacity-55 ring-2 ring-gray-500 rounded-lg text-xl focus:outline-none' placeholder='Seprate tags with comma' />
                        <button onClick={handleAddTags} className='w-[15%] bg-emerald-500 text-black p-1 rounded-lg text-lg font-semibold'>Add Tags</button>
                    </div>
                    <div className='w-full px-2 mb-4 flex-wrap text-lg flex items-center gap-5'>All tags : {tagArray.length > 0 && (
                        tagArray.map((tag, index) => (
                            <div key={index} className='min-w-[100px] bg-slate-700 p-1 px-3 rounded-full flex justify-between items-center gap-1'>
                                {tag}
                                <button onClick={() => handleTagDelete(index)}><MdDelete /></button>
                            </div>
                        ))
                    )}</div>

                    <ReactQuill theme="snow" value={description} onChange={setDescription} className='w-full  bg-zinc-900 ring-2 ring-gray-300 text-white text-lg' style={{
                        minHeight: '300px', height: 'auto', overflow: 'hidden',
                    }} modules={modules} formats={formats} />

                    <button disabled={loading} onClick={handleEdit} className={`bg-blue-600 p-2 rounded-lg text-lg hover:bg-indigo-600 transition-all ${loading ? "cursor-wait" : "cursor-pointer"}`} >Edit Blog</button>
                </div>
            </div>
        </>
    )
}

export default EditBlog