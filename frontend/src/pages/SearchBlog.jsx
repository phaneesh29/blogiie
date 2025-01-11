import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { errorToast } from '../utils/noti'
import axiosInstance from '../utils/axios'
import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const SearchBlog = () => {

    const [searchInput, setSearchInput] = useState("")
    const [searchBlogs, setSearchBlogs] = useState(null)
    const [searchQuery, setSearchQuery] = useState(null)

    const [loading, setLoading] = useState(false)

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    const handleSearch = async () => {
        if (!searchInput) {
            errorToast("Input field is required")

            return
        }
        try {
            setLoading(true)
            const response = await axiosInstance.post("/blogs/search", { query: searchInput })
            console.log(response)
            setSearchBlogs(response.data.searchedBlogs)
            setSearchQuery(response.data.query)
            setSearchInput("")
        } catch (error) {
            errorToast(error.response.data.error)
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
            <Link to={"/home"} className='text-lg bg-blue-600 p-2 inline-flex items-center gap-2 rounded-lg m-3'>Home <FaHome /></Link>
            <div className='flex justify-center flex-col mt-5 mx-3 p-3 gap-10'>

                <div className='w-full flex justify-center ring-2 rounded-lg ring-gray-600'>
                    <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} onKeyDown={handleKeyPress} type="text" className='p-3 bg-gray-900 ring-2 rounded-l-lg w-full focus:outline-none text-xl' placeholder='Search... Ex : AIML' />
                    <button onClick={handleSearch} className='text-3xl bg-green-950 ring-2 rounded-e-lg ring-gray-600 flex justify-center items-center border-l-2 border-l-slate-500 px-2'><CiSearch /></button>
                </div>

                <div className='min-h-[300px] ring-2 rounded-lg p-2'>
                    {searchQuery && (<p>Searched For: {searchQuery}</p>)}
                    <div className='mt-8 flex justify-evenly items-center flex-col flex-wrap gap-6'>
                        {searchBlogs && (
                            searchBlogs.map((blog) => (
                                <div key={blog._id} className='w-full ring-2 ring-gray-600 p-3 flex justify-start items-start gap-5 rounded-md'>
                                    <img src={blog.image} className='rounded-xl w-[250px]  object-fill overflow-hidden' />
                                    <div className='flex flex-col justify-center items-start gap-2'>
                                        <Link to={`/blog/${blog._id}`} className='text-xl hover:underline font-semibold'>{blog.title}</Link>
                                        <h3 className='text-slate-400'>@{blog.user.username}</h3>
                                        <p className='text-gray-500'>{new Date(blog.createdAt).toDateString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}


export default SearchBlog