import React, { useState, useEffect, useRef } from "react";
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
import { Spacer } from "../../../../../../components/spacer";
import { CommodityType, Commodities } from "../commodities";
import { useRecoilState } from "recoil";
import { commoditiesAtom } from "../../state/commodityState";
import {
  createTicket,
  editTicket,
} from "../../../../../../services/ticketServices";
import { TicketCreationSuccessModal } from "../ticketCreationSuccessModal";
import { ColoredButton } from "../../../../../../components/coloredButton";
import { useParams } from "react-router-dom";
import {
  TicketInformationStateType,
  TicketType,
  SectionTypes,
  ShipmentDetailsFields,
  ShipperFields,
  ConsigneeFields,
  ShipperFieldLabels,
  ConsigneeFieldLabels,
  ShipmentDetailsFieldLabels,
  EMPTY_DATA,
} from "./types";
import { useValidation } from "./hooks/useValidation";

interface TicketInformationProps {
  data?: TicketInformationStateType | null;
  newTicket?: boolean;
  deliveryReceipt?: boolean;
  reviewPOD?: boolean;
}

export const TicketInformation = ({
  data,
  newTicket = false,
  deliveryReceipt = false,
  reviewPOD = false,
}: TicketInformationProps) => {
  const [isEditable, setIsEditable] = useState<boolean>(newTicket ?? false);
  const formData = useRef<TicketInformationStateType>(data ?? EMPTY_DATA);
  const { errors, validate, clearError, numErrors } = useValidation();
  const [commodities, setcommodities] = useRecoilState(commoditiesAtom);
  const [viewSize, setViewSize] = useState<number>(5);
  let { ticketId } = useParams();
  let [newTicketId, setNewTicketId] = useState<string | undefined>();

  useEffect(() => {
    return () => {
      setcommodities(null);
    };
  }, []);

  const handleSave = async (event?: React.SyntheticEvent<HTMLFormElement>) => {
    event?.preventDefault();

    validate(formData.current);
    if (numErrors) {
      return;
    }

    let ticket: TicketType = { ...formData.current };
    console.log(formData.current);
    ticket.pieces =
      commodities?.map(({ description }) => description).join(",+-") ?? "";

    if (newTicket || deliveryReceipt) {
      const {
        data: { ticketId },
      } = await createTicket(ticket);
      setNewTicketId(ticketId);
    } else if (ticketId) {
      // edit ticket endpoint
      await editTicket(ticket, ticketId);
      setIsEditable(false);
    }
  };

  const handleChange = (
    parent: SectionTypes,
    child: ShipperFields | ConsigneeFields | ShipmentDetailsFields,
    val: string | number
  ) => {
    /* The code below is to make Typescript happy :). Want to make sure that the child key corresponds to the correct parent key */
    switch (parent) {
      case "shipper":
      case "consignee": {
        if (
          Object.keys(ShipperFieldLabels).includes(child) ||
          Object.keys(ShipmentDetailsFieldLabels).includes(child)
        ) {
          formData.current = {
            ...formData.current,
            [parent]: {
              ...formData.current[parent],
              [child]: val,
            },
          };

          if (errors[parent]?.[child as ShipperFields | ConsigneeFields]) {
            clearError(parent, child);
          }
        }
        break;
      }
      case "shipmentDetails": {
        if (Object.keys(ShipmentDetailsFieldLabels).includes(child)) {
          formData.current = {
            ...formData.current,
            shipmentDetails: {
              ...formData.current.shipmentDetails,
              [child]: val,
            },
          };

          if (errors[parent]?.[child as ShipmentDetailsFields]) {
            clearError(parent, child);
          }
        }
        break;
      }
      default: {
        console.error("unexpected event has occured");
      }
    }
  };

  const handleClearClick = () => {
    formData.current = EMPTY_DATA;
  };

  useEffect(() => {
    if (data != null) {
      formData.current = data;
    }
  }, [data]);

  useEffect(() => {
    if (!newTicket && !deliveryReceipt) {
      setViewSize(5);
    } else {
      setIsEditable(true);
      setViewSize(6);
    }
  }, [newTicket, deliveryReceipt]);

  return (
    <StyledForm onSubmit={handleSave}>
      <Grid container spacing={3}>
        <Grid container item xs={12}>
          <Grid item xs={12} lg={viewSize}>
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
                  defaultValue={formData.current.firstParty}
                  onChange={(e) => {
                    formData.current = {
                      ...formData.current,
                      firstParty: e.target.value,
                    };
                  }}
                  required
                  error={!!errors.firstParty}
                />
              </SpecialInputField>
            </InputContainer>
          </Grid>
          <Grid item xs={12} lg={viewSize}>
            <InputContainer>
              {/* {!newTicket ? (
                <SpecialInputField>
                  <Checkbox
                    disabled={!isEditable}
                    defaultChecked={formData.current.enterIntoInventory}
                    onClick={(e) => {
                      formData.current = {
                        ...formData.current,
                        enterIntoInventory: (e.target as HTMLInputElement)
                          .checked,
                      };
                    }}
                  />
                  <Spacer width="16px" />
                  <Typography sx={{ fontSize: "18px", margin: "auto 0" }}>
                    Checked into Inventory
                  </Typography>
                </SpecialInputField>
              ) : null} */}

              <SpecialInputField>
                <Checkbox
                  disabled={!isEditable}
                  defaultChecked={formData.current.isPickup}
                  onClick={(e) => {
                    formData.current = {
                      ...formData.current,
                      isPickup: (e.target as HTMLInputElement).checked,
                    };
                  }}
                />
                <Spacer width="16px" />
                <Typography sx={{ fontSize: "18px", margin: "auto 0" }}>
                  Pickup?
                </Typography>
              </SpecialInputField>

              <SpecialInputField>
                <Checkbox
                  disabled={!isEditable}
                  defaultChecked={formData.current.noSignatureRequired}
                  onClick={(e) => {
                    formData.current = {
                      ...formData.current,
                      noSignatureRequired: (e.target as HTMLInputElement)
                        .checked,
                    };
                  }}
                />
                <Spacer width="16px" />
                <Typography sx={{ fontSize: "18px", margin: "auto 0" }}>
                  No Signature Required
                </Typography>
              </SpecialInputField>

              <SpecialInputField>
                <Checkbox
                  disabled={!isEditable}
                  defaultChecked={formData.current.tailgateAuthorized}
                  onClick={(e) => {
                    formData.current = {
                      ...formData.current,
                      tailgateAuthorized: (e.target as HTMLInputElement)
                        .checked,
                    };
                  }}
                />
                <Spacer width="16px" />
                <Typography sx={{ fontSize: "18px", margin: "auto 0" }}>
                  Tailgate Authorized
                </Typography>
              </SpecialInputField>
            </InputContainer>
          </Grid>
        </Grid>
        <TicketCreationSuccessModal
          ticketId={newTicketId}
          handleClose={() => setNewTicketId(undefined)}
        />
        <Grid item xs={12} lg={viewSize}>
          <SectionTitle variant="h3">Shipper</SectionTitle>
          {(
            Object.entries(ShipperFieldLabels) as [ShipperFields, string][]
          ).map(([key, value]) => (
            <InputContainer key={`${key}${value}`}>
              <InputLabel>{value}</InputLabel>
              <div>
                <InputField
                  size="small"
                  inputProps={{
                    readOnly: !isEditable,
                  }}
                  defaultValue={formData.current.shipper[key]}
                  onChange={(e) => handleChange("shipper", key, e.target.value)}
                  required
                  error={!!errors.shipper?.[key]}
                />
                {errors.shipper?.[key] ? (
                  <p style={{ color: "red", margin: "0" }}>
                    {errors.shipper[key]}
                  </p>
                ) : null}
              </div>
            </InputContainer>
          ))}
          <SectionTitle variant="h3">Shipment Details</SectionTitle>
          {(
            Object.entries(ShipmentDetailsFieldLabels) as [
              ShipmentDetailsFields,
              string
            ][]
          ).map(([key, value]) => (
            <InputContainer key={`${key}${value}`}>
              <InputLabel>{value}</InputLabel>
              <div>
                <InputField
                  multiline={key === "specialInst"}
                  rows={3}
                  size="small"
                  defaultValue={formData.current.shipmentDetails[key]}
                  inputProps={{
                    readOnly: !isEditable,
                  }}
                  onChange={(e) =>
                    handleChange("shipmentDetails", key, e.target.value)
                  }
                  required={key !== "specialInst"}
                  error={!!errors.shipmentDetails?.[key]}
                />
                {errors.shipmentDetails?.[key] ? (
                  <p style={{ color: "red", margin: "0" }}>
                    {errors.shipmentDetails?.[key]}
                  </p>
                ) : null}
              </div>
            </InputContainer>
          ))}
        </Grid>
        <Grid item xs={12} lg={viewSize}>
          <SectionTitle variant="h3">Consignee</SectionTitle>
          {(
            Object.entries(ConsigneeFieldLabels) as [ConsigneeFields, string][]
          ).map(([key, value]) => (
            <InputContainer key={`${key}${value}`}>
              <InputLabel>{value}</InputLabel>
              <div>
                <InputField
                  size="small"
                  defaultValue={formData.current.consignee[key]}
                  inputProps={{
                    readOnly: !isEditable,
                  }}
                  onChange={(e) =>
                    handleChange("consignee", key, e.target.value)
                  }
                  required
                  error={!!errors.consignee?.[key]}
                />
                {errors.consignee?.[key] ? (
                  <p style={{ color: "red", margin: "0" }}>
                    {errors.consignee[key]}
                  </p>
                ) : null}
              </div>
            </InputContainer>
          ))}
          <SectionTitle variant="h3">Commodities</SectionTitle>
          <Commodities isEditable={isEditable} />
        </Grid>
        {!newTicket && !deliveryReceipt ? (
          <Grid item xs={2} lg={2}>
            <ActionColumn>
              <div
                style={{
                  width: "100%",
                }}
              >
                {isEditable ? (
                  <Button
                    size="small"
                    sx={{
                      width: "100px",
                      float: "right",
                    }}
                    type="submit"
                    // onClick={() => handleSave()}
                  >
                    Save
                  </Button>
                ) : (
                  <Button
                    size="small"
                    sx={{
                      width: "100px",
                      float: "right",
                    }}
                    onClick={() => setIsEditable(true)}
                  >
                    Edit <EditIcon sx={{ marginLeft: "8px" }} />
                  </Button>
                )}
              </div>

              <FullWidthButton variant="contained" size="small">
                {reviewPOD == false ? "View PDF" : "View DR"}
              </FullWidthButton>
            </ActionColumn>
          </Grid>
        ) : (
          <div style={{ display: "flex", marginLeft: "24px" }}>
            <Button type="submit" variant="outlined">
              Add to Inventory
            </Button>
            <Spacer width="4px" />
            <Button onClick={handleClearClick}>Clear</Button>
          </div>
        )}
        <Grid container item xs={12}>
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
    </StyledForm>
  );
};

export const StyledForm = styled("form")`
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
