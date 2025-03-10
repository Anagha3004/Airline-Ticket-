import React, {useEffect, useRef, useState} from "react";

import './ImageUpload.css';

const ImageUpload=(props)=>{

    //to manage the file
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isvalid, setIsValid] = useState();

    //to set the preview we need to implement useEffect hook
    useEffect(()=>{
        if(!file){ //if file not present
            return;
        }
        const fileReader = new FileReader(); //to paarse the file
        //to convert the file which is binary data into readable image url
        fileReader.onload=()=>{
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    },[file])

    const filePickerRef = useRef();
    const pickedHandler = (event)=>{
        let pickedFile;
        let fileIsValid;
        if(event.target.files || event.target.files.length === 1){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }else{
            setIsValid(false);
        }
        //passing the file from child to parent
        props.onInput(props.id, pickedFile, fileIsValid);
    }
    const pickImageHandler = ()=>{
        filePickerRef.current.click();
    }
    return(
        <div className="form-control">
            <input
            id={props.id} 
            style={{display: 'none'}}  //setting an inline styling...inside {{}}
            ref = {filePickerRef}
            type="file"
            accept = ".jpg, .png, .jpeg"
            onChange = {pickedHandler}/>

            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src ={previewUrl} alt = "preview"/>}
                    {!previewUrl && <p>Please pick an image</p>}

                </div>
                <button type="button" onClick={pickImageHandler}>PICK IMAGE</button>
            </div>
            {!isvalid && <p>{props.errorText}</p>}
        </div>
    )

}

export default ImageUpload;