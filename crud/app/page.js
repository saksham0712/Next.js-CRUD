"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [all, setAll] = useState([]);
  const [users, setUsers] = useState({});

  const handleChange = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
    console.log("this is user keyboard input:", users);
  };

  useEffect(() => {
    const fetchusers = async () => {
      const response = await fetch("/api/getusers");
      const data = await response.json();
      console.log("this is api response:", data);
      setAll(data);
    };
    fetchusers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("this is after submit:", users);
    const response = await fetch("/api/createusers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(users),
    });
    const result = await response.json();
    console.log("User added:", result);
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
    console.log("User deleted:", result);
    // Refresh the list of users after deleting
    const fetchusers = async () => {
      const response = await fetch("/api/getusers");
      const data = await response.json();
      setAll(data);
    };
    fetchusers();
  };

  const updateUser = async (id) => {
    console.log(`Update user with ID: ${id}`);
    // Here you can implement the logic for updating the user
  };

  return (
    <main className={styles.main}>
      <h1>CRUD Operations In Next.js</h1>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add</button>
        </form>
        <div>
          {all.map((item) => (
            <div key={item.id} className={styles.tab}>
              <p>{item.id}</p>
              <h3>{item.name}</h3>
              <p>{item.email}</p>
              <button onClick={() => deleteuser(item.id)}>Delete</button>
              <button onClick={() => updateUser(item.id)}>Update</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
