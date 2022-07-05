import React, {useState} from "react";
import Paper from "../../components/roundedPaper";
import Grid from '@mui/material/Grid';
import { FileUploader } from "react-drag-drop-files";
import {useDropzone} from 'react-dropzone';

const fileTypes = ["PDF"];

export default function UploadTix (){
    // const [selectedFile, setSelectedFile] = useState();
	// const [isFilePicked, setIsSelected] = useState(false);

    // const handleSubmission = () => {
	// };

	// const changeHandler = (event:any) => {
	// 	setSelectedFile(event.target.files[0]);
	// 	setIsSelected(true);
	// };

    const [file, setFile] = useState(null);
    const handleChange = (file:any) => {
      setFile(file);
    };


    return(
<div>
  <Paper sx = {{height:550,  backgroundColor: "#cbdfeb", mt: 2}}>
    <Grid   
      container
      direction="row"
      justifyContent="center"
      alignItems="center">
        <Grid item xs ={12}>
          <div className = "upload">
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          style = {{innerHeight:1000, outerHeight:1000}}
        />
        </div>
        </Grid>
      <p>{file ? `File name: ${file[0]["name"]}` : "no files uploaded yet"}</p>
      
    </Grid>
  </Paper>
</div>

  );
};






//     // const [selectedFile, setSelectedFile] = useState();
// 	// const [isFilePicked, setIsSelected] = useState(false);

//     // const handleSubmission = () => {
// 	// };

// 	// const changeHandler = (event:any) => {
// 	// 	setSelectedFile(event.target.files[0]);
// 	// 	setIsSelected(true);
// 	// };

//     const [file, setFile] = useState(null);
//     const handleChange = (file:any) => {
//       setFile(file);
//     };


//     return(
// <div>
//   <Paper>
//     <Grid   
//       container
//       direction="row"
//       justifyContent="center"
//       alignItems="center">
//         <Grid item xs ={12}>
//           <div className = "upload">
//         <FileUploader
//           multiple={true}
//           handleChange={handleChange}
//           name="file"
//           types={fileTypes}
//           style = {{innerWidth:1000}}
//         />
//         </div>
//         </Grid>
//       <p>{file ? `File name: ${file[0]["name"]}` : "no files uploaded yet"}</p>
      
//     </Grid>
//   </Paper>
// </div>
    // )






//           // drag state
//   const [dragActive, setDragActive] = React.useState(false);
//   // ref
//   const inputRef = React.useRef(null);
  
//   // handle drag events
//   const handleDrag = function(e:any) {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };
  
//   // triggers when file is dropped
//   const handleDrop = function(e:any) {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       // handleFiles(e.dataTransfer.files);
//     }
//   };
  
//   // triggers when file is selected with click
//   const handleChange = function(e:any) {
//     e.preventDefault();
//     if (e.target.files && e.target.files[0]) {
//       // handleFiles(e.target.files);
//     }
//   };
  
// // triggers the input when the button is clicked
//   const onButtonClick = () => {
//       // inputRef.current.click();
//   };
  
//   return (
//     <Paper>
//       <Grid container>
//         <Grid item xs = {12}>
//     <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
//       <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
//       <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
//         <div>
//           <p>Drag and drop your file here or</p>
//           <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
//         </div> 
//       </label>
//       { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
//     </form>
//     </Grid>
//     </Grid>
//     </Paper>