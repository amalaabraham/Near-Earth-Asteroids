import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";

const apiKey = process.env.REACT_APP_NASA_API_KEY;

export default function AsteroidsFilter() {
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

      Hey
      <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 pt-5">
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
        {/* asteroid.close_approach_data.map((date) => console.log(date.close_approach_date_full)) */}


        {asteroidData &&
          (Object.values(asteroidData).map((dateWiseData) =>
            Object.values(dateWiseData).map((asteroid) => asteroid)).flat().sort((a, b) => a.close_approach_data[0].epoch_date_close_approach - b.close_approach_data[0].epoch_date_close_approach).slice(0, 10).map((asteroid) => {
              console.log(asteroid);
              return (
                <div className="bg-blue-300 p-2 m-2 rounded shadow ">
                  <div className="flex justify-between  ">
                    <p className="text-xl text-blue-700 font-bold">
                      {asteroid.name}
                    </p>
                    {asteroid.is_potentially_hazardous_asteroid ? (
                      <p className="bg-blue-500 text-sm text-white font-bold p-1 block rounded-lg">
                        Potentially Hazardous Asteroid
                      </p>
                    ) : (
                        <p className="bg-blue-500 text-sm text-white font-bold p-1 block rounded-lg">
                          Non-Hazardous Asteroid
                        </p>
                      )}
                  </div>
                  <p className="text-sm text-blue-700 ">
                    Estimated Diameter of Asteroid:
                    <span className="text-md text-blue-700 font-bold">

                      Min -
                      {
                        asteroid.estimated_diameter.kilometers
                          .estimated_diameter_max
                      }
                      km , Max -
                      {
                        asteroid.estimated_diameter.kilometers
                          .estimated_diameter_max
                      }
                      km
                    </span>
                  </p>
                  <p className="text-sm text-blue-700 ">
                    Orbiting Body :
                    <span className="text-md text-blue-700 font-bold">
                      {asteroid.close_approach_data.close_approach_date_full || ""}
                    </span>
                  </p>
                  <p className="text-sm text-blue-700 ">
                    Designation:
                    <span className="text-md text-blue-700 font-bold">
                      {asteroid.designation}
                    </span>
                  </p>
                  {asteroid.close_approach_data.map((date) => {
                    return (<> <p className="text-sm text-blue-700 ">
                      Closesrt Approach date:
                    <span className="text-md text-blue-700 font-bold">
                        {
                          (date.close_approach_date_full || "")
                        }
                      </span>
                    </p></>)
                  })}

                  <p className="text-sm text-blue-700 ">
                    Absolute Magnitude:
                    <span className="text-md text-blue-700 font-bold">
                      {asteroid.absolute_magnitude_h}
                    </span>
                  </p>
                  <p className="text-sm text-blue-700 ">
                    Last Observed on :
                    <span className="text-md text-blue-700 font-bold">
                      {asteroid.orbital_data.last_observation_date}
                    </span>
                  </p>
                </div>
              );
            })
          )}
      </div>
    </div>
  );
}