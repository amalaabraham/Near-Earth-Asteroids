import React from "react";

//loader
export const Loading = () => {
    return (
        <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center">
            
            <div class=" border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                <div className="text-gray-500 text-xs font-light mt-2 text-center">
                  Please wait...
                </div>
                    <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-gray-400 h-12 w-12"></div>
                    <div class="flex-1 space-y-4 py-1">
                        <div class="h-4 bg-gray-400 rounded w-3/4"></div>
                        <div class="space-y-2">
                              <div class="h-4 bg-gray-400 rounded"></div>
                              <div class="h-4 bg-gray-400 rounded w-5/6"></div>
                        </div>
                      </div>
                  </div>
              </div>
      
        </div>
    );
};

export const FullLoading = ({ color = "gray-200" }) => {
    return (
        <div
            className={`h-screen w-full items-center flex flex-col justify-center overflow-hidden bg-${color}`}>
            <Loading />
        </div>
    );
};



