import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export function Input({...rest}: InputProps){
    return(
        <input type="text" {...rest}/>
    )
}

export function TextArea({...rest}: TextAreaProps){
    return(
        <textarea {...rest}></textarea>
    )
}