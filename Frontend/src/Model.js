import React from "react";
import ReactDom from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";

const Modal_styles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "rgba(34,34,34,0.9)",
  transform: "translate(-50%,-50%)",

  zIndex: 1000,
  height: "90%",
  width: "90%",
};

const Overlay_styles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 1000,
};

export default function Model({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={Overlay_styles} />
      <div style={Modal_styles}>
        <button
          className="btn bg-danger fs-6 mt-2"
          style={{ marginLeft: "90%", marginTop: "-35px" }}
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faCircleXmark} />
        </button>
        {children}
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
