import React, {useEffect, useState} from "react";

import iconMenu from '../../assets/menu.png'
import imageUser from '../../assets/imagemUser.png'
import { useNavigate } from "react-router-dom";
export default function TopBar(){
    const navigate = useNavigate()
    const [menu, setMenu] = useState(false)

    const handleChangeMenu = () => {
        setMenu(!menu)
    }

    const handlePerfil = () => {
        navigate('/perfil')
    }

    const handleCadastro = () => {
        navigate('/cadastro-reclamacao')
    }

    const styleDiv = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        position: 'fixed',
        top: '0',
        left: '0',
        padding: '20px',
        width: '90%',
        height: '20px',
        background: '#FFF'
    }
    
    const styleImgUser = {
        borderRadius: '999px',
        border: 'none',
        height: '40px',
        width: '40px'
    }

    const styleH1 = {
        margin: '0px 0px',
        fontSize: '26px'
    }

    var styleMenuLateral = {
        width: '180px',
        height: '100vh',
        backgroundColor: '#FFF',
        top: '60px',
        padding: '15px',
        position: 'fixed',
        left: '-240px',
        transition: 'left 0.5s',
        opacity: '0.9'
    }

    const styleMenuLateralActivited = {
        ...styleMenuLateral,
        left: '0px'
    }

    const StyleContainerMenuLateral = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '15px',
        marginBottom: '20px',
        borderBottom: '2px solid black'
    }

    const StyleContainerProfile = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }

    const styleH4 = {
        margin: '5px',
        marginLeft: '10px'
    }

    const styleSpanPerfil = {
        color: '#90A3BF',
        fontSize: '16px',
        fontWeight: '500'
    }

    const styleButton = {
        background: '#3563E9',
        borderRadius: '999px',
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: '16px',
        padding: '6px 10px',
        border: 'none',
    }

    const styleLinkMenuLateral = {
        color: '#3563E9',
        fontWeight: '400',
        fontSize: '16px',
        padding: '10px'
    }

    const styleDivLinks = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }

    return(
        <div>
        <div style={styleDiv}>
            <img onClick={handleChangeMenu} src={iconMenu} width="35px" height="35px" />
            <h1 style={styleH1}>ComunidadeQueFala</h1>
            <img onClick={handlePerfil} src={imageUser} style={styleImgUser}/>
        </div>
        <div style={ menu?styleMenuLateralActivited:styleMenuLateral }>

            <div style={StyleContainerMenuLateral} onClick={handlePerfil}>
                <div style={StyleContainerProfile}>
                    <img src={imageUser} style={styleImgUser}/>
                    <h4 style={styleH4}>João Victor Soares Oliveira</h4>
                </div>  
                <span style={styleSpanPerfil}>Ver perfil</span>
            </div>

            <button onClick={handleCadastro} style={styleButton}>CADASTRAR RECLAMAÇÃO</button>

            <div style={styleDivLinks}>
                <span style={styleLinkMenuLateral}>Todas as reclamações</span>
                <span style={styleLinkMenuLateral}>Reclamações favoritadas</span>
                <span style={styleLinkMenuLateral}>Departamentos</span>
            </div>
        </div>
        </div>
    )
}