/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//import BorrarProducto from "./BorrarProducto/BorrarProducto";
import Swal from "sweetalert2";
//import axios from "axios";

const Producto = ({ producto, handleShow, getProductos }) => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API;
  const handleDelete = () => {
    Swal.fire({
      title: "Estas seguro de eliminar este producto?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "No, me equivoque",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${API}/productos/` + producto._id, {
            method: "DELETE",
          });
          getProductos();
        } catch (error) {
          console.log("ERROR-->", error);
        }
        Swal.fire({
          title: "Exito!",
          text: "se elimino un producto",
          icon: "success",
        });
      }
    });
  };
  return (
    <>
      <tr>
        <td>{producto._id}</td>
        <td>{producto.title}</td>
        <td>{producto.description}</td>
        <td>{producto.category}</td>
        <td className="d-flex justify-content-around">
          <Button
            type="button"
            variant="warning"
            onClick={() => {
              navigate(`/editar/${producto._id}`);
            }}
          >
            Editar
          </Button>
          <Button
            type="button"
            variant="success"
            onClick={() => {
              console.log("modal edicion");
              handleShow(producto);
            }}
          >
            M.Editar
          </Button>
          <Button type="button" variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
          {/* <BorrarProducto id={producto.id} getProductos={getProductos} /> */}
        </td>
      </tr>
    </>
  );
};

export default Producto;
