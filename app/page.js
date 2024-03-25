
import { SyncLoader } from "react-spinners";
import getFetchData from "./utils/getFetchData";
import Image from "next/image";
import HandleAction from "./components/buttons/HandleAction";

export default async function Home() {
  const { data: users } = await getFetchData('/v1/users')

  return (
    <main className="text-center min-h-screen flex items-start justify-center">
      {
        users?.length
          ? <div>
            <h1 className="text-4xl font-mono capitalize py-5 mb-5">All Users</h1>
            <table className="w-full max-w-7xl">
              <thead>
                <tr className="bg-gray-600 text-white">
                  <th className="py-2 px-3 min-w-32">Photo</th>
                  <th className="text-wrap py-2 px-3 min-w-max">Name</th>
                  <th className="text-wrap py-2 px-3">Email</th>
                  <th className="text-wrap py-2 px-3">Phone</th>
                  <th className="py-2 px-3">Role</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  users?.map(user => <tr key={user?._id} className="border-b-2">
                    <td><Image className="rounded-full m-5" src={user?.photo} width={80} height={80} alt={user?.name} /></td>
                    <td>{user?.name}</td>
                    <td>{user?.email}</td>
                    <td>{user?.phone}</td>
                    <td>{user?.role}</td>
                    <td>
                      {/* practice purpose */}
                      <HandleAction user={user} />
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
          : <div className="bg-gray-400 flex justify-center items-center min-h-screen w-screen">
            <SyncLoader color="magenta" />
          </div>
      }
    </main>
  );
}
