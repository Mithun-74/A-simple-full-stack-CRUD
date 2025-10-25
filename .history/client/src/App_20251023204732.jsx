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

      
}

export default app;