import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, CategoryProduct, ProductSingle, Cart, Search } from "./pages/index";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import Login from "./components/Login/Login";
import LoginModal from './components/Login/LoginModal';
import Register from "./components/Register/Register";
import RegisterModal from './components/Register/RegisterModal';
import AboutPage from './pages/About/About';
import Checkout from './pages/checkout/checkout'; // Corrected import path

import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Sidebar />

          <Routes>
            {/* home page route */}
            <Route path="/" element={<Home />} />
            {/* single product route */}
            <Route path="/product/:id" element={<ProductSingle />} />
            {/* category wise product listing route */}
            <Route path="/category/:category" element={<CategoryProduct />} />
            {/* cart */}
            <Route path="/cart" element={<Cart />} />
            {/* checkout */}
            <Route path="/checkout" element={<Checkout />} />
            {/* searched products */}
            <Route path="/search/:searchTerm" element={<Search />} />
            {/* login page */}
            <Route path="/login" element={<Login showModal={true} />} />
            {/* register page */}
            <Route path="/register" element={<Register showModal={true} />} />
            {/* about page */}
            <Route path="/about" element={<AboutPage />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
