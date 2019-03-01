import React, {Component} from 'react';

export default function Mybutton(props) {
    return <button {...props} className='my-button'>{props.name}</button>
}

