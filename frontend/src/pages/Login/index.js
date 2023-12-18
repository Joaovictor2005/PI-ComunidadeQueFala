import React, { useState } from 'react'
import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import axios from 'axios'

export default function Login(){
    const navigate = useNavigate()

    const [erro, setErro] = useState(false)
    const [erros, setErros] = useState({})

    const [messageError, setMessageError] = useState("")
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function handleChangeSenha(event){
        setSenha(event.target.value)
    }
    function handleChangeEmail(event){
        setEmail(event.target.value)
    }
    const validateForm = () => {
        const novosErros = {};
        if (!email.trim()) {
            novosErros.email = 'O email é obrigatório';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            novosErros.email = 'Email inválido';
          }
      
          // Validação da senha
          if (!senha.trim()) {
            novosErros.senha = 'A senha é obrigatória';
          } else if (senha.length < 8) {
            novosErros.senha = 'A senha deve ter pelo menos 8 caracteres';
          }

          setErros(novosErros);

          return Object.keys(novosErros).length === 0;
    }

    const setCookie = (name, value, days) => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
        const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = cookieValue;
    };

    const handleEntrar = async () => {
        if(!validateForm()){
            return
        }
        const body = {email, senha}
        api.post('/user/signin', body)
        .then( (response) => {
            console.log(response)
            if(response.status == 400){
                if(response.data.message == "Email não encontrado"){
                    setErros({email: "Email não encontrado", senha: ""})
                }else if(response.data.message == "Senha inválida"){
                    setErros({email: "", senha: "Senha inválida"})
                }else{
                    setMessageError(response.data.message)
                    setErro(true)
                }
            }else if(response.status == 200){
                console.log(response.data)
                setCookie('token', response.data, 7)
                navigate("/usuario")
            }   
        })
        .catch( (error) => {
            if(error.response.status == 400){
                if(error.response.data.message == "Email não encontrado"){
                    setErros({email: "Email não encontrado", senha: " "})
                }else if(error.response.data.message == "Senha inválida"){
                    setErros({email: " ", senha: "Senha inválida"})
                }else{
                    setMessageError(error.response.data.message)
                    setErro(true)
                }
            }
        })
       
        
    }

    return(
        <div className='login-container'>
            <h1>Seja <br/> bem vindo ao <br/> ComunidadeQueFala</h1>

            <div className='login-form-container'>
                <h2 className='flexStart'>Faça seu <br/> Login aqui</h2>
                <label>Email</label>
                <input value={email} onChange={handleChangeEmail} className={erros.email ? 'inputLogin error': 'inputLogin'} type='email' placeholder='Digite seu email'/>
                {erros.email && <span className='inputError'>{erros.email}</span>}
                
                <label>Senha</label>
                <input value={senha} onChange={handleChangeSenha} className={erros.senha ? 'inputLogin error': 'inputLogin'} type='password' placeholder='Digite sua senha'/>
                {erros.senha && <span className='inputError'>{erros.senha}</span>}
                
                {erro && <span className='spanError'>{messageError}</span>}

                <Link className='buttonEsqueceuSenha'>Esqueceu sua senha?</Link>
                <Link className='buttonCadastro' to="/cadastro-usuario">Não tem cadastro? Cadastre-se aqui</Link>

                <button className='button' onClick={handleEntrar}>ENTRAR</button>
            </div>

            <Link className='buttonFooter'>Continuar sem cadastro</Link>
        </div>
    )
}