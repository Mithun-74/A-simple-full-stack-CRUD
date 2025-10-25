import { useEffect, useState } from "react";

const app=()=>{
      const[users,setUsers]=useState([]);
      const[name,setName]=useState("");
      const[age,setAge]=useState("");
      const[edituser,setEditUser]=useState(null);


      const fetchData = async () => {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
      }

      useEffect(()=>{
        fetchData();
      },[]);

      const DeleteUser = async(id) =>{
        await axios.delete(`http://localhost:5000/users/${id}`);
        fetchData();
      }

      const handleEdit = (user) =>{
        setEditUser(user);
        setName(user.name);
        setAge(user.age);
        axios.post(`http://localhost:5000/users/${user.id}`, { name, age });
        setEditUser(null);
        setName("");
        setAge("");
      }

      const createUser = async () => {
        await axios.post("http://localhost:5000/users", { name, age });
        setName("");
        setAge("");
        fetchData();
      }

       const updateUser = async () => {
  if (!editingUser) {
    alert("No user selected for update!");
    return;
  }

    await axios.put(`http://localhost:8000/users/${editingUser.id}`, {
      name,
      age,
    });
    setEditingUser(null);
    setName("");
    setAge("");
    fetchUsers();
  };

      return(
        <div>
          <h1>User Management</h1>
          <form onSubmit={e => {
            e.preventDefault();
            editUser ? handleEdit(editUser) : createUser();
          }}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" required />
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
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.age}</td>
                  <td>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => DeleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
}

export default app;


import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  // ✅ Get all users
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8000/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Add new user
  const addUser = async () => {
    if (!name || !age) return alert("Enter name and age");
    await axios.post("http://localhost:8000/users", { name, age });
    setName("");
    setAge("");
    fetchUsers();
  };

  // ✅ Delete user
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/users/${id}`);
    fetchUsers();
  };

  // ✅ Edit user
  const startEdit = (user) => {
    setEditingUser(user);
    setName(user.name);
    setAge(user.age);
  };

  //✅Update user
  const updateUser = async () => {
  if (!editingUser) {
    alert("No user selected for update!");
    return;
  }
  
  await axios.put(`http://localhost:8000/users/${editingUser.id}`, {
    name,
    age,
  });
  setEditingUser(null);
  setName("");
  setAge("");
  fetchUsers();
};

  return (
    <div style={{ margin: "30px" }}>
      <h2>React + Express CRUD Example</h2>
      <div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        {editingUser ? (
          <button onClick={updateUser}>Update</button>
        ) : (
          <button onClick={addUser}>Add</button>
        )}
      </div>

      <table border="1" style={{ marginTop: "20px", width: "400px" }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Age</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.age}</td>
              <td>
                <button onClick={() => startEdit(u)}>Edit</button>
                <button onClick={() => deleteUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
