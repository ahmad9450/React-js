import React,{useState,useContext} from "react"
import UserContext from "../Contexts/UserContext.js";

function Login(){
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  
  const {setUser} = useContext(UserContext);
  
  const handleSubmit= (e)=>{
    e.preventDefault();
    setUser({username,password});
  }
  const containerStyle = {
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "300px",
    margin: "0 auto",
    textAlign: "center",
    justifyContent: "center" ,
    alignItems:"center"
  };
  return (
  <div style={containerStyle}>
    <h1>Login</h1>
    <input
    value={username}
    onChange={(e)=> setUsername(e.target.value)}
    type="text"
    placeholder="username"/>
    <input type="text"
    value={password}
    onChange={(e)=> setPassword(e.target.value)}
    placeholder="password"/>
    <button onClick={handleSubmit}>Login</button>
  </div>
  )
}

export default Login;