"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [all, setAll] = useState([]);

  const [users, setUsers] = useState({ id: "", name: "", email: "" });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
    // console.log("this is user keyboard input:", users);
  };

  useEffect(() => {
    const fetchusers = async () => {
      const response = await fetch("/api/getusers");
      const data = await response.json();
      // console.log("this is api response:", data);
      setAll(data);
    };
    fetchusers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("this is after submit:", users);
    const URL = isEditing ? "/api/updateuser" : "/api/createusers";
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    });
    const result = await response.json();
    // console.log("User added:", result);
    setIsEditing(false);
    setUsers({ id: "", name: "", email: "" });
    // Refresh the list of users after adding
    const fetchusers = async () => {
      const response = await fetch("/api/getusers");
      const data = await response.json();
      setAll(data);
    };
    fetchusers();
  };

  const deleteuser = async (id) => {
    const response = await fetch("/api/deleteuser", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const result = await response.json();
    // console.log("User deleted:", result);
    // Refresh the list of users after deleting
    const fetchusers = async () => {
      const response = await fetch("/api/getusers");
      const data = await response.json();
      setAll(data);
    };
    fetchusers();
  };

  const updateUser = async (item) => {
    const data = JSON.stringify({
      id: item.id,
      name: item.name,
      email: item.email,
    });
    // console.log(data)

    // const response = await fetch("/api/updateuser", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ id: item.id, name: item.name, email: item.email}),
    // });
    setUsers({ id: item.id, name: item.name, email: item.email });
    // console.log(`"these are the uers" ${users}`)
    setIsEditing(true);
  };
  const cancel = () => {
    setUsers({ id: "", name: "", email: "" });
    setIsEditing(false);
}
  return (
    <main className={styles.main}>
      <h1>CRUD Operations In Next.js</h1>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.tab}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={users.name}
                onChange={handleChange}
                required
              />
            </div>
            {isEditing ? <button onClick={cancel}>Cancel</button> : <div></div> }
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={users.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit">{isEditing ? "Update" : "Add"}</button>
        </form>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tr}>
              <th  className={styles.th}>Id</th>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>

          {all.map((item) => (
            <tr  key={item.id} className={styles.tr}>
            

              <td  className={styles.td}>{item.id}</td>
              <td className={styles.td}>{item.name}</td>
                <td className={styles.td}>{item.email}</td>
                <td className={styles.td}>

                <button style={{marginRight: "10px"}} onClick={() => deleteuser(item.id)}>Delete</button>
                <button onClick={() => updateUser(item)}>Update</button>

                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
