
export const metadata = {
  title: "Home",
};

export default async function Home() {

  const response = await fetch('http://localhost:3000/api/v1/users', {
    method: 'GET',
  })

  // console.log(response);
  const users = await response.json()

  return (
    <main className="text-center min-h-screen flex items-center justify-center">


      {
        users?.length
          ? <h1 className="text-5xl">Total {users?.length} users found from <i>synchome</i> db</h1>
          : <>
            This is home page.
            <br />
            All users will loaded here.
          </>
      }
    </main>
  );
}
