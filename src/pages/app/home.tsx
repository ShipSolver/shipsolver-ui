import React from "react";

import Button from "@mui/material/Button";

import Lists from "../components/multiList";

import { useNavigate } from "react-router-dom";

import tickets from "../../mockData/tickets.json";

type ticket = {
  STATUS: string;
  FIRST_PARTY: string;
  HOUSE_REF: string;
  BARCODE: string;
  PCS: [
    {
      DESCRIPTION: string;
    }
  ];
  NUM_PCS: string;
  WEIGHT: string;
  BOL_NUM: string;
  SPECIAL_SERVICES: string;
  SPECIAL_INSTRUCTIONS: string;
  CURRENT_ASSIGNED_USER_ID: string;
  NO_SIGNATURE_REQUIRED: boolean;
  TAILGATE_AUTHORIZED: boolean;
  IS_PICKUP: boolean;
  APPOINTMENT_TIME: string;
  CONSIGNEE: {
    COMPANY: string;
    NAME: string;
    ADDRESS: string;
    POSTAL_CODE: string;
    PHONE_NUMBER: string;
  };
  SHIPPER: {
    COMPANY: string;
    NAME: string;
    ADDRESS: string;
    POSTAL_CODE: string;
    PHONE_NUMBER: string;
  };
  MILESTONES: [
    {
      TIMESTAMP: string;
      DESCRIPTION: string;
    }
  ];
  EDITS: [
    {
      TIMESTAMP: string;
      USERNAME: string;
      CHANGES_MADE: [
        {
          FIELD_TYPE: string;
          ORIGINAL_VALUE: string;
          NEW_VALUE: string;
        }
      ];
    }
  ];
};

function Home() {
  const navigate = useNavigate();

  return (
    <div className="ss-space-children-vertically">
      <Lists
        listSpecifications={[
          {
            title: "Column",
            entries: tickets.tickets as ticket[],
            entryRenderer: (ticket: ticket) => <div>{ticket.FIRST_PARTY}</div>,
          },
        ]}
      />
      <Button variant="contained" onClick={() => navigate("/ticket-factory")}>
        Create Tickets
      </Button>
    </div>
  );
}

export default Home;
