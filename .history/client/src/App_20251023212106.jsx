// ...existing code...
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editUser, setEditUser] = useState(null);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/users/${id}`);
    fetchData();
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setName(user.name);
    setAge(user.age);
  };

  const createUser = async () => {
    await axios.post("http://localhost:5000/users", { name, age });
    setName("");
    setAge("");
    fetchData();
  };

  const updateUser = async () => {
    if (!editUser) {
      alert("No user selected for update!");
      return;
    }

    await axios.put(`http://localhost:5000/users/${editUser.id}`, {
      name,
      age,
    });
    setEditUser(null);
    setName("");
    setAge("");
    fetchData();
  };

  return (
    <div>
      <h1>User Management</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          editUser ? updateUser() : createUser();
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Age"
          required
        />
        <button type="submit">{editUser ? "Update" : "Create"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
// ...existing code...