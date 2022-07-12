import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from '../../api/axios';

const Reg = () => {
  const userNameRef = useRef("");
  const emailRef = useRef("");
  const passwdRef = useRef("");
  const passwdConfirmRef = useRef("");

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [passwdConfirm, setPasswdConfirm] = useState("");

  const [emailExists, setEmailExists] = useState(false);
  const [passwdNotMatch, setPasswdNotMatch] = useState(false);
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwd !== passwdConfirm) {
      setPasswdNotMatch(true);
      return;
    }

    axios.post("/api/auth/register", { username: userName, email: email, password: passwd }, { withCredentials: true } )
    .then(response => { 
      console.log("response", response); 
      console.log(response.data)
      history("/login");
    })
    .catch(err => {
      console.log("err:", err);
      setEmailExists(true);
    });
  }


  useEffect(() => {
    userNameRef.current.focus();
  }, []);

  useEffect(() => {
    
    if (passwd !== passwdConfirm) {
      console.log("passwd !== passwdConfirm ")
      setPasswdNotMatch(true);
    } else {
      setPasswdNotMatch(false);
    }
  }, [passwd, passwdConfirm]);

  return (
    <>
      <div className="container px-6 py-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">

          < div className="md:w-8/12 lg:w-5/12 lg:ml-20">

            <div className="text-2xl mb-6"> Registration </div>
            <form 
              onSubmit={ handleSubmit }
            >
              { emailExists ? <div className="bg-red-500 my-2 text-white text-xl" >Email already exists</div> : "" }
              { passwdNotMatch ? <div className="bg-red-500 my-2 text-white text-xl" >Passwords do not match!</div> : "" }

              <div className="mt-3 mb-3 text-xl text-start">
                <label htmlFor="userName" >User name</label>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  required
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="User name"
                  id="userName"
                  name="userName"
                  ref={ userNameRef }
                  onChange={ (event) => { setUserName(event.target.value) } }
                />
              </div>

              <div className="mt-3 mb-3 text-xl text-start">
                <label htmlFor="email" >Email</label>
              </div>

              <div className="mb-6">
                <input
                  type="email"
                  required
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  id="email"
                  name="email"
                  ref={ emailRef }
                  onChange={ (event) => { setEmail(event.target.value) } }
                />
              </div>

              <div className="mt-3 mb-3 text-xl text-start">
                <label htmlFor="password" >Password</label>
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  required
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  id="password"
                  name="password"
                  ref={ passwdRef }
                  onChange={ (event) => { setPasswd(event.target.value) } }
                />
              </div>

              <div className="mt-3 mb-3 text-xl text-start">
                <label htmlFor="passwordConfirmation" >Password confirmation</label>
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  required
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Confirm password"
                  id="passwordConfirmation"
                  name="passwordConfirm"
                  ref={ passwdConfirmRef }
                  onChange={ (event) => { setPasswdConfirm(event.target.value) } }
                />
              </div>

              <button
                type="submit"
                className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              >
                Register
              </button>

            </form>
            
            <Link to="/" > 
              <div className="inline-block px-7 py-3 mt-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full" >back to main page </div>
            </Link>

            <Link to="/login" > 
              <div className="inline-block px-7 py-3 mt-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full" >log in </div>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
}

export default Reg;
