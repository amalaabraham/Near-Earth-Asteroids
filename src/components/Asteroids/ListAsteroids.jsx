import React from "react";
import { useState, useEffect ,useRef} from "react";
import ShowAsteroid from "./ShowAsteroids";
import ErrorComponent from "./ErrorComponent";
import { A, navigate } from "hookrouter";
import { Loading } from "../common/loader";


const apiKey = process.env.DEMO_KEY;

//functionS to list or search asteroids

export default function ListAsteroids() {

  const [asteroidData, setAsteroidData] = useState([]);
  const [id, setSearchId] = useState("");
  const [error,setError] = useState(false);
  const [queryid,setQueryId] = useState("");
  const [loading, setloading] = useState(true);


  useEffect(() => {

    async function fetchData() {
      if (queryid == "" || queryid == undefined) {
          const res = await fetch(
            `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=gaQXYLekzw7ngWH1cbjGSUY5Y0qkCGi1I0w4WSsE`
      );

      const data = await res.json();
      console.log(data.near_earth_objects)
      setAsteroidData(data.near_earth_objects);  // data added to asteroidData
      setloading(false);
      }
      else  {
              // search asteroid
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
        const result = await res?.json();
        var data = [];
        data.push(result); 
        console.log(data);
        setAsteroidData(data);             //if found,data added to asteroidData
        setloading(false);
      }
      
    }
    fetchData();
  }, [queryid]);

  
  const handleChange = e => {
    setSearchId(e.target.value);
    console.log(e.target.value)
    if (e.target.value == "") {
      setQueryId("");                     //to handle the id types by user
    }
   }

   const handleSubmit = (e) => {
       e.preventDefault();
       console.log(id);
       setQueryId(id);                    //when search button is clicked
   }


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
                      placeholder="Search by id...(ex: 2021277)"
                      onChange={handleChange}
                      value={id}
                    />
                      <div className="flex items-center justify-center w-1/5 pr-2 outline-none text-gray-900">
                          <button  className="bg-blue-100 flex items-center px-10 py-2 border outline-none rounded text-indigo-200 border-indigo-400 hover:gray-800 hover:blue">
                            <svg
                                className="h-4 w-4"
                                fill="bg-blue-300"
                                placeholder="search by id"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                            </svg>
                          </button>
                      </div>
                  </div>
                </div>
                <div className="flex justify-center my-100 mt-8">
                    <A
                      href="/datesearch"
                      className="bg-blue-900 p-2 inline-block rounded-lg shadow hover:bg-gray-800 text-center  text-white font-bold"
                    >
                      Filter Asteroids by Date
                    </A>
                  </div>
            </div>
        </div>
      </form>
      {error ? (<div><ErrorComponent/></div>) : (
      <div>
          {loading ? (
            <div>
              <Loading />
            </div>) : (
                  <div> 
                      <div class="flex flex-row flex-wrap mx-auto">
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
                                        id={asteroid.id}/>))}
                        </div>
                  </div>
            )}
        </div>
      )}
  </div>
)};
