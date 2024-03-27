import { baseURL } from "./constants";

const getFetchData = async (apiEnd) => {
    const response = await fetch(`${baseURL}${apiEnd}`, {
        method: 'GET',
    })

    return await response.json()
};

export default getFetchData;