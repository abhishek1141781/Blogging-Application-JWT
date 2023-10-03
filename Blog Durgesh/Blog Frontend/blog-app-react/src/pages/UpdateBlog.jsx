import React, { useContext, useEffect, useState } from 'react'
import Base from '../components/Base'
import { useNavigate, useParams } from 'react-router-dom'
import userContext from '../context/userContext'
import { loadPost, updatePostService } from '../servicesArea/PostService'
import { toast } from 'react-toastify'
import { useRef } from "react"
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
import { loadAllCategories } from "../servicesArea/CategoryService"
import JoditEditor from "jodit-react"


function UpdateBlog() {

    const { blogId } = useParams()
    const object = useContext(userContext)
    const navigate = useNavigate()
    const [post, setPost] = useState(null)

    const [categories, setCategories] = useState([])
    const editor = useRef(null)

    // console.log("post.category.id: ",post)

    //load all categories to be used in select input bar
    useEffect(() => {
        loadAllCategories().then((data) => {
            console.log("loadAllCategories: ", data)
            setCategories(data)
        }).catch(error => {
            console.log(error)
        })

        //load blog form database
        loadPost(blogId).then(data => {
            // durgesh has categoryId as his id field of category array, i'll use id
            // setPost({ ...data, categoryId: data.category.id })
            console.log("data.category.id from loadPost in id value: ", data)
            setPost({ ...data, id: data.id })
            console.log("data.category.id from loadPost in id value after setting id: data.category.id=>", data)
        })
            .catch(error => {
                console.log(error)
                toast.error("error in loading the post from db")
            })
    }, [])

    useEffect(() => {
        console.log("first")
        if (post) {
            // console.log("post.user.id: ", post.user.id)
            // console.log("object.user.data.id: ", object.user.data.id)
            if (post?.user?.id != object.user.data.id) {
                toast.error("no trespassing")
                navigate('/')
            }
        }
    }, [post])

    const handleChange = (event, fieldName) => {
        if (fieldName === 'category.id') {
            setPost({
                ...post,
                category: { id: event.target.value }
            });
        } else {
            setPost({
                ...post,
                [fieldName]: event.target.value
            });
        }
    }

    //update post function
    const updatePost = (event) => {
        event.preventDefault()
        console.log("postDto from updatePost of UpdateBlog: ", post)
        // updatePostService({ ...post, category: { categoryId: post.categoryId } }, post.postId)
        updatePostService({ ...post }, post.id)
            .then(resp => {
                console.log(resp)
                toast.success("post updated")
            })
            .catch(error => {
                console.log(error)
                toast.error("error in updateing the post")
            })
    }


    const updateHtml = () => {
        return (
            <div className="wrapper">
                {/* {JSON.stringify(post)} */}
                <Card className="shadow-sm mt-2">
                    <CardBody>
                        {/* {JSON.stringify(post)} */}
                        <h3>Update opost form here</h3>
                        <Form onSubmit={updatePost} >
                            <div className="my-2">
                                <Label for="title">Post Title</Label>
                                <Input
                                    type="text"
                                    id="title"
                                    placeholder="Enter here"
                                    name="title"
                                    value={post.title}
                                    onChange={(event) => handleChange(event, 'title')}
                                />
                            </div>

                            <div className="my-2">
                                <Label for="content">Post Content</Label>
                                {/* <Input
                                type="textarea"
                                id="content"
                                placeholder="Enter here"
                                style={{ height: '200px' }}
                            /> */}

                                <JoditEditor
                                    ref={editor}
                                    value={post.content}
                                    // onChange={contentFieldChanged}
                                    onChange={newContent => setPost({ ...post, content: newContent })}
                                // config={customConfig}
                                />
                            </div>

                            {/* image file upload */}
                            <div className="mt-3">
                                <Label for="image">Select Post Banner</Label>
                                <Input id="image" type="file" onChange={''} />
                            </div>

                            <div className="my-2">
                                <Label for="category">Post Category</Label>
                                <Input
                                    type="select"
                                    // id="category"
                                    id="categoryId"
                                    title="Select a Category"
                                    placeholder="Enter here"
                                    name="categoryId"
                                    onChange={(event) => handleChange(event, 'category.id')}
                                    value={post.category.id}
                                // value={post.categoryId}


                                >

                                    <option disabled value={0}>--Select Category--</option>

                                    {
                                        //the below thing would return jsx
                                        categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.categoryTitle}
                                            </option>
                                        ))
                                    }
                                </Input>
                            </div>

                            <Container className="text-center">
                                <Button type="submit" color="success" outline>Update Post</Button>
                                <Button color="danger" className="ms-2" outline>Reset Post</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </div>

        )
    }

    return (

        <Base>
            <Container>
                {post && updateHtml()}

            </Container>

        </Base>
    )
}

export default UpdateBlog