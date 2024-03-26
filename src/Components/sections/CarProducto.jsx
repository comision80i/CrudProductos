/* eslint-disable react/prop-types */
import { Card, Button, Col } from "react-bootstrap";
import imagen2 from "../../assets/react.svg";
const CarProducto = ({ producto }) => {
  return (
    <Col xs={12} md={6}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={imagen2} />
        <Card.Body>
          <Card.Title>{producto.title}</Card.Title>
          <Card.Text>
            <span className="mb-2 d-block">{producto.description}</span>
            <span className="fs-4 d-block">{producto.category}</span>
          </Card.Text>
          <Button variant="primary">Ver mas</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CarProducto;
