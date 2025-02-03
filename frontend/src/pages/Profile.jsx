import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { errorToast, sucessToast } from "../utils/noti";
import axiosInstance from "../utils/axios";
import { TiTick } from "react-icons/ti";
import { MdSyncLock } from "react-icons/md";

const Profile = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const getProfile = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get("/users/me");
            sucessToast("User Fetched");
            setUser(response.data.user);
            setLoading(false);
        } catch (error) {
            errorToast(error.response.data.error);
            navigate("/home");
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <div className="w-24 h-24 rounded-full animate-spin border-4 border-gray-300 border-t-emerald-500"></div>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center text-white bg-gray-900 p-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>

                <div className="mb-4">
                    <p className="text-lg font-medium">
                        Username: <span className="text-emerald-400">{user.username}</span>
                    </p>
                </div>

                <div className="mb-4">
                    <p className="text-lg font-medium">
                        Email: <span className="text-emerald-400">{user.email}</span>
                    </p>
                </div>

                <div className="mb-6 flex items-center justify-center gap-2 text-lg font-medium">
                    Is Verified:{" "}
                    {user.isVerified ? (
                        <TiTick size={24} className="text-green-500" />
                    ) : (
                        <span className="text-red-500">No</span>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <Link
                        to="/forgot"
                        className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 transition-all"
                    >
                        Change Password <MdSyncLock size={20} />
                    </Link>

                    <Link
                        to="/home"
                        className="block w-full py-2 text-center bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-lg font-semibold"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;
