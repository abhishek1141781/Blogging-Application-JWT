import React, { useEffect, useState } from 'react'
import Base from '../../components/Base'
import AddPost from '../../components/AddPost'
import { Container } from 'reactstrap'
import { getCurrentUserDetail } from '../../auth/authIndex'
import { deletePostService, loadPostsUserWise } from '../../servicesArea/PostService'
import { toast } from 'react-toastify'
import Post from '../../components/Post'

const UserDashboard = () => {

  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])

  // // Use another useEffect to log the updated 'posts'
  // useEffect(() => {
  //   console.log("Updated 'posts' state:", posts);
  // }, [posts]);

  console.log("posts from userDashboard global area:", posts)

  useEffect(() => {
    console.log("getCurrentUserDetail: ", getCurrentUserDetail())
    setUser(getCurrentUserDetail())
    loadPostData()

  }, [])

  function loadPostData() {
    loadPostsUserWise(getCurrentUserDetail().id).then(data => {
      console.log("data from load post user wise from useEffect: ", data)
      setPosts([...data.content])
      // console.log(data.content)
      console.log(posts)
    }).catch(error => {
      console.log(error)
      toast.error("error in laoding user posts")
    })
  }

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
      <Container>
        <AddPost />

        <h1 className='my-3'>Posts Count: ({posts.length})</h1>

        {posts.map((post, index) => {
          return (
            <Post post={post} key={index} deletePost={deletePostUtility} />
          )
        })

        }
      </Container>
    </Base>
  )
}

export default UserDashboard