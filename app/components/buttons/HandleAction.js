'use client'

import getUpdateData from "@/app/utils/getUpdateData";

const HandleAction = ({ user }) => {

    const handleEdit = async (user) => {
        const result = await getUpdateData('/v1/users', user)
        console.log('Edit the user: ', result);
    }

    const handleDelete = (user) => {

        console.log('Delete the user: ', user);
    }

    return (
        <span className="flex items-center gap-2 justify-between">
            <button className="bg-blue-500" onClick={() => handleEdit(user)}>Edit</button>
            <button className="bg-red-500" onClick={() => handleDelete(user)}>Delete</button>
        </span>
    );
};

export default HandleAction;