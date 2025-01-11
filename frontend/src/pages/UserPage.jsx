import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { errorToast } from '../utils/noti';
import axiosInstance from '../utils/axios';

const UserPage = () => {
    const { un } = useParams();

    const [userData, setUserData] = useState(null);
    const [blogData, setBlogData] = useState(null);
    const [loading, setLoading] = useState(true);

    const username = un.replace("@", "");

    const fetchDetails = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/blogs/user/${username}`);
            setBlogData(response.data.blogs);
            setUserData(response.data.user);
        } catch (error) {
            console.log(error);
            errorToast(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center bg-gray-900">
                <div className="w-24 h-24 rounded-full animate-spin border-4 border-t-4 border-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className=" py-12 px-4 sm:px-6 lg:px-8">
            {userData ? (
                <>
                    <div className="max-w-3xl mx-auto">
                        {/* User Info Section */}
                        <div className="flex items-center mb-12 space-x-6">
                            <img
                                src={userData.image || "https://picsum.photos/200/300"}
                                alt="User Profile"
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <div>
                                <h1 className="text-3xl font-semibold">{userData.username}</h1>
                                <p className="text-lg text-gray-400">{userData.email}</p>
                                <p className="text-sm text-gray-500">{new Date(userData.createdAt).toLocaleString()}</p>
                            </div>
                        </div>

                        {/* Blogs Section */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">Blogs</h2>
                            {blogData.length > 0 ? (
                                blogData.map((blog) => (
                                    <div key={blog._id} className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-48 object-contain rounded-md mb-4"
                                        />
                                        <Link to={`/blog/${blog._id}`} className="text-xl font-semibold text-gray-200 hover:underline">{blog.title}</Link>
                                        <p className="text-sm text-gray-400">{new Date(blog.createdAt).toLocaleString()}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-lg text-gray-400">No blogs available.</p>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-lg text-gray-400">No User Found</p>
            )}
            <Link to={"/home"} className='hover:underline'>Home</Link>
        </div>
    );
};

export default UserPage;
