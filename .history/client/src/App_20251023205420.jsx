import { useEffect, useState } from "react";

const app=()=>{
      const[user,setUser]=useState([]);
      const[name,setName]=useState("");
      const[age,setAge]=useState("");
      const[edituser,setEditUser]=useState(null);


      const fetchData = async () => {
        const res = await axios.get("http://localhost:5000/users");
        setUser(res.data);
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

          <table
        </div>
      )
}

export default app;