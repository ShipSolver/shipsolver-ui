import React from "react";

import Paper from "../components/roundedPaper";
import { blue } from "@mui/material/colors";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


function OneButton(props:any){
  return(
    <Button variant="contained" sx = {{width: props.width, height: 32, backgroundColor: props.color, color: "black", fontSize: 24, mr: 2}}>{props.name}</Button>
  )
}



function Stuff(){
  const [formData, setFormData] = React.useState(
    {company: "", Name: "", Address:"", PhoneNumber:"", PostalCode:"", HouseRef: "", Barcode: "", pieces:"",Weight: "", BOL:"", 
    Special:"", Company1: "", Name1:"", Address1:"", PhoneNumber1:"", PostalCode1:"", Select:"" }
  )


  function handleChange(event:any) {
    console.log(event.target.value)
    console.log(event.target.name)
    console.log(formData.Select)
    setFormData(prevFormData => {
        return {
            ...prevFormData,
            [event.target.name]: event.target.value
        }
    })
  }


  function TicketLabel(props:any){
    return(
      <div className="Ticketlabel">
        <p className = "label-header"> {props.name} </p>
        <input value={props.textname} onChange={handleChange} className = "label-textbox" type="text" name = {props.textname} style={{ height: 20,  borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
      </div>
    )
  }

  function handleSubmit(event:any){
    console.log(formData)
    event.preventDefault()
  }

  function clearForm(event:any){
    setFormData(prevFormData => {
      return {
        company: "", Name: "", Address:"", PhoneNumber:"", PostalCode:"", HouseRef: "", Barcode: "", pieces:"",Weight: "", BOL:"", 
        Special:"", Company1: "", Name1:"", Address1:"", PhoneNumber1:"", PostalCode1:"", Select: "" 
      }
  })
  }

  return(
    <div>
    <form onSubmit={handleSubmit}>
    <Grid container columnSpacing = {2}>
      <Grid item md = {12}>
    <div className = "fparty">
            <label>First Party</label>
            <select 
              value = {formData.Select}
              onChange={handleChange}
              style ={{width: 200, height: 50, left: 9}}
              name = "Select">

              <option value="CEVA">CEVA</option>
              <option value="CEVA1">CEVA1</option>
              <option value="NA">North American</option>
            </select>
          </div>
          </Grid>

    <Grid item md = {6} sm = {12}>
      <h1 className="unbold"> Shipper </h1>
        <div className="Ticketlabel">
          <p className = "label-header"> Company </p>
          <input className = "label-textbox" value={formData.company} onChange={handleChange} type="text" name = "company" style={{ height: 20,  borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

        <div className="Ticketlabel">
            <p className = "label-header"> Name </p>
            <input value={formData.Name} onChange={handleChange} className = "label-textbox" type="text" name = "Name" style={{ height: 20,  borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

        <div className="Ticketlabel">
          <p className = "label-header"> Address </p>
          <input className = "label-textbox" value={formData.Address} onChange={handleChange} type="text" name = "Address" style={{ height: 20,  borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

        <div className="Ticketlabel">
          <p className = "label-header"> Phone Number </p>
          <input className = "label-textbox" value={formData.PhoneNumber} onChange={handleChange} type="text" name = "PhoneNumber" style={{ height: 20,  borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

        <div className="Ticketlabel">
          <p className = "label-header"> Postal Code </p>
          <input className = "label-textbox" value={formData.PostalCode} onChange={handleChange} type="text" name = "PostalCode" style={{ height: 20,  borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>
    </Grid>
      <Grid item md = {6} sm = {12}>
      <h1 className="unbold"> Consignee </h1>
      <div className="Ticketlabel">
          <p className = "label-header"> Company </p>
          <input className = "label-textbox" value={formData.Company1} onChange={handleChange} type="text" name = "Company1" style={{ height: 20, borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

        <div className="Ticketlabel">
            <p className = "label-header"> Name </p>
            <input value={formData.Name1} onChange={handleChange} className = "label-textbox" type="text" name = "Name1" style={{ height: 20, borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

        <div className="Ticketlabel">
          <p className = "label-header"> Address </p>
          <input className = "label-textbox" value={formData.Address1} onChange={handleChange} type="text" name = "Address1" style={{ height: 20, borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

        <div className="Ticketlabel">
          <p className = "label-header"> Phone Number </p>
          <input className = "label-textbox" value={formData.PhoneNumber1} onChange={handleChange} type="text" name = "PhoneNumber1" style={{ height: 20, borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

        <div className="Ticketlabel">
          <p className = "label-header"> Postal Code </p>
          <input className = "label-textbox" value={formData.PostalCode1} onChange={handleChange} type="text" name = "PostalCode1" style={{ height: 20, borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>
        </Grid>

    <Grid item md = {6} sm = {12}>
    <h1 className="unbold"> Shipment Details </h1>
        <div className="Ticketlabel">
          <p className = "label-header"> House/Ref </p>
          <input className = "label-textbox" value={formData.HouseRef} onChange={handleChange} type="text" name = "HouseRef" style={{ height: 20,  borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

        <div className="Ticketlabel">
          <p className = "label-header"> Barcode </p>
          <input className = "label-textbox" value={formData.Barcode} onChange={handleChange} type="text" name = "Barcode" style={{ height: 20,  borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

        <div className="Ticketlabel">
          <p className = "label-header"> # of pieces </p>
          <input className = "label-textbox" value={formData.pieces} onChange={handleChange} type="text" name = "pieces" style={{ height: 20,  borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

        <div className="Ticketlabel">
          <p className = "label-header"> Weight  </p>
          <input className = "label-textbox" value={formData.Weight} onChange={handleChange} type="text" name = "Weight" style={{ height: 20,  borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

        <div className="Ticketlabel">
          <p className = "label-header"> BOL # </p>
          <input className = "label-textbox" value={formData.BOL} onChange={handleChange} type="text" name = "BOL" style={{ height: 20,  borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>

      <div className = "di"> 
      <p>Special Instructions</p>  
      <textarea value={formData.Special} name = "Special" onChange={handleChange} style={{ width: "90%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
    </div>
    </Grid>
    <Grid item md = {12}>
      <Button onClick = {handleSubmit} variant="contained" sx = {{ height: 32, backgroundColor: "yellow", color: "black", fontSize: 24, mr: 2}}>Add to Inventory</Button>
      <OneButton name = "Delete" color = "red"/>
      <Button onClick = {clearForm} variant="contained" sx = {{ height: 32, backgroundColor: "indigo[500]", color: "black", fontSize: 24, mr: 2}}>Clear</Button>
    </Grid>
    </Grid>
  </form>

</div>
  )
}

function CreateTicket() {





 return (
   <div className= "paper">
     {/* <Button variant="contained" sx = {{left: 75, width: 550, height: 53, backgroundColor: "blue[800]", color: "black", fontSize: 25, mt: -10}}>Create From Delivery Receipts</Button>
     <Button variant="contained" sx = {{left: 75, width: 550, height: 53, backgroundColor: "blue[800]", color: "black", fontSize: 25, mt: -10}}>Create Manually</Button> */}

  <Paper sx = {{ backgroundColor: "blue", mt:-2, top: -60}}>
    {console.log('aaa')}
    <div className = "paper2">
      <Paper sx = {{ elevation: 0}}>
        <div>
          <Stuff/>
        </div>
      </Paper>
    </div>
  </Paper>
 </div>

);
}

export default CreateTicket;