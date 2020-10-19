import React, { useContext, useState } from "react";
import { navigate, A } from "hookrouter";
import { auth, signInWithGoogle, generateUserDocument } from "../../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      const id = generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }
      
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="lg:min-h-full flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
            <div>
                <h2 className="lg:mt-4 mt-3 text-center text-xl lg:text-3xl leading-9 font-bold text-gray-800 uppercase">
                   
                </h2>
            </div>
            <form
                
                className="shadow rounded px-8 pt-6 pb-8 mt-10 my-20 bg-white">
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="displayName">
                        Name
                    </label>
                    <input
                     
                        aria-label="Name"
                        name="displayName"
                        type="name"
                        value={displayName}
                        
                        id="displayName"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Your name"
                        onChange={event => onChangeHandler(event)}
                    />
                    <div className="text-xs italic text-red-500">
                     
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="userEmail">
                        Email
                    </label>
                    <input
                        aria-label="Email"
                        name="userEmail"
                        type="email"
                        value={email}
                        id="userEmail"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email address"
                        onChange={event => onChangeHandler(event)}
                    />
                    <div className="text-xs italic text-red-500">
                      
                    </div>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                    <div className="mb-4 md:mr-2 md:mb-0">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="userPassword">
                            Password
                        </label>
                        <input
                            aria-label="Password"
                            name="userPassword"
                            type="password"
                            value={password}
                            id="userPassword"
                            className="appearance-none border  rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="******************"
                            onChange={event => onChangeHandler(event)}
                        />
                        <div className="text-xs italic text-red-500">
                           
                        </div>
                    </div>
            
                </div>
                <div className="h-10">
                    <p className="text-red-500 text-xs italic bold text-center mt-2">
                       
                    </p>
                </div>
                <div className="flex items-center justify-between sm:flex-row ">
                    <button
                        type="submit"
                        className="flex  mr-2 items-center bg-gray-900 text-white font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline"
                        onClick={event => {
                          createUserWithEmailAndPasswordHandler(event, email, password);
                        }}
                        >
                        
                        <svg
                            className="h-5 w-5 transition ease-in-out duration-150 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Register
                    </button>
                    <div className="flex-row  ml-2 ">
                        {/* <A
                            className="inline-block align-baseline text-center  font-bold text-sm text-indigo-600 hover:text-indigo-800"
                            href={"/" + links[user.otherlinkid]}>
                            Register as {user.othertype}
                        </A> */}
                        <A
                            className="inline-block align-baseline font-bold text-center text-sm text-indigo-600 hover:text-indigo-800"
                            href="/login">
                            Already have an account?
                        </A>
                    </div>
                </div>
            </form>
        </div>
    </div>
);

};

export default SignUp;