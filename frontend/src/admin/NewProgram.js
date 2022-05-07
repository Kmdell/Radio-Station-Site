import React from "react";
import '../App.css';
import image from '../wmbc_image.png';
import { Navbar, Container, Nav, Row, Col, Form } from 'react-bootstrap';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import 'bootstrap/dist/css/bootstrap.min.css';


function NewProgram(){
  const [categories, setCategories] = React.useState(null);
  const [genres, setGenres] = React.useState(null);
  const [form, setForm] = React.useState({});
  const [validated, setValidated] = React.useState(false);

  React.useEffect(() => {
    fetch("/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));

    fetch("/genres")
      .then((res) => res.json())
      .then((data) => setGenres(data));
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    })
  }

  const generateArray = (options) => {
    let choice = []
    for (let index in options) {
      choice.append({key: index.name, label: index.name})
    }
  }

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
          &nbsp;WMBC Admin
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/admin/programs">Programs</Nav.Link>
            <Nav.Link href="/admin/audios">Audios</Nav.Link>
            <Nav.Link href="/admin/categories">Categories</Nav.Link>
            <Nav.Link href="/admin/genres">Genres</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="Table">
        <br/>
        <h1>Create New Program</h1>
        <h7>Programs are for any long term series</h7>
        <hr />
        <Form>
          <Row>
            <Col>
              <Row>
                <Form.Group className="mb-3" controlId="formProgramName">
                  <Form.Label>Program Name</Form.Label>
                  <Form.Control type="text" onChange={e => setField('title', e.target.value)} placeholder="Enter New Program Name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAuthorName">
                  <Form.Label>Author Name</Form.Label>
                  <Form.Control type="text" onChange={e => setField('author', e.target.value)} placeholder="Enter New Program Author" />
                </Form.Group>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formCategories">
                    <Form.Label>Categories</Form.Label>
                    <DropdownMultiselect options={generateArray} name="categories" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formCategories">
                    <Form.Label>Genres</Form.Label>
                    <DropdownMultiselect options={generateArray} name="categories" />
                  </Form.Group>
                </Col>
                
                {/* <Col>
                  <Form.Group className="mb-3" controlId="formCategories">
                    <Form.Label>Genres</Form.Label>
                    <DropdownMultiselect options={generateArray} name="categories" />
                  </Form.Group>
                </Col> */}
                  
              </Row>
            </Col>
            <Col>
              <Form.Group controlId="coverFile" className="mb-3">
                <Form.Label>The Program File Cover</Form.Label>
                <Form.Control type="file" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} onChange={e => setField('description', e.target.value)} placeholder="Enter the Description of the New Program"/>
              </Form.Group>
            </Col>
          </Row>
          
        </Form>
      </div>
    </>
  );
}

export default NewProgram;