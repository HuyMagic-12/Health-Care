import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import Header from "./component/header";
import "./assets/main.css";
import Admin from "./pages/admin";
import Edits from "./pages/edit";
import Modal from "./component/modal"


function App() {
  const [showAdmin, setShowAdmin] = useState(localStorage.getItem("account") || false) // thông qua localStorage để xem người dùng đăng nhập hay chưa
  const loginSuccess = () => {
    setShowAdmin(true)
  }


  return (
    <div className="App">
      <div className="main">
        {!showAdmin && <Header loginSuccess={loginSuccess} />}
         {showAdmin && <Admin /> }
      </div>
    </div>
  );
}

export default App;
