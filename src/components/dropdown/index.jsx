import React, { useState } from 'react';
import "./style.css";
// import { Container } from './styles';

function DropdownFilter( { selected, setSelected } ) {
    
    const [role, setRole] = useState("");
    const [isActive, setIsActive] = useState(false);
    const roles = ["Todos", "Gestores", "Administradores", "Operadores"];

    return (
        <div>
            <div onClick={(event) => setIsActive(!isActive)}>
                Todos
            </div>
        {isActive && (
            <div className="dropdown-content">
            {roles.map((role) => (
                <div onClick={(event) => {
                    setSelected(role);
                    setIsActive(false);
                }}>
                {role}
                </div>
            ))}
            </div>
        )}
        </div>
    );
}

export default DropdownFilter