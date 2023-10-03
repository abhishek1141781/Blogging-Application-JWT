import Base from "../components/Base"
import userContext from "../context/userContext";

const Services = () => {
    return (
        <userContext.Consumer>
            {
                (object) => (
                    <Base>

                        <h1>services</h1>
                        <h2>Welcome user: {object.user.login && object.user.data.name}</h2>

                    </Base>

                )
            }
        </userContext.Consumer>
    )
}

export default Services;