import React, {useState, useEffect, useRef, forwardRef, useImperativeHandle} from 'react'
import TopBar from '../../components/TopBar'
import './index.css'
import axios from 'axios'

import { Box, Stepper, Step, StepLabel, StepButton, Button, Typography, Select, MenuItem, Avatar, Modal} from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import TopBarMui from '../../components/TopBarMui'
import InputStyled from '../../components/InputStyled'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import ErrorIcon from '@mui/icons-material/Error';
import CheckIcon from '@mui/icons-material/Check';

import InputDisabledStyled from "../../components/InputDisabledStyled";
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

const divContainer = {
    marginTop: '40px',
    padding: '5px'
}

export default function CadastroReclamacao() {
    /*async function postReclamacao(){
        const data = {
            descricao,
            categorias_idcategorias: categoria, 
            departamento_iddepartamento: responsavel,
            cep, 
            estado, 
            cidade, 
            bairro, 
            endereco, 
            numero, 
            complemento, 
            pontoReferencia 
        }

        try{
            await api.post('reclamacao', data).then( (response) => {
                console.log(response.data.message)
            })
        }catch{
            console.log("Erro ao cadastrar reclamação")
        }
    }
    */

    return (
        <div>
            <TopBar />
            <div style={divContainer}>
                <h1 >Faça o cadastro da sua reclamação</h1>
                <StepMui />
            </div>
            
        </div>
    )
}

const steps = ['Descrição', 'Endereço', 'Fotos e videos'];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  };

function StepMui() {
    const navigate = useNavigate()

    const [activeStep, setActiveStep] = React.useState(0);
    const [data, setData] = useState({})
    const [openSucess, setOpenSucess] = useState(false)
    const [openError, setOpenError] = useState(false)

    const [idreclamacaocriada, setIdreclamacaocriada] = useState(null)

    const descricaoRef = useRef(null)
    const enderecoRef = useRef(null)

    const handleNext = () => {
        if(activeStep == 0){
            descricaoRef.current.confirmar();
        }

        if(activeStep == 1){
            enderecoRef.current.confirmar()
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNextDescricao = (newData, next) => {
        if(next){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            const result = {...data, ...newData}
            setData(result)
            console.log(result)
        }
    }

    const handleNextEndereco = (newData, next) => {
        if(next){
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            const result = {...data, ...newData}
            setData(result)
            console.log(result)
        }
    }

    const handleCadastro = async () => {
        try{
            await api.post('reclamacao', data).then( (response) => {
                setIdreclamacaocriada(response.data.idreclamacao)
                setOpenSucess(true)
            })
        }catch{
            setOpenError(true)
            console.log("Erro ao cadastrar reclamação")
        }
    }

    const handleModalError = () => {
        setOpenError(false)
        setActiveStep(0);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps} >
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            <React.Fragment>
                <div style={{marginTop: '20px'}}>
                {activeStep == 0 ? <Descricao onConfirmar={handleNextDescricao} ref={descricaoRef} /> : null}
                {activeStep == 1 ? <Endereco onConfirmar={handleNextEndereco} ref={enderecoRef}/> : null}
                {activeStep == 2 ? <FotosVideos onCadastro={handleCadastro} /> : null}
                </div>

                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1, color: 'red' }} >
                        <KeyboardArrowLeft color='error' /> Voltar
                    </Button>

                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button disabled={activeStep === 2} onClick={handleNext}>
                        Próximo <KeyboardArrowRight color='inherit' />
                    </Button>
                </Box>
            </React.Fragment>

            <Modal open={openSucess} >
                <Box sx={style}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid green', width: '35px', height: '35px', borderRadius: '999px'}}>
                        <CheckIcon sx={{width: '50px', fill: 'green'}} />
                    </div>
                    <Typography style={{fontWeight: '600', textAlign: 'center', fontSize: '18px'}}>Sua reclamação foi cadastrada com sucesso</Typography>
                    <Typography style={{ textAlign: 'center', fontSize: '14px'}}>Agradecemos pela contribuição a sua comunidade</Typography>
                    <button onClick={() => navigate(`/reclamacao/${idreclamacaocriada}`)} className="button buttonCadastro">Ir para a reclamação</button>
                </Box>
            </Modal>

            <Modal open={openError} >
                <Box sx={style}>
                    <ErrorIcon sx={{fill: 'red', fontSize: 50}} />
                    
                    <Typography style={{fontWeight: '600', textAlign: 'center', fontSize: '18px'}}>Erro ao criar sua reclamação</Typography>
                    <Typography style={{ textAlign: 'center', fontSize: '14px'}}>Tente novamente</Typography>
                    <button onClick={handleModalError} className="button buttonCadastro" style={{fontSize: '14px', cursor: 'pointer'}}>Cadastrar novamente reclamação</button>
                </Box>
            </Modal>
        </Box>
    )
}

const Descricao = forwardRef(({ onConfirmar }, ref) => {
    const [erros, setErros] = useState({})
    const [descricao, setDescricao] = useState('')
    const [categoria, setCategoria] = useState('')
    const [categoriaSelect, setCategoriaSelect] = useState([])
    const [departamentosSelect, setDepartamentosSelect] = useState([])
    const [responsavel, setResponsavel] = useState('')

    function handleChangeResponsavel(e){
        setResponsavel(e.target.value)
    }
    function handleChangeCategoria(e){
        setCategoria(e.target.value)
    }
    function handleChangeDescricao(e){
        setDescricao(e.target.value)
    }

    const confirmar = () => {
        var control = true
        var newErros = {}
        if(descricao == ""){
            newErros.descricao = true;
            control = false
        }
        if(categoria == 0){
            newErros.categoria = true;
            control = false
        }
        setErros(newErros)
        const data = {descricao, categorias_idcategorias: categoria, departamento_iddepartamento: responsavel}
        onConfirmar(data, control)
    }

    useImperativeHandle(ref, () => ({
        confirmar,
    }));

    const styleInput = {
        borderRadius: '15px',
        height: '150px',
        flexShrink: '0',
        padding: '5px',
        paddingLeft: '10px',
        background: '#F6F7F9',
        fontWeight: '500',
        border: 'none',
        marginTop: '5px',
        marginBottom: '20px',
        paddingTop: '10px'
    }

    const styleDiv = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '10px'
    }


    useEffect( () => {
        getCategorias()
        getDepartamentos()
    }, [])

    async function getCategorias(){
        try{
            await api.get('/categorias').then( (response) => {
                console.log(response.data)
                setCategoriaSelect(response.data)
            })
        }catch{
            console.log("Erro ao buscar as categorias")
        }
    }

    async function getDepartamentos(){
        try{
            await api.get('/departamentos').then( (response) => {
                console.log(response.data)
                setDepartamentosSelect(response.data)
            })
        }catch{
            console.log("Erro ao buscar as categorias")
        }
    }

    

    return(
        <div className='form'>
            <div style={styleDiv}>
                <label>Descrição</label>        
                <textarea style={ {...styleInput, border: erros.descricao?'1px solid red':null} } type='text' value={descricao} onChange={handleChangeDescricao} label="Descrição" placeholder="Descreva a sua reclamação em poucas palavras" />
                {erros.descricao ? (<span style={{fontWeight: 'bold', fontSize: '14px', color: 'red', marginTop: '-10px', marginBottom: '10px'}}>A descrição é obrigatória</span>) : null}
            </div>

            <label style={{marginBottom: '5px'}}>Categoria</label>
            <Select sx={{border: 'none', borderRadius: '15px', height: '40px', color: '#1A202C', fontSize: '14px', border: erros.categoria?'1px solid red':null }} className="selectDescricao" labelId="demo-simple-select-label" id="demo-simple-select" value={categoria} label="Categoria" onChange={handleChangeCategoria} displayEmpty >
            <MenuItem disabled value=""> <em>Selecione uma categoria</em> </MenuItem>
                {categoriaSelect.map( (cat) => (
                    <MenuItem key={cat.idcategorias} value={cat.idcategorias}>{cat.descricao}</MenuItem>
                ))}
            </Select>
            {erros.categoria ? (<span style={{fontWeight: 'bold', fontSize: '14px', color: 'red', marginTop: '2px', marginBottom: '5px'}}>A categoria é obrigatória</span>) : null}

            <label style={{marginBottom: '5px', marginTop: '20px'}}>Responsável</label>
            <Select sx={{border: 'none', borderRadius: '15px', height: '60px', color: '#1A202C', fontSize: '14px'}} className="selectDescricao" value={responsavel} label="Categoria" onChange={handleChangeResponsavel} displayEmpty >
                <MenuItem disabled value=""> <em>Selecione uma responsável</em> </MenuItem>
                {departamentosSelect.map( (dep) => (
                    <MenuItem key={dep.iddepartamento} value={dep.iddepartamento}><Avatar style={{marginRight: '5px'}} src={dep.logo}/>{dep.departamento}</MenuItem>
                ))}
            </Select>
        </div>
    )
})

const Endereco = forwardRef(({ onConfirmar }, ref) => {
    const [erros, setErros] = useState({})

    const [cep, setCep] = useState('');
    const [estado, setEstado] = useState('');
    const [cidade, setCidade] = useState('')
    const [bairro, setBairro] = useState('')
    const [endereco, setEndereco] = useState('')
    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')
    const [pontoReferencia, setPontoReferencia] = useState('')

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
    
    const confirmar = () => {
        var control = true
        var newErros = {}
        if(cep == ""){
            newErros.cep = "O cep é obrigatório"
            control = false
        }else if(endereco == ""){
            newErros.cep = "Insira um cep válido"
            control = false
        }
        setErros(newErros)
        const data = {cep, estado, cidade, bairro, endereco, numero, complemento, pontoReferencia}
        onConfirmar(data, control)
    }

    useImperativeHandle(ref, () => ({
        confirmar,
    }));

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

    return(
        <div className="form">
            <InputStyled erro={erros.cep} value={cep} onValueChange={handleChangeCep} type="number" label="CEP" placeholder="Digite o CEP" />
            <InputDisabledStyled value={estado} onValueChange={handleChangeEstado} type="text" label="Estado" placeholder="Selecione um estado" />
            <InputDisabledStyled value={cidade} onValueChange={handleChangeCidade} type="text" label="Cidade" placeholder="Selecione uma cidade" />
            <InputDisabledStyled value={bairro} onValueChange={handleChangeBairro} type="text" label="Bairro" placeholder="Digite o bairro" />
            <InputDisabledStyled value={endereco} onValueChange={handleChangeEndereco} type="text" label="Endereço" placeholder="Digite o endereço" />
            <InputStyled value={numero} onValueChange={handleChangeNumero} type="number" label="Número" placeholder="Digite o número" />
            <InputStyled value={complemento} onValueChange={handleChangeComplemento} type="text" label="Complemento" placeholder="Digite um complemento" />
            <InputStyled value={pontoReferencia} onValueChange={handleChangePontoReferencia} type="text" label="Ponto de Referência" placeholder="Digite um ponto de referência" />
        </div>
    )
})

function FotosVideos({onCadastro}){
    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className='anexarArquivos'>
                Envie aqui fotos e videos <CameraAltIcon />
            </div>

            <button onClick={onCadastro} className="button buttonCadastro">Enviar reclamação</button>
        </div>
    )

}