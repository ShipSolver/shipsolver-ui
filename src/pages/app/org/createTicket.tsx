import React, { SelectHTMLAttributes } from "react";

import Paper from "../../components/roundedPaper";
import { blue } from "@mui/material/colors";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

type SectionName = string;

type TextInputName = string;

type SelectName = string;
type SelectOption = string;

type CheckboxName = string;

type FormState = {
  selectInputs: {
    [key: SelectName]: {
      value: string,
      options: SelectOption[]
    }
  };
  textInputs: {
    [key: SectionName]: {
      [key: TextInputName]: {
        value: string;
        isTextArea?: boolean;
      };
    }
  };
  checkboxes: {
    [key: CheckboxName]: {
      value: boolean
    }
  }
}

const DEFAULT_FORM_STATE : FormState = {
  selectInputs:{
    "First Party" : {
      value: "",
      options: ["CEVA", "North American"]
    }
  },
  textInputs: {
    "Shipper": {
      Company: {value: ""}, 
      Name: {value: ""}, 
      Address:{value: ""}, 
      PhoneNumber: {value: ""}, 
      PostalCode:{value: ""}, 
    },
    "Consignee": {
      Company: {value: ""}, 
      Name: {value: ""}, 
      Address:{value: ""}, 
      PhoneNumber: {value: ""}, 
      PostalCode:{value: ""}, 
    },
    "Shipment Details": {
      HouseRef: {value: ""}, 
      Barcode: {value: ""}, 
      Pieces:{value: ""},
      Weight: {value: ""}, 
      BOL:{value: ""}, 
      Special:{value: "", isTextArea: true}, 
    }
  },
  checkboxes: {
    Pickup: {value: false}
  }
}


function FormContent(){
  
  const [formData, setFormData] = React.useState<FormState>(DEFAULT_FORM_STATE)

  function handleCheckboxChange(event:React.ChangeEvent<HTMLInputElement>) {
    const {id, checked} = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      checkboxes: {
      ...prevFormData.checkboxes,
      [id]: {value: checked}
    }}))
  }

  function handleTextInputChange(
    event:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, 
    sectionName: string,
    isTextArea: boolean
  ) {
    const {id, value} = event.target
      setFormData(prevFormData => {
        return {
            ...prevFormData,
            textInputs: {
              ...prevFormData.textInputs,
              [sectionName]:{
                ...prevFormData.textInputs[sectionName],
                [id]: {
                  value,
                  isTextArea
                }
              }
            }
        }
    })
  }

  function handleChangeSel(event:React.ChangeEvent<HTMLSelectElement>) {
    const {id, value} = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      selectInputs: {
        ...prevFormData.selectInputs,
        [id]: {
          ...prevFormData.selectInputs[id],
          value
        }
      }
    }))
  }


  function handleSubmit(event:any){
    event.preventDefault()
  }

  function clearForm(){
    setFormData(DEFAULT_FORM_STATE)
  }

  return(
    <div>
    <form onSubmit={handleSubmit}>
    <Grid container columnSpacing = {2}>
      <Grid item md = {6} sm = {12}>
      {
        Object.entries(formData.selectInputs).map(([selectName, {value, options}]) => (<>
          <label style = {{fontSize: "250%"}}>{selectName}&nbsp;&nbsp;</label>
          <select 
            value = {value}
            onChange={handleChangeSel}
            style ={{width: 200, height: 50, left: 9, borderRadius:15}}
            id={selectName}>
            {
              options.map(optionName => <option value={optionName}>{optionName}</option>)
            }
          </select>
        </> ))
      }
      </Grid>
      <div style = {{marginLeft: "20px"}}>
        {
          /**
           * Use https://mui.com/material-ui/react-checkbox/#main-content instead
           */
          Object.entries(formData.checkboxes).map(([checkBoxName, {value}]) => (<>
            <input checked ={value} onChange={handleCheckboxChange} type="checkbox" id={checkBoxName} style = {{transform: "scale(2.5)"}}></input>
            <label style = {{fontSize:"250%", marginLeft: "15px",marginTop: "7px"}}>{checkBoxName}</label>
          </>))
        }
      </div>
      {
        Object.entries(formData.textInputs).map(([sectionName, textInputs]) => (<Grid item md = {6} sm = {12}>
          <h1 className="unbold">{sectionName}</h1>
          {
            Object.entries(textInputs).map(([textInputName, {value, isTextArea}]) => ( isTextArea ? (
              <div className = "Ticketlabel">
                <p className = "label-header"> {textInputName} </p>
                <textarea 
                  value={value} 
                  id={textInputName} 
                  onChange={(event) => handleTextInputChange(event, sectionName, true)} 
                  style={{ width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15, marginBottom: "-20px" }}
                  />
              </div>
            ) : (
              <div className = "Ticketlabel">
                <p className = "label-header"> {textInputName} </p>
                <input 
                  className = "label-textbox"
                  value={value} 
                  onChange={(event) => handleTextInputChange(event, sectionName, false)} 
                  type="text" 
                  id={textInputName}
                  />
              </div>  
            )))
          }
        </Grid>))
      }
      <Grid item md = {12}>
        <Button onClick = {handleSubmit} variant="contained" sx = {{ height: 32, backgroundColor: "#e1fce7", color: "black", fontSize: 24, mr: 2, mt:5  }}>Add to Inventory</Button>
        <Button variant="contained" sx = {{height: 32, backgroundColor: "#fbe1e1", color: "black", fontSize: 24, mr: 2, mt:5}}>Delete</Button>
        <Button onClick = {clearForm} variant="contained" sx = {{ height: 32, backgroundColor: "#e1edfc", color: "black", fontSize: 24, mr: 2, mt:5}}>Clear</Button>
      </Grid>
    </Grid>
  </form>
</div>
  )
}

function CreateTicket() {
 return (
   <div className= "paper">
<Grid container>
  <Paper sx = {{ backgroundColor: "#cbdfeb", mt:-2, top: -60}}>
    <div className = "paper2">
      <Paper sx = {{ elevation: 0}}>
        <div>
          <FormContent/>
        </div>
      </Paper>
    </div>
  </Paper>
</Grid>
 </div>

);
}

export default CreateTicket;
