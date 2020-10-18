import React, {useState} from "react";
import { auth } from "../../firebase"; 
import { navigate, A } from "hookrouter";
import * as Notification from "../common/Notifications";


const  Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error signing in with password and email!");
          console.error("Error signing in with password and email", error);
        });
      };
      
      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;
        
          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

      return (
        <div className="flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div>
                    <h2 className="lg:mt-6 md:mt-6 sm:mt-2 text-center lg:text-3xl text-xl leading-9 font-bold text-gray-800 uppercase">
                        Sign in to continue
                    </h2>
                </div>
                {error !== null && <div className = "py-4 bg-red-600 w-full text-white text-center mb-3">{error}</div>}
                <form
                    className="bg-white shadow rounded px-8 pt-6 pb-8 my-5 lg:my-20">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="userEmail">
                            Email
                        </label>
                        <input
                          
                            aria-label="Email"
                            name="userEmail"
                            type="text"
                            value={email}
                          
                            className="button-smallshadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Email address"
                            onChange = {(event) => onChangeHandler(event)}
                        />
                    </div>
                    <div className="mb-2">
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
                            
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="******************"
                            onChange = {(event) => onChangeHandler(event)}
                        />
                    </div>
                  
                    <div className="flex items-center justify-between">
                        <button
                            //type="submit"
                            className="flex items-center text-white bg-gray-900 font-bold py-2 px-4 sm:px-3 rounded focus:outline-none focus:shadow-outline"
                             onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
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
                            Sign In
                        </button>
                        <div className="flex flex-col ml-1  ">
                            <A
                                className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-800 my-1"
                                href="register">
                                Register Account
                            </A>
                            {/* <A
                                className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-800 my-1"
                                href="/facilitator-register">
                                Register as Hotel Owner
                            </A> */}
                            <A
                                className="inline-block align-baseline font-bold text-sm text-indigo-600 hover:text-indigo-800"
                                href="/forgot-password">
                                Forgot Password?
                            </A>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;