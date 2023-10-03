import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody, CardText } from 'reactstrap'
import { getCurrentUserDetail, isLoggedIn } from '../auth/authIndex'
import userContext from '../context/userContext'

export const Post = ({ post = { id: -1, title: "default post tilte", content: "default post content" }, deletePost }) => {

    const userContextData = useContext(userContext)
    const [user, setUser] = useState(null)
    const [login, setLogin] = useState(null)

    useEffect(() => {
        setUser(getCurrentUserDetail())
        setLogin(isLoggedIn())
    }, [])

    return (
        <Card className='border-0 shadow-sm mt-3'>
            <CardBody>
                <h1>{post.title}</h1>
                {/* Uncaught TypeError: Cannot read properties of undefined (reading 'substring') */}
                <CardText dangerouslySetInnerHTML={{ __html: post.content?.substring(0, 30) + "...." }}>
                    {/* {post.content.substring(0,30)}... */}
                </CardText>

                <div>
                    <Link to={"/posts/" + post?.id} className='btn btn-secondary'>Read More</Link>

                    {/* {isLoggedIn ? user.id == post.user.id ? <Button color='danger' className='ms-2'>Delete</Button> : '' : ''} */}
                    {/* {isLoggedIn && (user && user.id == post.user.id ? <Button onClick={() => deletePost(post)} color='danger' className='ms-2'>Delete</Button> : '')} */}
                    {userContextData.user.login && (user && user.id == post.user.id ? <Button onClick={() => deletePost(post)} color='danger' className='ms-2'>Delete</Button> : '')}
                    {userContextData.user.login && (user && user.id == post.user.id ? <Button tag={Link} to={`/user/update-blog/${post.id}`} color='warning' className='ms-2'>Update</Button> : '')}

                </div>
            </CardBody>
        </Card>
    )
}

export default Post