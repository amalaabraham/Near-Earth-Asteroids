import React, { useContext } from "react";
import PublicRouter from "./router/PublicRouter";
import AppRouter from "./router/PrivateRouter";
import UserProvider from "./components/Context/UserProvider";
import { UserContext } from "./components/Context/UserProvider";
import { useState, useEffect } from "react";
import UserNavBar from "./components/Navbars/UserNavBar";
import PublicNavBar from "./components/Navbars/PublicNavBar";


function App() {

  const user = useContext(UserContext);
  console.log(user)
  return (
    user ?
    <AppRouter />
      :
      <PublicRouter />
      
  )
 /* const [user, setUser] = useState("");
  const authListener = () => {
    if (user) {
      console.log("foo");
    } else {
      fire.auth().onAuthStateChanged((user) => {
        if (user) {
          setUser(user.uid);
        } else {
          setUser("");
          console.log("no user");
        }
      });
    }
  };

  useEffect(() => {
    authListener();
  }, []);

  if (user) return <AppRouter userId={user} />;
  else {
    return <PublicRouter />;
  }*/
}

export default App;
