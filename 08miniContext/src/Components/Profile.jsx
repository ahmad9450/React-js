import React,{useContext} from "react";
import UserContext from "../Contexts/UserContext.js";

function Profile(){
  const {user, password} = useContext(UserContext);
  if(!user) return <div>Please Login first</div>
  return <div>Your are Welcome {user.username}</div>
}

export default Profile;