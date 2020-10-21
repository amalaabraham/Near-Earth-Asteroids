import React, { useState, useContext , useEffect  } from "react";
import { firestore } from "../../firebase"; 
import { UserContext } from "../Context/UserProvider";
import * as Notification from "../common/Notifications";

//ASTEROIDS DISPLAYED TO USER
const ShowAsteroid = ({name,
              designation,
              nasa_jpl_url,
              min_diameter,
              max_diameter,
              absolute_magnitude,
              first_observation_date,
              last_observation_date,
              is_potentially_hazardous,
              id}) => { 

    const [fav, setFav] = useState(false);                //state to handle favourites
    const [error, setError] = useState(null);             //state to check errors
    
    const  user  = useContext(UserContext);

    useEffect(() => {
      async function favsExists(id) {                     //function to check if favourites entered by user exist in db or not 
          if (user) {
              let query = firestore.collection('favourites').where('user_id', '==', user);
              query = query.where('asteroid_id', '==', id);
              query.get().then(querySnapshot => {
                if (!querySnapshot.empty) {
                  return true;
                  }
                else {
                  return false;
                  }
                });
              };
        favsExists(id);
          }
    }, [setFav]);                               

                                                            //function to add to favourites
    const addToFavsHandle = (id) => {
        let query = firestore.collection('favourites').where('user_id', '==', user);
        query = query.where('asteroid_id', '==', id);
        console.log(query);
        query.get().then(querySnapshot => {
          console.log(querySnapshot)
          console.log(querySnapshot.docs)
            if (!querySnapshot.empty) {
              console.log('No documents found.');
              removeFromFavsHandle(id);
            }
            else {
              firestore
              .collection("favourites")
                .add ({
                  user_id : user,
                  asteroid_id : id
                })
                .then(function(docRef){
                  Notification.Success({
                    msg:`Asteroid ${name} added to favourites`,
                  });
                })
              setFav(true)
            }
        });
        
    };

                                                    //function to remove from favourites
    const removeFromFavsHandle = (id) => {
        firestore
          .collection("favourites")
          .where("asteroid_id", "==", id)
          .where("user_id", "==", user)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref
                .delete()
                .then(() => {
                  Notification.Error({
                    msg: `Asteroid ${name} Removed from favorites List`,
                  });
                })
                .catch(function (error) {
                  Notification.Error({
                    msg: `Error Removing asteroid from Favourite List ${error}`,
                  });
                });
            });
          });
          setFav(false);
    };


      return (
        <div  class="transition-all duration-150 flex w-full px-4 py-6 md:w-1/2 lg:w-1/3 ">
          <div class="flex flex-col items-stretch min-h-full pb-4 mb-6 transition-all duration-150 bg-blue-900 rounded-lg shadow-lg hover:shadow-2xl">
            <div class="flex flex-wrap items-center flex-1 px-4 py-1 text-center mx-auto ">
              <a href={nasa_jpl_url} class="hover:underline">
                <h2 class="text-2xl font-bold tracking-normal text-white">
                {name}
                </h2>
              </a>
            </div>
            <hr class="border-gray-300" />
              <div className="flex">
                    <p class=" w-1/2 px-4 p-4 text-sm text-justify text-white  ">
                    Designation:
                    </p>
                    <p className=" w-1/2 text-sm text-white font-bold  p-4 ">
                    {designation}
                    </p>
              </div> 
              <div className="flex ">
                    <p className=" w-1/2 px-4 text-sm text-justify text-white pt--10 ">
                    Estimated Diameter: </p>
                        <p className="w=1/2 text-sm text-white font-bold"> Min - {min_diameter} km  Max - {max_diameter}km
                        </p>
              </div>
              <div className="flex ">
                    <p className=" w-1/2 px-4 text-sm text-justify text-white pt--10 ">
                    Absolute magnitude: </p>
                        <p className="w=1/2 text-sm text-white font-bold"> {absolute_magnitude}
                        </p>
              </div>
              <div className="flex ">
                    <p className=" w-1/2 px-4 text-sm text-justify text-white pt--10 ">
                    First observation date: </p>
                        <p className="w=1/2 text-sm text-white font-bold"> {first_observation_date}
                        </p>
              </div>
              <div className="flex ">
                    <p className=" w-1/2 px-4 text-sm text-justify text-white pt--10 ">
                    Last observation date: </p>
                        <p className="w=1/2 text-sm text-white font-bold"> {last_observation_date}
                        </p>
              </div>
            <hr class="border-gray-300" />
            <section class="px-4 py-2 mt-2">
              <div class="flex items-center justify-between">
                <div class="flex items-center flex-1">
                  <div class="flex flex-col mx-2">
                  {is_potentially_hazardous ? (
                          <p className="bg-blue-500 text-sm text-white font-bold p-1 block rounded-lg">Potentially Hazardous Asteroid</p>
                        ) : <p className="bg-blue-500 text-sm text-white font-bold p-1 block rounded-lg">Non-Hazardous Asteroid</p>
                        }
                  </div>  
                </div>
            
                {user && (  
                    <div>  
                    {  fav? (
                          <button  class="focus:outline-none focus:shadow-outline"
                                  onClick={() => addToFavsHandle({id})}>
                                            <a href="#" class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                                <svg class="text-center h-7 w-6" fill="bg-white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                            </a>
                            </button>  ):  
                          <button  class="focus:outline-none focus:shadow-outline"
                                    onClick={() => addToFavsHandle({id})}>
                                          <a href="#" class="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300">
                                              <svg class="text-center h-7 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                                          </a>
                           </button> }              
                    </div>  
                )} 
                  
              </div>
            </section>
          </div>
        </div>
      );
}

export default ShowAsteroid;
