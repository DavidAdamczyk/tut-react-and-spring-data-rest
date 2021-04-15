import React from "react";
import {Button, Card, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';


class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            data: [],
            error: null,
            newStartWork: new Date(),
            newEndWork: new Date(),
            newName: "",
            customerId: "",
            updateStartWork: new Date(),
            updateEndWork: new Date(),
            updateName: ""
        };
    }

    async componentDidMount() {
        const axios = require('axios').default;

        axios.get('http://localhost:8080/customers')
            .then((response) => {
                this.setState({
                    'data': response.data
                })
                //console.log(response.data);
                //console.log(response.status);
                //console.log(response.statusText);
                //console.log(response.headers);
                //console.log(response.config);
            });
    }

    onChange = (e, name) => {
        //console.log("---", e, name)
        this.setState({
            [name]: e
        })
    }

    createNew = () => {
        const axios = require('axios').default;

        axios({
            method: 'post',
            url: 'http://localhost:8080/customers',
            data: {
                "name": this.state.newName,
                "startWork": this.state.newStartWork.toISOString(),
                "endWork": this.state.newEndWork.toISOString()
            }
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }

    updateExisting = () => {
        const axios = require('axios').default;
        axios({
            method: 'put',
            url: 'http://localhost:8080/customers/' + this.state.customerId,
            data: {
                "name": this.state.updateName,
                "startWork": this.state.updateStartWork.toISOString(),
                "endWork": this.state.updateEndWork.toISOString()
            }
        }).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });

    }


    render() {

        const DisplayItems = (data) => {
            const list = data.children.map(item => <CustomItem key={item.id}>{item}</CustomItem>)
            return (
                <ListGroup variant="flush">
                    {list}
                </ListGroup>
            )
        }

        const CustomItem = (data) => {
            const item = data.children;
            return <ListGroup.Item>
                <Col>
                    <Row><b>id:</b> {item.id} </Row>
                    <Row><b> name:</b> {item.name} </Row>
                    <Row><b> startWork:</b> {item.startWork} </Row>
                    <Row><b> endWork:</b> {item.endWork} </Row>
                </Col>
            </ListGroup.Item>;
        };

        return (
            <Container>
                <h1>React REST Demo</h1>
                <Card>
                    <DisplayItems>{this.state.data}</DisplayItems>
                </Card>
                <Card>
                    <Card.Header>Create</Card.Header>
                    <Card.Body>
                        <Card.Title>Create new item</Card.Title>
                        <Form>
                            <Form.Group controlId="nameId">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={this.state.newName}
                                    onChange={(e) => this.onChange(e.target.value, 'newName')}
                                />
                            </Form.Group>
                            <Form.Group controlId="startWorkId">
                                <Form.Label>startWork</Form.Label>
                                <DateTimePicker
                                    onChange={(e) => this.onChange(e, 'newStartWork')}
                                    value={this.state.newStartWork}
                                />
                            </Form.Group>
                            <Form.Group controlId="endWorkId">
                                <Form.Label>endWork</Form.Label>
                                <DateTimePicker
                                    onChange={(e) => this.onChange(e, 'newEndWork')}
                                    value={this.state.newEndWork}
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={this.createNew} type="submit">Create</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>Update</Card.Header>
                    <Card.Body>
                        <Card.Title>Update existing Item</Card.Title>
                        <Form>
                            <Form.Group controlId="customerId">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter customer ID"
                                    value={this.state.customerId}
                                    onChange={(e) => this.onChange(e.target.value, 'customerId')}
                                />
                            </Form.Group>
                            <Form.Group controlId="nameId">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={this.state.updateName}
                                    onChange={(e) => this.onChange(e.target.value, 'updateName')}
                                />
                            </Form.Group>
                            <Form.Group controlId="startWorkId">
                                <Form.Label>startWork</Form.Label>
                                <DateTimePicker
                                    onChange={(e) => this.onChange(e, 'updateStartWork')}
                                    value={this.state.updateStartWork}
                                />
                            </Form.Group>
                            <Form.Group controlId="endWorkId">
                                <Form.Label>endWork</Form.Label>
                                <DateTimePicker
                                    onChange={(e) => this.onChange(e, 'updateEndWork')}
                                    value={this.state.updateEndWork}
                                />
                            </Form.Group>
                            <Button variant="warning" onClick={this.updateExisting} type="submit">Update</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

export default App;
