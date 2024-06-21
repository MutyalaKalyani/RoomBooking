import "./App.css";
import {BrowserRouter, Route} from 'react-router-dom'
import Homescreen from "./screens/Homescreen";
import Navbar from "./components/Navbar";
import Loginscreen from "./screens/Loginscreen";
import Registerscreen from "./screens/Registerscreen";
import Bookingscreen from "./screens/Bookingscreen";
import Profilescreen from "./screens/Profilescreen";
import Landingscreen from "./screens/Landingscreen";
import Adminscreen from "./screens/Adminscreen";
import Success from "./components/Success";
import Cancel from "./components/Cancel";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
      
         <Route path="/" exact component={Landingscreen}/>
         <Route path="/home" exact component={Homescreen}/>
         <Route path="/login" component={Loginscreen}/>
         <Route path="/register" component={Registerscreen}/>
         <Route path="/book/:roomid/:fromdate/:todate" component={Bookingscreen}/>
         <Route path="/profile" component={Profilescreen}/>
         <Route path="/admin" component={Adminscreen}/>
         <Route path="/success/:id/:name/:fromdate/:todate/:amount/:totalDays" component={Success}/>
         <Route path="/cancel" component={Cancel}/>

      </BrowserRouter>
    </div>
  );
}

export default App;
