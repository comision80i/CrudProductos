/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import axios from "axios";
//import { useNavigate } from "react-router-dom";

const ModalEditar = ({ show, handleClose, producto, getProductos }) => {
  //const navigate = useNavigate();
  //UTILIZAMOS LA VARIABLE DE ENTORNO
  const API = import.meta.env.VITE_API;

  useEffect(() => {
    if (producto) {
        formik.setFieldValue('title', producto.title, true);
        formik.setFieldValue('description', producto.description, true);
        formik.setFieldValue('category', producto.category, true);
    }
  }, [producto]);

  const ProductoSchema = Yup.object().shape({
    title: Yup.string()
      .min(4, "min 4 caract.")
      .max(20, "max 20 caract.")
      .required("El titulo es requerido"),
    description: Yup.string()
      .min(4, "min.4 caract.")
      .max(200, "max. 200 caract.")
      .required("la descripción es requerida"),
    category: Yup.string().required("la categoría es requerida"),
  });

  const initialValues = {
    title: "",
    description: "",
    category: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ProductoSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      console.log("Values de Formik-->", values);
      Swal.fire({
        title: "Estas seguro de editar este producto?",

        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Guardar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const productUpdate={
              _id:producto._id,
              title: values.title,
              category:values.category,
              description:values.description
            };
          //const response=await axios.put(`${API}/productos/${producto.id}`, values);
          const response=await axios.put(`${API}/products/update`, productUpdate);

            if (response.status === 200) {
              //formik.resetForm();
              Swal.fire({
                title: "Exito!",
                text: "se actualizo el producto correctamente",
                icon: "success",
              });
              //navigate("/administracion");
              CloseModal();
            }
          } catch (error) {
            console.log("ERROR-->", error);
          }
        }
      });
    },
  });

  const CloseModal=()=>{
    getProductos();
    formik.resetForm();   
    handleClose();
  };
  return (
    <Modal show={show} onHide={CloseModal} backdrop='static' data-bs-theme='dark' className="text-light">
      <Modal.Header closeButton>
        <Modal.Title>Modal Edicion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el titulo del producto"
              minLength={4}
              //maxLength={20}
              //value={title}
              /*onChange={(e)=>{
              setTitle(e.currentTarget.value);
            }}*/
              name="title"
              {...formik.getFieldProps("title")}
              className={clsx(
                "form-control",
                {
                  "is-invalid": formik.touched.title && formik.errors.title,
                },
                {
                  "is-valid": formik.touched.title && !formik.errors.title,
                }
              )}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{formik.errors.title}</span>
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese una descripción"
              as="textarea"
              rows={3}
              minLength={4}
              maxLength={200}
              // value={description}
              // onChange={(e)=>{
              //   setDescription(e.currentTarget.value);
              // }}
              name="description"
              {...formik.getFieldProps("description")}
              className={clsx(
                "form-control",
                {
                  "is-invalid":
                    formik.touched.description && formik.errors.description,
                },
                {
                  "is-valid":
                    formik.touched.description && !formik.errors.description,
                }
              )}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{formik.errors.description}</span>
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              aria-label="category" /*value={category} onChange={(e)=>{
            let resultado=validarCategoria(e.currentTarget.value);
            console.log("Resultado de validar", resultado);

            setCategory(e.currentTarget.value);
          }} className={clsx("form-select",          
          {
            "is-valid": validarCategoria(category)
          },
          {
            "is-invalid": !validarCategoria(category)
          })}*/
              name="category"
              {...formik.getFieldProps("category")}
              className={clsx(
                "form-control",
                {
                  "is-invalid":
                    formik.touched.category && formik.errors.category,
                },
                {
                  "is-valid":
                    formik.touched.category && !formik.errors.category,
                }
              )}
            >
              <option value="">Seleccione una categoria</option>
              <option value="Bebidas">Bebidas</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Limpieza">Limpieza</option>
            </Form.Select>
            {formik.touched.category && formik.errors.category && (
              <div className="mt-2 text-danger fw-bolder">
                <span role="alert">{formik.errors.category}</span>
              </div>
            )}
          </Form.Group>
          <div>
            <Button variant="primary" type="submit" className=" mx-2">
              Guardar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
               CloseModal();
              }}
              className="mx-2"
            >
              Cerrar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalEditar;
