import React, { useEffect, useState } from 'react'
import { loadAllPosts } from '../servicesArea/PostService'
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'

export const NewFeed = () => {

    // to avoid reading nulls
    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''
    })
    // const [postContent, setPostContent] = useState(null)

    useEffect(() => {

        // loadAllPosts(0, 5).then(data => {
        //     console.log(data)
        //     setPostContent(data)
        //     // console.log(postContent?.pageNumber);
        // }).catch(error => {
        //     console.log(error)
        //     toast.error("Error in loading post")
        // })
        changePage(0)


        //load all posts from server
    }, [])


    const changePage = (pageNumber = 0, pageSize = 5) => {
        loadAllPosts(pageNumber,pageSize).then(data => {
            setPostContent(data)
            window.scroll(0,0)
            console.log(data)
        }).catch(error => {
            toast.error("Error in loading post")
        })
    }


    return (
        <div className="container-fluid">
            <Row>
                <Col md={
                    {
                        size: 10,
                        offset: 1
                    }
                }>
                    {/* Uncaught TypeError: Cannot read properties of null (reading 'totalElements') */}
                    {/* since it's taking time to load, thus make it null(null safe), and then will be updated once fully loaded*/}
                    <h1>Blogs Count ({postContent?.totalElements})</h1>

                    {
                        // PROBLEM: When page reloaded
                        // Uncaught TypeError: Cannot read properties of null (reading 'content')
                        // placing null safe for above error
                        postContent?.content.map((post) => (
                            <Post key={post.id} post={post} />
                        ))
                    }

                    <Container className='text-center mt-3' >
                        <Pagination size=''>
                            <PaginationItem disabled={postContent.pageNumber == 0}>
                                <PaginationLink first>
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem disabled={postContent.pageNumber == 0}>
                                <PaginationLink previous onClick={()=>changePage(--postContent.pageNumber)}>
                                    Previous
                                </PaginationLink>
                            </PaginationItem>



                            {
                                [...Array(postContent.totalPages)].map((item, index) => (
                                    <PaginationItem onClick={() => changePage(index)} active={index == postContent.pageNumber} key={index}>
                                        <PaginationLink>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))
                            }






                            <PaginationItem disabled={postContent.lastPage}  >
                                <PaginationLink next onClick={()=>changePage(++postContent.pageNumber)}>
                                    Next
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem disabled={postContent.lastPage}>
                                <PaginationLink last >
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container>


                </Col>
            </Row>
        </div>
    )
}

export default NewFeed