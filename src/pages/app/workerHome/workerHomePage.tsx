import React, { useState } from 'react'

import useLoadable from '../../../utils/useLoadable';
import { fetchWokerAppTicketsForStatus } from '../../../services/ticketServices';
import { WorkerAppTicket } from '../../../services/types';

import SearchIcon from '@mui/icons-material/Search';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';

import OuterBlueDivBox from '../components/outerBlueDivBox';
import InnerBlueDivBox from '../components/innerBlueDivBox';
import InnerWhiteDivBox from '../components/innerWhiteDivBox';
import { LargeButton } from '../components/largeButton';
import { Search, SearchIconWrapper, StyledInputBase } from './components/searchBar'

import './workerHomePage.css'

const CheckInExpectedDeliveries = ({expectedDeliveries, srchTicket} : {expectedDeliveries: WorkerAppTicket[] | null, srchTicket: string}) => {
  const [selectedTicket, setSelectedTicket] = useState<WorkerAppTicket | null>(null);
  const [openTicketModal, setOpenTicketModal] = useState<boolean>(false);

  const handleTicketModalOpen = (ticket: WorkerAppTicket) => {setOpenTicketModal(true); setSelectedTicket(ticket)}
  const handleTicketModalClose = () => {setOpenTicketModal(false); console.log('closed'); setSelectedTicket(null)}

  const [openViewAllModal, setOpenViewAllModal] = useState<boolean>(false);

  const handleViewAllModalOpen = () => {setOpenViewAllModal(true)}
  const handleViewAllModalClose = () => {setOpenViewAllModal(false); console.log('closed')}
  
  return (
      <div>
          <InnerBlueDivBox>
            <Typography className='worker-app-delivery-titles'>Expected Deliveries</Typography>
            {expectedDeliveries?.filter((ticket) => {
            if (srchTicket === '') {
              return ticket
            } else if (ticket.RefNumber.toLowerCase().includes(srchTicket.toLowerCase())) {
              return ticket
            }
          }).slice(0,4).map(delivery => (<React.Fragment key={delivery.RefNumber}>
              <InnerWhiteDivBox className='worker-app-ticket-container' onClick={() => handleTicketModalOpen(delivery)}>
                <Typography className='worker-app-ticket-title'>REF#: {delivery.RefNumber}</Typography>
                <Typography className='worker-app-ticket-sub-title'>{delivery.address}</Typography>
              </InnerWhiteDivBox>
            </React.Fragment>))}
            <Typography onClick={() => handleViewAllModalOpen()} className='worker-app-view-all-button'>View All</Typography>
          </InnerBlueDivBox>

          <Modal disableAutoFocus={true} open={openTicketModal} onClose={handleTicketModalClose}>
            <div className='expected-deliveries-modal'>
            <CloseIcon onClick={() => handleTicketModalClose()} className='modal-close-button' />
              <Stack spacing={3} className='expected-deliveries-modal-content'>
                <div>
                  <Typography>Check in delivery?</Typography>
                  <Typography className='expected-deliveries-modal-text'>REF# {selectedTicket?.RefNumber}</Typography>
                  <Typography className='expected-deliveries-modal-text'>{selectedTicket?.address}</Typography>
                </div> 
                <Stack spacing={3} direction='row'>
                  <Button variant='contained' className='worker-app-yes-button'>Yes</Button>
                  <Button variant='contained' className='worker-app-no-button'>No</Button>
                </Stack>
              </Stack>
            </div>
          </Modal> 

          <Modal disableAutoFocus={true} open={openViewAllModal} onClose={handleViewAllModalClose}>
            <OuterBlueDivBox className='worker-app-view-all-container'>
              <Typography className='worker-app-delivery-titles'>All Expected Deliveries</Typography>
              <CloseIcon onClick={() => handleViewAllModalClose()} className='modal-close-button' />
              {expectedDeliveries?.map(delivery => (<React.Fragment key={delivery.RefNumber}>
                <InnerWhiteDivBox className='worker-app-ticket-container' onClick={() => handleTicketModalOpen(delivery)}>
                  <Typography className='worker-app-ticket-title'>REF#: {delivery.RefNumber}</Typography>
                  <Typography className='worker-app-ticket-sub-title'>{delivery.address}</Typography>
                </InnerWhiteDivBox>
              </React.Fragment>))}
            </OuterBlueDivBox>
          </Modal>
      </div>
  );
}

const CheckInConfirmedDeliveries = ({confirmedDeliveries, srchTicket} : {confirmedDeliveries: WorkerAppTicket[] | null, srchTicket: string}) => {
  const [openViewAllModal, setOpenViewAllModal] = useState<boolean>(false);

  const handleViewAllModalOpen = () => {setOpenViewAllModal(true)}
  const handleViewAllModalClose = () => {setOpenViewAllModal(false); console.log('closed')}

  return (
    <div>
        <InnerBlueDivBox>
          <Typography className='worker-app-delivery-titles'>Deliveries You Have Confirmed</Typography>
          {confirmedDeliveries?.filter((ticket) => {
            if (srchTicket === '') {
              return ticket
            } else if (ticket.RefNumber.toLowerCase().includes(srchTicket.toLowerCase())) {
              return ticket
            }
          }).slice(0,3).map(delivery =>  <InnerWhiteDivBox key={delivery.RefNumber} onClick={() => {}}>
            <Typography className='worker-app-ticket-title'>REF#: {delivery.RefNumber}</Typography>
            <Typography className='worker-app-ticket-sub-title'>{delivery.address}</Typography>
          </InnerWhiteDivBox>)}
          <LargeButton label={"Create new delivery"} action={() => {}} />
          <Typography onClick={() => handleViewAllModalOpen()} className='worker-app-view-all-button'>View All</Typography>
        </InnerBlueDivBox>

        <Modal disableAutoFocus={true} open={openViewAllModal} onClose={handleViewAllModalClose}>
            <OuterBlueDivBox className='worker-app-view-all-container'>
              <Typography className='worker-app-delivery-titles'>All Confirmed Deliveries</Typography>
              <CloseIcon onClick={() => handleViewAllModalClose()} className='modal-close-button' />
              {confirmedDeliveries?.map(delivery => (<React.Fragment key={delivery.RefNumber}>
                <InnerWhiteDivBox className='worker-app-ticket-container'>
                  <Typography className='worker-app-ticket-title'>REF#: {delivery.RefNumber}</Typography>
                  <Typography className='worker-app-ticket-sub-title'>{delivery.address}</Typography>
                </InnerWhiteDivBox>
              </React.Fragment>))}
            </OuterBlueDivBox>
          </Modal>
    </div>
);
}

function WorkerHome() {
  const { val: currentExpectedDeliveries} =
    useLoadable(fetchWokerAppTicketsForStatus, "expected");
    const { val: currentConfirmedDeliveries} =
    useLoadable(fetchWokerAppTicketsForStatus, "confirmed");

    const [searchTicket, setSearchTicket] = useState('')

  return (
    <div>
        <Typography className='worker-app-delivery-header'>Check in Deliveries</Typography>
        <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{color: '#FFFFFF'}}/>
            </SearchIconWrapper>
            <StyledInputBase onChange={(event: React.ChangeEvent<HTMLInputElement>) => {setSearchTicket(event.target.value)}}/>
          </Search>
          <OuterBlueDivBox>
            <CheckInExpectedDeliveries expectedDeliveries={currentExpectedDeliveries} srchTicket={searchTicket}/>
            <CheckInConfirmedDeliveries confirmedDeliveries={currentConfirmedDeliveries} srchTicket={searchTicket}/>
          </OuterBlueDivBox>
    </div>
  )
}

export default WorkerHome