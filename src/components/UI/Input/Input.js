import React from "react";
import './Input.css'
import logo from "../../Logo/Logo";

const input = (props) => {
    let inputElement = null;
    const inputClasses = ['InputElement'];

    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push('Invalid');
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
            onChange={props.changed}
            />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
            onChange={props.changed}
            />
            break;
        case ('select'):
            inputElement = (<select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
            >
                {props.elementConfig.options.map(data => (
                    <option key={data.value} value={data.value}>{data.displayValue}</option>
                    )
                )}
            </select>);
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
            onChange={props.changed}
            />
    }

    return(
        <div className={'Input'}>
            <label className={'Label'}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;
