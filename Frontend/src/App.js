import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";
import MyOrder from "./Components/MyOrder";

import { CardProvider } from "./Components/contextReducer";
import SignIN from "./Screens/SignIN";
import BussinessCardItems from "./Components/BussinessCardItems";
import SignUP from "./Screens/SignUP";
import AdminBusiness from "./Pages/AdminBusiness";
import CRUD from "./Pages/CRUD";
import PasswordAndEmail from "./Pages/PasswordAndEmail";
import ChangePassword from "./Pages/ChangePassword";

function App() {
  return (
    <CardProvider>
      <Router className="">
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            {/* <Route exact path="/login" element={<Login />} />
            <Route exact path="/createAccount" element={<Signup />} /> */}
            <Route exact path="/myOrder" element={<MyOrder />} />
            <Route exact path="/login" element={<SignIN />} />
            <Route exact path="/createAccount" element={<SignUP />} />
            <Route exact path="/AdminBusiness" element={<AdminBusiness />} />
            <Route
              exact
              path="/BusinessPage"
              element={<BussinessCardItems />}
            />
            <Route exact path="/UpdateDetails" element={<CRUD />} />
            <Route exact path="/UpdateInfo" element={<PasswordAndEmail />} />
            <Route exact path="/Updatepass" element={<ChangePassword />} />
          </Routes>
        </div>
      </Router>
    </CardProvider>
  );
}

export default App;
