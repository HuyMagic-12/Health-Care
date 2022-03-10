import React, {useEffect, useState, useCallback,} from "react";
import Adds from "./add";
import ViewAll from "./viewAll";
import Web3 from "web3/dist/web3.min.js";
import SimpleStorage from "../contracts/SimpleStorage_abi.json";
import "../assets/main.css";
window.Web3 = Web3;
window.web3 = new Web3(window.ethereum);
// import connection from "../connection";
const RowUser = (props) => {
  const data = [];
  // const data_user = await props.dataUser
  if (props.dataUser) {
    for (let i = 0; i < props.dataUser.length; i++) {
      const user = props.dataUser[i];
      data.push(
        <div className="d-flex" key={i}>
          <ul className="d-flex__between col col-style" style={{ flex: 8 }}>
            <li>{user.id}</li>
            <li>{user.name}</li>
            <li>{user.birthDay}</li>
            <li>{user.sex}</li>
            <li>{user.numberCccd}</li>
            <li>{user.phone}</li>
            <li>{user.injected}</li>
          </ul>
          <div className="d-flex__center" style={{ flex: 2 }}>
            <span
              style={{
                color: "#fff",
                margin: "0 10px",
                cursor: "pointer",
              }}
              id-user={i}
              className="addCount"
              onClick={props.HandleViewAll}
            >
              Xem Thêm
            </span>
          </div>
        </div>
      );
    }
  }

  return props.dataUser ? data : <></>;
};

const User = () => {
  const [checkViewAll, setCheckViewAll] = useState(false);
  const [checkAdd, setCheckAdd] = useState(false);
  const [connection, setConnection] = useState();
  const [dataUser, setDataUser] = useState([]);
  const [idViewAll, setIdViewAll] = useState();

  const HandleViewAll = useCallback((element) => {
    const contentTable__None = document.querySelector(".content-blockchain");
    contentTable__None.style.display = `none`;
    setCheckViewAll(!checkViewAll);
    const idUser = element.target.getAttribute("id-user");
    setIdViewAll(idUser);
  });


  async function loadListUser() {
    if (connection) {
      const countPeople = await connection.methods.countPeople().call();
      const dataUser = [];
      for (let i = 0; i < countPeople; i++) {
        const people = await connection.methods.listPeople(i).call();
        dataUser.push(people);
      }
      setDataUser(dataUser);
    }
    // props.setDataUser(dataUser)
  }

  const addressConstract = process.env.REACT_APP_ADDRESS_SMART_CONTRACT;
  async function SetData() {
    if (!connection) {
      console.log("OK");
      await window.ethereum.enable();
      // eslint-disable-next-line no-undef
      const covac = new web3.eth.Contract(SimpleStorage, addressConstract);
      setConnection(covac);
    }
  }
  console.log("OK");
  SetData();
  useEffect(() =>{
    loadListUser()
  }, [connection])

  return (
    <div className="admin">
      <div className="admin-main">
        <div className="d-flex">
          <div className="content-left">
            <div className="info-people">
              <div className="d-flex__center">
                <div className="avatar"></div>
                <div className="name-admin">
                  <h4 style={{ color: "#D1D5DB" }}>USER</h4>
                  <p style={{ color: "#9CA3AF" }}>
                    Bạn đang đăng nhập với quyền user
                  </p>
                </div>
              </div>
            </div>
            <div className="hr"></div>
            <div className="nav">
              <ul className="nav-center">
                <li>BIỂU ĐỒ</li>
                <li>THÔNG TIN KHÁCH HÀNG</li>
                <li>HỒ SƠ VACCINE</li>
              </ul>
            </div>
          </div>
          <div className="model-admin">
              <div className="model-admin__main">
                <h4>Tắt Bảng Điều Khiển</h4>
                <h4>Bật Bảng Điều Khiển</h4>
          </div>  
          </div>
          <div className="content-right">
            <div className="content-right__top">
              <div className="d-flex__between">
                <h1 style={{ color: "#fff" }}>Chào mừng User</h1>
                <div className="d-flex">
                  <lottie-player
                    src="https://assets3.lottiefiles.com/packages/lf20_uk8Lwf.json"
                    loop
                    autoplay
                    style={{ width: "50px" }}
                  ></lottie-player>
                  <lottie-player
                    src="https://assets6.lottiefiles.com/packages/lf20_22votfwd.json"
                    loop
                    autoplay
                    style={{ width: "50px" }}
                  ></lottie-player>
                  <lottie-player
                    src="https://assets4.lottiefiles.com/private_files/lf30_y5awhr6k.json"
                    loop
                    autoplay
                    style={{ width: "50px" }}
                  ></lottie-player>
                </div>
              </div>
            </div>
            <div className="content-blockchain">
              <div className="content-blockchain__main">
                <div className="d-flex">
                  <ul className="d-flex__between col" style={{ flex: 8 }}>
                    <li style={{ color: "#fff" }}>Mã ID</li>
                    <li style={{ color: "#fff" }}> Họ và tên</li>
                    <li style={{ color: "#fff" }}>Ngày sinh</li>
                    <li style={{ color: "#fff" }}>giới tính</li>
                    <li style={{ color: "#fff" }}>số cccd/cmt/ hộ chiếu/ID</li>
                    <li style={{ color: "#fff" }}>số điện thoại</li>
                    <li style={{ color: "#fff" }}>Đã Tiêm</li>
                  </ul>
                  <div style={{ flex: 2 }}></div>
                </div>
                <RowUser
                  dataUser={dataUser}
                  HandleViewAll={HandleViewAll}
                  setIdViewAll={setIdViewAll}
                />
              </div>
            </div>

            {checkAdd && (
              <Adds
                checkAdd={checkAdd}
                setCheckAdd={setCheckAdd}
                connection={connection}
                loadListUser={loadListUser}
              />
            )}
            {checkViewAll && (
              <ViewAll
                setCheckViewAll={setCheckViewAll}
                checkViewAll={checkViewAll}
                dataUser={dataUser}
                idViewAll={idViewAll}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
