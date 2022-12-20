import React, { useState } from "react";
import "./style.css";
import showingPassword from "../../assets/eye-open.svg";
import hidingPassword from "../../assets/eye-closed.svg";

function PasswordInput({
  toggle, setToggle, setInput, id,
  maxLength, isPassword, disabled
}) {
  return (
    <div className="password-container">
      <div className="input-bar">
        <input
          id={id}
          type={toggle ? "text" : "password"}
          onChange={(event) => {
            setInput(event.target.value);
          }}
          maxLength={maxLength}
          disabled={disabled ? true : false}
        ></input>
        {isPassword ? (
          <img
            src={toggle ? showingPassword : hidingPassword}
            id="toggleButton"
            onClick={() => setToggle(!toggle)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default PasswordInput;