import React,{useState}  from "react";
import {useParams} from "react-router-dom";

function User(){
  let {userId} = useParams();
  if(typeof userId === "string"){
    userId = userId.charAt(0).toUpperCase()+userId.slice(1).toLowerCase()
  }
  console.log(userId)
  return (
    <h1 className="text-center bg-gray-600 p-14 text-amber-50">User :{userId} </h1> 
  )
}

export default User;