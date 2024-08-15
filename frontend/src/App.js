import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, CategoryProduct, ProductSingle, Cart, Search } from "./pages/index";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import AboutPage from './pages/About/About';
import Checkout from "./pages/checkout/checkout";
import CategoryProductPage from './pages/CategoryProductPage/CategoryProductPage';

import { Provider } from "react-redux";

function App() {
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
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/category-product/:id" element={<CategoryProductPage />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
