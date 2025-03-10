import React, { useEffect, useReducer } from "react";
import './Input.css';
import { validate } from "../UTIL/Validator";

//create inputReducer function
const inputReducer = (state, action) =>{

    switch(action.type){
        case 'CHANGE':
            return{ //return a new state
                ...state, //copies all the keys & values of the old state to new object
                value: action.val,
                // isvalid:true ////hardcoded
                isvalid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return{
                ...state,
                isTouched:true
            }
        default:
            return state; //existing state
    }
}


const Input = props =>{
    //useReducer is basically a function that recieves an action and can dispatch the action. 
    //it receives the current state and update the cureent state based on the action received and return the
    // new state. useReducer will take the new state and give it back to the component and rerender the component
    
    const [inputState, dispatch] = useReducer(inputReducer, {value: '', isvalid:false, isTouched:false});
    
    //to transfer value from child input.js to parent newplace.js, we can't directly use props to achieve this.
    //instead we use a call back function...
    //here id and onInput is extracted from props.
    const {id, onInput} = props;
    //value and isvalid is extracted from the inputstate
    const {value, isvalid} = inputState;
    //using the useEffect function to pass the values
    useEffect(()=>{
        onInput(id,value,isvalid)
    },[id,value,isvalid,onInput]); //here when dependencies changes 
    //thi will trigger the useEffect function

    useReducer();

    const changeHandler = (event)=>{
        console.log("input has been changed")
        dispatch({type:'CHANGE', val:event.target.value, validators:props.validators})
        // now here i want to add two things store the value & validate it.
        //so here we need to handle the state .. can use usestate or useReducer
    }

    const touchHandler = ()=>{
        dispatch({type:'TOUCH'})
    }

    const element = props.element === 'input'? (
        <input id={props.id} type={props.type} placeholder={props.placeholder} onChange={changeHandler} onBlur={touchHandler} value={inputState.value}></input>
    ) :(
        <textarea id={props.id} rows={props.rows || 3} onChange={changeHandler} onBlur={touchHandler} value={inputState.value}></textarea>
    )
    return(
        <div className={`form-control ${!inputState.isvalid && inputState.isTouched && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isvalid && inputState.isTouched && <p>{props.errorText}</p>}
        </div>
    )

}

export default Input;