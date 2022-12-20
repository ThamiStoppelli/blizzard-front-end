import React, { useState } from "react";
import "./style.css";

function DeleteModal({
    title, name, onChange, type, 
    onClick, cancelButton,freezeButton
}) {
    return (
        <div className="container-delete-modal">
            <div className="delete-modal">
                <div className="textarea-delete-modal">
                    <h2>Excluir {title}</h2>
                    <p className="title-message">Leia com atenção as instruções abaixo.</p>
                    <h4>Os aparelhos que foram cadastrados {type} serão excluídos. Você não poderá desfazer esta ação.</h4>
                    <h4 id="delete-text">Para excluir o espaço, digite <b>{name}</b>.</h4>
                    <input type="text" 
                    onChange={onChange} />
                </div>
                <div className="buttons-popup">
                    <button className="cancel-button" onClick={cancelButton}>
                        Cancelar
                    </button>
                    {!freezeButton && (
                    <button className="delete-button" onClick={onClick}>
                        Excluir
                    </button>

                    )}
                    {freezeButton && (
                    <button disabled className="delete-button" onClick={onClick}>
                        Excluir
                    </button>
                    )}
                </div>
            </div>
        </div>
    )
}


export default DeleteModal;