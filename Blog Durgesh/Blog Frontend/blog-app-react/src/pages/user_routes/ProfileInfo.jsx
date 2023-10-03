import React, { useContext, useEffect, useState } from 'react'
import Base from '../../components/Base'
import userContext from '../../context/userContext'
import { useParams } from 'react-router-dom'
import { getUser } from '../../servicesArea/user_service'
import { Card, CardBody, Col, Container, Row, Table } from 'reactstrap'
import ViewUserProfile from '../../components/ViewUserProfile'

const ProfileInfo = () => {

    const object = useContext(userContext)

    const [user, setUser] = useState(null)
    const { userId } = useParams()

    useEffect(() => {
        getUser(userId).then(data => {
            console.log(data)
            setUser({ ...data })
        })
    }, [])

    const userView = () => {
        return (
            <Row>
                <Col md={{ size: 6, offset: 3 }}>

                    <ViewUserProfile user={user} />
                </Col>
            </Row>
        )
    }

    return (
        <Base>
            {user ? userView() : ''}
        </Base>
    )
}

export default ProfileInfo