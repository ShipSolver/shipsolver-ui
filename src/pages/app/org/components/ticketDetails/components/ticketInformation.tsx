import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  InputLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Edit as EditIcon } from "@mui/icons-material";
import { Spacer } from "../../../../../components/spacer";
import { CommodityType, Commodities } from "./commodities";

type SectionTypes = "shipper" | "shipmentDetails" | "consignee";

const ShipperFieldLabels = {
  company: "Company",
  name: "Name",
  address: "Address",
  phoneNum: "Phone Number",
  postalCode: "Postal Code",
};

const ShipmentDetailsFieldLabels = {
  refNum: "House/Ref #",
  barcode: "Barcode",
  numPieces: "# of Pieces",
  weight: "Weight",
  bolNum: "BOL #",
  specialInst: "Special Instructions",
};

const ConsigneeFieldLabels = {
  company: "Company",
  name: "Name",
  address: "Address",
  phoneNum: "Phone Number",
  postalCode: "Postal Code",
};

type ShipperFields = keyof typeof ShipperFieldLabels;
type ShipmmentDetailsFields = keyof typeof ShipmentDetailsFieldLabels;
type ConsigneeFields = keyof typeof ConsigneeFieldLabels;

export type TicketInformationStateType = {
  firstParty?: string;
  shipper: {
    [key in ShipperFields]?: string;
  };
  shipmentDetails: {
    [key in ShipmmentDetailsFields]?: string | number;
  };
  consignee: {
    [key in ConsigneeFields]?: string;
  };
  isPickup?: boolean;
  enterIntoInventory?: boolean;
};

interface TicketInformationProps {
  data?: TicketInformationStateType;
  commodities?: CommodityType[];
  newTicket?: boolean;
}

export const TicketInformation = ({
  data,
  commodities,
  newTicket,
}: TicketInformationProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(newTicket ?? false);

  const [formData, setFormData] = useState<TicketInformationStateType>(
    data ?? {
      shipper: {},
      shipmentDetails: {},
      consignee: {},
    }
  );

  const handleSave = () => {
    if (newTicket) {
    } else {
      setIsEditable(false);
    }

    console.log(formData);
  };

  const handleChange = (
    parent: SectionTypes,
    child: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value,
      },
    }));
  };

  return (
    <FormWrap>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <SpecialInputField>
            <Typography sx={{ margin: "auto 0" }} variant="h3">
              First Party
            </Typography>
            <Spacer width="16px" />
            <TextField
              inputProps={{
                readOnly: !isEditable,
              }}
              value={formData.firstParty}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  formDate: e.target.value,
                }))
              }
            />
          </SpecialInputField>
          <SectionTitle variant="h3">Shipper</SectionTitle>

          {Object.entries(ShipperFieldLabels).map(([key, value]) => (
            <InputContainer>
              <InputLabel>{value}</InputLabel>
              <InputField
                size="small"
                inputProps={{
                  readOnly: !isEditable,
                }}
                value={formData.shipper[key as ShipperFields]}
                onChange={(e) => handleChange("shipper", key, e.target.value)}
              />
            </InputContainer>
          ))}
          <SectionTitle variant="h3">Shipment Details</SectionTitle>
          {Object.entries(ShipmentDetailsFieldLabels).map(([key, value]) => (
            <InputContainer>
              <InputLabel>{value}</InputLabel>
              <InputField
                multiline={key === "specialInst"}
                rows={3}
                size="small"
                inputProps={{
                  readOnly: !isEditable,
                }}
                value={formData.shipmentDetails[key as ShipmmentDetailsFields]}
                onChange={(e) =>
                  handleChange("shipmentDetails", key, e.target.value)
                }
              />
            </InputContainer>
          ))}
        </Grid>
        <Grid item xs={5}>
          <InputContainer>
            <SpecialInputField>
              <Checkbox
                disabled={!isEditable}
                value={formData.isPickup}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    isPickup: !prev.isPickup,
                  }))
                }
              />
              <Spacer width="16px" />
              <Typography sx={{ fontSize: "18px", margin: "auto 0" }}>
                Is pickup
              </Typography>
            </SpecialInputField>

            <SpecialInputField>
              <Checkbox
                disabled={!isEditable}
                value={formData.enterIntoInventory}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    enterIntoInventory: !prev.enterIntoInventory,
                  }))
                }
              />
              <Spacer width="16px" />
              <Typography sx={{ fontSize: "18px", margin: "auto 0" }}>
                Enter into inventory
              </Typography>
            </SpecialInputField>
          </InputContainer>
          <SectionTitle variant="h3">Consignee</SectionTitle>
          {Object.entries(ConsigneeFieldLabels).map(([key, value]) => (
            <InputContainer>
              <InputLabel>{value}</InputLabel>
              <InputField
                size="small"
                inputProps={{
                  readOnly: !isEditable,
                }}
                value={formData.consignee[key as ConsigneeFields]}
                onChange={(e) => handleChange("consignee", key, e.target.value)}
              />
            </InputContainer>
          ))}
          <SectionTitle variant="h3">Commodities</SectionTitle>
          <Commodities commodities={commodities} isEditable={isEditable} />
        </Grid>
        <Grid item xs={2}>
          <ActionColumn>
            <div
              style={{
                width: "100%",
              }}
            >
              {newTicket ? null : (
                <Button
                  size="small"
                  sx={{
                    width: "100px",
                    float: "right",
                  }}
                  onClick={() =>
                    isEditable ? handleSave() : setIsEditable(true)
                  }
                >
                  {isEditable ? (
                    "Save"
                  ) : (
                    <>
                      Edit <EditIcon sx={{ marginLeft: "8px" }} />
                    </>
                  )}
                </Button>
              )}
            </div>
            {newTicket ? (
              <FullWidthButton
                variant="contained"
                size="small"
                onClick={() => handleSave()}
              >
                Create Ticket
              </FullWidthButton>
            ) : (
              <FullWidthButton variant="contained" size="small">
                View DR
              </FullWidthButton>
            )}
          </ActionColumn>
        </Grid>
      </Grid>
    </FormWrap>
  );
};

export const FormWrap = styled(Box)`
  background-color: white;
  padding: 16px;
  border-radius: var(--ss-brand-border-radius);
`;

export const SpecialInputField = styled("div")`
  display: flex;
  height: 50px;
`;

export const InputField = styled(TextField)`
  min-width: 300px;
`;

export const InputContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const SectionTitle = styled(Typography)`
  padding-top: 24px;
  padding-bottom: 8px;
`;

const ActionColumn = styled("div")`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
  display: inline-block;
`;
