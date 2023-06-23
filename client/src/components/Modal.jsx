import { useEffect } from "react";
import ReactDom from "react-dom";

function Modal({ onClose, children }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDom.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80"
      ></div>
      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 w-80 sm:w-96 bg-white rounded-md">
        {children}
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
