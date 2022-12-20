import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import "./style.css"

import NavBar from "../../components/navbar";
import addIcon from '../../Assets/addIcon.png';
import Header from '../../components/header';
import Alerts from '../../components/alerts';

import api from '../../services/api';
import { AuthContext } from '../../contexts/auth';
import Categories from '../../components/Categories';
import Locations from '../../components/Locations';

export default function Groups() {

  const { initialToken, user, logout, token, config } = useContext(AuthContext)
  const [renderCategories, setRenderCategories] = useState(true);
  const [renderLocations, setRenderLocations] = useState(false);
  
  return (
    <div className="home">
      <NavBar />

      <div className="List">
        <Header title="Grupos" />

        <div className="organizeHorizontal">
          <div className="organizeList">
            <div className='header-grupos'>
              <div className="grupos" onClick={() => {
                setRenderLocations(false)
              }}>
                <a>Localizações</a>
                {!renderLocations ?
                <svg width="91" height="6" viewBox="0 0 115 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5.50043C0 2.84772 2.15045 0.697266 4.80316 0.697266H109.806C112.459 0.697266 114.609 2.84772 114.609 5.50043H0Z" fill="#0080FF"/>
                </svg> : null
                }
              </div>
              <div className="grupos" onClick={() => {
                setRenderLocations(true)
              }}>
                <a>Categorias</a>
                {renderLocations ?
                <svg width="78" height="6" viewBox="0 0 101 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 5.50043C0 2.84772 2.15045 0.697266 4.80316 0.697266H96.1968C98.8496 0.697266 101 2.84772 101 5.50043H0Z" fill="#0080FF"/>
                </svg> : null
                }
              </div>
            </div>
            {renderLocations ? 
            <Categories></Categories>
            :
            <Locations></Locations>
            }
          </div>

          <Alerts />

        </div>
      </div>
    </div>
  );
}
