import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, CardFooter, Col, Container, Row, Table } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth/authIndex'


const ViewUserProfile = ({ user }) => {


    const [currentUser, setCurrentUser] = useState(null)
    const [login, setLogin] = useState(false)
    useEffect(() => {
        setCurrentUser(getCurrentUserDetail())
        setLogin(isLoggedIn())
    }, [])


    return (
        <Card className='mt-2 border-0 shadow-sm'>
            <CardBody>
                <h3 className='text-uppercase'>This is user Profile</h3>
                <div className="divider" style={{
                    width: '75%',
                    height: '1px',
                    background: '#e2e2e2'
                }}></div>


                <Container className='text-center'>
                    <img style={{ maxWidth: '250px' }} src={user.image ? user.image : 'https://mcdn.wallpapersafari.com/medium/13/50/xeNjrU.jpg'} alt="profile-pic" className='img-fluid rounded-circle mt-3' />
                </Container>

                <Table bordered hover responsive striped className='mt-5 text-center' >
                    <tbody>
                        <tr>
                            <td>UserId</td>
                            <td>{user.id}</td>
                        </tr>
                        <tr>
                            <td>Username</td>
                            <td>{user.name}</td>
                        </tr>
                        <tr>
                            <td>Email Id</td>
                            <td>{user.email}</td>
                        </tr>
                        <tr>
                            <td>About</td>
                            <td>{user.about}</td>
                        </tr>

                        <tr>
                            <td>Roles</td>
                            <td>{user.roles.map((role) => {
                                return (
                                    <div key={role.id}>{role.name}</div>
                                )
                            })}</td>
                        </tr>

                    </tbody>
                </Table>
                {currentUser ? (currentUser.id == user.id) ? (
                    <CardFooter className='text-center'>
                        <Button color='warning' >Update Profile</Button>
                    </CardFooter>
                ) : '' : ''}

            </CardBody>
        </Card>
    )
}

export default ViewUserProfile