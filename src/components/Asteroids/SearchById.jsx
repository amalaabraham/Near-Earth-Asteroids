import React from "react";
import { useState, useEffect } from "react";
import ShowAsteroid from "./ShowAsteroids";
import ErrorComponent from "./ErrorComponent";


export default function SearchById () {
    const [asteroidData, setAsteroidData] = useState([])
    const [id, setSearchId] = useState("");
    const [error,setError] = useState(false);
    const [queryid,setQueryId] = useState("");
   // const key = process.env.DEMO_KEY;
    useEffect(() => {
        async function fetchAsteroids() {
            const res = await fetch(
              `https://api.nasa.gov/neo/rest/v1/neo/${queryid}?api_key=gaQXYLekzw7ngWH1cbjGSUY5Y0qkCGi1I0w4WSsE`
            ).then((response) => {
                if(response.status === 200) {
                    console.log("success")
                    setError(false)
                    return response;
                }
                else  if(response.status === 404){
                    console.log("something went wrong")
                    setError(true)
                }
            });
            const data = await res?.json();
            console.log(data);
            setAsteroidData(data); 
          }
          fetchAsteroids()
    },[queryid])

 //   console.log(asteroidData);
   // console.log(error)


  const handleChange = e => {
    setSearchId(e.target.value);
   }

   const handleSubmit = (e) => {
       e.preventDefault();
       console.log(id);
       setQueryId(id);
   }
  

/*if(response === "success"){
    return(
        <div><h1>error</h1></div>
    );
}*/
return (
    
    <div>
        <form onSubmit={handleSubmit}>
        <div className="relative rounded-b-lg px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="bg-gray-900 rounded-lg p-1">
                <div className="flex flex-wrap -mx-3 mb-2">
    
                    <div className="border rounded-lg shadow w-5/6 overflow-hidden flex bg-white  m-0 w-xl sm:w-64 md:w-1/3 m-auto border border-gray-300 mt-5 ">
            <input
                type="text"
                className="block  w-4/5 text-gray-700 py-2 pl-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Search..."
                onChange={handleChange}
                value={id}
            />
            <div className="flex items-center justify-center w-1/5 pr-2 outline-none text-gray-900">
                <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
                
            </div>
        </div>
        
                </div>
           </div>
        </div>
        </form>
      {error ? (<div><ErrorComponent/></div>) : (
        <div>      
     <div>
        <div class="flex items-center justify-center mx-5" >
      
        {asteroidData &&
          <ShowAsteroid name={asteroidData.name}
                         designation={asteroidData.designation}  
                         nasa_jpl_url={asteroidData.nasa_jpl_url}
                        // min_diameter={asteroidData.estimated_diameter.kilometers.estimated_diameter_max} 
                        // max_diameter={asteroidData.estimated_diameter.kilometers.estimated_diameter_max} 
                        absolute_magnitude={asteroidData.absolute_magnitude_h}
                        //first_observation_date={asteroidData.orbital_data.first_observation_date} 
                        //last_observation_date={asteroidData.orbital_data.last_observation_date}
                        is_potentially_hazardous={asteroidData.is_potentially_hazardous_asteroid}
                        key={asteroidData.id}/>
        }
      </div>
     
      </div>
  

        </div>)}
    </div>

 

 

)};


