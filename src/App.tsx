import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

interface User {
  categoryName: string;
}

const App: React.FC = () => {
  const [regUsername, setRegUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://demologin-2.onrender.com/api/v1/category/read"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to fetch users.");
    }
  };

  const handleRegister = async () => {
    if (!regUsername.trim()) {
      setError("Category name cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        "https://demologin-2.onrender.com/api/v1/category/create",
        {
          categoryName: regUsername,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      setRegUsername("");
      fetchUsers();
      console.log("Category created:", response.data);
    } catch (error) {
      console.error("Error creating category:", error);
      setError("Failed to create category.");
    }
  };

  return (
    <div className="App">
      <h1>Category Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Category Name"
        value={regUsername}
        onChange={(e) => {
          setRegUsername(e.target.value);
          setError(null); // Clear error message when user types
        }}
      />
      <br />
      <button onClick={handleRegister}>Create Category</button>
      <table style={{ margin: "0 auto", marginTop: "50px" }}>
        <thead>
          <tr>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.categoryName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
