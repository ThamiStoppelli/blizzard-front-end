import React from 'react';
import "./style.css";

const Switch = ({onChange}) => (
    <label className='switch'>
        <input type="checkbox" onChange={onChange} />
        <span />
    </label>
)

export default Switch;