import NavBar from "./Components/NavBar";
import Foot from "./Components/Foot";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/pages/Home";
import AcercaDeNosotros from "./Components/pages/AcercaDeNosotros";
import Administracion from "./Components/pages/Administracion";
import CrearProducto from "./Components/sections/CrearProducto";
import Editar from "./Components/sections/Editar";
import ErrorPage from "./Components/pages/ErrorPage";
import UserContext from "./Context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const SaveAuth=(auth)=>{
    sessionStorage.setItem("auth", JSON.stringify(auth));
  };
  const GetAuth=()=>{
    return JSON.parse(sessionStorage.getItem("auth"));
  };
  const RemoveAuth=()=>{
    sessionStorage.removeItem("auth");
  }

  useEffect(()=>{
    const session=GetAuth();
    if (session) {
      setCurrentUser(session)
    }

    return ()=>{
      setCurrentUser(undefined)
    }

  },[])

  useEffect(()=>{
    if (currentUser!==undefined) {
      axios.defaults.headers.common["Authorization"]=`Bearer ${currentUser.token}`;
    }else{
      delete axios.defaults.headers.common["Authorization"];
    }
  },[currentUser]);


  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser, SaveAuth, GetAuth, RemoveAuth }}>
        <BrowserRouter>
          <header>
            <NavBar />
          </header>
          <main>
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="/acercadenosotros" element={<AcercaDeNosotros />} />

              {currentUser !== undefined && currentUser.role === "Admin" && (
                <Route path="/administracion" element={<Administracion />} />
              )}

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
    </>
  );
}

export default App;
