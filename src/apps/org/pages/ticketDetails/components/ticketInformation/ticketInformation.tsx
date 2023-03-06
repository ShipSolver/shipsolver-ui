import {
  Alert,
  Button,
  Checkbox,
  Grid,
  InputLabel,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ColoredButton } from "../../../../../../components/coloredButton";
import { Spacer } from "../../../../../../components/spacer";
import {
  createTicket,
  editTicket,
} from "../../../../../../services/ticketServices";
import { useGetUserInfo } from "../../../../../../state/authentication";
import { commoditiesAtom } from "../../state/commodityState";
import { Commodities } from "../commodities";
import { useValidation } from "./hooks/useValidation";
import { TicketCreationSuccessModal } from "./modals/ticketCreationSuccessModal";
import {
  ConsigneeFieldLabels,
  ConsigneeFields,
  EMPTY_DATA,
  SectionTypes,
  ShipmentDetailsFieldLabels,
  ShipmentDetailsFields,
  ShipperFieldLabels,
  ShipperFields,
  TicketInformationStateType,
  TicketType,
} from "./types";
//@ts-ignore
import { DeliveryReceiptModal } from "./modals/deliveryReceiptModal";

interface TicketInformationProps {
  data?: TicketInformationStateType | null;
  newTicketManual?: boolean;
  newTicketDeliveryReceipt?: boolean;
  deliveryReviewComplete?: boolean;
  deliveryReviewIncomplete?: boolean;
  refetchTicketEdits?: () => void;
}

export const TicketInformation = ({
  data,
  refetchTicketEdits = () => {},
  newTicketManual,
  newTicketDeliveryReceipt,
  deliveryReviewComplete,
  deliveryReviewIncomplete,
}: TicketInformationProps) => {
  const newTicket = newTicketManual || newTicketDeliveryReceipt;
  const deliveryReview = deliveryReviewComplete || deliveryReviewIncomplete;
  const isViewTicketDetails = !newTicket && !deliveryReview;

  const [isEditable, setIsEditable] = useState<boolean>(newTicket ?? false);
  const formData = useRef<TicketInformationStateType>(data ?? EMPTY_DATA);
  const { errors, validate, clearError } = useValidation();
  const [commodities, setcommodities] = useRecoilState(commoditiesAtom);
  const { ticketId } = useParams();
  const [newTicketId, setNewTicketId] = useState<number | undefined>();
  const user = useGetUserInfo();
  const [requestError, setRequestError] = useState<string | undefined>();
  const [editSuccess, setEditSuccess] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setcommodities(null);
    };
  }, []);

  const handleCloseSnackbar = () => {
    if (requestError) {
      setRequestError(undefined);
    }

    if (editSuccess) {
      setEditSuccess(undefined);
    }
  };

  const handleClear = () => {
    (document.getElementById("ticket-creation") as HTMLFormElement).reset();
    setcommodities(null);
  };

  const handleSave = async (event?: React.SyntheticEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setLoading(true);

    if (validate(formData.current)) {
      setLoading(false);
      return;
    }

    if (!user) {
      setRequestError("Unexpected error. Please logout and try again.");
      setLoading(false);
      return;
    }

    const ticket: TicketType = { ...formData.current };
    ticket.pieces =
      commodities?.map(({ description }) => description).join(",+-") ?? "";

    if (newTicket) {
      const ticketIdOrError = await createTicket(ticket);
      if (typeof ticketIdOrError === "number") {
        setNewTicketId(ticketIdOrError);
      } else {
        setRequestError(ticketIdOrError);
      }
    } else if (ticketId) {
      const error = await editTicket(ticket, ticketId);
      if (error) {
        setRequestError(error);
      } else {
        setIsEditable(false);
        refetchTicketEdits();
        setEditSuccess("Successfuly edited the ticket!");
      }
    }

    setLoading(false);
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
        alert("unexpected event has occured");
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSave} id="ticket-creation">
      <Grid container xs={12} spacing={3}>
        <Grid item xs={6}>
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
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          {formData.current.deliveryReceiptLink ? (
            <DeliveryReceiptModal
              url={formData.current.deliveryReceiptLink}
              buttonText="View DR"
            />
          ) : null}
          {!deliveryReview ? (
            <InputContainer>
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
          ) : null}
        </Grid>

        <Grid item xs={6}>
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
        <Grid item xs={6}>
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
        {isViewTicketDetails ? (
          <Grid item xs={2} lg={2}>
            <ActionColumn>
              <Button
                sx={{
                  width: "100px",
                  float: "right",
                }}
                type="button"
                onClick={() =>
                  isEditable ? handleSave() : setIsEditable(true)
                }
              >
                Save
              </Button>
            </ActionColumn>
          </Grid>
        ) : null}
        {newTicket ? (
          <div style={{ display: "flex", marginLeft: "24px" }}>
            <Button
              type="submit"
              variant="outlined"
              key="addToInventory"
              disabled={loading}
            >
              Add to Inventory
            </Button>
            <Spacer width="4px" />
            <Button
              type="button"
              onClick={handleClear}
              key="clear"
              disabled={loading}
            >
              Clear
            </Button>
          </div>
        ) : null}
        {newTicketDeliveryReceipt ? (
          <Grid container item xs={12}>
            {/* <Grid item xs={4}> */}
            <div style={{ display: "flex", justifyContent: "right" }}>
              <ColoredButton color="#CBDFEB" label="Cancel" />
              <ColoredButton color="#CBDFEB" label="Add All" />
            </div>
            {/* </Grid> */}
          </Grid>
        ) : null}
      </Grid>
      <TicketCreationSuccessModal
        ticketId={newTicketId}
        handleClose={() => {
          setNewTicketId(undefined);
          handleClear();
        }}
      />
      <Snackbar
        open={!!requestError || !!editSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        {editSuccess ? (
          <Alert
            severity="success"
            onClose={handleCloseSnackbar}
            sx={{ width: "100%" }}
          >
            {editSuccess}
          </Alert>
        ) : (
          <Alert
            severity="error"
            onClose={handleCloseSnackbar}
            sx={{ width: "100%" }}
          >
            {requestError}
          </Alert>
        )}
      </Snackbar>
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
  width: 100%;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
  display: inline-block;
`;
