import React, { useEffect, useState } from 'react'
import { deletePostService, loadAllPosts } from '../servicesArea/PostService'
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap'
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

        if (pageNumber > postContent.pageNumber && postContent.lastPage)
            return;

        if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0)
            return;

        loadAllPosts(pageNumber, pageSize).then(data => {

            setPostContent({
                content: [...postContent.content, ...data.content],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            })

            // window.scroll(0, 0)
            console.log(data)
        }).catch(error => {
            toast.error("Error in loading post")
            console.log(error)
        })
    }

    
  // function to delete post
  function deletePostUtility(post) {
    console.log("post from deletePost: ", post)
    //going to delete post
    deletePostService(post.id).then(data => {
      console.log(data)
      toast.success("post deleted")
      
      let newPostcontents = postContent.content.filter(p=>p.id!=post.id)
      setPostContent({...postContent,content:newPostcontents})

      // let newPosts = posts.filter(p => p.id != post.id)
      // setPosts([...newPosts])

    })
      .catch(error => {
        console.log(error)
        toast.error("error in deleting post")
      })
  }


    const changePageInfinite = () => {
        console.log("page changed")
        setCurrentPage(currentPage + 1)
    }


    return (
        <div className="container-fluid">
            <Row>
                <Col md={
                    {
                        size: 12
                    }
                }>
                    {/* Uncaught TypeError: Cannot read properties of null (reading 'totalElements') */}
                    {/* since it's taking time to load, thus make it null(null safe), and then will be updated once fully loaded*/}
                    <h1>Blogs Count ({postContent.totalElements})</h1>

                    <InfiniteScroll

                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }

                    >
                        {
                            postContent.content.map((post) => (
                                <Post deletePost={deletePostUtility} key={post.id} post={post} />
                            ))
                        }

                    </InfiniteScroll>

                    {/* <Container className='text-center mt-3' >
                        <Pagination size=''>
                            <PaginationItem disabled={postContent.pageNumber == 0}>
                                <PaginationLink first>
                                </PaginationLink>
                            </PaginationItem>

                            <PaginationItem disabled={postContent.pageNumber == 0}>
                                <PaginationLink previous onClick={() => changePage(--postContent.pageNumber)}>
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
                                <PaginationLink next onClick={() => changePage(++postContent.pageNumber)}>
                                    Next
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem disabled={postContent.lastPage}>
                                <PaginationLink last >
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>
                    </Container> */}


                </Col>
            </Row>
        </div>
    )
}

export default NewFeed