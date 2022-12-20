import React, { useState } from 'react';

import "./style.css";

function DropdownFilter( { selected, setSelected } ) {
    
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