import React, { useEffect, useState } from "react";

const ArrayViewAll = (props) => {
  const arryViewAll = [];

  if (props.dataUser) {
      const user = props.dataUser[props.idViewAll];
      arryViewAll.push(
        <div className="d-flex__between">
          <div className="view-left" style={{ flex: 1, minHeight:"920px"}}>
            <div className="bg-view">
              <p>Mã ID: {user.id}</p>
              <p>Họ Và Tên: {user.name}</p>
              <p>Ngày Sinh: {user.birthDay}</p>
              <p>Giới Tính: {user.sex}</p>
              <p>Số Cccd/Cmt/ Hộ Chiếu/ID: {user.numberCccd}</p>
              <p>Số Điện Thoại: {user.phone}</p>
              <p>Địa Chỉ: {user.numberHome}</p>
              <p>Xã / Phường: {user.ward}</p>
              <p>Quận / Huyện: {user.district}</p>
              <p>Tỉnh / Thành Phố: {user.city}</p>
            </div>
          </div>
          <div className="view-right" style={{ flex: 1 }}>
            <div className="bg-view">
              <p>Đã Tiêm: {user.injected}</p>
              {user.datavacin.dateInjection1 && <p>Ngày Tiêm Mũi 1: {user.datavacin.dateInjection1}</p>}
              {user.datavacin.typeVacin1 && <p>Mũi 1 loại: {user.datavacin.typeVacin1}</p>}
              {user.datavacin.dateInjection2 && <p>Ngày Tiêm Mũi 1: {user.datavacin.dateInjection2}</p>}
              {user.datavacin.typeVacin2 && <p>Mũi 2 loại: {user.datavacin.typeVacin2}</p>}
              {user.datavacin.dateInjection3 && <p>Ngày Tiêm Mũi 1: {user.datavacin.dateInjection3}</p>}
              {user.datavacin.typeVacin3 && <p>Mũi 3 loại: {user.datavacin.typeVacin3}</p>}
              {user.datavacin.dateInjection4 && <p>Ngày Tiêm Mũi 1: {user.datavacin.dateInjection4}</p>}
              {user.datavacin.typeVacin4 && <p>Mũi 4 loại: {user.datavacin.typeVacin4}</p>}
              {user.datavacin.dateInjection5 && <p>Ngày Tiêm Mũi 1: {user.datavacin.dateInjection5}</p>}
              {user.datavacin.typeVacin5 && <p>Mũi 5 loại: {user.datavacin.typeVacin5}</p>}
            </div>
          </div>
        </div>
      );
  }
  return arryViewAll || <></>
}

const ViewAll = (props) => {

  const handleBackPage = () => {
    const contentTable__None = document.querySelector(".content-blockchain");
    contentTable__None.style.display = `block`;
    props.setCheckViewAll(!props.checkViewAll);
  };

  return (
    <div className="viewAll">
      <div className="viewAll-main">
        <h1
          style={{
            color: "#fff",
            textAlign: "center",
            padding: "30px 0",
            backgroundColor: "#313348",
          }}
        >
          TẤT CẢ THÔNG TIN ĐANG CÓ
        </h1>
        <div className="view-model">
          <ArrayViewAll dataUser={props.dataUser} idViewAll={props.idViewAll}/>
        </div>
        <div
          className="btn"
          style={{ width: "100px" }}
          onClick={handleBackPage}
        >
          Quay lại
        </div>
      </div>
    </div>
  );
};

export default ViewAll;
