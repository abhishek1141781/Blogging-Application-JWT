import Base from "../components/Base";
import userContext from "../context/userContext";

const About = () => {
    return (

        <userContext.Consumer>
            {(object) => (
                <Base>
                    <h1>this is about page</h1>
                    {console.log("from abotttttttttttttt",object)}
                    <h2>Welcome user: {object.user.login && object.user.data.name}</h2>
                </Base>
            )}
        </userContext.Consumer>

    )
}

export default About;