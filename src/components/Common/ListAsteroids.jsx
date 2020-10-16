import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-date-picker";


/*export default function ListAsteroids () {
    const [asteroidData, setAsteroidData] = useState([])
    //fetch asteroids
    const apikey = process.env.DEMO_KEY;
    const fetchAsteroids = () => {
        fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=20&api_key=${apikey}`)
        .then(result => result.json())
        .then(data => setAsteroidData(data.near_earth_objects))
        .catch(error => console.log(error));
    };
    console.log(asteroidData)
    useEffect(() => {
        fetchAsteroids()
    })
    return(
        <div>
            <h2>Near Earth Asteroids</h2>
            {asteroidData.map((asteroid,i) => (<p key={i}>{asteroid.name}</p>))}
        </div>
        )
};*/

//const apiKey = process.env.DEMO_KEY;
export default function ListAsteroids() {
  const [asteroidData, setAsteroidData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `https://api.nasa.gov/neo/rest/v1/neo/browse?page=0&size=10&api_key=gaQXYLekzw7ngWH1cbjGSUY5Y0qkCGi1I0w4WSsE`
      );
      const data = await res.json();
      setAsteroidData(data.near_earth_objects);
    }
    fetchData();
  }, []);

  return (

    <body  >



    <div className="relative rounded-b-lg px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="bg-gray-900 rounded-lg p-1">
                    <div className="flex flex-wrap -mx-3 mb-2">
                        
                        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0 pt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Start Date
                            </label>
                            <div className="relative pt-2">
                                <DatePicker
                                    className="appearance-none  w-half bg-grey-lighter text-grey-darker  py-1 px-2"
                                    //value={new Date(form.checkin)}
                                    //onChange={(newdate) =>
                                      //  handleChange({
                                       //     target: {
                                       //         name: "checkin",
                                       //         value: newdate,
                                       //     },
                                       // })
                                   // }
                                    //minDate={new Date()}
                                   // maxDate={
                                     //   new Date(
                                     //       +new Date() +
                                     //           2 * 360 * 60 * 60 * 24 * 1000
                                    //    )
                                 //   }
                                    clearIcon={null}
                                    format="y-MM-dd"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0 pt-5">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                End Date
                            </label>
                            <div className="relative pt-2">
                                <DatePicker
                                    className="appearance-none  w-half bg-grey-lighter text-grey-darker  py-1 px-2"
                                   // value={new Date(form.checkout)}
                                    // onChange={(newdate) =>
                                    //     handleChange({
                                    //         target: {
                                    //             name: "checkout",
                                    //             value: newdate,
                                    //         },
                                    //     })
                                    // }
                                   /* minDate={
                                        new Date(
                                            +new Date(form.checkin) +
                                                (minmumDays - 1) *
                                                    60 *
                                                    60 *
                                                    24 *
                                                    1000
                                        )
                                    }
                                    maxDate={
                                        new Date(
                                            +new Date() +
                                                2 * 360 * 60 * 60 * 24 * 1000
                                        )
                                    }*/
                                    clearIcon={null}
                                    format="y-MM-dd"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/4  px-3 mb-6 md:mb-0 pt-5">
                            <div className="relative pt-12 flex justify-around">
                                <button
                                   // onClick={() => {
                                  //      fetchUpdatedHotels(form);
                                  //  }}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:outline-none"
                                    type="button">
                                    Apply
                                </button>
                            </div>
                        </div>
                        <div className="border rounded-lg shadow w-5/6 overflow-hidden flex bg-white  m-0 w-xl sm:w-64 md:w-1/3 m-auto border border-gray-300 mt-5 ">
                <input
                    type="text"
                    className="block  w-4/5 text-gray-700 py-2 pl-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    placeholder="Search..."
                   // onChange={handleSearch}
                   // value={search}
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
            
<div class="flex items-center justify-center mx-5" >
 <div class="flex flex-row flex-wrap mx-auto">
          {asteroidData.map((asteroid) => {
            console.log(asteroidData)
            return (
  <div class="transition-all duration-150 flex w-full px-4 py-6 md:w-1/2 lg:w-1/3 ">
    <div class="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-blue-900 rounded-lg shadow-lg hover:shadow-2xl">
      
      <div class="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto ">
        <a href={asteroid.nasa_jpl_url} class="hover:underline">
          <h2 class="text-2xl font-bold tracking-normal text-white">
          {asteroid.name}
          </h2>
        </a>
      </div>
      <hr class="border-gray-300" />
      <div className="flex">
            <p class=" w-1/2 px-4 p-4 text-sm text-justify text-white  ">
            Designation:
            </p>
            <p className=" w-1/2 text-sm text-white font-bold  p-4 ">
            {asteroid.designation}
            </p>
      </div> 
      <div className="flex ">
            <p className=" w-1/2 px-4 text-sm text-justify text-white pt--10 ">
            Estimated Diameter: </p>
                <p className="w=1/2 text-sm text-white font-bold"> Min - {asteroid.estimated_diameter.kilometers.estimated_diameter_max} km  Max - {asteroid.estimated_diameter.kilometers.estimated_diameter_max}km
                </p>
      </div>
      <div className="flex ">
            <p className=" w-1/2 px-4 text-sm text-justify text-white pt--10 ">
            Absolute magnitude: </p>
                <p className="w=1/2 text-sm text-white font-bold"> {asteroid.absolute_magnitude_h}
                </p>
      </div>
      <div className="flex ">
            <p className=" w-1/2 px-4 text-sm text-justify text-white pt--10 ">
            First observation date: </p>
                <p className="w=1/2 text-sm text-white font-bold"> {asteroid.orbital_data.first_observation_date}
                </p>
      </div>
      <div className="flex ">
            <p className=" w-1/2 px-4 text-sm text-justify text-white pt--10 ">
            Last observation date: </p>
                <p className="w=1/2 text-sm text-white font-bold"> {asteroid.orbital_data.last_observation_date}
                </p>
      </div>
      <hr class="border-gray-300" />
      <section class="px-4 py-2 mt-2">
        <div class="flex items-center justify-between">
          <div class="flex items-center flex-1">
            <div class="flex flex-col mx-2">
            {asteroid.is_potentially_hazardous_asteroid ? (
                    <p className="bg-blue-500 text-sm text-white font-bold p-1 block rounded-lg">Potentially Hazardous Asteroid</p>
                  ) : <p className="bg-blue-500 text-sm text-white font-bold p-1 block rounded-lg">Non-Hazardous Asteroid</p>
                  }
            </div>
            
          </div>
          <form method="GET">
          
          <button type="submit" class="focus:outline-none focus:shadow-outline">
                                <a href="#" class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                    <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                </a>
          </button>
                              
          </form>       
        </div>
      </section>
    </div>
  </div>
    );
})}
</div>
</div>
</body>

  );
    


}

