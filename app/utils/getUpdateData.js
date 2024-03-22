
const getUpdateData = async (apiEnd, user) => {
    // console.log(user);
    const response = await fetch(`http://localhost:3000/api${apiEnd}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    return await response.json()
};

export default getUpdateData;