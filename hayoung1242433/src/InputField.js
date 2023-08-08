
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react';


const InputField = ({ id, label, valid, useryRef, value, onChange, required,valueFocus,  onFocus, onBlur }) => (
  <div>
    <label htmlFor={id}>
      {label}      
      <span className={valid ? "valid" : "hide"}>
        <FontAwesomeIcon icon={faCheck} />
      </span>
      <span className={valid || !value ? "hide" : "invalid"}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
    </label>
    <br></br>
    <input
      type="text"
      id={id}
      ref = {useryRef}
      autoComplete="off"
      onChange={(e) => onChange(e.target.value)}
      value={value}
      required={required}
      aria-invalid={valid ? "false" : "true"}
      aria-describedby={`${id}note`}
      onFocus={onFocus}
      onBlur={onBlur}
    />
    <p id={`${id}note`} className={valueFocus && value && !valid ? "instructions" : "offscreen"}>
      <FontAwesomeIcon icon={faInfoCircle} /> 
      "형식에 맞지 않습니다"
    </p>
  </div>
);

export default InputField