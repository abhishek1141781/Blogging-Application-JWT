import { useEffect, useRef, useState } from "react"
import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
import { loadAllCategories } from "../servicesArea/CategoryService"
import JoditEditor from "jodit-react"
import { toast } from "react-toastify"
import { uploadPostImage, writePost } from '../servicesArea/PostService'
import { getCurrentUserDetail } from "../auth/authIndex"

const AddPost = () => {

    const editor = useRef(null)
    // const [content, setContent] = useState('')
    const [categories, setCategories] = useState([])
    // const customConfig = {
    //     placeholder: "start typing.///.."
    // }
    const [user, setUser] = useState(undefined)

    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: ''
    })

    const [image,setImage] = useState(null)

    useEffect(
        () => {
            setUser(getCurrentUserDetail())
            loadAllCategories().then((data) => {
                // console.log(data)
                setCategories(data)
            }).catch(error => {
                console.log(error)
            })
        },
        []
    )

    //field Changed function
    const fieldChanged = (event) => {
        // console.log("event.target.name: " + event.target.name)
        // console.log("event.target.value: " + event.target.value)
        // console.log("event.target?.form?.index: " + event.target?.form?.index)
        // console.log("event.form?.index: " + event.form?.index)
        // console.log("event: " + event)

        // // Get the selected option element
        // const selectedOption = event.target.options[event.target.selectedIndex];

        // // Get the id attribute of the selected option
        // const selectedId = selectedOption.getAttribute("id");

        // console.log("selectedId: " + selectedId)

        setPost({ ...post, [event.target.name]: event.target.value })
    }

    const contentFieldChanged = (data) => {
        setPost({ ...post, 'content': data })
    }

    //create Post function
    const createPost = (event) => {

        event.preventDefault()
        console.log("created the post after preventing the def act after sub buttn pressed" + post)
        if (post.title.trim() === '') {
            toast.error('post is required!')
            return;
        }
        if (post.content.trim() === '') {
            toast.error('content is required!')
            return;
        }
        if (post.categoryId === '') {
            toast.error('id is required!')
            return;
        }

        //submit the form one server
        post['userId'] = user.id

        writePost(post).then(data => {

            uploadPostImage(image,data.id).then(data=>{
                toast.success("image uploaded too!!!")
            }).catch(error=>{
                toast.error("Error in uploading image")
                console.log(error)
            })

            toast.success("post created but if data is sent to backend, this isn't guaranteed");
            console.log("logging after post created: " + post)
            setPost({
                title: '',
                content: '',
                categoryId: ''
            })
        }).catch((error) => {
            toast.error("post creation failed")
            console.log(error)
        })
    }


    //handling file change event
    const handleFileChange=(event)=>{
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    return (
        <div className="wrapper">
            <Card className="shadow-sm mt-2">
                <CardBody>
                    {/* {JSON.stringify(post)} */}
                    <h3>What's are you thinking</h3>
                    <Form onSubmit={createPost} >
                        <div className="my-2">
                            <Label for="title">Post Title</Label>
                            <Input
                                type="text"
                                id="title"
                                placeholder="Enter here"
                                name="title"
                                onChange={fieldChanged}
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
                                onChange={(newContent)=>contentFieldChanged(newContent)}
                            // config={customConfig}
                            />
                        </div>

                            {/* image file upload */}
                            <div className="mt-3">
                                <Label for="image">Select Post Banner</Label>
                                <Input id="image" type="file" onChange={handleFileChange} />
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
                                onChange={fieldChanged}
                                defaultValue={0}
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
                            <Button type="submit" color="success" outline>Create Post</Button>
                            <Button color="danger" className="ms-2" outline>Reset Post</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost
