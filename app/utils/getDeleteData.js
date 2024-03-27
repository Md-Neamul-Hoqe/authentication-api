import { baseURL } from "./constants";

const getDeleteData = async (apiEnd) => {
    const response = await fetch(`${baseURL}${apiEnd}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include"
    })

    return await response.json()
};

export default getDeleteData;