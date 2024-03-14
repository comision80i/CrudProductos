/* eslint-disable react/prop-types */
import { Button, Modal, Form } from "react-bootstrap";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import UserContext from "../../Context/UserContext";
import { useContext } from "react";

const Login = ({ isOpen, handleClose }) => {
  const { setCurrentUser, SaveAuth } = useContext(UserContext);

  const API = import.meta.env.VITE_APIV2;

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Formato invalido")
      .min(7)
      .max(128)
      .required("El email es requerido"),
    password: Yup.string().min(6).max(20).required(),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      //console.log("VALUES-->", values);
      try {
        const response = await axios.post(`${API}/users/login`, values);
        //console.log("RESPUESTA LOGIN-->", response.data);
        if (response.status === 200) {
          SaveAuth(response.data);
          setCurrentUser(response.data);
          formik.resetForm();
          handleClose();
        } else {
          alert("Ocurrio un error");
        }
      } catch (error) {
        alert(`${error.response.data.message}`);
        console.error(error );
      }
    },
  });

  return (
    <>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su email"
                name="email"
                {...formik.getFieldProps("email")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid": formik.touched.email && formik.errors.email,
                  },
                  {
                    "is-valid": formik.touched.email && !formik.errors.email,
                  }
                )}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.email}</span>
                </div>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                {...formik.getFieldProps("password")}
                className={clsx(
                  "form-control",
                  {
                    "is-invalid":
                      formik.touched.password && formik.errors.password,
                  },
                  {
                    "is-valid":
                      formik.touched.password && !formik.errors.password,
                  }
                )}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="mt-2 text-danger fw-bolder">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              )}
            </Form.Group>
            <div>
              <Button type="submit" variant="primary" className="mx-2">
                Ingresar
              </Button>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="mx-2"
              >
                Cerrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
