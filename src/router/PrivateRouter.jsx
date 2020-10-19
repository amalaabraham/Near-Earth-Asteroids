
import React from "react";
import { useRoutes, navigate } from "hookrouter";
//import { useRoutes,Router } from "@reach/router";
import Asteroid from "../components/Asteroids/home";
import UserNavBar from "../components/Navbars/UserNavBar";
import SearchByDate from "../components/Asteroids/DateFilter"
import Login from "../components/Auth/Login"
import Register from "../components/Auth/Register"
import Profile from "../components/Auth/Profile"
//import AsteroidsFilter from ".../components/Asteroids/AsteroidsFilter"
//import SearchById from "../components/Asteroids/SearchById";
//import SearchByDate from "../components/Asteroids/DateFilter";
const routes = {
    "/": () => <Asteroid />,
   // "/search": () => <SearchById />,
    //"/": () => <Home />,
   // "/login": () => <Login />,
    //"/register": () => <Register />,
    "/profile": () => <Profile />,
    "/datesearch": () => <SearchByDate />,
  //  "/asteroid": () => <AsteroidsFilter />,
};
console.log("app")
const AppRouter = () => {
    const pages = useRoutes(routes);
    !pages && navigate("/");
    return (
        <div className="relative bg-gray-900  min-h-screen pb-24">
              <UserNavBar />
            {pages}
            {!pages && (
                <div className="flex justify-center py-16">
                    Error 404: Page not found
                </div>
            )}
                            
                      
        </div>
        
    );
};

export default AppRouter;