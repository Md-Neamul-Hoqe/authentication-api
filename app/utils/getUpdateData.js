import { baseURL } from "./constants";

const getUpdateData = async (apiEnd, user) => {
    // console.log(user);
    const response = await fetch(`${baseURL}${apiEnd}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(user)
    })

    return await response.json()
};

export default getUpdateData;