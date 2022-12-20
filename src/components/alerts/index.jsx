import React from 'react';

import "./style.css"

export default function Alerts() {

  //criar função para obter dados dos cards
  //usar renderização condicional para gerar cada card de acordo com o tipo de alerta
  
  return (
    <div className="alerts">
        <h3 className="alertsTitle">Alertas</h3>

        <div className="alertCard">
            <span className="alertText">Blizzard está conectado!</span>
            <h3 className="time">30m</h3>
        </div>

        <div className="alertCard">
            <span className="alertText">Blizzard está desconectado do sistema.</span>
            <h3 className="time">30m</h3>
        </div>

        <div className="alertCard">
            <span className="alertText">Aparelho 1 está ligado!</span>
            <h3 className="time">30m</h3>
        </div>

        <div className="alertCard">
            <span className="alertText">Aparelho 1 está desligado.</span>
            <h3 className="time">30m</h3>
        </div>

    </div>
  )
}

