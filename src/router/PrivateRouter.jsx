
import React from "react";
import { useRoutes, navigate } from "hookrouter";
import Asteroid from "../components/Asteroids/home";
import UserNavBar from "../components/Navbars/UserNavBar";
import SearchByDate from "../components/Asteroids/DateFilter"
import Profile from "../components/Auth/Profile"

//private router (after logging in)
const routes = {
    "/": () => <Asteroid />,
    "/profile": () => <Profile />,
    "/datesearch": () => <SearchByDate />,
};

//console.log("app")
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