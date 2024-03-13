import NavBar from "./Components/NavBar";
import Foot from "./Components/Foot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/pages/Home";
import AcercaDeNosotros from "./Components/pages/AcercaDeNosotros";
import Administracion from "./Components/pages/Administracion";
import CrearProducto from "./Components/sections/CrearProducto";
import Editar from "./Components/sections/Editar";
import ErrorPage from "./Components/pages/ErrorPage";
import UserContext from "./Components/UserContext";
import { useEffect, useState } from "react";
function App() {
  const [currentUser, setCurrentUser]=useState(null);
  const saveAuth=(auth)=>{
    sessionStorage.setItem("session", JSON.stringify(auth))
  };

  const getAuth=()=>{
    const session=JSON.parse(sessionStorage.getItem('session'));
    return session;
  };

  const removeAuth=()=>{
    sessionStorage.removeItem("session");
  }
  useEffect(()=>{
    setCurrentUser(getAuth());
    return()=>{
      setCurrentUser(null);
    }
  },[])

  console.log("CurrentUser-->", currentUser);
  return (
    <UserContext.Provider value={{currentUser, setCurrentUser, saveAuth, getAuth, removeAuth}}>
      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <main>
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route path="/acercadenosotros" element={<AcercaDeNosotros />} />
            <Route path="/administracion" element={<Administracion />} />
            <Route path="/crear-producto" element={<CrearProducto />} />
            <Route path="/editar/:id" element={<Editar />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </main>
        <footer className="m0 p0">
          <Foot />
        </footer>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
