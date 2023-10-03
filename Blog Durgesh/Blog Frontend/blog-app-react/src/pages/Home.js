import { useEffect } from "react";
import Base from "../components/Base";
import { Col, Container, Row } from "reactstrap";
import Post from "../components/Post";
import NewFeed from "../components/NewFeed";
import CategorySideMenu from "../components/CategorySideMenu";

const Home = () => {
    return (
        <Base>
            <Container className="mt-2" >{/* <NewFeed /> */}
                <Row>

                    <Col md={2} className="pt-5"><CategorySideMenu /></Col>

                    <Col md={10}><NewFeed /></Col>

                </Row>
            </Container>
        </Base>

    )
}

export default Home;