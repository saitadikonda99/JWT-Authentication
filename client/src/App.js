import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Pages/Home/Home'
import Login from './Pages/Auth/Login'
import Layout from './components/Authentication/Layout'
import RequireAuth from './components/Authentication/RequireAuth'
import Admin from './Pages/Admin/Admin'
import UnAuth from "./Pages/UnAuth/UnAuth";
import PersistLogin from "./components/Authentication/PersistLogin";

function App() {
  return (
  
    <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
              <Route path="/unAuth" element={ <UnAuth/> } />

             {/* require Student authentication */}
            <Route element={<PersistLogin/>}>
              <Route element={<RequireAuth allowedRoles={['Student']}/>}>
                <Route path="/admin" element={<Admin />} />
              </Route>
            </Route>

          </Route>
        </Routes>
         
    </div>
  );
}

export default App;
