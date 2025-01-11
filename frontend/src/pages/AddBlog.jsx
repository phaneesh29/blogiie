import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { errorToast, sucessToast } from '../utils/noti';
import { MdDelete } from 'react-icons/md';
import axiosInstance from '../utils/axios';

const AddBlog = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const user = location.state

    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tagArray, setTagArray] = useState([])

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user) {
            navigate("/home")
        }
    }, [user])

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

    const handleSubmit = async () => {
        if (!title || !description) {
            errorToast("Title Description can't be empty")
            return
        }
        try {
            setLoading(true)
            const response = await axiosInstance.post("/blogs/add", { image, title, description, tags: tagArray })
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

    return (
        <>
            <div className='p-3 flex justify-between items-center mb-10'>
                <div className='text-2xl font-semibold'>Add Blog</div>
                <div className=' text-xl'>Hello, <span className='font-bold'>{user.username}</span></div>
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

                    <button disabled={loading} onClick={handleSubmit} className={`bg-blue-600 p-2 rounded-lg text-lg hover:bg-indigo-600 transition-all ${loading ? "cursor-wait" : "cursor-pointer"}`} >Add Blog</button>
                </div>
            </div>
        </>
    )
}

export default AddBlog