//isLoggedIn =>

export const isLoggedIn = () => {
    let data = localStorage.getItem("data")
    if (data != null)
        return true;
    else
        return false;
}

//doLogin => data =>save data to localstorage
export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data))
    next()

}

//doLogout => remove from localstorage
export const doLogout = (next) => {
    localStorage.removeItem("data")
    next()
}

//getCurrentUser
export const getCurrentUserDetail = () => {
    if (isLoggedIn())
        return JSON.parse(localStorage.getItem("data")).user;
    else
        return undefined
}

export const getToken = () => {
    if (isLoggedIn()) {
        // const token = JSON.parse(localStorage.getItem('data')).token
        // console.log("token from getToken from authIndex: "+token)
        return JSON.parse(localStorage.getItem('data')).token
    }
    else
        return null
}
