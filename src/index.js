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
import Search from "./routes/Search";
import TweetPage from "./routes/TweetPage";


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
      <Route index element={<Home/>}
      />
       <Route path="/profile" element={<Profile />} />
       <Route path="/tweet=:tweetID" element={<TweetPage />} />
       <Route path="/search" element={<Search />} >
       </Route>
     </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);