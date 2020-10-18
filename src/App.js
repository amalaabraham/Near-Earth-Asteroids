import React from "react";
import PublicRouter from "./router/PublicRouter";
import AppRouter from "./router/AppRouter";
import { useState, useEffect } from "react";

function App() {

  const user = null;
  return (
    user ?
      <AppRouter/>
      :
      <PublicRouter/>
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
