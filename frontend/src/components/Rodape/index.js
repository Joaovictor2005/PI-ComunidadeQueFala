import React from "react";

export default function Rodape(){
    const styleDiv = {
        background: '#FFF',
        width: '100%',
        margin: '0px -8px',
        padding: '0px 8px',
        paddingBottom: '20px'
    }

    const styleSpan = {
        color: '#90A3BF',
        fontSize: '12px',
        fontWeight: '500',
    }

    const styleH1 = {
        fontSize: '26px',
        marginTop: '5px',
        paddingTop: '5px',
        marginBottom: '5px'
    }

    const styleSpanTermos = {
        fontSize: '12px',
        fontWeight: '600'
    }

    const styleSpanCopy = {
        fontSize: '14px',
        fontWeight: '600'
    }
    const styleDivSpanTermos = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '10px 0px'
    }
    return(
        <div style={styleDiv}>
            <h1 style={styleH1}>ComunidadeQueFala</h1>
            <span style={styleSpan}>As suas reclamações <br/>Fazem diferença em sua vida<br/>E na sua comunidade</span>
            <div style={styleDivSpanTermos}>
                <span style={styleSpanTermos}>Poltica de privacidade</span>
                <span style={styleSpanTermos}> Termos e condições</span>
            </div>
            <span style={styleSpanCopy}>@2023 JV. Todos os direitos reservados</span>
        </div>
    )
}