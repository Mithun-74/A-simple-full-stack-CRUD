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

      const handleEdit = ()
}

export default app;