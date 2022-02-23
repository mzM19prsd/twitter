import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from "./App";
import './index.css';
import Home from './routes/Home';
import Profile from "./routes/Profile";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
      <Route index element={<Home/>}
      />
       <Route path="/profile=:userId" element={<Profile />} />
     </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);