import React, { useContext, useEffect, useState } from 'react';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button,
} from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from '../auth/authIndex';
import ProfileInfo from '../pages/user_routes/ProfileInfo';
import userContext from '../context/userContext';

const CustomNavbar = (args) => {

    const userContextData = useContext(userContext)

    const [isOpen, setIsOpen] = useState(false);

    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(undefined)
    let navigate = useNavigate()

    useEffect(() => {

        setLogin(isLoggedIn())
        setUser(getCurrentUserDetail())

    }, [login])

    const logout = () => {
        doLogout(() => {
            // logged out
            setLogin(false)
            userContextData.setUser({
                data: null,
                login: false
            })
            navigate("/")
        })
    }

    const toggle = () => setIsOpen(!isOpen);

    const logoStyles = {
        fontFamily: 'Algerian', // Set the desired font family
        fontWeight: 'bold',   // Make the text bold
        fontSize: '32px',     // Adjust the font size as needed
        color: '#ff6600',     // Set a custom text color
        // Add any additional styles you want here
    };

    return (
        <div>
            <Navbar {...args}
                color='dark'
                dark
                expand='md'
                fixed=''
                className='px-4'
            >
                <NavbarBrand tag={ReactLink} to='/' ><span style={logoStyles}>A7 blog</span></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    {/* <Nav className="me-auto" navbar> */}
                    <Nav navbar className="me-auto" >

                        <NavItem>
                            <NavLink tag={ReactLink} to='/' >New!!!</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={ReactLink} to='/about' >About</NavLink>
                        </NavItem>

                        <NavItem>
                            <NavLink tag={ReactLink} to='/services' >Services</NavLink>
                        </NavItem>





                        <NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    More
                                </DropdownToggle>
                                <DropdownMenu end>
                                    <DropdownItem tag={ReactLink} to='/services'>Services</DropdownItem>
                                    <DropdownItem>Contact Us</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Reset</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavItem>


                        <NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Socials
                                </DropdownToggle>
                                <DropdownMenu end>
                                    <DropdownItem>LinkedIn</DropdownItem>
                                    <DropdownItem>GitHub</DropdownItem>
                                    <DropdownItem>Instagram</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Reset</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavItem>
                    </Nav>

                    <Nav navbar>

                        {
                            login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to={`/user/profile-info/${user.id}`}>
                                            {/* <ProfileInfo /> */}
                                            ProfileInfo
                                        </NavLink>
                                    </NavItem>


                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/dashboard">
                                            {user.email}
                                        </NavLink>
                                    </NavItem>

                                    {/* <Button color="danger" onClick={() => logout()}>Logout</Button>{' '} */}
                                    <NavItem>
                                        <NavLink onClick={logout}>
                                            {/* <Button color="danger" onClick={logout}> */}
                                            Logout
                                            {/* </Button> */}
                                        </NavLink>
                                    </NavItem>

                                </>
                            )
                        }
                        {
                            !login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to='/login' >
                                            Login
                                        </NavLink>
                                    </NavItem>

                                    <NavItem>
                                        <NavLink tag={ReactLink} to='/signup' >
                                            Signup
                                        </NavLink>
                                    </NavItem>
                                </>
                            )
                        }


                    </Nav>

                    <NavbarText>AWS EC2 Instance</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default CustomNavbar;