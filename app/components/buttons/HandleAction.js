'use client'

import { baseURL } from "@/app/utils/constants";
import getDeleteData from "@/app/utils/getDeleteData";
import getUpdateData from "@/app/utils/getUpdateData";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SyncLoader } from "react-spinners";

const HandleAction = ({ user }) => {
    const { push } = useRouter()
    const [ loading, setLoading ] = useState(false)

    const handleEdit = async (user) => {
        setLoading(true)
        const result = await getUpdateData('/v1/users', user)
        /* check the token is expired or not */
        if (result.error == 'jwt expired') {

            /* logout expired user session */
            const res = await fetch(`${baseURL}/v1/logout`, {
                method: 'POST'
            })

            const data = await res.json()

            if (data?.error) {
                return alert(data?.error)
            }

            return push('/signin')
        } {
            console.log('Edit the user: ', result);
        }
        setLoading(false)
    }

    const handleDelete = async (user) => {
        setLoading(true)
        const result = await getDeleteData(`/v1/users?${user?._id}`, user)

        /* check the token is expired or not */
        if (result.error == 'jwt expired') {

            /* logout expired user session */
            const res = await fetch(`${baseURL}/v1/logout`, {
                method: 'POST'
            })

            const data = await res.json()

            if (data?.error) {
                return alert(data?.error)
            }

            return push('/signin')
        } {
            console.log('Delete the user: ', result.data);
        }
        setLoading(false)
    }

    return (
        <span className="flex items-center gap-2 justify-between">
            <button className="bg-blue-500" onClick={() => handleEdit(user)}>{loading ? <SyncLoader color="magenta" size={5} /> : 'Edit'}</button>
            <button className="bg-red-500" onClick={() => handleDelete(user)}>{loading ? <SyncLoader color="magenta" size={5} /> : 'Delete'}</button>
        </span>
    );
};

export default HandleAction;