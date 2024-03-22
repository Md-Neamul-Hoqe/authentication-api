
const getFetchData = async (apiEnd) => {
    const response = await fetch(`http://localhost:3000/api${apiEnd}`, {
        method: 'GET',
    })
    
    return await response.json()
};

export default getFetchData;