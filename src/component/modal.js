const Modal = (props) => {
  return (
    <div className="Modal">
      <div className="Modal-main">
        {props.children }
      </div>
    </div>
  );
};

export default Modal;
