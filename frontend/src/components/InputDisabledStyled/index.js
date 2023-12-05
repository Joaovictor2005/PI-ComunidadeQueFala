import React from "react";

export default function InputDisabledStyled(props){
    
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
        opacity: '0.6'
    }

    const styleDiv = {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column'
    }

    const handleChange = (event) => {
        props.onValueChange(event.target.value)
    }

    return(
        <div style={styleDiv}>
            <label>{props.label}</label>
            <input disabled type={props.type} style={styleInput} placeholder={props.placeholder} value={props.value} onChange={handleChange}/>
        </div>
    )
}