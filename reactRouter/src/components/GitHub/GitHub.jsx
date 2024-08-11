import React,{useEffect,useState} from "react";
import {useLoaderData} from "react-router-dom";

function Github(){
  let userData = useLoaderData();
  
  // let [userData,setUserData]= useState([])
//   useEffect(()=>{
//     fetch(`https://api.github.com/users/hiteshchoudhary`)
//     .then((res)=>res.json())
//     .then((data)=> {
//       setUserData(data);
//  
//     })
//   },[])
  
  return (
    <div className="text-center p-14 bg-gray-700 text-white">
      <h1 className="mb-10">Follwers:{userData.followers}</h1>
      <h1>Following:{userData.following}</h1>
      <img className="rounded-3xl mt-10" src={userData.avatar_url} alt="hitesh"/>
    </div>
  )
}

export default Github;

export async function GithubInfoLoader(){
  const response= await fetch(`https://api.github.com/users/hiteshchoudhary`);
  return response.json();
}