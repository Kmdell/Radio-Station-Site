import React from "react";
import '../App.css';
import image from '../wmbc_image.png'
import { Button, Navbar, Container, Nav, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Genres(){
  const [genres, setGenres] = React.useState(null);

  React.useEffect(() => {
    fetch("/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);


  
  return(
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/admin">
            <img
            alt=""
            src={image}
            width="30"
            height="30"
            className="d-inline-block align-top"
            />{' '}
          &nbsp;Administration
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/admin/programs">Programs</Nav.Link>
            <Nav.Link href="/admin/audios">Audios</Nav.Link>
            <Nav.Link href="/admin/categories">Categories</Nav.Link>
            <Nav.Link href="/admin/genres">Genres</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br/>
      <div className="Table">
        <Table striped bordered hover >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Author</th>
              <th>Visibility</th>
            </tr>
          </thead>
          <tbody>
            {genres == null ?
            <tr>
              <td colSpan={5} >Loading...</td>
            </tr>
            : 
            genres.map((info) => {
              return(
                <tr>
                  <td>{info.id}</td>
                  <td>{info.title}</td>
                  <td>{info.description}</td>
                  <td>{info.author}</td>
                  <td>{info.visibility}</td>
                </tr>
              )
            }) }
          </tbody>
        </Table>
        <Button variant="primary" href="/admin/programs/new" style={{justifyContent:'right'}}>Create New</Button>
      </div>
    </>
  );
}

export default Genres;