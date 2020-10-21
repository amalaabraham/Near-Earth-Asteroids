import React, { useState, useEffect, useContext } from "react";
import fire from "../../firebase";
import { UserContext } from "../Context/UserProvider";
import ErrorComponent from "../Asteroids/ErrorComponent";
import { firestore } from "../../firebase"; 
import SearchById from "../Asteroids/SearchById"

export default function Profile() {                         //profile
  const [asteroidIds, setAsteroidIds] = useState([]);
  const  user  = useContext(UserContext);
  const [asteroidData, setAsteroidData] = useState([]);
  // const [loading, setloading] = useState(false);

  // setloading(true);
  useEffect(() => {
    firestore
      .collection("favourites")
      .where("user_id", "==", user)                            //getting ids of user
      .get()
      .then((querySnapshot) => {
        setAsteroidIds(querySnapshot.docs.map((doc) => doc.data().asteroid_id));
        // setloading(false);
      });
    
    var favs = [];
    async function fetchAsteroids(asteroid_id) {
        console.log("fun")
            const res = await fetch(                                      //fetching data
              `https://api.nasa.gov/neo/rest/v1/neo/${asteroid_id}?api_key=gaQXYLekzw7ngWH1cbjGSUY5Y0qkCGi1I0w4WSsE`
            ).then((response) => {
                if(response.status === 200) {
                    console.log("success")
                    
                    return response;
                }
                else  if(response.status === 404){
                    console.log("something went wrong")
                    
                }
            });
            const data = await res?.json();
            console.log(data);
            favs.push(data) 
          }
    asteroidIds.map((asteroid_id) => {
        console.log("map")
          fetchAsteroids(asteroid_id)
    })
    setAsteroidData(favs); 
    
  
  }, [user]);
  console.log(asteroidIds);


  /*{asteroidIds.map((asteroid_id) => {
    return <SearchAsteroid key={asteroid_id} id={asteroid_id} />;
  })}*/



  return (
    <div className="mx-auto  h-screen">
        {asteroidIds.length === 0 ? (
          <ErrorComponent />
        ) : (
          <div>
              <div className="text-gray-400 text-3xl text-center m-2 font-bold">
                Favourite Asteroids
              </div>
              {asteroidIds.map((queryid) => {
                      return <SearchById key={queryid} id={queryid} />;
                    })}
                <div class="flex items-center justify-center mx-5" >
                  <div class="flex flex-row flex-wrap mx-auto">
                  </div>
                </div>

          </div>
        )}
      </div>
  );
}
