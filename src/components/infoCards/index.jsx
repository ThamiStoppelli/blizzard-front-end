import "./style.css";

export default function DashboardCards() {
  return (

    <div className="dashboardCards">

      <div className="cards" id="cardText">
        <div className="contentCard">
          <label className="dataTitle"> Aparelhos</label>
          <h3 className="number">234</h3>
          <label className="info">aparelhos cadastrados</label>
        </div>
      </div>

      <div className="cards" id="cardConsumption">
        <div className="contentCard">
          <label className="dataTitle">Consumo Atual</label>
          <label className="info">Hoje</label>
          <h3 className="number">234 kWh</h3>
        </div>
      </div>

      <div className="cards" id="cardCost">
        <div className="contentCard">
          <label className="dataTitle">Consumo Geral</label>
          <label className="info">Hoje</label>
          <h3 className="number">234 kWh</h3>
        </div>
      </div>

      <div className="cards" id="cardText">
        <div className="contentCard">
          <label className="dataTitle"> Custo </label>
          <label className="info">Hoje</label>
          <h3 className="number">R$ 10.543,46</h3>
        </div>
      </div>

    </div>
  );
}
