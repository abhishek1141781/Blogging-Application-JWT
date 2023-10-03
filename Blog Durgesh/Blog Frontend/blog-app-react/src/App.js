import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import About from './pages/About';
import Services from './pages/Services';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import UserDashboard from './pages/user_routes/UserDashboard';
import ProfileInfo from './pages/user_routes/ProfileInfo';
import PostPage from "./pages/PostPage";
import UserProvider from "./context/UserProvider";
import Categories from "./pages/Categories";
import UpdateBlog from "./pages/UpdateBlog";


function App() {
  return (
    <UserProvider>

      <BrowserRouter>
        <ToastContainer position='bottom-center' />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/posts/:postId' element={<PostPage />} />
          <Route path='/categories/:categoryId' element={<Categories />} />

          <Route path='/user' element={<PrivateRoute />} >
            <Route path='dashboard' element={<UserDashboard />} />
            <Route path='profile-info/:userId' element={<ProfileInfo />} />
            <Route path='update-blog/:blogId' element={<UpdateBlog />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </UserProvider>
  );
}

export default App;
