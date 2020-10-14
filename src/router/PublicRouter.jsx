import React from "react";
import { useRoutes, navigate } from "hookrouter";
import Asteroids from "../components/Common/Asteroids";
const routes = {
    "/": () => <Asteroids />,
};

const PublicRouter = () => {
    const pages = useRoutes(routes);
    !pages && navigate("/");
    return (
        <div className="relative bg-gray-800 min-h-screen pb-24">
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