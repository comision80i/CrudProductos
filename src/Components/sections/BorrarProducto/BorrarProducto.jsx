import { Button } from "react-bootstrap";
import "./borrarProducto.css";
import axios from "axios";
import Swal from "sweetalert2";

const BorrarProducto = ({ id, getProductos }) => {
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
          await axios.delete(`${API}/productos/` + id);
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
    <Button type="button" variant="danger" onClick={handleDelete}>
      Eliminar
    </Button>
  );
};

export default BorrarProducto;
