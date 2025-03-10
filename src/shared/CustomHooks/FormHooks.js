import React, { useCallback, useReducer } from "react";

const formReducer = (state,action)=>{
    switch(action.type){
        case "INPUT_CHANGE":
            let formIsValid = true; //here we have assigned as true bcuz only then the add button gets works
            for (const inputId in state.inputs){ //here the inputId value is taken from the form id...title& discription..we are checking the inputs below dictionary 
                if(inputId === action.inputId){ //checing the updated input - title or description, then updating the valid true or false..
                    formIsValid = formIsValid && action.isvalid //here formis valid becomes true
                }else{
                    formIsValid = formIsValid && state.inputs[inputId].isvalid // for here we are checking the next field .. i.e description
                }
            }
            return{
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: {value:action.value, isvalid: action.isvalid}
                },
                isvalid: formIsValid
            };
            case "SET_DATA":
                return{
                    inputs: action.inputs,
                    isvalid: action.formIsValid
                };
            default:
                return state;
    }
}


export const useForm = (initialInputs, initialFormValidity)=>{


    const [formState, dispatch] = useReducer(formReducer, {

        inputs: initialInputs,
        isvalid: initialFormValidity
    })

    const InputHandler = useCallback((id,value,isvalid)=>{
        dispatch({type: "INPUT_CHANGE", value:value, isvalid:isvalid, inputId:id})
    },[])

    const setFormData = useCallback((inputData, formValidity)=>{
        dispatch({
            type: "SET_DATA",
            inputs: inputData,
            formIsValid: formValidity
        });
    },[]);
    return [formState, InputHandler, setFormData];
}