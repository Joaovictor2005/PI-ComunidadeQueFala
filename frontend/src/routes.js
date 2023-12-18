import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/Login'
import CadastroUsuario from './pages/CadastroUsuario'
import PaginaInicial from './pages/PaginaInicial';
import CadastroReclamacao from './pages/CadastroReclamacao';


export default function Rotas(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Login/>}/>
            <Route path="/cadastro-usuario" element={<CadastroUsuario/>}/>
            <Route path="/usuario" element={<PaginaInicial />}/>
            <Route path="/cadastro-reclamacao" element={<CadastroReclamacao />}/>

        </Routes>
    </BrowserRouter>
    )
}