import React, { useState } from "react";
import api from "../../services/api";

import Chart from "../../components/chart";
import DashboardCards from "../../components/infoCards";
import "./style.css";
import { userData } from '../../dummyData'
import Header from "../../components/header";
import NavBar from "../../components/navbar";
import Alerts from "../../components/alerts";
import { useEffect } from "react";

export default function Dashboard() {

  const [token, setToken] = useState(localStorage.getItem("token"));

  // const [typeUser, setTypeUser] = useState('');
  // const [NavBar, setNavBar] = useState(NavBar1);

  // useEffect((res) => {
  //   console.log(res.typeUser);
  //   localStorage.getItem("typeUser", res.typeUser);
  //   setTypeUser(res.typeUser);

  //   if (typeUser == '0' || typeUser == '1') {
  //     setNavBar(NavBar1); 
  //   } else if (typeUser == '2' ) {
  //     setNavBar(NavBar2);
  //   }
  // }, []);

  return (
    <div className="home">
      <NavBar />
      <div className="List">
        <Header title="Dashboard" />

        <div className="elements-content">
          <div className="content" >
            <DashboardCards />
            
            <Chart data={userData} title="Estatísticas de corrente" grid dataKey="Medição do dia" dataKey2="Medição do dia anterior">
            </Chart>
          </div>

          <Alerts />
        </div>
      </div>
    </div>
  );
}
