import React, { useEffect, useState } from 'react'
import { loadAllPosts } from '../servicesArea/PostService'
import { Col, Row } from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'

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

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        changePage(currentPage)
    }, [currentPage])


    const changePage = (pageNumber = 0, pageSize = 5) => {
        loadAllPosts(pageNumber, pageSize).then(data => {
            // setPostContent(data)
            setPostContent({
                content: [...postContent.content, data.content],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            })
            window.scroll(0, 0)
        }).catch(error => {
            toast.error("Error in loading post")
            console.log(error)
        })
    }

    const changePageInfinite = () => {
        console.log("page changed")
        //reason for the previous null checks (Uncaught TypeError)
        // setPostContent(setCurrentPage(currentPage + 1))
        setCurrentPage(currentPage + 1)
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

                    {/* wrap all components in infinite scroll */}
                    <InfiniteScroll

                        // Uncaught TypeError: Cannot read properties of undefined (reading 'content')
                        dataLength={postContent?.content.length}
                        // next={changePageInfinite}
                        next={loadAllPosts}
                        // Uncaught TypeError: Cannot read properties of undefined (reading 'lastPage')
                        hasMore={!postContent?.lastPage}
                    >
                        {
                            // PROBLEM: When page reloaded
                            // Uncaught TypeError: Cannot read properties of null (reading 'content')
                            // placing null safe for above error
                            postContent?.content.map((post) => (
                                <Post key={post.id} post={post} />
                            ))
                        }
                    </InfiniteScroll>


                </Col>
            </Row>
        </div>
    )
}

export default NewFeed