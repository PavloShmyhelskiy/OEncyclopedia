import './App.css';
import Login from './components/login/Login';
import Head from './components/head/Head';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from 'react';
import Reg from './components/reg/Reg';


export const context = createContext("");

function App() {
  const [email, setEmail] = useState("");

  return (
    <BrowserRouter>
      <context.Provider value={""}>

        <div className="App">
          <Routes>
            <Route path="/" element={ <Head email={ email }/> } />
            <Route path="/login" element={ <Login setEmail_={ setEmail } /> } />
            <Route path="/register" element={ <Reg />} />
          </Routes>
        </div>

      </context.Provider>
    </BrowserRouter>
  );
}

export default App;
