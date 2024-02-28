/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Button } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';

const Producto = ({ producto, handleShow }) => {
  const navigate=useNavigate();
  return (
    <>
      <tr>
        <td>{producto.id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-around">
          <Button type="button" variant="warning" onClick={()=>{
            navigate(`/editar/${producto.id}`)
          }}>Editar</Button>
          <Button type="button" variant="success" onClick={()=>{
            console.log("modal edicion");
            handleShow(producto);
          }}>M.Editar</Button>
          <Button type="button" variant="danger" onClick={()=>{
            console.log("Desde boton eliminar");
          }}>Eliminar</Button>
        </td>
      </tr>
    </>
  );
};

export default Producto;
