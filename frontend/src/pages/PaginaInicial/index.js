import React, { useEffect, useState } from "react";

import {Box, Grid, Paper, Typography, ButtonBase, Modal} from '@mui/material'
import { styled } from '@mui/material/styles';

import './style.css'
import TopBar from "../../components/TopBar";


import imageFilter from '../../assets/filter.svg'
import ImagemProblema from '../../assets/buraco.jpg'
import AlertIcon from '../../assets/a1.png'
import AlertIconAmarelo from '../../assets/b1.png'

import ErrorIcon from '@mui/icons-material/Error';


import api from "../../services/api";

import { useNavigate } from "react-router-dom";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

export default function PaginaInicial(){
    const navigate = useNavigate()
    const [reclamacoes, setReclamacoes] = useState([])
    const [modalError, setModalError] = useState('')

    useEffect( () => {
      getReclamacoes()
    }, [])

    const getReclamacoes = async () => {
      try{
        await api.get('/reclamacoes').then( (response) => {
          console.log(response.data)
          setReclamacoes(response.data)
        })
      }catch{
        console.log("Erro ao buscar as reclamações")
      }
    }

    function formatarData(dataString) {
      const data = new Date(dataString);
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0'); // Lembre-se que os meses começam do zero
      const ano = data.getFullYear();
    
      return `${dia}/${mes}/${ano}`;
    }

    function statusById(status){
      if(status == 0){
        return "Pendente"
      }else if(status == 1){
        return "Atrasado"
      }else if(status == 2){
        return "Concluído"
      }
    }

    function getColorStatus(status){
      if(status == 0){
        return 'orange'
      }else if(status == 1){
        return 'red'
      }else if(status == 2){
        return 'green'
      }
    }

    const handleLike = async (idreclamacao) => {
      try{
        await api.post('/like', {idreclamacao} ).then( (response) => {

          setReclamacoes((reclamacoesAntigas) =>
            reclamacoesAntigas.map((reclamacao) =>
              reclamacao.idreclamacao == idreclamacao
                ? { ...reclamacao, userIsLike: true, numLikes: reclamacao.numLikes + 1 }
                : reclamacao
            )
          );

        })
      }catch{
        setModalError("Faça login para poder dar like na reclamação")
        console.log("Erro ao dar like na reclamação")
      }
    }
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
                            <div style={{borderColor: getColorStatus(reclamacao.status) }} className="containerReclamacao">
                              <div className="infosReclamacao" onClick={ (e) => {e.stopPropagation();navigate(`/reclamacao/${reclamacao.idreclamacao}`)}}>
                                <div className="infosDentroReclamacao">
                                  <span className="tituloReclamacao">{reclamacao.endereco}</span>
                                  <span className="categoriaReclamacao">{reclamacao.categoria}</span>
                                </div>

                                <div className="infosDentroReclamacao">
                                  <span style={{color: getColorStatus(reclamacao.status) }} className="statusReclamacao">{statusById(reclamacao.status)}</span>
                                  <span className="dataReclamacao">{formatarData(reclamacao.data_reclamacao)}</span>
                                </div>
                              </div>

                              <div className="containerLike" onClick={(e) => {e.stopPropagation();handleLike(reclamacao.idreclamacao)}}>
                                <div >
                                {reclamacao.userIsLike ? <span><img src={AlertIconAmarelo} style={{width: '42px'}}/></span> : <span><img src={AlertIcon} style={{width: '38px'}}/></span> }
                                </div>
                                <span className="numberLike">{reclamacao.numLikes}</span>
                              </div>

                              <img onClick={ (e) => {e.stopPropagation();navigate(`/reclamacao/${reclamacao.idreclamacao}`)}} style={{alignItems: 'right', width: "40%"}} src={ImagemProblema} />
                            </div>
                        )
                    })}
                    
                </div>
            </div>

            <Modal open={modalError} onClose={ () => setModalError('')} >
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 250, bgcolor: 'background.paper', border: 'none', boxShadow: 24, p: 4, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <ErrorIcon sx={{fill: 'red', fontSize: 50}} />
                    
                    <Typography style={{fontWeight: '600', textAlign: 'center', fontSize: '18px'}}>Erro ao dar like na reclamação</Typography>
                    <Typography style={{ textAlign: 'center', fontSize: '14px'}}>{modalError}</Typography>
                </Box>
            </Modal>

        </div>
    )
}