import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  InputLabel,
  Checkbox,
  Button,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Edit as EditIcon } from "@mui/icons-material";
import { Spacer } from "../../../../../components/spacer";
import { CommodityType, Commodities } from "./commodities";
import { useRecoilState } from "recoil";
import { commoditiesAtom } from "../state/commodityState";
import { createTicket } from "../../../../../../services/ticketServices";

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

const ClearData = {
  shipper: {},
  shipmentDetails: {},
  consignee: {},
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
  enterIntoInventory?: boolean;
  isPickup?: boolean;
  noSignatureRequired?: boolean;
  tailgateAuthorized?: boolean;
};

export interface TicketType extends TicketInformationStateType {
  pieces?: string;
}

interface TicketInformationProps {
  data?: TicketInformationStateType;
  newTicket?: boolean;
  deliveryReceipt?: boolean;
}

const ColoredButton = ({
  color,
  label,
  action,
}: {
  color: string;
  label: string;
  action?: () => void;
}) => {
  return (
    <PaperButton style={{ backgroundColor: color }} onClick={() => action?.()}>
      <Typography variant="h5">{label}</Typography>
    </PaperButton>
  );
};

export const TicketInformation = ({
  data,
  newTicket,
  deliveryReceipt,
}: TicketInformationProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(newTicket ?? false);

  const [formData, setFormData] = useState<TicketInformationStateType>(
    data ?? {
      shipper: {},
      shipmentDetails: {},
      consignee: {},
    }
  );

  const [commodities, setcommodities] = useRecoilState(commoditiesAtom);

  const [viewSize, setViewSize] = useState<number>(5);

  useEffect(() => {
    return () => {
      setcommodities(null);
    };
  }, []);

  const handleSave = () => {
    if (newTicket) {
      let ticket: TicketType = { ...formData };
      if (commodities) {
        ticket.pieces = commodities
          .map(({ description }) => description)
          .join();
      }

      createTicket(ticket);
    } else {
      setIsEditable(false);
    }
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

  const handleClearClick = () => {
    setFormData(ClearData);
  };

  useEffect(() => {
    if (data != null) {
      setFormData(data);
    }
  }, [data]);

  useEffect(() => {
    if (
      (newTicket == null || newTicket == false) &&
      (deliveryReceipt == null || deliveryReceipt == false)
    ) {
      setViewSize(5);
    } else if (newTicket == true || deliveryReceipt == true) {
      setIsEditable(true);
      setViewSize(6);
    }
  }, [newTicket, deliveryReceipt]);

  return (
    <FormWrap>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          <Grid item xs={12} lg={6}>
            <InputContainer>
              <SpecialInputField>
                <Typography sx={{ margin: "auto 0" }} variant="h3">
                  First Party
                </Typography>
                <Spacer width="16px" />
                <TextField
                  inputProps={{
                    readOnly: !isEditable,
                  }}
                  value={formData.firstParty ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      formDate: e.target.value,
                    }))
                  }
                />
              </SpecialInputField>
            </InputContainer>
          </Grid>
          <Grid item xs={12} lg={6}>
            <InputContainer>
              {newTicket == null && (
                <SpecialInputField>
                  <Checkbox
                    disabled={!isEditable}
                    checked={formData.enterIntoInventory}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        enterIntoInventory: !prev.enterIntoInventory,
                      }))
                    }
                  />
                  <Spacer width="16px" />
                  <Typography sx={{ fontSize: "18px", margin: "auto 0" }}>
                    Checked into Inventory
                  </Typography>
                </SpecialInputField>
              )}

              <SpecialInputField>
                <Checkbox
                  disabled={!isEditable}
                  checked={formData.isPickup}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isPickup: !prev.isPickup,
                    }))
                  }
                />
                <Spacer width="16px" />
                <Typography sx={{ fontSize: "18px", margin: "auto 0" }}>
                  Pickup?
                </Typography>
              </SpecialInputField>

              <SpecialInputField>
                <Checkbox
                  disabled={!isEditable}
                  checked={formData.noSignatureRequired}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      noSignatureRequired: !prev.noSignatureRequired,
                    }))
                  }
                />
                <Spacer width="16px" />
                <Typography sx={{ fontSize: "18px", margin: "auto 0" }}>
                  No Signature Required
                </Typography>
              </SpecialInputField>

              <SpecialInputField>
                <Checkbox
                  disabled={!isEditable}
                  checked={formData.tailgateAuthorized}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      tailgateAuthorized: !prev.tailgateAuthorized,
                    }))
                  }
                />
                <Spacer width="16px" />
                <Typography sx={{ fontSize: "18px", margin: "auto 0" }}>
                  Tailgate Authorized
                </Typography>
              </SpecialInputField>
            </InputContainer>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={viewSize}>
          <SectionTitle variant="h3">Shipper</SectionTitle>

          {Object.entries(ShipperFieldLabels).map(([key, value]) => (
            <InputContainer>
              <InputLabel>{value}</InputLabel>
              <InputField
                size="small"
                inputProps={{
                  readOnly: !isEditable,
                }}
                value={formData.shipper[key as ShipperFields] ?? ""}
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
                value={
                  formData.shipmentDetails[key as ShipmmentDetailsFields] ?? ""
                }
                onChange={(e) =>
                  handleChange("shipmentDetails", key, e.target.value)
                }
              />
            </InputContainer>
          ))}
        </Grid>
        <Grid item xs={12} lg={viewSize}>
          <SectionTitle variant="h3">Consignee</SectionTitle>
          {Object.entries(ConsigneeFieldLabels).map(([key, value]) => (
            <InputContainer>
              <InputLabel>{value}</InputLabel>
              <InputField
                size="small"
                inputProps={{
                  readOnly: !isEditable,
                }}
                value={formData.consignee[key as ConsigneeFields] ?? ""}
                onChange={(e) => handleChange("consignee", key, e.target.value)}
              />
            </InputContainer>
          ))}
          <SectionTitle variant="h3">Commodities</SectionTitle>
          <Commodities isEditable={isEditable} />
        </Grid>
        {(newTicket == null || newTicket == false) &&
          (deliveryReceipt == null || deliveryReceipt == false) && (
            <Grid item lg={2}>
              <ActionColumn>
                <div
                  style={{
                    width: "100%",
                  }}
                >
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
                </div>
                <FullWidthButton variant="contained" size="small">
                  View DR
                </FullWidthButton>
              </ActionColumn>
            </Grid>
          )}
        <Grid container item xs={12}>
          {(newTicket != null || deliveryReceipt != null) && (
            <>
              <Grid item xs={8}>
                <ColoredButton color="#C5FAD180" label="Add to Inventory" />
                <ColoredButton color="#FAC5C580" label="Delete" />
                <ColoredButton
                  color="#CBDFEB"
                  label="Clear"
                  action={() => handleClearClick()}
                />
              </Grid>
            </>
          )}
          {deliveryReceipt == true && (
            <Grid item xs={4}>
              <div style={{ display: "flex", justifyContent: "right" }}>
                <ColoredButton color="#CBDFEB" label="Cancel" />
                <ColoredButton color="#CBDFEB" label="Add All" />
              </div>
            </Grid>
          )}
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

const PaperButton = styled(Paper)`
  display: inline-block;
  border-radius: 8px;
  cursor: pointer;
  padding: 13px 15px;
  margin: 20px 20px 10px 10px;
`;
