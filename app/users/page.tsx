import React, { use } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const UsersPage = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    //{next: { revalidate: 10 },
    { cache: "no-store" },
  );
  const users: User[] = await res.json();
  return (
    <>
      <h1 className="text-3xl text-amber-50 pb-4 pt-2">Users</h1>

      <table className="min-w-full border border-gray-300 text-left">
        <thead className="bg-sky-900">
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-sky-500">
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
