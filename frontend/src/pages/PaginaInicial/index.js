import React, { useState } from "react";

import './style.css'
import TopBar from "../../components/TopBar";
import Rodape from "../../components/Rodape";

import imageFilter from '../../assets/filter.svg'

export default function PaginaInicial(){
    const [reclamacoes, setReclamacoes] = useState([1,2,3])

    return(
        <div>
            <TopBar />
            
            <div className="container">
                <div className="containerFiltros">
                    <button className="buttoFilter">No seu estado</button>
                    <button className="buttoFilter">No seu estado</button>
                    <img className="imagemFiltro" src={imageFilter}/>
                </div>

                <div className="containerReclamacoes">
                    {reclamacoes.map( (reclamacao) => {
                        return(
                            <div className="reclamacao" key={reclamacao}>
                                <div className="space-between">
                                    <span className="tituloReclamacao">Av. Cipriano Santos</span>
                                    <span className="like">C</span>
                                </div>
                                <div className="space-between">
                                    <span className="categoriaReclamacao">Buraco no asfalto</span>
                                    <span className="numberLikes">C</span>
                                </div>
                                
                                <span className="statusReclamacao">Pendente</span>
                                
                            </div>
                        )
                    })}
                </div>
            </div>

            <Rodape />
        </div>
    )
}