
import React from "react";
import { useRoutes, navigate } from "hookrouter";
import Asteroid from "../components/Asteroids/home";
import PublicNavBar from "../components/Navbars/PublicNavBar";
import Login from "../components/Auth/Login"
import Register from "../components/Auth/Register"
import SearchByDate from "../components/Asteroids/DateFilter";

//visibl to public
const routes = {
    "/": () => <Asteroid />,
    "/login": () => <Login />,
    "/register": () => <Register />,
    "/datesearch": () => <SearchByDate />,
};

const PublicRouter = () => {
    const pages = useRoutes(routes);
    !pages && navigate("/");
    return (
        <div className="relative bg-gray-900  min-h-screen pb-24">
             <PublicNavBar />
            {pages}
            {!pages && (
                <div className="flex justify-center py-16">
                    Error 404: Page not found
                </div>
            )}
                            
                      
        </div>
        
    );
};

export default PublicRouter;