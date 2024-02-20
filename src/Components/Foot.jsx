import {Container} from 'react-bootstrap';

const Foot = () => {
    return (
       <>
       <Container fluid className='p-0'>
        <div className='bg-dark text-white text-center'>
            <p>Todos los derechos reservados.</p>
        </div>
       </Container>
       </>
    );
};

export default Foot;