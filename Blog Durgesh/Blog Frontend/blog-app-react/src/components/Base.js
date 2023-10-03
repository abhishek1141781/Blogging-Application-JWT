import CustomNavbar from "./CustomNavbar";

const Base = ({ title = "Welcome to our website", children }) => {
    return (
        <div className="container-fluid p-0 m-0">
            <CustomNavbar />

            {/* print dynamic children in between header and footer */}
            {children}

        </div>
    )
}

export default Base;