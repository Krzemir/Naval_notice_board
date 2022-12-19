import { NavLink} from "react-router-dom";
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/usersRedux';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    const [search, setSearch] = useState('')

    const user = useSelector(getUser);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (search) {
            navigate(`/search/${search}`)
        }
        
        setSearch('');
    }

     return (
        <>
            <Navbar bg="light" variant="light" className="rounded mt-4 mb-4">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">
                        < img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo-anchor" className='d-inline'/>
                        <h2 className='d-inline align-middle ms-2' style={{ color: '#111947' }}>Naval Notice Board</h2>
                    </Navbar.Brand>
                    <div className="justify-content-end">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            {user && <Nav.Link as={NavLink} to="/new-ad">New notice</Nav.Link>}
                            {!user && <Nav.Link as={NavLink} to="/Login">New notice</Nav.Link>}
                            {user && <Nav.Link as={NavLink} to="/Logout">Log out</Nav.Link>}
                            {!user && <Nav.Link as={NavLink} to="/Register">Sign up</Nav.Link>}
                            {!user && <Nav.Link as={NavLink} to="/Login">Sign in</Nav.Link>}
                            <Form className="d-flex ms-1" onSubmit={handleSubmit}>
                                <Form.Control
                                type="search"
                                placeholder="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="me-2"
                                aria-label="Search"
                                />
                                <Button variant="outline-secondary" type="submit">Search</Button>
                            </Form>
                        </Nav>
                    </div>
                </Container>
            </Navbar>
        </>
     );
}

export default NavBar;