import { useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import CarProducto from "../sections/CarProducto";
//import { useAuth } from "../UserContext";
import UserContext from "../UserContext";

const Home = () => {
  const [productos, setProductos] = useState([]);
  // eslint-disable-next-line no-unused-vars
  //const {setAuth, setCurrentUser}=useAuth();
  const API = import.meta.env.VITE_API;

const{saveAuth, setCurrentUser, currentUser}=useContext(UserContext);
  const getProductos = async () => {
    try {
      const response=await axios.get(`${API}/productos`);
      console.log("RESPONSE-AXIOS-->", response);
      /*const products=response.data;
      setProductos(productos);*/
      setProductos(response.data);
    } catch (error) {
      console.log("ERROR-->", error);
    }
  };
  
  useEffect(() => {
    getProductos();
   saveAuth({
    email: "valentin@gmail.com",
    role: "User",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYwZGQyYzQzODM3MGJkNzRiYmI5YTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTcxMDI4OTAzMSwiZXhwIjoxNzEwMzc1NDMxfQ.T_zVoRsu_l8Rifu2sBl30MDXdm5pW_OWBfzT669Wxcc"
  });
  setCurrentUser({
    email: "valentin@gmail.com",
    role: "User",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWYwZGQyYzQzODM3MGJkNzRiYmI5YTQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTcxMDI4OTAzMSwiZXhwIjoxNzEwMzc1NDMxfQ.T_zVoRsu_l8Rifu2sBl30MDXdm5pW_OWBfzT669Wxcc"
  })
    
    return () => {
      setProductos([]);
    };
  }, []);

  return (
    <>
      <div className="text-center">
        <h2>Catalogo de Productos</h2>
      </div>
    {currentUser!==null?<>{currentUser.role==="Admin"?<h1>Admin</h1>:<h1>{currentUser.role}</h1>}</>:<><h1>NO HAY NADA</h1></>}
      <div className="my-5">
        <Container>
          <Row>
            {productos.map((element, index)=>{
              return(
                <CarProducto producto={element} key={index}/>
              )
            })}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Home;
