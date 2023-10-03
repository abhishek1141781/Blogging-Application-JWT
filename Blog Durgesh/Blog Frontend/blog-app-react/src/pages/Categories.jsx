import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from "reactstrap";
import CategorySideMenu from '../components/CategorySideMenu';
import { deletePostService, loadPostCategoryWise } from '../servicesArea/PostService';
import { toast } from 'react-toastify';
import Post from '../components/Post';

function Categories() {

    const [posts, setPosts] = useState([])

    const { categoryId } = useParams()
    useEffect(() => {
        console.log(categoryId)
        loadPostCategoryWise(categoryId).then(data => {
            // setPosts([...data])
            setPosts([...data.content])
            // const dataArr = Object.values(data)
            console.log("non array data: ", data)
            // setPosts([...dataArr])
            // setPosts([Object.values(...data)])
            // .catch(error => {
            //     console.log("error from inside setPosts: ", error)
            // })
        }).catch(error => {
            console.log("from line 23: ", error)
            toast.error("error in loading posts")
        })
    }, [categoryId])


    // function to delete post
    function deletePostUtility(post) {
        console.log("post from deletePost: ", post)
        //going to delete post
        deletePostService(post.id).then(data => {
            console.log(data)
            toast.success("post deleted")
            // loadPostData()
            let newPosts = posts.filter(p => p.id != post.id)
            setPosts([...newPosts])

        })
            .catch(error => {
                console.log(error)
                toast.error("error in deleting post")
            })
    }


    return (
        <Base>
            <Container className="mt-2" >{/* <NewFeed /> */}
                <Row>

                    <Col md={2} className="pt-5"><CategorySideMenu /></Col>

                    <Col md={10}>

                        <h1>Blogs Count ({posts.length})</h1>


                        {
                            posts && posts.map((post, index) => {
                                return (
                                    <Post post={post} key={index} deletePost={deletePostUtility} />
                                )
                            })
                        }

                    </Col>

                </Row>
            </Container>

        </Base>
    )
}

export default Categories