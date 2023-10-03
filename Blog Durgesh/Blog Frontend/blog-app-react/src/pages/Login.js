import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "../components/Base";
import backgroundImage from '../img/exploring-the-depths-of-the-ocean-tzywgdcfc3c17gha.jpg'
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../servicesArea/user_service";
import { doLogin } from "../auth/authIndex";
import { useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

const Login = () => {

    const userContextData = useContext(userContext)

    const navigate = useNavigate()

    //destructuring
    const [loginDetail, setLoginDetail] = useState({
        username: '',
        password: ''
    })

    const handleChange = (event, field) => {

        let actualValue = event.target.value
        setLoginDetail({
            ...loginDetail,
            [field]: actualValue
        })
    }

    const handleReset = () => {
        setLoginDetail({
            username: '',
            password: ''
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // console.log(loginDetail)
        //validation
        if (loginDetail.username.trim() == '' || loginDetail.password.trim() == '') {
            toast.error("Recheck credentials")
            return;
        }

        //submit the data to the server
        loginUser(loginDetail).then((data) => {
            console.log(data)

            //save data to localStorage
            doLogin(data, () => {
                console.log("login detail is saved to localStorage: ",data)
                //redirect to user dashboard
                userContextData.setUser({
                    // data: data, // causes some editing bug
                    data: data.user,
                    login: true
                })
                navigate("/user/dashboard")
            })
            toast.success("login success")
        }).catch(error => {
            console.log(error)
            if (error.response.status == 400 || error.response.status == 404)
                toast.error(error.response.data.message)
            else
                toast.error("Something went wrong on server !!")
        })
    }

    const cardStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        color: 'white',
        // filter: 'blur(0.5px)', // Apply a blur effect to the background image
        // opacity: '0.6', // Adjust the opacity for the glazed effect (0.8 for 80% opacity)
    };

    return (
        <Base>
            <div>
                <Container>
                    <Row>
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Card className="custom-card mt-2" style={cardStyle}>
                                <CardHeader style={{ background: "grey" }}>
                                    <h3>Login Form!!!</h3>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={handleFormSubmit}>
                                        {/* Email Field */}
                                        <FormGroup>
                                            <Label for="email">
                                                Enter Email
                                            </Label>
                                            <Input
                                                type="email"
                                                id="email"
                                                placeholder="enter email here"
                                                value={loginDetail.username}
                                                onChange={(e) => handleChange(e, "username")}
                                            />
                                        </FormGroup>
                                        {/* Password Field */}
                                        <FormGroup>
                                            <Label for="password">
                                                Enter Password
                                            </Label>
                                            <Input
                                                type="password"
                                                placeholder="enter password here"
                                                id="password"
                                                value={loginDetail.password}
                                                onChange={(e) => handleChange(e, "password")}
                                            />
                                        </FormGroup>
                                        <Container className="text-center">
                                            <Button color="dark" outline className="me-2">Login</Button>
                                            <Button color="danger" outline onClick={handleReset}>Reset</Button>
                                        </Container>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Base>
    )
}

export default Login;