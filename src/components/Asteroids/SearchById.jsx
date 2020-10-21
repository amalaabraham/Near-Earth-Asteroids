import React from "react";
import { useState, useEffect } from "react";
import ShowAsteroid from "./ShowAsteroids";
import ErrorComponent from "./ErrorComponent";


export default function SearchById({ id }) {            //FUNCTION TO SEARCH ASTEROID  
    console.log(id.id)
    const [asteroidData, setAsteroidData] = useState([])
    const [error,setError] = useState(false);
    const [queryid,setQueryId] = useState("");
  
    const key = process.env.DEMO_KEY;
   
    useEffect(() => {
        async function fetchAsteroids() {
            const res = await fetch(
              `https://api.nasa.gov/neo/rest/v1/neo/${id.id}?api_key=gaQXYLekzw7ngWH1cbjGSUY5Y0qkCGi1I0w4WSsE`
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
            const result = await res?.json();
            var data = [];
            data.push(result);
            setAsteroidData(data); 
          }
          fetchAsteroids()
    },[id])

     //   console.log(asteroidData);
   // console.log(error)


  /*const handleChange = e => {
    //setSearchId(e.target.value);
   }

   const handleSubmit = (e) => {
       e.preventDefault();
  
       setQueryId(queryid);
   }
  

if(response === "success"){
    return(
        <div><h1>error</h1></div>
    );
}*/

return (

    <div>
        <div className="relative rounded-b-lg px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="bg-gray-900 rounded-lg p-1">
                <div className="flex flex-wrap -mx-3 mb-2"></div>
           </div>
        </div>
   
          {error ? (<div><ErrorComponent/></div>) : (
                <div>
                    <div class="flex flex-row justify-center flex-wrap mx-auto bg-gray-900">
                     {asteroidData.map(asteroid => (
                        <ShowAsteroid name={asteroid.name}
                                        designation={asteroid.designation}  
                                        nasa_jpl_url={asteroid.nasa_jpl_url}
                                        min_diameter={asteroid.estimated_diameter.kilometers.estimated_diameter_max} 
                                        max_diameter={asteroid.estimated_diameter.kilometers.estimated_diameter_max} 
                                    absolute_magnitude={asteroid.absolute_magnitude_h}
                                    first_observation_date={asteroid.orbital_data.first_observation_date} 
                                    last_observation_date={asteroid.orbital_data.last_observation_date}
                                    is_potentially_hazardous={asteroid.is_potentially_hazardous_asteroid}
                                    id={asteroid.id}/>
                      ))}
                    </div>
                </div>)}
    </div>

)};


