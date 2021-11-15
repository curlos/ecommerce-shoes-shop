import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import ProductList from "./pages/ProductList";
import Navbar from "./components/Navbar";
import Home from './pages/Home'
import FullShoePage from './pages/FullShoePage'
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import { Footer } from "./components/Footer";
import { useSelector } from 'react-redux'
import { RootState } from "./redux/store";
import ReviewForm from "./pages/ReviewForm";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import SearchModal from "./components/SearchModal";
import StripeContainer from "./components/StripeContainer";
import PaymentSuccess from "./pages/PaymentSuccess";
import CheckoutForm from "./pages/CheckoutForm";
import OrderDetails from "./pages/OrderDetails";

const App = () => {

  const user = useSelector((state: RootState) => state.user && state.user.currentUser)
  const [showModal, setShowModal] = useState(false)


  return (
    <Router>

      <div className="m-0 box-border font-urbanist">

        {showModal ? <SearchModal showModal={showModal} setShowModal={setShowModal} /> : null}
        <Navbar setShowModal={setShowModal} />


        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/register" exact>
            {user && Object.keys(user).length > 0 ? <Redirect to='/' /> : (
              <span>
                <Register />
              </span>
            )}
          </Route>

          <Route path="/cart" exact>
            <Cart />
          </Route>

          <Route path="/payment" exact>
            <StripeContainer children={<CheckoutForm />} />
          </Route>

          <Route path="/payment-success" exact>
            <StripeContainer children={<PaymentSuccess />} />
          </Route>

          <Route path="/shoes" exact>
            <ProductList />
          </Route>

          <Route path="/shoe/:shoeID" exact>
            <FullShoePage />
          </Route>

          <Route path="/shoe/submit-review/:shoeID" exact>
            <ReviewForm />
          </Route>

          <Route path="/shoe/edit-review/:shoeID/:reviewID" exact>
            <ReviewForm />
          </Route>

          <Route path="/profile/:userID" exact>
            <Profile />
          </Route>

          <Route path="/orders" exact>
            {user && Object.keys(user).length === 0 ? <Redirect to='/' /> : (
              <span>
                <Orders />
              </span>
            )}
          </Route>

          <Route path="/order-details/:id" exact>
            {user && Object.keys(user).length === 0 ? <Redirect to='/' /> : (
              <span>
                <OrderDetails />
              </span>
            )}
          </Route>

          <Route path="/favorites" exact>
            <Favorites />
          </Route>

          <Route path="/settings" exact>
            {!user ? <Redirect to='/' /> : (
              <span>
                <Settings />
              </span>
            )}
          </Route>


          <Route path="/" exact>
            <Home />
          </Route>

        </Switch>

        <Footer />
      </div>


    </Router>

  );
}

export default App;
