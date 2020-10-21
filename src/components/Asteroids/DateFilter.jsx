import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import ShowAsteroid from "./ShowAsteroids";
import { Loading } from "../common/loader";

const apiKey = process.env.DEMO_KEY;

export default function SearchByDate() {              //function to filter by date
 
  function FormatDate(str) {
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setloading] = useState(true);
  const [asteroidData, setAsteroidData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${FormatDate(
          startDate)}&end_date=${FormatDate(endDate)}&detailed=true&api_key=gaQXYLekzw7ngWH1cbjGSUY5Y0qkCGi1I0w4WSsE`
      );
      const data = await res.json();
      setAsteroidData(data.near_earth_objects);
      setloading(false);
      console.log(data.near_earth_objects)
    }
    fetchData();
  }, [startDate, endDate]);

  return (
    <div>
       <div className="text-center m-2 text-2xl text-gray-400 font-extrabold">
        <h1>Know your closest approaching asteroid</h1>
      </div>
      <div className="max-w-lg mx-auto m-2 flex justify-center mt-8">
          <div className="flex flex-col">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                Start Date
              </label>
              <div className="relative pt-2">
                <DatePicker
                  className="appearance-none  w-half bg-grey-lighter text-gray-500  py-1 px-2"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  clearIcon={null}
                  format="y-MM-dd"
                />
              </div>  
          </div>
            <div className="flex flex-col">
              <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2">
                End Date
              </label>
              <div className="relative pt-2">
                <DatePicker
                  className="appearance-none  w-half bg-grey-lighter text-gray-500  py-1 px-2"
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  clearIcon={null}
                  format="y-MM-dd"
                />
              </div>
            </div>
      </div>
       
        {loading ? (
              <div>
                <Loading />
              </div>) : (
                <div>
                  <div class="flex items-center justify-center mx-5" >
                    <div class="flex flex-row flex-wrap mx-auto">
                      {asteroidData &&
                          (Object.values(asteroidData).map((dateWiseData) =>
                            Object.values(dateWiseData).map((asteroid) => asteroid)).flat().sort((a, b) => a.close_approach_data[0].epoch_date_close_approach - b.close_approach_data[0].epoch_date_close_approach).slice(0, 10).map((asteroid) => {
                              console.log(asteroid);
                              return (
                                  <ShowAsteroid name={asteroid.name}
                                                designation={asteroid.name}  
                                                nasa_jpl_url={asteroid.nasa_jpl_url}
                                                min_diameter={asteroid.estimated_diameter.kilometers.estimated_diameter_max} 
                                                max_diameter={asteroid.estimated_diameter.kilometers.estimated_diameter_max} 
                                                absolute_magnitude={asteroid.absolute_magnitude_h}
                                                first_observation_date={asteroid.orbital_data.first_observation_date} 
                                                last_observation_date={asteroid.orbital_data.last_observation_date}
                                                is_potentially_hazardous={asteroid.is_potentially_hazardous_asteroid}
                                                id={asteroid.id}/>
                              )

                            })
                          )}
                    </div>
                  </div>
                </div>
              )}
  </div>
  );
}