import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import CarProducto from "../sections/CarProducto";

const Home = () => {
  

  const [productos, setProductos] = useState([]);

  const API = import.meta.env.VITE_API;

  const getProductos = async () => {
    try {
      const response=await axios.get(`${API}/products`);
      //console.log("RESPONSE-AXIOS-->", response);
      /*const products=response.data;
      setProductos(productos);*/
      setProductos(response.data);
    } catch (error) {
      console.log("ERROR-->", error);
    }
  };
  
  useEffect(() => {
    getProductos();

    return () => {
      setProductos([]);
    };
  }, []);
  
  return (
    <>
      <div className="text-center">
        <h2>Catalogo de Productos</h2>
      </div>

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
