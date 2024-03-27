import { baseURL } from "./constants";

const getFetchData = async (apiEnd) => {
    const response = await fetch(`${baseURL}${apiEnd}`, {
        method: 'GET',
        cache: "no-store"
    })

    return await response.json()
};

export default getFetchData;