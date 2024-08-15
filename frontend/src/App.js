import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, CategoryProduct, ProductSingle, Cart, Search } from "./pages/index";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import Login from './components/Login/Login';
//import Profile from './components/Profile/Profile';
//import Logout from './components/Logout/Logout';
import Registration from './components/Registration/Registration';
//import CustomNav from './components/CustomNav/CustomNav';
//import Protector from './components/Protector';
import AboutPage from './pages/About/About';
import Checkout from "./pages/checkout/checkout";
import CategoryProductPage from './pages/CategoryProductPage/CategoryProductPage';
//import AuthButton from './components/AuthButton/AuthButton';

// Admin Components
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./Admin/Dashboard/Dashboard";
import Users from "./Admin/User Pages/Users";
import User from "./Admin/User Pages/User";
import Orders from "./Admin/Orders Pages/Orders";
import Order from "./Admin/Orders Pages/Order";
import Categories from "./Admin/Category Pages/Categories";
import AddCategory from "./Admin/Category Pages/AddCategory";
import EditCategory from "./Admin/Category Pages/EditCategory";
import CategoryProductAdmin from "./Admin/Category Pages/CategoryProduct";
import Products from "./Admin/Product Pages/Products";
import AddProduct from "./Admin/Product Pages/AddProduct";
import EditProduct from "./Admin/Product Pages/EditProduct";

import { Provider } from "react-redux";

function App() {
  // // Assuming you store the token in localStorage
  // const jwt = localStorage.getItem('token');

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Sidebar />
          
          
          

          <Routes>
            {/* Public Routes */}
            
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductSingle />} />
            <Route path="/category/:category" element={<CategoryProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search/:searchTerm" element={<Search />} />
            {/* <Route path="/custom-nav" element={<CustomNav />} />
            <Route
              path="/profile"
              element={<Protector Component={<Profile token={jwt} />} />}
            /> */}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/logout" element={<Logout />} /> */}
            <Route path="/registration" element={<Registration />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/category-product/:id" element={<CategoryProductPage />} />
            <Route path="/checkout" element={<Checkout />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}></Route>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/users/:userId" element={<User />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/orders/:orderId" element={<Order />} />
            <Route path="/admin/categories" element={<Categories />} />
            <Route path="/admin/categories/add" element={<AddCategory />} />
            <Route path="/admin/categories/products/:categoryId" element={<CategoryProductAdmin />} />
            <Route path="/admin/categories/edit/:categoryId" element={<EditCategory />} />
            <Route path="/admin/products" element={<Products />} />
            <Route path="/admin/products/add" element={<AddProduct />} />
            <Route path="/admin/products/edit/:productId" element={<EditProduct />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
