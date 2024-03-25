
const getDeleteData = async (apiEnd) => {

    const response = await fetch(`http://localhost:3000/api${apiEnd}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            myTokenHere: 'Bearer 439tjrfoszvn8fj485u4cn9'
        }
    })

    return await response.json()
};

export default getDeleteData;