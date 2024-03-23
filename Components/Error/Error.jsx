import React, { useState, useContext } from "react";

// INTERNAL IMPORT
import Style from './Error.module.css';
import { ChatAppContext } from '../../Context/ChatAppContext';
import { FaTimes } from 'react-icons/fa';

const Error = ({ error }) => {
  const [openBox, setOpenBox] = useState(true);
  const { setError } = useContext(ChatAppContext);

  const handleClose = () => {
    setOpenBox(false);
    setError("");
  }

  return (
    <>
      {openBox && (
        <div className={Style.Error}>
          <FaTimes className={Style.closeBtn}  onClick={handleClose} />
          <div className={Style.Error_box}>
            <h1>Please Fix This Error</h1>
            <p>{error}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Error;