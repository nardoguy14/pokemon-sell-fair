"use client";
import 'bootstrap/dist/css/bootstrap.min.css';

<link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
    crossOrigin="anonymous"
/>

import Image from 'next/image'
import axios from 'axios';


import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import {Col, Container, Nav, Navbar, NavDropdown, Row} from 'react-bootstrap';
import SellTable from "@/app/MyFileUpload";

const MyFileUpload = () => {
    const [file, setFile ] = useState(null);
    const [tableResults, setTableResults ] = useState(<div></div>);

    const UPLOAD_ENDPOINT = "https://svjf5pa6xj.execute-api.us-east-1.amazonaws.com/Prod/dragonshield/cards/details";

    const handleSubmit = (e) => {
        debugger
        e.preventDefault();
        console.log(file)
        alert(JSON.stringify(file))
        //if await is removed, console log will be called before the uploadFile() is executed completely.
        //since the await is added, this will pause here then console log will be called
        const formData = new FormData();
        formData.append("file", file, file.name);
        axios.post(UPLOAD_ENDPOINT, formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        }).then(data => {
            debugger
            console.log("hello")
            console.log(data.data);
            setTableResults(<SellTable data={data.data} />)
        });
    };
    const handleOnChange = e => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    return (
        <div>
            <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Pokemon Sell Prices</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            <Container style={{"marginTop": "20px"}}>
                <Form style={{"marginBottom": "20px"}}>
                    <Form.Group >
                        <Form.Label>Upload CSV</Form.Label>
                        <Form.Text className="text-muted">
                            <Form.Control type="file"
                                          onChange={(e) => handleOnChange(e)}
                                          placeholder="" />
                        </Form.Text>
                        <Button style={{"marginTop":"10px"}} onClick={handleSubmit} variant="primary">
                            Submit
                        </Button>
                    </Form.Group>
                </Form>

                {tableResults}
            </Container>
        </div>
    )
}
export default MyFileUpload
