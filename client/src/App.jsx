import "./App.css";
import Form from "./components/Form";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Home from "./views/home/home";
import Detail from "./views/detail/Detail";
import Favorites from "./views/favorites/Favorites";

function App() {
  return (
    <AuthProvider>

          {/* <h1 className="text-3xl">X-Wallet</h1> */}
          {/* <Form /> */}
        <Routes>
        
          <Route path="/" element={<Form/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/detail/:id" element={<Detail/>}/>
          <Route path="/favorites" element={<Favorites />} />
        
        </Routes>

    </AuthProvider>
  );
}

export default App;
