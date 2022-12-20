import React from 'react';
import { useNavigate } from 'react-router-dom';

import "./style.css"
import Logo from "../../assets/Logo.png"
import VortexLogo from "../../assets/VortexLogo.png" 
import DtechLogo from "../../assets/DtecLogo.png"

export default function AboutSystem() {

    let navigate = useNavigate()

    return (
        <div className="container">
            <div className="login-container">
                <div className="login-wrapper">

                    <img src={Logo} alt="Blizzard_Logo" title='Blizzard_Logo' />

                    <form>

                        <div className="form-wrapper">

                            <p className="form-title">Sobre o sistema</p>
                            <span className="form-text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquet ornare risus id pulvinar. In dictum ex nulla, sed molestie nisi vestibulum in. Mauris posuere libero id viverra molestie. Donec eu arcu vitae velit sollicitudin vulputate quis id libero. Fusce eleifend dui eget risus fermentum, nec ullamcorper dui venenatis. Praesent sollicitudin tempor sapien, vel commodo ligula ornare nec. Phasellus pharetra urna nec velit suscipit, eu placerat diam feugiat.
                            </span>

                            <span className="form-title" id="names-title">Responsáveis</span>
                            <div className="names">
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>
                                <p>Lorem Ipsum</p>

                            </div>

                            <div className="companyLogos">
                                <img src={VortexLogo }className="VortexLogo" alt="Vortex_Logo" title='Vortex_Logo' />
                                <img src={DtechLogo } className="DtechLogo" alt="Dtec_Logo" title='Dtec_Logo' />
                            </div>

                        </div>

                        <button id="goBack-button" onClick={() => {navigate('/')}}>Início</button>

                    </form>
                </div>
            </div>
        </div>

    )
}