import React from "react";

export default function InputStyled(props){
    
    const styleInput = {
        borderRadius: '15px',
        height: '30px',
        flexShrink: '0',
        padding: '5px',
        paddingLeft: '10px',
        background: '#F6F7F9',
        fontWeight: '500',
        border: 'none',
        marginTop: '5px',
        marginBottom: '20px',
    }

    const styleInputError = {
        ...styleInput,
        border: '0.5px solid red'
    }

    const styleDiv = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    }

    const StyleSpanError = {
        marginTop: '-15px',
        color: 'red',
        fontSize: '12px',
        marginBottom: '20px',
    }

    const handleChange = (event) => {
        props.onValueChange(event.target.value)
    }

    return(
        <div style={styleDiv}>
            <label>{props.label}</label>
            <input type={props.type} style={props.erro ? styleInputError : styleInput} placeholder={props.placeholder} value={props.value} onChange={handleChange}/>
            {props.erro && <span style={StyleSpanError} >{props.erro}</span>}
        </div>
    )
}