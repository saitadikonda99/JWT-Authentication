import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Pages/Home'
import Login from './Pages/LoginPage'
import Profile from './Pages/Profile'
import Layout from './components/Authentication/Layout'
import RequireAuth from './components/Authentication/RequireAuth'
import User from './Pages/User'
import useLogoutTimer from "./components/Authentication/Session";

function App() {
    useLogoutTimer();
  return (
  
    <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />


                <Route element={<RequireAuth allowedRoles={['admin']}/>}>
                  <Route path="/profile" element={<Profile />} />
                </Route>

          </Route>
          <Route path="/User" element={<User/>}/>
        </Routes>
         
    </div>
  );
}

export default App;
