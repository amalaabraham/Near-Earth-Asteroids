import React, { useContext } from "react";
import { UserContext } from "../Context/UserProvider";
import { navigate, A } from "hookrouter";
import {auth} from "../../firebase";


const ProfilePage = () => {
  const user = useContext(UserContext);
  const { displayName, email} = user;
  console.log(user);
  

  return (
    <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
      <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
        <div
          style={{
            backgroundSize: "cover",
            height: "200px",
            width: "200px"
          }}
          className="border border-blue-300"
        ></div>
        <div className = "md:pl-4">
        <h2 className = "text-2xl font-semibold">{displayName}</h2>
        <h3 className = "italic">{email}</h3>
        </div>
      </div>
      
    </div>
  ) 
};

export default ProfilePage;