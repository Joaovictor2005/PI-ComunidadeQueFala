import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

import Login from './pages/Login'
import CadastroUsuario from './pages/CadastroUsuario'
import PaginaInicial from './pages/PaginaInicial';

export default function Rotas(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Login/>}/>
            <Route path="/cadastro-usuario" element={<CadastroUsuario/>}/>
            <Route path="/usuario" element={<PaginaInicial />}/>

        </Routes>
    </BrowserRouter>
    )
}