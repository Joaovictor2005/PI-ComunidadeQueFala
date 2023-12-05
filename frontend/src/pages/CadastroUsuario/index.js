import React, { useEffect, useState } from "react";
import axios from 'axios'
import './style.css'

import InputStyled from "../../components/InputStyled";
import InputDisabledStyled from "../../components/InputDisabledStyled";
import Rodape from "../../components/Rodape";

import permissaoImage from '../../assets/permissionLogo.png'
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
export default function CadastroUsuario() {
    const navigate = useNavigate()
    const [erro, setErro] = useState(false)
    const [messageError, setMessageError] = useState("")

    const [erros, setErros] = useState({})

    const [nomeCompleto, setNomeCompleto] = useState("")
    const [dataNascimento, setDataNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");

    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('')
    const [bairro, setBairro] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [pontoReferencia, setPontoReferencia] = useState('')

    const [senha, setSenha] = useState('')
    const [senhaConfirm, setSenhaConfirm] = useState('')

    const [checkbox, setCheckbox] = useState(false)

    function handleChangeCheckbox() {
        setCheckbox(!checkbox)
    }

    function handleChangeSenhaConfirm(value) {
        setSenhaConfirm(value)
    }
    function handleChangeSenha(value) {
        setSenha(value)
    }
    function handleChangePontoReferencia(value) {
        setPontoReferencia(value)
    }
    function handleChangeComplemento(value) {
        setComplemento(value)
    }
    function handleChangeNumero(value) {
        setNumero(value)
    }
    function handleChangeEndereco(value) {
        setEndereco(value)
    }
    function handleChangeBairro(value) {
        setBairro(value)
    }
    function handleChangeCidade(value) {
        setCidade(value)
    }
    function handleChangeEstado(value) {
        setEstado(value)
    }
    function handleChangeCep(value) {
        setCep(value)
    }
    function handleChangeDataNascimento(value) {
        setDataNascimento(value)
    }

    const handleChangeEmail = (value) => {
        setEmail(value)
    }

    function handleChangeCpf(value) {
        setCpf(value)
    }

    function handleChangeTelefone(value) {
        setTelefone(value)
    }

    function handleChangeNomeCompleto(value) {
        setNomeCompleto(value);
    }
    
    function validateCpf(){
        var cpfRegex = /^(?:(\d{3})(\d{3})(\d{3})(\d{2}))$/;
        if (!cpfRegex.test(cpf)) {
        return false;
        }

        var numeros = cpf.match(/\d/g).map(Number);
        var soma = numeros.reduce((acc, cur, idx) => {
        if (idx < 9) {
            return acc + cur * (10 - idx);
        }
        return acc;
        }, 0);

        var resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
        resto = 0;
        }

        if (resto !== numeros[9]) {
        return false;
        }

        soma = numeros.reduce((acc, cur, idx) => {
        if (idx < 10) {
            return acc + cur * (11 - idx);
        }
        return acc;
        }, 0);

        resto = (soma * 10) % 11;

        if (resto === 10 || resto === 11) {
        resto = 0;
        }

        if (resto !== numeros[10]) {
        return false;
        }

        return true;
    }

    const validateForm = () => {
        const novosErros = {}
        if (!nomeCompleto.trim()) {
            novosErros.nomeCompleto = "Nome completo obrigatório"
        }
        if (!dataNascimento.trim()) {
            novosErros.dataNascimento = "Data de nascimento obrigatório"
        }
        if (!cpf.trim()) {
            novosErros.cpf = "CPF obrigatório"
        } else if (!validateCpf()) {
            novosErros.cpf = "CPF inválido"
        }

        if(!telefone.trim()){
            novosErros.telefone = "Telefone obrigatório"
        }else if(telefone.length < 11){
            novosErros.telefone = "Informe seu telefone corretamente"
        }
        if(!email.trim()) {
            novosErros.email = 'O email é obrigatório';
        }else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            novosErros.email = 'Email inválido';
        }
        if(!cep.trim()){
            novosErros.cep = "CEP obrigatório"
        }else if(cep.length != 8){
            novosErros.cep = "O CEP deve ter 8 números"
        }

        const regexSenha = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
        if (!senha.trim()) {
            novosErros.senha = 'A senha é obrigatória';
        }else if (!regexSenha.test(senha)) {
            novosErros.senha = 'A senha deve obedecer aos critérios abaixo';
        }
        if(senha != senhaConfirm){
            novosErros.senha = 'As senhas devem ser iguais';
            novosErros.senhaConfirm = 'As senhas devem ser iguais'
        }
        if(!checkbox){
            novosErros.checkbox = "Aceite os termos"
        }
        setErros(novosErros)
        return Object.keys(novosErros).length === 0
    }

    useEffect(() => {
        if (cep.length === 8) {
            consultarCep()
        }
    }, [cep])

    async function consultarCep() {
        try {
            await axios.get("https://viacep.com.br/ws/" + cep + "/json/").then(response => {
                console.log(response.data)
                setBairro(response.data.bairro)
                setCidade(response.data.localidade)
                setEstado(response.data.uf)
                setEndereco(response.data.logradouro)
            })
        } catch (err) {
            console.log("Impossivel consultar API do CEP")
        }
    }

    const handleCadastro = () => {

        if(!validateForm()){
            return
        }

        const data = {
            nome_completo: nomeCompleto,
            data_nascimento: dataNascimento,
            email,
            senha,
            cpf,
            telefone,
            cep,
            estado,
            cidade,
            bairro,
            endereco,
            numero,
            complemento,
            pontoReferencia
        }

        api.post('/user', data)
        .then( (response) => {
            console.log(response)
            if(response.status == 400){
                setMessageError(response.data.message)
                setErro(true)
            }else if(response.status == 200){
                navigate('/')
            }
        })
        .catch( (error) => {
            if(error.response.status == 400){
                setMessageError(error.response.data.message)
                setErro(true)
            }
        })
    }

    return (
        <div className="pageContainer">
            <div className="header">
                <h1>ComunidadeQueFala</h1>
            </div>
            <span className="margemHeader"></span>
            <div className="titulo">
                <h2>Faça seu cadastro</h2>
            </div>
            <div className="formulario">
                <div className="form">
                    <h3>Dados Pessoais</h3>
                    <InputStyled erro={erros.nomeCompleto} value={nomeCompleto} onValueChange={handleChangeNomeCompleto} type="text" label="Nome Completo" placeholder="Digite seu nome completo" />
                    <InputStyled erro={erros.dataNascimento} value={dataNascimento} onValueChange={handleChangeDataNascimento} type="date" label="Data de nascimento" placeholder="Digite sua data de nascimento" />
                    <InputStyled erro={erros.cpf} value={cpf} onValueChange={handleChangeCpf} type="number" label="CPF" placeholder="Digite seu CPF" />
                    <InputStyled erro={erros.telefone} value={telefone} onValueChange={handleChangeTelefone} type="tel" label="Telefone" placeholder="Digite seu telefone" />
                    <InputStyled erro={erros.email} value={email} onValueChange={handleChangeEmail} type="email" label="Email" placeholder="Digite seu email" />
                </div>

                <div className="form">
                    <h3>Endereço</h3>
                    <InputStyled erro={erros.cep} value={cep} onValueChange={handleChangeCep} type="number" label="CEP" placeholder="Digite seu CEP" />
                    <InputDisabledStyled value={estado} onValueChange={handleChangeEstado} type="text" label="Estado" placeholder="Selecione um estado" />
                    <InputDisabledStyled value={cidade} onValueChange={handleChangeCidade} type="text" label="Cidade" placeholder="Selecione uma cidade" />
                    <InputDisabledStyled value={bairro} onValueChange={handleChangeBairro} type="text" label="Bairro" placeholder="Digite seu bairro" />
                    <InputDisabledStyled value={endereco} onValueChange={handleChangeEndereco} type="text" label="Endereço" placeholder="Digite seu endereço" />
                    <InputStyled value={numero} onValueChange={handleChangeNumero} type="number" label="Número" placeholder="Digite o número da sua residência" />
                    <InputStyled value={complemento} onValueChange={handleChangeComplemento} type="text" label="Complemento" placeholder="Digite um complemento" />
                    <InputStyled value={pontoReferencia} onValueChange={handleChangePontoReferencia} type="text" label="Ponto de Referência" placeholder="Digite um ponto de referência" />
                </div>

                <div className="form">
                    <h3>Crie uma senha de acesso</h3>
                    <InputStyled erro={erros.senha} value={senha} onValueChange={handleChangeSenha} type="password" label="Senha" placeholder="Digite uma senha" />
                    <InputStyled erro={erros.senhaConfirm} value={senhaConfirm} onValueChange={handleChangeSenhaConfirm} type="password" label="Confirme sua senha" placeholder="Digite sua senha novamente" />
                </div>

                <div className="form">
                    <h3>Permissões</h3>
                    <div className={erros.checkbox ? 'divCheckbox erroCheckbox' : 'divCheckbox'}>
                        <input value={checkbox} onChange={handleChangeCheckbox} type="checkbox" className="checkbox" />
                        <span>Eu aceito os <span className="underline">termos e condições</span> e a <span className="underline">política de privacidade</span></span>
                    </div>
                    {erros.checkbox && <span className='inputError inputErrorCheckbox'>{erros.checkbox}</span>}

                    <img className="iconSafe" src={permissaoImage} width="40px" height="40px" />

                    <span className="spanPermissionSafeDados">Os seus dados sempre seguros!</span>

                    <span className="spanPermissionSafeDados2">Utilizamos as mais avançadas políticas de segurança para os dados. Observando as normas da LGPD</span>
                </div>

                {erro && <span className='spanError'>{messageError}</span>}

                <button onClick={handleCadastro} className="button buttonCadastro">CONFIRMAR CADASTRO</button>
            </div>

            <Rodape />
        </div>
    )
}