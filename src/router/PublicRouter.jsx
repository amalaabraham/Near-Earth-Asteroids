import React from "react";
import { useRoutes, navigate } from "hookrouter";
import Asteroid from "../components/home";
import AsteroidsFilter from "../components/AsteroidsFilter"
import SearchById from "../components/SearchById";
import SearchByDate from "../components/DateFilter";
const routes = {
    "/": () => <Asteroid />,
    "/search": () => <SearchById />,
    //"/": () => <Home />,
   // "/login": () => <Login />,
    //"/register": () => <Register />,
    //"/profile": () => <Profile />,
    "/datesearch": () => <SearchByDate />,
    "/asteroid": () => <AsteroidsFilter />,
};

const PublicRouter = () => {
    const pages = useRoutes(routes);
    !pages && navigate("/");
    return (
        <div className="relative bg-gray-900  min-h-screen pb-24">
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