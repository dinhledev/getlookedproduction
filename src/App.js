import React, {useState, useEffect, useContext,createContext} from "react";
import "./App.css";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Axios from "axios";
import Login from "./components/Login";
import Registration from "./components/Registration";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import Profile from "./components/Profile";
import About from "./components/About";
import Housing from "./components/Housing";
import Favorites from "./components/Favorites";
import EditProfile from "./components/EditProfile";
import MyPlans from "./components/MyPlans";
import HousingPlan from "./components/HousingPlan";
import Athletes from "./components/Athletes";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

 const GlobalConfigContext = createContext();
 export const useGlobalConfigContext = () => useContext(GlobalConfigContext);


function App(){
  const [loggedInUser, setLoginUser] = useState("");
  const [data, setData] = useState("")
  Axios.defaults.withCredentials = true;

  const globalConfig = {
    //"serverDomain": "http://localhost:3001",
    "serverDomain": "https://getlookedmysql.herokuapp.com",
    "serverDomainWithDash": "https://getlookedmysql.herokuapp.com/"
  }

 // https://getlookedmysql.herokuapp.com/

  useEffect(()=> {
    Axios.get(globalConfig["serverDomain"]+"/login").then((response) => {
       if (response.data.loggedIn == true){
          setLoginUser(response.data.user[0].username)
          setData(response.data)
       }
    })
  }, []);
  
  return(
    <GlobalConfigContext.Provider value={globalConfig}>
    <Router>
      <div className="App">
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Registration}/> 
        <Route path="/forgotpassword" component={ForgotPassword}/> 
        <Route path="/about" component={About}/>
        <Route path="/home" component={Home}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/housing" component={Housing}/>
        <Route path="/favorites" component={Favorites}/>
        <Route path="/editProfile" component={EditProfile}/>
        <Route path="/myPlans" component={MyPlans}/>
        <Route path="/housingPlan" component={HousingPlan}/>
        <Route path="/athletes" component={Athletes}/>
      </div>
    </Router>
    </GlobalConfigContext.Provider>
  );
}
 
export default App;







