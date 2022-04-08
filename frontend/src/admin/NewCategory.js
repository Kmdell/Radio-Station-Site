import React from "react";
import '../App.css';
import image from '../wmbc_image.png';
import { Button, Navbar, Container, Nav, Row, Col, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function NewCategory(){
  const [form, setForm] = React.useState({});
  const [validated, setValidated] = React.useState(false);

  const handleSubmit = (event) => {
    const _form = event.currentTarget;
    if (_form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } 
    else {
      const reqOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.toString(),
          description: form.description.toString(),
        })
      };
      console.log(reqOptions)
      fetch('http://192.168.122.139:3001/category', reqOptions)
        .then((res) => res.json())
        .then((data) => console.log(data))
    }
    setValidated(true);
  };

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
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
        <h1>Create New Category</h1>
        <h6>Categories are for the types of audio i.e (Podcast, Song)</h6>
        <hr />
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col>
                <Form.Group className="mb-3" controlId="formProgramName">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control required type="text" onChange={e => setField('name', e.target.value)} placeholder="Enter New Category Name" />
                  <Form.Control.Feedback type="invalid">Please Enter a Name for the Category</Form.Control.Feedback>
                </Form.Group>
                <br/>
                <Button type="submit">Submit form</Button>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control required as="textarea" rows={4} onChange={e => setField('description', e.target.value)} placeholder="Enter the Description of the Category"/>
                <Form.Control.Feedback type="invalid">Please enter a description for your new Category</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}

export default NewCategory;