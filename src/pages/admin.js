import React, {useEffect, useState, useCallback,} from "react";
import Adds from "./add";
import Edits from "./edit";
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

            <span
              style={{
                color: "#fff",
                margin: "0 10px",
                cursor: "pointer",
              }}
              id-user={i}
              onClick={props.HandleEdits}
            >
              Chỉnh Sửa
            </span>
          </div>
        </div>
      );
    }
  }

  return props.dataUser ? data : <></>;
};

const Admin = () => {
  const [checkViewAll, setCheckViewAll] = useState(false);
  const [checkAdd, setCheckAdd] = useState(false);
  const [checkEdits, setCheckEdits] = useState(false);
  const [connection, setConnection] = useState();
  const [dataUser, setDataUser] = useState([]);
  const [idViewAll, setIdViewAll] = useState();
  const [searchInput, setSearchInput] = useState('');

  const HandleOpenModel = () =>{

      const model = document.querySelector(".model-admin");
      model.style.transform = `translateX(0%)`;
  }

  const handleCloseModel = () =>{
     const model = document.querySelector(".model-admin");
     model.style.transform = `translateX(100%)`;
  }
  

  const handleCloseControl = () =>{
    const modelLeft = document.querySelector(".content-left");
    const modelRight = document.querySelector(".content-right");
    modelLeft.style.transform = `translateX(-100%)`;
    modelRight.style.width =`100%`;
    modelRight.style.transition = `all 0.5s linear`
    modelLeft.style.transition = `all 0.5s 0.05s linear`
  }

  const handleOpenControl = () =>{
    const modelLeft = document.querySelector(".content-left");
    const modelRight = document.querySelector(".content-right");
    modelLeft.style.transform = `translateX(0%)`;
    modelRight.style.width =`80%`;
    modelRight.style.transition = `all 0.5s linear`
    modelLeft.style.transition = `all 0.5s linear`
  }

  const HandleViewAll = useCallback((element) => {
    const contentTable__None = document.querySelector(".content-blockchain");
    contentTable__None.style.display = `none`;
    setCheckViewAll(!checkViewAll);
    const idUser = element.target.getAttribute("id-user");
    setIdViewAll(idUser);
  });

  const HandleAdd = useCallback((ele) => {
    const contentTable__None = document.querySelector(".content-blockchain");
    contentTable__None.style.display = `none`;
    setCheckAdd(!checkAdd);
  });

  const HandleEdits = useCallback((element) => {
    const contentTable__None = document.querySelector(".content-blockchain");
    contentTable__None.style.display = `none`;
    setCheckEdits(!checkEdits);
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
  async function search() {
    const dataSearch = await connection.methods.search(searchInput).call()
    const dataNew = [];
    for(let i = 0; i < dataSearch.length; i++){
      if(dataSearch[i].injected !== "0"){
        dataNew.push(dataSearch[i])
      }
    }
    console.log(dataNew);
    setDataUser(dataNew);
  }

  // gọi 
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(searchInput){
      search()
    }
    else{
      loadListUser()
    }
  }

  const addressConstract = process.env.REACT_APP_ADDRESS_SMART_CONTRACT;
  async function SetData() {
    if (!connection) {
      await window.ethereum.enable();
      // eslint-disable-next-line no-undef
      const covac = new web3.eth.Contract(SimpleStorage, addressConstract);
      setConnection(covac);
    }
  }


  const handleLogout = () =>{  // hàm đăng xuất khi click
    localStorage.removeItem("account"); // xóa tài khoản khỏi localStorage
    window.location.reload() // và tải lại trình duyệt
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
                  <h4 style={{ color: "#D1D5DB" }}>Admin</h4>
                  <p style={{ color: "#9CA3AF" }}>
                    Quyền quản trị viên tối cao
                  </p>
                </div>
              </div>
            </div>
            <div className="hr"></div>
            <form onSubmit={handleSubmit}>
              <input type="text" className="search-admin" placeholder="Tìm kiếm ở đây" onChange={(e) => setSearchInput(e.target.value)} />
              <button style={{display: 'none'}}></button>
            </form>
            <div className="nav">
              <ul className="nav-center">
                <li>BIỂU ĐỒ</li>
                <li>THÔNG TIN KHÁCH HÀNG</li>
              </ul>
            </div>
          </div>
          <div className="model-admin">
              <div className="model-admin__main">
              <lottie-player src="https://assets7.lottiefiles.com/private_files/lf30_to198evy.json" loop autoplay
              onClick={handleCloseModel}
              id="closeModel" 
              ></lottie-player>
              
              <h3 className="model-word">Đăng Nhập Bằng User</h3>
                <h3 className="model-word" onClick={handleCloseControl}>Tắt Bảng Điều Khiển</h3>
                <h3 className="model-word" onClick={handleOpenControl}>Bật Bảng Điều Khiển</h3>
                <h3 className="model-word" onClick={handleLogout}>Đăng Xuất</h3>
          </div>  
          </div>
          <div className="content-right">
            <div className="content-right__top">
              <div className="d-flex__between">
                <h1 style={{ color: "#fff" }}>Chào mừng Admin</h1>
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
                    style={{ width: "50px", cursor:"pointer"}}
                    className="open-model"
                    onClick={HandleOpenModel}
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
                  HandleEdits={HandleEdits}
                />
                <div
                  className="btn"
                  style={{
                    width: "100px",
                    textAlign: "center",
                    margin: "30px 0 0 30px",
                  }}
                  onClick={HandleAdd}
                >
                  Thêm
                </div>
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

            {checkEdits &&(
              <Edits 
              setCheckEdits={setCheckEdits}
              connection={connection}
              idViewAll={idViewAll}
              loadListUser={loadListUser}
              checkEdits={checkEdits}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
