import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./componemts/Header";
import Login from "./componemts/Login";
import {authService} from './fbase'

function App() {
  const [isLogined, setisLogined] = useState(false)
  let navigate = useNavigate();
  useEffect(()=>{
  authService.onAuthStateChanged((user)=>{
    if(user){
      setisLogined(true)
    } else{
      setisLogined(false);
      navigate('/')
    }
  })
  },[])
  console.log(authService.currentUser)
  return (
    <div className="App">
{/* <button onClick={()=>{setisLogined(!isLogined)}}>asd</button> */}
      {isLogined && <Header />}
     
      {isLogined ? 
      <main><Outlet /></main> : <Login />
       }
      {/* <Outlet context={[count, setCount]} /> */}
      <footer></footer>
    </div>
  );
}

export default App;
