import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import authContext from '../../context/AuthProvider';
import axios from '../../api/axios';

const Login = ({ setEmail_ }) => {
  const { setAuth } = useContext(authContext);
  const emailRef = useRef("");
  const passwdRef = useRef("");
  const [email, setEmail] = useState("");
  const [passwd, setPasswd] = useState("");
  const [wrongEmailOrPass, setWrongEmailOrPass] = useState(false);
  const [serverError, setServerError] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    emailRef.current.focus();
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("email: ", email);
    console.log("pass: ", passwd);
    
    axios.post("/api/auth/login", { email: email, password: passwd }, { withCredentials: true } )
    .then(response => { 
      console.log("response", response);      
      setEmail_(email)
      
      console.log(response.data)
      setAuth({ 
        username: response.data.username,
        email: response.data.email,
        isAdmin: response.data.isAdmin,
        accessToken: response.data.accessToken
      })
      history("/");
    })
    .catch(err => {
      console.log("err:", err);
      if (err.response?.status === 401) {
        setWrongEmailOrPass(true);
      } else if (err.response?.status === 500) {
        setServerError(true);
      }
    });
    setPasswd('');
  }

  return (
    <>
      <div className="container px-6 py-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">

          < div className="md:w-8/12 lg:w-5/12 lg:ml-20">
  
            <div className="text-2xl mb-6"> Log in </div>
            
            <form 
              onSubmit={ handleSubmit }
            >
              { wrongEmailOrPass ? <div className="bg-red-500 my-2 text-white text-xl" >Wrong email or password!</div> : "" }
              { serverError ? <div className="bg-red-500 my-2 text-white text-xl" >Server Error</div> : "" }

              <div className="mt-3 mb-3 text-xl text-start">
                <label htmlFor="email" >Email</label>
              </div>

              <div className="mb-6">
                <input
                  type="email"
                  required
                  ref={ emailRef }
                  autoComplete={false}
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  id="email"
                  name="email"
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
                  ref={ passwdRef }
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={ passwd }
                  onChange={ (event) => { setPasswd(event.target.value) } }
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="checkBox"
                    defaultChecked
                  />
                  <label className="form-check-label inline-block text-gray-800" htmlFor="checkBox"
                    >Remember me</label>
                </div>
              
              </div>

              <button
                type="submit"
                className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                // onClick={ () => handleSubmit() }
              >
                Log in
              </button>

            </form>
            
            <Link to="/" > 
              <div className="inline-block px-7 py-3 mt-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full" >back to main page </div>
            </Link>

            <Link to="/register" > 
              <div className="inline-block px-7 py-3 mt-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full" > register </div>
            </Link>

          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
