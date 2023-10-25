import "./App.css";
import Form from "./components/Form";
import { AuthProvider } from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Home from "./views/home/home";
import Detail from "./views/detail/Detail";
import Favorites from "./views/favorites/Favorites";
import { useAuth } from "./context/AuthContext";
// import { Navigate } from "react-router-dom";


function App() {
  const { user } = useAuth();
  return (
   
    <AuthProvider>
    <Routes>
        <Route path="/" element={<Form />} />
        {user ? ( 
          <>
            <Route path="/home" element={<Home/>} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/favorites" element={<Favorites />} />
          </>
        ) : (
          <Route to="/home" />
        )}
      </Routes>

</AuthProvider> 

  );
}

export default App;




