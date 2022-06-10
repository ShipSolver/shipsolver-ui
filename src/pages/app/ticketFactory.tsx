import React from "react";
import Box from '@mui/material/Box';
import { sizing } from '@mui/system';
import Paper from "../components/roundedPaper";
import { blue } from "@mui/material/colors";
import Button from '@mui/material/Button';
import { buttonBaseClasses } from "@mui/material";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Tab from '@mui/material/Tab';
import Tabs from  '@mui/material/Tabs';


function OneButton(props:any){
  return(
    <Button variant="contained" sx = {{width: props.width, height: 32, backgroundColor: props.color, color: "black", fontSize: 24, mr: 2}}>{props.name}</Button>
  )
}



function Stuff(){
  const [formData, setFormData] = React.useState(
    {company: "", Name: "", Address:"", PhoneNumber:"", PostalCode:"", HouseRef: "", Barcode: "", pieces:"",Weight: "", BOL:"", 
    Special:"", Company1: "", Name1:"", Address1:"", PhoneNumber1:"", PostalCode1:"" }
  )


  function handleChange(event:any) {
    console.log(event.target.value)
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
        <input value={props.textname} onChange={handleChange} className = "label-textbox" type="text" name = {props.textname} style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
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
        Special:"", Company1: "", Name1:"", Address1:"", PhoneNumber1:"", PostalCode1:"" 
      }
  })
  }

  function Column1(){
    return(
      <div>
        <form onSubmit={handleSubmit}>
      <div className = "column1">
        <div>
          <h1 className="unbold"> Shipper </h1>
            <div className="Ticketlabel">
              <p className = "label-header"> Company </p>
              <input className = "label-textbox" value={formData.company} onChange={handleChange} type="text" name = "company" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

            <div className="Ticketlabel">
                <p className = "label-header"> Name </p>
                <input value={formData.Name} onChange={handleChange} className = "label-textbox" type="text" name = "Name" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

            <div className="Ticketlabel">
              <p className = "label-header"> Address </p>
              <input className = "label-textbox" value={formData.Address} onChange={handleChange} type="text" name = "Address" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

            <div className="Ticketlabel">
              <p className = "label-header"> Phone Number </p>
              <input className = "label-textbox" value={formData.PhoneNumber} onChange={handleChange} type="text" name = "PhoneNumber" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

            <div className="Ticketlabel">
              <p className = "label-header"> Postal Code </p>
              <input className = "label-textbox" value={formData.PostalCode} onChange={handleChange} type="text" name = "PostalCode" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>
          </div>
          <div>
          <h1 className="unbold"> Consignee </h1>
          <div className="Ticketlabel">
              <p className = "label-header"> Company </p>
              <input className = "label-textbox" value={formData.Company1} onChange={handleChange} type="text" name = "Company1" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

            <div className="Ticketlabel">
                <p className = "label-header"> Name </p>
                <input value={formData.Name1} onChange={handleChange} className = "label-textbox" type="text" name = "Name1" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

            <div className="Ticketlabel">
              <p className = "label-header"> Address </p>
              <input className = "label-textbox" value={formData.Address1} onChange={handleChange} type="text" name = "Address1" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

            <div className="Ticketlabel">
              <p className = "label-header"> Phone Number </p>
              <input className = "label-textbox" value={formData.PhoneNumber1} onChange={handleChange} type="text" name = "PhoneNumber1" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

            <div className="Ticketlabel">
              <p className = "label-header"> Postal Code </p>
              <input className = "label-textbox" value={formData.PostalCode1} onChange={handleChange} type="text" name = "PostalCode1" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>
          </div>
        </div>
        <div>
        <h1 className="unbold"> Shipment Details </h1>
            <div className="Ticketlabel">
              <p className = "label-header"> House/Ref </p>
              <input className = "label-textbox" value={formData.HouseRef} onChange={handleChange} type="text" name = "HouseRef" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

            <div className="Ticketlabel">
              <p className = "label-header"> Barcode </p>
              <input className = "label-textbox" value={formData.Barcode} onChange={handleChange} type="text" name = "Barcode" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

            <div className="Ticketlabel">
              <p className = "label-header"> # of pieces </p>
              <input className = "label-textbox" value={formData.pieces} onChange={handleChange} type="text" name = "pieces" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

            <div className="Ticketlabel">
              <p className = "label-header"> Weight  </p>
              <input className = "label-textbox" value={formData.Weight} onChange={handleChange} type="text" name = "Weight" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

            <div className="Ticketlabel">
              <p className = "label-header"> BOL # </p>
              <input className = "label-textbox" value={formData.BOL} onChange={handleChange} type="text" name = "BOL" style={{ height: 20, width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
            </div>

          <div className = "di"> 
          <p>Special Instructions</p>  
          <textarea className = "label-textbox" value={formData.Special} onChange={handleChange} style={{ width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
        </div>
      </div>
        <div className = "buttons">
          <Button onClick = {handleSubmit} variant="contained" sx = {{ height: 32, backgroundColor: "yellow", color: "black", fontSize: 24, mr: 2}}>Add to Inventory</Button>
          <OneButton name = "Delete" color = "red"/>
          <Button onClick = {clearForm} variant="contained" sx = {{ height: 32, backgroundColor: "indigo[500]", color: "black", fontSize: 24, mr: 2}}>Clear</Button>
        </div>
      
      </form>

</div>
    )
  }
  return(
    <Column1/>
  )
}

function Home() {





 return (
   <div className= "paper">
     <Button variant="contained" sx = {{left: 75, width: 550, height: 53, backgroundColor: "blue[800]", color: "black", fontSize: 25, mt: -10}}>Create From Delivery Receipts</Button>
     <Button variant="contained" sx = {{left: 75, width: 550, height: 53, backgroundColor: "blue[800]", color: "black", fontSize: 25, mt: -10}}>Create Manually</Button>
  <Paper sx = {{width: 1200, backgroundColor: "blue", mt:-2, top: -60}}>
    {console.log('aaa')}
    <div className = "paper2">
      <Paper sx = {{width: 850, elevation: 0,}}>
      <div className = "fparty">
            <h1 className = "unbold1"> First Party</h1>
            <Select sx ={{width: 200, height: 50, left: 9}}>
              <option value="CEVA">CEVA</option>
              <option value="NA">North American</option>
            </Select>
          </div>
        <div>
          <Stuff/>
        </div>
      </Paper>
    </div>
  </Paper>
 </div>

);
}

export default Home;











// function Column1(){
//   return(
//     <form>
//     <div className = "column1">
//       <div>
//         <h1 className="unbold"> Shipper </h1>
//         <TicketLabel name = "Company" textname = "Company" />
//         <TicketLabel name = "Name" textname = "Name"/>
//         <TicketLabel name = "Address" textname = "Address"/>
//         <TicketLabel name = "Phone Number" textname = "PhoneNumber" />
//         <TicketLabel name = "Postal Code" textname = "PostalCode"/>
//         </div>
//         <div>
//         <h1 className="unbold"> Consignee </h1>
//         <TicketLabel name = "Company" />
//         <TicketLabel name = "Name" />
//         <TicketLabel name = "Address" />
//         <TicketLabel name = "Phone Number" />
//         <TicketLabel name = "Postal Code" />
//         </div>
//       </div>
//       <div>
//       <h1 className="unbold"> Shipment Details </h1>
//         <TicketLabel name = "House/Ref #" />
//         <TicketLabel name = "Barcode" />
//         <TicketLabel name = "# of pieces" />
//         <TicketLabel name = "Weight" />
//         <TicketLabel name = "BOL #" />
//         <div className = "di"> 
//         <p>Special Instructions</p>  
//         <textarea className = "label-textbox" style={{ width: "70%", borderColor: 'gray', borderWidth: 1, borderRadius: 10, fontSize: 15 }}/>
//       </div>
//     </div>
//     </form>
//   )
// }