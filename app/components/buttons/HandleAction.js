'use client'

import getDeleteData from "@/app/utils/getDeleteData";
import getUpdateData from "@/app/utils/getUpdateData";
import { useState } from "react";
import { SyncLoader } from "react-spinners";

const HandleAction = ({ user }) => {
    const [ loading, setLoading ] = useState(false)

    const handleEdit = async (user) => {
        setLoading(true)
        const result = await getUpdateData('/v1/users', user)
        console.log('Edit the user: ', result.data);
        setLoading(false)
    }

    const handleDelete = async (user) => {
        setLoading(true)
        const result = await getDeleteData(`/v1/users?${user?._id}`, user)
        setLoading(false)
        console.log('Delete the user: ', result.data);
    }

    return (
        <span className="flex items-center gap-2 justify-between">
            <button className="bg-blue-500" onClick={() => handleEdit(user)}>{loading ? <SyncLoader color="magenta" size={5} /> : 'Edit'}</button>
            <button className="bg-red-500" onClick={() => handleDelete(user)}>{loading ? <SyncLoader color="magenta" size={5} /> : 'Delete'}</button>
        </span>
    );
};

export default HandleAction;