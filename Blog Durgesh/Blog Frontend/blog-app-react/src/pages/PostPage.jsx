import { Link, useParams } from "react-router-dom"
import Base from "../components/Base"
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from "reactstrap"
import { useEffect, useState } from "react"
import { createComment, loadPost } from "../servicesArea/PostService"
import { toast } from "react-toastify"
import { BASE_URL } from "../servicesArea/helper"
import { isLoggedIn } from "../auth/authIndex"

const PostPage = () => {

    //destructuring postId coming in useParams though data has id parameter, so using data we can do
    // data.id to get post id but to get post id directly we would've to use postId to access global
    // context variable
    const { postId } = useParams()
    // console.log("PostId by useParams:", postId);

    //store post data temporarily using stateManagement
    const [post, setPost] = useState(() => [])
    const [comment, setComment] = useState({
        //use same property name as server side code
        content: ''
    })

    // load post of given postId
    useEffect(() => {
        //check if postId is defined before making the GET request for the image
        if (postId) {

            loadPost(postId)
                .then(data => {
                    console.log("postId from useEffect of PostPage: ", postId)
                    console.log(data)
                    // console.log("post id from data: ",data.id)
                    // console.log("data.user.id from data: ",data.user.id)
                    // console.log("data.category.id from data: ",data.category.id)
                    // console.log("data.user.roles[0].id from data: ",data.user.roles[0].id)
                    setPost(data)
                }).catch(error => {
                    console.log("Error ", error);
                    toast.error("error in laoading post")
                })
        }
    }, [postId]); // Add postId as a dependency to re-run the effect when it changes

    const printDate = (numbers) => {
        return new Date(numbers).toLocaleString()
    }

    const loadImage = () => {
        if (post.imageName) {
            return BASE_URL + "/post/images/" + post.imageName;
        } else {
            // Handle the case where post or imageName is not defined
            console.log("Post or imageName is not defined.");
            return ""; // or provide a default image URL
        }
    }

    // submit comment function
    const submitComment = () => {
        if (!isLoggedIn()) {
            toast.error("Login needed to post comment")
            return;
        }
        if (comment.content.trim() === '')
            return;
        createComment(comment, postId)
            .then(data => {
                console.log(data)
                toast.success("comment added")
                setPost({
                    ...post,
                    comments: [...post.comments, data.data]
                })
                setComment({
                    content: ''
                })
            }).catch(error => {
                console.log(error)
                toast.error("comment creation failed")
            })
    }

    return (
        <Base>
            <Container className="mt-4">
                <Link to='/'>Home</Link> / {post && (<Link to=''>{post.title}</Link>)}
                <Row>
                    <Col md={{
                        size: 12
                    }}>
                        <Card className="mt-3">
                            <CardBody>
                                <CardText>
                                    {/* on reloading the page, Uncaught TypeError: Cannot read properties 
                                    of undefined (reading 'name'): Use type safe operator */}
                                    Posted by <b>{post.user?.name}</b> on <b>{printDate(post.addedDate)}</b>
                                </CardText>
                                <CardText>
                                    {/* Uncaught TypeError: Cannot read properties of undefined (reading 'categoryTitle') 
                                    : thus making category null safe*/}
                                    <span className="text-muted">{post.category?.categoryTitle}</span>
                                </CardText>
                                <div className="divider" style={{
                                    width: '100%',
                                    height: '1px',
                                    background: '#e2e2e2'
                                }}>

                                </div>
                                <CardText className="mt-3">
                                    <h3>{post.title}</h3>
                                </CardText>
                                <div className="image-container mt-3 container text-center shadow-lg" style={{ width: '50%' }}>
                                    <img className="image-fluid" src={loadImage()} alt="jack-grease" style={{ maxWidth: '100%' }} />
                                    {/* <img className="image-fluid" src={BASE_URL + "/post/images/" + post.imageName} alt="jack-grease" /> */}
                                </div>
                                <CardText className="mt-5" dangerouslySetInnerHTML={{ __html: post.content }}>
                                </CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className="my-4">

                    <Col md={{
                        size: 9,
                        offset: 1
                    }
                    }>
                        <h3>Comments ({post.comments?.length})</h3>
                        {
                            post && post.comments?.map((c, index) => (
                                <Card className="mt-2 border-0" key={index}>
                                    <CardBody>
                                        <CardText>
                                            {c.content}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            ))
                        }


                        <Card className="mt-2 border-0" >
                            <CardBody>
                                <Input
                                    type="textarea"
                                    placeholder="Enter comment here"
                                    value={comment.content}
                                    onChange={(event) => setComment({ content: event.target.value })}
                                />
                                <Button onClick={submitComment} className="mt-2" color="primary">Submit</Button>
                            </CardBody>
                        </Card>


                    </Col>
                </Row>
            </Container>
        </Base>
    )
}


export default PostPage