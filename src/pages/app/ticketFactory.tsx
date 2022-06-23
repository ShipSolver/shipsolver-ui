import React from "react";

import Tab from '@mui/material/Tab';
import Tabs from  '@mui/material/Tabs';
import CreateTicket from "./createTicket"
import UploadTix from "./manualUpload"
const Home =() => {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event:any, newValue:any) =>{
    setSelectedTab(newValue);
  }

 return (
   <>
  <Tabs value = {selectedTab} onChange = {handleChange} centered >
    <Tab label = "Create from Delivery Receipts"/>
    <Tab label = "Create Manually"/>
  </Tabs>

{selectedTab === 0 &&  <CreateTicket/>}
{selectedTab === 1 &&  <UploadTix/> }  
</>
);
}

export default Home;