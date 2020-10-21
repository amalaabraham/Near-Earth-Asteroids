import React from "react";
import { A, navigate } from "hookrouter";

const ErrorComponent = () => {        //when search item is not present
    return (
        <div>
            <br /> <br />
            <div className="relative max-w-7xl mx-auto">
                <div className="text-center">
                    <h3 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
                        Connection Error :)
                    </h3>
                    <p className="mx-3 max-w-2xl mx-auto text-xl leading-7 text-gray-400 ">
                       No such asteroid. Try entering the correct id.
                    </p>
                </div>
                <div className="flex justify-center block">
                </div>
            </div>
        </div>
    ); 
};

export default ErrorComponent;
