import React, { useState, useRef, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import Modal from "./modal";
import logo from "../assets/image/logo.png";
import anh1 from "../assets/image/news-1.jpeg";
import anh2 from "../assets/image/new2.jpeg";
import anh3 from "../assets/image/new3.png";
import anh4 from "../assets/image/new4.jpeg";
import anh5 from "../assets/image/new5.jpg";
import anh6 from "../assets/image/new6.jpg";

import "../assets/main.css";

const Header = (props) => {
  const [showGoToTop,setShowGoToTop] = useState(false)
  const [isShowModalLoading, setIsShowModalLoading] = useState(false)
  const [isShowModalError, setIsShowModalError] = useState(false)
  useEffect(()=>{
	const handleScroll = () =>{
		if(window.scrollY >=200){
			setShowGoToTop(true)

		}
		else{
			setShowGoToTop(false)
		}
	}
		window.addEventListener('scroll',handleScroll);

		return () =>{
			window.removeEventListener('scroll', handleScroll)
		}
  },[])

  const handleHiddenScroll = () => window.scrollTo({top:0, behavior:"smooth"});
  


  const connectWalletHandler = async () => { //async hàm bất đồng bộ hóa trả về promise
  

    if (window.ethereum && window.ethereum.isMetaMask) {    // kiểm tra trình duyệt có metamask chưa
      setIsShowModalLoading(true) // nếu có thì set setIsShowModalLoading bằng true
      try { // thực hiện khi trình duyệt đã có metamask
        const accounts = await window.ethereum.request({  // yêu cầu người dùng đăng nhập
          method: "eth_requestAccounts",
        }); 
        const account = accounts[0];  // lấy account từ metamask
        localStorage.setItem("account", account); //set biến account vào trong localStorage
        props.loginSuccess(); // thực hiện hàm loginSuccess
      } catch (   // catch là thực hiện lỗi nếu không đăng nhập được 
        error // Nếu lỗi thực hiện câu lệnh bên trong
      ) {
      }
    }
    else{   // nếu như trình duyệt không có metamask
      setIsShowModalError(true) // thực hiện hàm setIsShowModalError bằng true
    }
  };

  const handleSymptom = () => { window.scrollTo({top:1000, behavior:"smooth"})}
  const handleCaMac =() => {window.scrollTo({top:2000, behavior:"smooth"})}
  const handleNews =() => {window.scrollTo({top:2500, behavior:"smooth"})}

  return (
    <div className="header">
      <div className="header-main">
        <div className="wrappers">
          <div className="bg-header">
            <div
              className="d-flex__between"
              style={{ alignItems: "center", padding: "10px 20px 0 20px" }}
            >
              <div className="d-flex__center">
                <img src={logo} id="logo" />
                <h2 style={{ margin: "0 5px" }}>NHÓM UKN</h2>
              </div>
              <div className="d-flex">
                <lottie-player
                  src="https://assets4.lottiefiles.com/private_files/lf30_jo7huq2d.json"
                  speed="1"
                  loop
                  autoplay
                  id="icon-search"
                ></lottie-player>
                <input type="text" className="input" placeholder="Tìm kiếm" />
              </div>
              <button
                type="button"
                onClick={connectWalletHandler}
                className="btn"
              >
                ĐĂNG NHẬP
              </button>
            </div>

            <div className="slider">
              <lottie-player
                src="https://assets3.lottiefiles.com/private_files/lf30_V7dVXe.json"
                loop
                autoplay
              ></lottie-player>
            </div>

            <div className="nav">
              <ul className="nav-main d-flex__center">
                <li onClick={handleSymptom}>
                TRIỆU CHỨNG
                </li>
                <li onClick={handleCaMac}>
                 CA MẮC
                </li>
                <li
                onClick={handleNews}
                >
                 TIN TỨC
                </li>
                <li>FAQ</li>
              </ul>
            </div>

            <div className="content-header" style={{ padding: "50px 0" }}>
              <div id="content-1">
                <div
                  className="d-flex"
                  style={{ alignItems: "center", padding: "30px 0" }}
                >
                  <lottie-player
                    src="https://assets7.lottiefiles.com/private_files/lf30_1KyL2Q.json"
                    loop
                    autoplay
                    style={{ flex: "1", height: "250px" }}
                  ></lottie-player>
                  <div style={{ flex: "1" }}>
                    <p>
                      Các triệu chứng thường gặp nhất: sốt, ho, mệt mỏi, mất vị
                      giác hoặc khứu giác
                    </p>
                    <p style={{ marginTop: "10px", width: "75%" }}>
                      Các triệu chứng ít gặp hơn: đau họng, đau họng, đau nhức,
                      tiêu chảy, mắt đỏ hoặc ngứa
                    </p>
                    <p style={{ marginTop: "10px", width: "75%" }}>
                      Các triệu chứng nghiêm trọng: khó thở, mất khả năng nói
                      hay cử động hoặc thấy lú lẫn, đau ngực
                    </p>
                  </div>
                </div>

                <div
                  className="d-flex"
                  style={{ alignItems: "center", padding: "30px 0" }}
                >
                  <div style={{ flex: "1", marginLeft: "150px" }}>
                    <p>COVID-19 lây lan theo ba cách chính:</p>
                    <p style={{ marginTop: "10px", width: "75%" }}>
                      Hít vào không khí khi ở gần người bị nhiễm bệnh đang thở
                      ra những giọt nhỏ và các hạt có chứa vi-rút.
                    </p>
                    <p style={{ marginTop: "10px", width: "75%" }}>
                      Để những giọt nhỏ và các hạt có chứa vi-rút rơi vào mắt,
                      mũi hoặc miệng, đặc biệt là thông qua sự bắn tóe và tia
                      xịt như ho hoặc hắt hơi.
                    </p>
                    <p style={{ marginTop: "10px", width: "75%" }}>
                      Chạm vào mắt, mũi hoặc miệng bằng tay có vi-rút trên đó.
                    </p>
                  </div>
                  <lottie-player
                    src="https://assets3.lottiefiles.com/packages/lf20_y1eqwwb2.json"
                    loop
                    autoplay
                    style={{ flex: "1", height: "300px", marginRight: "150px" }}
                  ></lottie-player>
                </div>

                <div
                  className="d-flex"
                  style={{ alignItems: "center", padding: "30px 0" }}
                >
                  <lottie-player
                    src="https://assets5.lottiefiles.com/packages/lf20_6pawzxxs.json"
                    loop
                    autoplay
                    style={{ flex: "1", height: "250px" }}
                  ></lottie-player>
                  <div style={{ flex: "1" }}>
                    <p style={{ width: "75%" }}>
                      Cách ngăn chặn COVID-19 lây lan:
                    </p>
                    <p style={{ marginTop: "10px", width: "75%" }}>
                      Giữ khoảng cách an toàn với người khác (ít nhất 1 mét), kể
                      cả khi họ không có biểu hiện bệnh.
                    </p>
                    <p style={{ marginTop: "10px", width: "75%" }}>
                      Đeo khẩu trang ở nơi công cộng, nhất là khi ở trong nhà
                      hoặc khi không thể giữ khoảng cách.
                    </p>
                    <p style={{ marginTop: "10px", width: "75%" }}>
                      Chọn những không gian mở, thông thoáng thay vì những không
                      gian kín. Mở cửa sổ nếu ở trong nhà.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div id="content-2">
              <div className="">
                <lottie-player
                  src="https://assets8.lottiefiles.com/packages/lf20_8axjdnts.json"
                  loop
                  autoplay
                  style={{ width: "55%", margin: "auto" }}
                ></lottie-player>
                <div
                  className=""
                  style={{ position: "relative", bottom: "100px" }}
                >
                  <p style={{ textAlign: "center" }}>
                    Tổng số ca mắc hiện nay khoảng 4,78tr tại Việt Nam
                  </p>
                  <p style={{ textAlign: "center" }}>
                    Trong đó số ca tử vong là 40.977
                  </p>
                </div>
              </div>
            </div>
            <hr />
            <div
              className="news"
              style={{ paddingBottom: "30px" }}
              id="content-3"
            >
              <div className="news-main">
                <div className="d-flex">
                  <div
                    className="d-flex__left"
                    style={{
                      flex: "1",
                      borderRight: "1px solid #5e6e7f",
                      margin: "30px",
                      paddingRight: "30px",
                    }}
                  >
                    <h2
                      style={{
                        transform: "translateX(10%)",
                        margin: "10px 0 10px 20px",
                      }}
                    >
                      Chỉ đạo chống dịch
                    </h2>
                    <div className="">
                      <div className="d-flex__end">
                        <img src={anh1} />
                        <div
                          className=""
                          style={{ width: "50%", margin: "0 5px" }}
                        >
                          <h3>
                            Đề xuất người nhập cảnh không cần có xác nhận tiêm
                            vaccine hoặc đã...
                          </h3>
                          <p style={{ margin: "10px 0" }}>
                            Bộ Y tế vừa có dự thảo lấy ý kiến về yêu cầu phòng,
                            chống dịch đối với người...
                          </p>
                        </div>
                      </div>
                      <hr style={{ margin: "30px 0 30px 90px" }} />
                    </div>

                    <div className="">
                      <div className="d-flex__end">
                        <img src={anh2} />
                        <div
                          className=""
                          style={{ width: "50%", margin: "0 5px" }}
                        >
                          <h3>
                            Bộ Y tế đề xuất công nhận 7 loại giấy tờ để F0 điều
                            trị tại nhà được hưởng...
                          </h3>
                          <p style={{ margin: "10px 0" }}>
                            Theo thống kê sơ bộ, tính đến 01/3/2022, cả nước có
                            khoảng 920.000 F0 điều trị...
                          </p>
                        </div>
                      </div>
                      <hr style={{ margin: "30px 0 30px 90px" }} />
                    </div>

                    <div className="">
                      <div className="d-flex__end">
                        <img src={anh3} />
                        <div
                          className=""
                          style={{ width: "50%", margin: "0 5px" }}
                        >
                          <h3>
                            Bộ Y tế: Tăng cường kiểm tra, phát hiện, ngăn chặn
                            việc mua, bán thuốc...
                          </h3>
                          <p style={{ margin: "10px 0" }}>
                            Cục Quản lý Dược, Bộ Y tế gửi Sở Y tế các tỉnh,
                            thành tiếp tục yêu cầu các địa...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="d-flex__right"
                    style={{ flex: "1", margin: "30px" }}
                  >
                    <h2 style={{ margin: "10px 0 10px 0" }}>
                      Bản tin Covid-19
                    </h2>
                    <div className="">
                      <div className="d-flex">
                        <img
                          src={anh4}
                          style={{ height: "122px", width: "230px" }}
                        />
                        <div
                          className=""
                          style={{ width: "50%", margin: "0 5px" }}
                        >
                          <h3>
                            Sáng 10/3: Hơn 3.800 ca COVID-19 nặng đang điều trị;
                            Ra mắt 3 sổ tay...
                          </h3>
                          <p style={{ margin: "10px 0" }}>
                            SKĐS - Bộ Y tế cho biết đến nay đã có hơn 2,85 triệu
                            ca COVID-19 tại Việt Nam...
                          </p>
                        </div>
                      </div>
                      <hr style={{ margin: "30px 0 30px 0px" }} />
                    </div>

                    <div className="">
                      <div className="d-flex">
                        <img
                          src={anh5}
                          style={{ height: "122px", width: "230px" }}
                        />
                        <div
                          className=""
                          style={{ width: "50%", margin: "0 5px" }}
                        >
                          <h3>
                            Ngày 9/3: Số mắc COVID-19 cả nước tăng lên 164.596
                            ca; 3 tỉnh bổ...
                          </h3>
                          <p style={{ margin: "10px 0" }}>
                            SKĐS - Bản tin dịch COVID-19 ngày 9/3 của Bộ Y tế
                            chi biết cả nước ghi...
                          </p>
                        </div>
                      </div>
                      <hr style={{ margin: "30px 0 30px 0px" }} />
                    </div>

                    <div className="">
                      <div className="d-flex">
                        <img src={anh6} />
                        <div
                          className=""
                          style={{ width: "50%", margin: "0 5px" }}
                        >
                          <h3>
                            Chiều 9/3: Cả nước đã tiêm gần 198,7 triệu liều
                            vaccine phòng COVID-19; trong...
                          </h3>
                          <p style={{ margin: "10px 0" }}>
                            Đến chiều ngày 9/3, cả nước đã tiêm gần 198,7 triệu
                            liều vaccine phòng...
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
	
          </div>
        </div>

		{showGoToTop && 
		<div className="showGoToTop"
		onClick={handleHiddenScroll}
		>
			<lottie-player src="https://assets10.lottiefiles.com/packages/lf20_zoo2lscy.json"loop autoplay style={{height:"100px"}}></lottie-player>
		</div>
		}
      </div>
      {isShowModalError && <Modal>
        <h1 style={{margin:"10px 0"}}>Trình Duyệt Của Bạn Chưa Cài Đặt MetaMask</h1>
          <lottie-player
            src="https://assets6.lottiefiles.com/packages/lf20_suhe7qtm.json"
            loop
            autoplay
            style={{ width: "200px", margin:"auto" }}
          ></lottie-player>
          <h3 style={{width:"500px", margin:"auto", padding:"20px 0"}}>
            Ôi không trình duyệt của bạn chưa cài đặt MetaMask vui lòng nhấn bên
            dưới để tải MeTaMask và trải nghiệm
          </h3>
          <div className="btn"
          style={{width:"150px", margin:"auto",textAlign:"center",color:"#fff"}}
          >
            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=vi"
            target= "_blank"
            style={{textDecoration: "none",color:"#fff"}}
            >
              Tải MetaMask
            </a>
          </div>
      </Modal>}

      {/* Lúc đăng nhập */}
      {isShowModalLoading && <Modal>  
        <h1 style={{margin:"10px 0"}}>Đang đăng nhập</h1>
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_4jyai6ec.json"
            loop
            autoplay
            style={{ width: "200px", margin:"auto" }}
          ></lottie-player>
      </Modal>}
    </div>
  );
};

export default Header;
