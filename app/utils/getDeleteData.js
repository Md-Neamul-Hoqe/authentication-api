import { baseURL } from "./constansts";

const getDeleteData = async (apiEnd) => {

    const response = await fetch(`${baseURL}${apiEnd}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            myTokenHere: 'Bearer 439tjrfoszvn8fj485u4cn9'
        }
    })

    return await response.json()
};

export default getDeleteData;