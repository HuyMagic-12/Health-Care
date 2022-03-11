import React, { useEffect, useState } from "react";
import "../assets/main.css";
import Modal from "../component/modal";

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
              defaultValue={props.dataSelect[`dateInjection${i}`]}
              onChange={props.handleChange}
              placeholder={`Vaccine Loại ${i}`}
              className="enter-edits"
            /> 

        <label htmlFor={`typeVacin${i}`} style={{ color: "#fff" }}>
            Vaccine Loại {i}
          </label>
          <input
            id={`typeVacin${i}`}
            type="text"
            defaultValue={props.dataSelect[`typeVacin${i}`]}
            placeholder={`Loại Mũi Tiêm ${i}`}
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
const dataInputModel = {
  name: "",
  birthDay: "",
  sex: "",
  numberCccd: "",
  phone: "",
  numberHome: "",
  ward: "",
  district: "",
  city: "",
  injected: "",
  datavacin: {
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
}
const Edits = (props) => {
  const [dataInput, setDataInput ] = useState(dataInputModel)
  const [isShowModalLoading, setIsShowModalLoading] = useState(false);
  const [isShowModalError, setIsShowModalError] = useState(false);

  function handleChange(e){
    dataInput.datavacin[e.target.getAttribute('id')] = e.target.value
    setDataInput(dataInput)
  }
  function handleChangeInput(key, data){
    const newData = dataInput;
    newData[key] = data
    setDataInput(newData)
  }

  const handleClickEdit = () => {
    const contentTable__None = document.querySelector(".content-blockchain");
    contentTable__None.style.display = `block`;
    props.setCheckEdits(!props.checkEdits);
  }

  const handleClick = async () => { 

    setIsShowModalLoading(true) // hiện modal đang thực hiện
    const data = props.connection.methods //
      .edit(dataInput, props.idViewAll) 
      .send({ from: localStorage.getItem("account") })
      .once("receipt", (receipt) => {
        console.log(receipt);
        const contentTable__None = document.querySelector(".content-blockchain");
        contentTable__None.style.display = `block`;
        props.setCheckEdits(!props.checkEdits);
      }); // gọi hàm edits trên smark contract


    data  
      .then((res) => {  // nếu thực hiện xong thì gọi loadListUser từ admin
        props.loadListUser()
      })
      .catch((e) => { // nếu lỗi thực hiện cách àm trong này
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
  
  const fetchData = async () => { //dùng để lấy edit từ smark contrack
    const datavacin = await props.connection.methods.listPeople(props.idViewAll).call() // dự vào props.idViewAll để lấy dữ liệu hồ sơ
    const data = {}
    for(let key in dataInput){  // đổ dữ liệu ở datavacin qua data dựa vào state dataInput
      data[key] = datavacin[key]
    }

    data.datavacin = {}
    for(let key in dataInput.datavacin){  // đổ dữ liệu ở datavacin qua data.datavacin dựa vào state dataInput.datavacin
      data.datavacin[key] = datavacin.datavacin[key]
    }
    setDataInput(data) // set State dataInput
  }
  useEffect(() => {
    if(props.idViewAll){
      fetchData()
    }    
  }, [])
  console.log(dataInput);
  return (
    <div className="edits">
      <div className="edits-main">
        <h1 style={{ color: "#fff", paddingTop: "30px", textAlign: "center",backgroundColor:"#313348", padding:"30px 0" }}>
          THÊM THÔNG TIN
        </h1>
        <form className="form-edits" style={{ padding: "50px 0" }}>
          <div className="d-flex" style={{backgroundColor:"#313348", padding:"30px 30px"}}>
            <div style={{ flex: 1, padding: "0 5px" }}>
              <label for="nameUser" style={{ color: "#fff"}}>
                Họ và Tên
              </label>
              <input
                id="nameUser"
                type="text"
                defaultValue={dataInput.name}
                placeholder="Họ Và Tên"
                className="enter-edits"
                onChange={(e) => handleChangeInput("name", e.target.value)}
              />

              <label for="date" style={{ color: "#fff" }}>
                Ngày Sinh
              </label>
              <input
                id="date"
                type="date"
                defaultValue={dataInput.birthDay}
                placeholder="Họ Và Tên"
                className="enter-edits"
                onChange={(e) => handleChangeInput("birthDay", e.target.value)}
              />

              <div className="d-flex" style={{ marginBottom: "30px" }}>
              <label style={{ color: "#fff" }}>Giới Tính</label>
                {addRadios.map(addRadio => (
                  <div key ={addRadio.id}>
                  <input
                type="radio"
                name="sex"
                defaultValue={addRadio.name}
                checked={addRadio.name === dataInput.sex}
                onChange={()=> handleChangeInput("sex", addRadio.name)}
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
                defaultValue={dataInput.numberCccd}
                className="enter-edits"
                onChange={(e) => handleChangeInput("numberCccd" ,e.target.value)}
              />

              <label for="number-sdt" style={{ color: "#fff" }}>
                Số Điện Thoại
              </label>
              <input
                id="number-sdt"
                type="number"
                defaultValue={dataInput.phone}
                placeholder="Số Điện Thoại"
                className="enter-edits"
                onChange={(e) => handleChangeInput("phone", e.target.value)}

              />

              <label for="address-edits" style={{ color: "#fff" }}>
                Địa Chỉ
              </label>
              <input
                id="address-edits"
                type="text"
                defaultValue={dataInput.numberHome}
                placeholder="Địa Chỉ"
                className="enter-edits"
                onChange={(e) => handleChangeInput("numberHome", e.target.value)}

              />

              <label for="xa-edits" style={{ color: "#fff" }}>
                Xã/ Phường
              </label>
              <input
                id="xa-edits"
                type="text"
                placeholder="Xã/ Phường"
                defaultValue={dataInput.ward}
                className="enter-edits"
                onChange={(e) => handleChangeInput("ward", e.target.value)}

              />

              <label for="quan-edits" style={{ color: "#fff" }}>
                Quận/ Huyện
              </label>
              <input
                id="quan-edits"
                type="text"
                defaultValue={dataInput.district}
                placeholder="Quận/ Huyện"
                className="enter-edits"
                onChange={(e) => handleChangeInput("district", e.target.value)}

              />

              <label for="tinh-edits" style={{ color: "#fff" }}>
                Tỉnh/ Thành Phố
              </label>
              <input
                id="tinh-edits"
                type="text"
                defaultValue={dataInput.city}
                placeholder="Tỉnh/ Thành Phố"
                className="enter-edits"
                onChange={(e) => handleChangeInput("city", e.target.value)}

              />
            </div>
            <div style={{ flex: 1, padding: "0 5px" }}>
              <label for="injected" style={{ color: "#fff" }}>
                Đã Tiêm
              </label>
              <input
                id="injected"
                type="text"
                defaultValue={dataInput.injected}
                placeholder="Đã Tiêm"
                className="enter-edits"
                onChange={(e) => handleChangeInput("injected", e.target.value)}
                
              />
              <EventAdd injected={dataInput.injected} dataSelect={dataInput.datavacin} handleChange={handleChange} />
            </div>
          </div>
          <div className="d-flex__between">
          <button type="button" className="btn" onClick={handleClick}>
            CHỈNH SỬA
          </button>
          <lottie-player src="https://assets3.lottiefiles.com/packages/lf20_ps0nflqs.json"
            loop
            autoplay
            style={{width:"50px", cursor: "pointer"}}
            onClick={handleClickEdit}
            ></lottie-player>
          </div>
        </form>
      </div>
      {isShowModalError && <Modal>
        <h1 style={{margin:"10px 0"}}>Có lỗi từ metamask</h1>
          <lottie-player
            src="https://assets6.lottiefiles.com/packages/lf20_suhe7qtm.json"
            loop
            autoplay
            style={{ width: "200px", margin:"auto" }}
          ></lottie-player>
      </Modal>}
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

export default Edits;
