import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./componemts/Header";
import Login from "./componemts/Login";
import {authService} from './fbase'

function App() {
  const [isLogined, setisLogined] = useState(false)
  const [User, setUser] = useState([])
  let navigate = useNavigate();

  useEffect(()=>{
  authService.onAuthStateChanged((user)=>{
    if(user){
      setisLogined(true)
      setUser(user)
    } else{
      setisLogined(false);
      navigate('/')
    }
  })

  },[])
  
  return (
    <div className="App">
{/* <button onClick={()=>{setisLogined(!isLogined)}}>asd</button> */}
      {isLogined && <Header />}
     
      {isLogined ?
       <main><Outlet context={[User, setUser]} /></main> :
       <Login />
       }
     
      <footer></footer>
    </div>
  );
}

export default App;
