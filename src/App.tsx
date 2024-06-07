import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
interface User {
  categoryName: string;
}
const App: React.FC = () => {
  const [regUsername, setRegUsername] = useState("");
  const [users, setUsers] = useState<User[]>([]);

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
    }
  };
  console.log(users);
  const handleRegister = async () => {
    try {
      console.log("hasan");
      const response = await axios.post(
        "https://demologin-2.onrender.com/api/v1/category/create",
        {
          categoryName: regUsername,
        }
      );
      setRegUsername("");
      fetchUsers();
      const data = response.data;
      console.log(data);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <h1>Category Page</h1>
      <input
        type="text"
        placeholder="Category Name"
        value={regUsername}
        onChange={(e) => setRegUsername(e.target.value)}
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
