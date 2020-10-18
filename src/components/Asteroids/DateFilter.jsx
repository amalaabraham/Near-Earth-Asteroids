import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import ShowAsteroid from "./ShowAsteroids";

const apiKey = process.env.REACT_APP_NASA_API_KEY;

export default function SearchByDate() {
  function FormatDate(str) {
    var date = new Date(str),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), month, day].join("-");
  }

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [asteroidData, setAsteroidData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${FormatDate(
          startDate
        )}&end_date=${FormatDate(endDate)}&detailed=true&api_key=gaQXYLekzw7ngWH1cbjGSUY5Y0qkCGi1I0w4WSsE`
      );
      const data = await res.json();
      setAsteroidData(data.near_earth_objects);
    }
    fetchData();
  }, [startDate, endDate]);

  return (
    <div>
      <div className="w-full mx-auto md:w-1/4 px-3 mb-6 md:mb-0 pt-5">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Start Date
        </label>
        <div className="relative pt-2">
          <DatePicker
            className="appearance-none  w-half bg-grey-lighter text-grey-darker  py-1 px-2"
            value={startDate}
            onChange={(date) => setStartDate(date)}
            clearIcon={null}
            format="y-MM-dd"
          />
        </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          End Date
        </label>
        <div className="relative pt-2">
          <DatePicker
            className="appearance-none  w-half bg-grey-lighter text-grey-darker  py-1 px-2"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            clearIcon={null}
            format="y-MM-dd"
          />
        </div>
        </div>
        {/* asteroid.close_approach_data.map((date) => console.log(date.close_approach_date_full)) */}
        <div>
                <div class="flex items-center justify-center mx-5" >
                <div class="flex flex-row flex-wrap mx-auto">

        {asteroidData &&
          (Object.values(asteroidData).map((dateWiseData) =>
            Object.values(dateWiseData).map((asteroid) => asteroid)).flat().sort((a, b) => a.close_approach_data[0].epoch_date_close_approach - b.close_approach_data[0].epoch_date_close_approach).slice(0, 10).map((asteroid) => {
              console.log(asteroid);
              return (
                
               
                  <ShowAsteroid name={asteroid.name}
                                 designation={asteroid.designation}  
                                 nasa_jpl_url={asteroid.nasa_jpl_url}
                                 min_diameter={asteroid.estimated_diameter.kilometers.estimated_diameter_max} 
                                 max_diameter={asteroid.estimated_diameter.kilometers.estimated_diameter_max} 
                                absolute_magnitude={asteroid.absolute_magnitude_h}
                                first_observation_date={asteroid.orbital_data.first_observation_date} 
                                last_observation_date={asteroid.orbital_data.last_observation_date}
                                is_potentially_hazardous={asteroid.is_potentially_hazardous_asteroid}
                                key={asteroid.id}/>
              
            
              )

            })
          )}
            </div>
              </div>
              </div>
     
    </div>
  );
}