import users from "./api/v1/users";

export default async function Home() {
  // const usersInfo = await users()
  // console.log(usersInfo);
  return (
    <main className="">
      This is home page.
      <br />
      All users will loaded here.
    </main>
  );
}
