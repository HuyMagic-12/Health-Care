import React, { useState } from "react";
import "../assets/main.css";
import Modal from '../component/modal'

function EventAdd(props) {
  
  var arrayAdd = []
  if(props.injected < 6){
  for(let i = 1 ; i <= props.injected ; i++ ){
    arrayAdd.push(
      <div key={i}>

        <label for={`dateInjection + ${i}`} style={{ color: "#fff" }}>
             Ngày Tiêm Mũi {i}
            </label>
            <input
              id= {`dateInjection${i}`}
              type="date"
              onChange={props.handleChange}
              className="enter-edits"
            /> 

        <label htmlFor={`typeVacin${i}`} style={{ color: "#fff" }}>
            Vaccine Loại {i}

          </label>
          <input
            id={`typeVacin${i}`}
            type="text"
            placeholder={`Vaccine Loại ${i}`}
            onChange={props.handleChange}
            className="enter-edits"
          />

      </div>
    )
  }
} 
  else{
    arrayAdd.push(
      <></>
    )
  }
  return(
    arrayAdd
  )
};
const dataVacinModel = {
  typeVacin1: "",
  typeVacin2: "",
  typeVacin3: "",
  typeVacin4: "",
  typeVacin5: "",
  dateInjection1: "",
  dateInjection2: "",
  dateInjection3: "",
  dateInjection4: "",
  dateInjection5: ""
}

const Adds = (props) => {
  console.log("OK");
  const [nameUser, setNameUser] = useState();
  const [birthDay, setBirthDay] = useState();
  const [sex, setSex] = useState();
  const [numberCccd, setNumberCccd] = useState();
  const [phone, setPhone] = useState();
  const [numberHome, setNumberHome] = useState();
  const [ward, setWard] = useState();
  const [district, setDistrict] = useState();
  const [city, setCity] = useState();
  const [injected, setInjected] = useState();
  const [isShowModalLoading, setIsShowModalLoading] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);
  
  const [datavacin, setDatavacin] = useState(null)
  if(!datavacin){
    setDatavacin(dataVacinModel)
  }

  function handleChange(e){
    dataVacinModel[e.target.getAttribute('id')] = e.target.value
    setDatavacin(dataVacinModel)
  }

  const handleClickAdd = () => {
    const contentTable__None = document.querySelector(".content-blockchain");
    contentTable__None.style.display = `block`;
    props.setCheckAdd(!props.checkAdd);
  }
  
  const handleClick = async () => { // hàm add
    setIsShowModalLoading(true) // set modal loading lên
    const data = props.connection.methods // thực hiện add
      .Add({
        name: `${nameUser}`,
        birthDay: `${birthDay}`,
        sex: `${sex}`,
        numberCccd: `${numberCccd}`,
        phone: `${phone}`,
        numberHome: `${numberHome}`,
        ward: `${ward}`,
        district: `${district}`,
        city: `${city}`,
        injected: `${injected}`,
        datavacin,
      })
      .send({ from: localStorage.getItem("account") })  // lấy account trong localStorage ra
      .once("receipt", (receipt) => { // khi mà thực hiện xong 
        const contentTable__None = document.querySelector(".content-blockchain");
        contentTable__None.style.display = `block`;
        props.setCheckAdd(!props.checkAdd);
        console.log(receipt);
      });
    data
      .then((res) => {  //khi mà thực hiện xong
        props.loadListUser()
      })
      .catch((e) => { // nếu sai thực hiện
        setIsShowModalLoading(false)
        setIsShowModalError(true)
        // Handle error
      });
  };



  const addRadios = [
    {
      id:1,
      name: 'Nam'
    },
    {
      id:2,
      name: 'Nữ'
    },
    {
      id:3,
      name: 'Khác'
    }
  ]

  return (
    <div className="edits">
      <div className="edits-main">
        <h1 style={{ color: "#fff", paddingTop: "30px", textAlign: "center" }}>
          THÊM THÔNG TIN
        </h1>
        <form className="form-edits" style={{ padding: "50px 0" }}>
          <div className="d-flex">
            <div style={{ flex: 1, padding: "0 5px" }}>
              <label for="nameUser" style={{ color: "#fff" }}>
                Họ và Tên
              </label>
              <input
                id="nameUser"
                type="text"
                placeholder="Họ Và Tên"
                className="enter-edits"
                onChange={(e) => setNameUser(e.target.value)}
              />

              <label for="date" style={{ color: "#fff" }}>
                Ngày Sinh
              </label>
              <input
                id="date"
                type="date"
                placeholder="Họ Và Tên"
                className="enter-edits"
                onChange={(e) => setBirthDay(e.target.value)}
              />

              <div className="d-flex" style={{ marginBottom: "30px" }}>
              <label style={{ color: "#fff" }}>Giới Tính</label>
                {addRadios.map(addRadio => (
                  <div key ={addRadio.id}>
                  <input
                type="radio"
                name="sex"
                onChange={()=> setSex(addRadio.name)}
                style={{color:'#fff', marginLeft:'10px'}}
                />
                 <span
                 style={{color:'#fff',marginLeft:'10px'}}
                 >{addRadio.name}</span>
                 </div>
                ))}
              </div>

              <label for="number-cccd" style={{ color: "#fff" }}>
                Số Cccd/Cmt/ Hộ chiếu/ID
              </label>
              <input
                id="number-cccd"
                type="number"
                placeholder="Số Cccd/Cmt/ Hộ chiếu/ID"
                className="enter-edits"
                onChange={(e) => setNumberCccd(e.target.value)}
              />

              <label for="number-sdt" style={{ color: "#fff" }}>
                Số Điện Thoại
              </label>
              <input
                id="number-sdt"
                type="number"
                placeholder="Số Điện Thoại"
                className="enter-edits"
                onChange={(e) => setPhone(e.target.value)}

              />

              <label for="address-edits" style={{ color: "#fff" }}>
                Địa Chỉ
              </label>
              <input
                id="address-edits"
                type="text"
                placeholder="Địa Chỉ"
                className="enter-edits"
                onChange={(e) => setNumberHome(e.target.value)}

              />

              <label for="xa-edits" style={{ color: "#fff" }}>
                Xã/ Phường
              </label>
              <input
                id="xa-edits"
                type="text"
                placeholder="Xã/ Phường"
                className="enter-edits"
                onChange={(e) => setWard(e.target.value)}

              />

              <label for="quan-edits" style={{ color: "#fff" }}>
                Quận/ Huyện
              </label>
              <input
                id="quan-edits"
                type="text"
                placeholder="Quận/ Huyện"
                className="enter-edits"
                onChange={(e) => setDistrict(e.target.value)}

              />

              <label for="tinh-edits" style={{ color: "#fff" }}>
                Tỉnh/ Thành Phố
              </label>
              <input
                id="tinh-edits"
                type="text"
                placeholder="Tỉnh/ Thành Phố"
                className="enter-edits"
                onChange={(e) => setCity(e.target.value)}

              />
            </div>
            <div style={{ flex: 1, padding: "0 5px" }}>
              <label for="injected" style={{ color: "#fff" }}>
                Đã Tiêm
              </label>
              <input
                id="injected"
                type="text"
                placeholder="Đã Tiêm"
                className="enter-edits"
                onChange={(e) => setInjected(e.target.value)}
                
              />

              {/* <label for="date3" style={{ color: "#fff" }}>
           Ngày Tiêm Mũi 3
          </label>
          <input
            id="date3"
            type="date"
            placeholder="Ngày Tiêm Mũi 3"
            className="enter-edits"
          />

        <label for="Vaccine3" style={{ color: "#fff" }}>
           Vaccine Loại 3
          </label>
          <input
            id="Vaccine3"
            type="text"
            placeholder="Vaccine Loại 3"
            className="enter-edits"
          /> */}
              <EventAdd injected={injected} dataVacinModel={dataVacinModel} handleChange={handleChange} />
            </div>
          </div>
          <div className="d-flex__between">
          <button type="button" className="btn" onClick={handleClick}>
            CẬP NHẬT
          </button>
          <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_ps0nflqs.json"
            loop
            autoplay
            style={{width:"50px", cursor: "pointer"}}
            onClick={handleClickAdd}
            ></lottie-player>
          </div>
        </form>
      </div>
      {/*khi mình từ chối hiện form này trong metamask  */}
      {isShowModalError && <Modal> 
        <h1 style={{margin:"10px 0"}}>Có lỗi từ metamask</h1>
          <lottie-player
            src="https://assets6.lottiefiles.com/packages/lf20_suhe7qtm.json"
            loop
            autoplay
            style={{ width: "200px", margin:"auto" }}
          ></lottie-player>
      </Modal>}
      {/*khi mình đồng ý hiện form này trong metamask  */}
      {isShowModalLoading && <Modal>
        <h1 style={{margin:"10px 0"}}>Đang đợi phê duyệt từ metamask</h1>
          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_szlepvdh.json"
            loop
            autoplay
            style={{ width: "200px", margin:"auto" }}
          ></lottie-player>
      </Modal>}
    </div>
  );
};

export default Adds;
