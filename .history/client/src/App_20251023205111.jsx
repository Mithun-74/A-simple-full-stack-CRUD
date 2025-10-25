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

      const
}

export default app;