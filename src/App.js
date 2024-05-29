import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route,useNavigate,Link,useLocation} from "react-router-dom";
import GrowerProfile from './components/GrowerProfile';
import AvailGrowerProducts from './components/AvailGrowerProducts';
import ItemsManager from './components/ItemsManager';
import Login from './components/Login';
import Register from "./components/Register"
import FrontPage from './components/FrontPage';
import {useState,useEffect} from "react";
import GrowerDashboard from "./components/GrowerDashboard";
import ConsumerDashboard from "./components/ConsumerDashboard";
import FindGrower from './components/FindGrower';
import ConsumerProfile from './components/ConsumerProfile';
import lg from "../src/images/logo.png";





function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      navigate('/');
    }
  };
 
  return (

    <>
      <nav className= "p-3 navbar  flex justify-between bg-green-800 h-16 items-center" >
      <div className="flex items-center">
        <img src={lg} alt="Logo" className="h-12 mr-2 rounded-full" />
        <span className="text-white "style={{fontSize:'23px',fontWeight:'400'}}>Farm2Table</span>
      </div>
      <div>
          {location.pathname === '/'  ? (
            <button className="py-1 px-5 mx-4 rounded" style={{ backgroundColor: 'white', color: '#0A6847', fontSize: '20px', fontWeight: '700' }}>
              <Link to="/login">
                <span>Login</span>
              </Link>
            </button>
          ):(
            <button className="py-1 px-5 mx-4 rounded" style={{ backgroundColor: 'white', color: '#0A6847', fontSize: '20px', fontWeight: '700' }} onClick={handleLogout}>
              <span >Logout</span>
            </button>
          )}
        </div>
     
      </nav>

       

      <div className="container">
        <Routes>
             <Route path="/" element={<FrontPage></FrontPage>}></Route>
             <Route path="/login" element={<Login></Login> }></Route>
             <Route  path='/Login' element={<Login></Login>}></Route> 
             <Route  path='/Register' element={<Register></Register>}></Route> 
             <Route path="/grower-dash" element={<GrowerDashboard></GrowerDashboard>}></Route>
             <Route  path="/consumer-dash" element={<ConsumerDashboard></ConsumerDashboard>}></Route>
             <Route path="/grower-profile"  element={<GrowerProfile></GrowerProfile>}></Route>
             <Route path="/avail-products" element={<AvailGrowerProducts></AvailGrowerProducts>}></Route>
             <Route path="/items-manager" element={<ItemsManager></ItemsManager>}></Route>
             <Route path="/find-growers" element={<FindGrower></FindGrower>}></Route>
             <Route path="/consumer-profile" element={<ConsumerProfile></ConsumerProfile>}></Route>
        </Routes>
      
        </div>
       </>
  );
}

export default App;
