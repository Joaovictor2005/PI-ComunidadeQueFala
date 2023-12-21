import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TopBar from '../../components/TopBar'
import { Avatar } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import ImageGallery from "react-image-gallery";
import api from '../../services/api';

import './index.css'
import semImagenFile from '../../assets/semImagen.png'
import "react-image-gallery/styles/css/image-gallery.css";

export default function Reclamacao() {
    
    const [imagensReclamacao, setImagensReclamacao] = useState([{ "original": semImagenFile}])

    const [reclamacao, setReclamacao] = useState({})
    const [comentarios, setComentarios] = useState({})

    const[userComentario, setUserComentario] = useState('')

    const { id } = useParams()

    useEffect(() => {
        getReclamacao()
        getComentarios()
    }, [])

    const getReclamacao = async () => {
        try {
            await api.get(`/reclamacao/${id}`).then((response) => {
                console.log(response.data)
                setReclamacao(response.data)

                if(response.data.anexos){
                    console.log("Ola")
                    setImagensReclamacao([])

                    response.data.anexos.map( (anexo) => {
                        var imagens = imagensReclamacao
                        imagens.push({original: anexo})
                        console.log(imagens)
                        setImagensReclamacao(imagens)
                    })
                }

            })
        } catch {
            console.log("Erro ao buscar reclamação")
        }
    }

    const getComentarios = async () => {
        try {
            await api.get(`comentarios/reclamacao/${id}`).then((response) => {
                console.log(response.data)
                setComentarios(response.data)
            })
        } catch {
            console.log("Erro ao buscar comentários")
        }
    }

    const postComentario = async () => {
        const data = {
            comentario: userComentario,
            idreclamacao: id
        }

        try{
            await api.post('/comentario', data).then( (response) => {
                getComentarios()
            })

        }catch{
            console.log("Erro ao postar o comentário")
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

      const galleryOptions = {
        showPlayButton: false, // Remove o botão de reprodução automática
        showFullscreenButton: false, // Remove o botão de tela cheia
      };

      
    return (
        <div>
            <TopBar />

            <div className='container'>

                <div className='titulos'>
                    <span className='spanReclamacao'>Reclamação</span>
                    <span className='spanStatus' style={{color: getColorStatus(reclamacao.status)}}>{statusById(reclamacao.status)}</span>
                </div>

                <div className='imagens'>
                    <ImageGallery items={imagensReclamacao} {...galleryOptions} />
                </div>

                <div className='informacoes'>
                    <span className='spanEndereco'>{reclamacao.endereco}</span>
                    <span>{reclamacao.bairro}</span>
                    <span>{reclamacao.cidade} - {reclamacao.estado}</span>

                    <br />

                    <div className='flexRow'>
                        <span className='spanBold'>Categoria:</span>
                        <span>{reclamacao.categoria}</span>
                    </div>


                    <div className='flexRow'>
                        <span className='spanBold'> Responsável: </span>
                        <Avatar className='avatarResponsave' src={reclamacao.departamento ? reclamacao.departamento.logo : null} sx={{ height: '22px', width: '22px' }} />
                        <span className='spanNomeResponsavel'>{reclamacao.departamento ? reclamacao.departamento.departamento : null}</span>
                    </div>

                    <span className='spanData'>Data reclamação: {formatarData(reclamacao.data_reclamacao)}</span>

                    <span></span>

                </div>

                <div className='descricao'>
                    <span className='spanTitulo'>Descrição</span>
                    <div className='containerTextoDescricao'>
                        <span> {reclamacao.descricao} </span>
                    </div>
                </div>

                <div className='comentarios'>
                    <span className='spanTitulo' >Comentários</span>

                    <div className='comentariosUsuarios'>

                        {comentarios.length > 0 ? comentarios.map((comentario) => {
                            return (
                                <div className='comentario' key={comentario.idcomentario}>

                                    <div className='infosComentario'>
                                        <div className='infosComentarioUsuario'>
                                            <Avatar src={comentario.foto_perfil_usuario} sx={{ width: '35px', height: '35px' }} />
                                            <span className='comentarioNome'>{comentario.nome_usuario}</span>
                                        </div>
                                        <span className='comentarioData'>{formatarData(comentario.data)}</span>
                                    </div>

                                    <div className='divComentario'>
                                        <span>{comentario.comentario}</span>
                                    </div>
                                </div>
                            )
                        }) : <span>Sem comentários! Seja o primeiro a comentar</span>}


                    </div>

                    <div className='divInput'>
                        <Avatar sx={{ width: '35px', height: '35px' }} />
                        <input value={userComentario} onChange={ (e) => setUserComentario(e.target.value)} className='inputComentario' placeholder='Deixe seu comentário' />
                        <SendIcon onClick={postComentario} sx={{ fontSize: '30px' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}