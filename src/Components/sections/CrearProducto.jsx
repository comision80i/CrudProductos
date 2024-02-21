//import { useState } from "react";
import { Form, Button } from "react-bootstrap";
//import { validarCategoria } from "../../helpers/validaciones";
import clsx from 'clsx';
import * as Yup from "yup";
import {useFormik} from "formik";

const CrearProducto = () => {
  //los productos van a tener las sig prop, titulo, descripcion, categoria, ademas va a tener un identificador unico;
  /*const [title, setTitle]=useState('');
  const [description, setDescription]=useState('');
  const [category, setCategory]=useState('');*/
  const ProductoSchema=Yup.object().shape(
    {
      title: Yup.string().min(4, 'min 4 caract.').max(20, 'max 20 caract.').required('El titulo es requerido'),
      description: Yup.string().min(4).max(200),//.required('la descripcion es requerida'),
      category:Yup.string()//.required('la categoria es requerida')
    }
  );

  const initialValues={
    title:'',
    description:'',
    category:''
  };


  const formik=useFormik({
    initialValues,
    validationSchema: ProductoSchema,
    validateOnBlur: true,
    validateOnChange:true,
    onSubmit: (values)=>{
      console.log("Values de Formik-->", values);
    } 
  });


/*const handleSubmit=(e)=>{
 e.preventDefault();
 console.log("Desde sumbit");
 const nuevoProducto={
  titulo: title,
  descripcion: description,
  category: category
 };
 console.log("###Nuevo Producto--> ", nuevoProducto);
}*/
  return (
    <div className="container py-3 my-3">
      <div className="text-center">
        {" "}
        <h2>Crear Productos</h2>
      </div>
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
            {...formik.getFieldProps('title')}
            className={clsx('form-control',{
              'is-invalid': formik.touched.title && formik.errors.title
            },
            {
              'is-valid': formik.touched.title && !formik.errors.title
            })}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="mt-2 text-danger fw-bolder">
              <span role='alert'>{formik.errors.title}</span>
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
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="category">
          <Form.Label>Categoria</Form.Label>
          <Form.Select aria-label="category" /*value={category} onChange={(e)=>{
            let resultado=validarCategoria(e.currentTarget.value);
            console.log("Resultado de validar", resultado);

            setCategory(e.currentTarget.value);
          }} className={clsx("form-select",          
          {
            "is-valid": validarCategoria(category)
          },
          {
            "is-invalid": !validarCategoria(category)
          })}*/>
            <option value=''>Seleccione una categoria</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Limpieza">Limpieza</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar
        </Button>
      </Form>
    </div>
  );
};

export default CrearProducto;
