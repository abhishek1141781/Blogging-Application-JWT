import { myAxios, privateAxios } from "./helper"

// create post function
export const writePost = (postData) => {
    console.log("postData recieved by the writePost func, which'll hit data to the mapped url" + postData)


    // cors error while privateAxios.post and thus the error block is posted
    // return privateAxios.post('/user/${postData.userId}/category/${postData.id}/posts', postData)
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`, postData)
        .then((response) => response.data)
        .catch((error) => {

            // console.error("console.error from => PostService => servicesArea: "+error)
            // if config.headers OR config.headers.common is not initialized to {} or even if it is, error
            // is thrown here

            //First Case: config.headers OR config.headers.common is not initialized to {}
            //TypeError: Cannot set properties of undefined (setting 'Authorization')

            //Second Case: 
            //CORS error in second case
            // Access to XMLHttpRequest at 'http://localhost:5000/api/v1/user/$%7BpostData.userId%7D/category/$%7BpostData.id%7D/posts' from origin 'http://localhost:3000' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

            console.log("console.log from => PostService => servicesArea: " + error)
        })
}



// get all posts 
// since all get methods are public we don't need privateAxios
export const loadAllPosts = (pageNumber, pageSize) => {
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
        .then(response => response.data)
}

// load single post of given id
export const loadPost = (id) => {
    // console.log("postId from loadPost of PostService: ", id)
    return myAxios.get(`/posts/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.log(error)
        })
}

//post Comment
export const createComment = (comment, pid) => {
    return privateAxios.post(`/post/${pid}/comment`, comment)
}

//upload post banner image

export const uploadPostImage = (image, postId) => {
    let formData = new FormData();
    formData.append("image", image)

    return privateAxios
        .post(`/post/image/upload/${postId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response) => response.data)
}
//get category wise data
// export function loadPostCategoryWise (categoryId) {
//     return privateAxios.get(`/category/${categoryId}/posts`).then(response => response.data);
// }

//get category wise data
export const loadPostCategoryWise = (categoryId) => {
    return privateAxios.get(`/category/${categoryId}/posts`)
        .then(response => response.data);
}

//get posts userwise
export function loadPostsUserWise(userId) {
    return privateAxios
        .get(`/user/${userId}/posts`)
        .then(response => response.data)
}

//delete post
export function deletePostService(postId) {
    return privateAxios.delete(`/posts/${postId}`).then(response => response.data)
}

//update post
export function updatePostService(post, postId) {
    console.log("post from update post service: ",post)
    return privateAxios.put(`/posts/${postId}`, post).then((resp) => resp.data)
}