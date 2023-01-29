import axios from "axios";

import { SERVER_URL } from "./constants";
import { TicketInformationStateType } from "../pages/apps/org/pages/ticketDetails/components/ticketInformation";
import { Ticket } from "./types";
import { CommodityType } from "../pages/apps/org/pages/ticketDetails/components/commodities";
// import FormData from "form-data";
axios.defaults.baseURL = SERVER_URL;

export const sendDocument = async (
  formData: FormData
): Promise<number | undefined> => {
  try {
    const response: any = await axios({
      url: "/api/document/",
      method: "post",
      withCredentials: false,
      data: formData,
      headers: {
        ...axios.defaults.headers.common,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.documentStatusId;
  } catch (e) {
    console.error(e);
  }
};

interface DocumentReturnType {
  status: string;
  progress: number;
  documents: [TicketInformationStateType, CommodityType[], { url: string }][];
}

interface DocumentsResponse extends Ticket {
  orderS3Link: string;
}
interface DocumentResponseType extends Ticket {
  status: string;
  progress: number;
  documents: DocumentsResponse[];
}

export const checkStatus = async (
  documentID: number
): Promise<DocumentReturnType | undefined> => {
  try {
    const response: { data: DocumentResponseType } = await axios.get(
      `/api/document/${documentID}`,
      {
        withCredentials: false,
      }
    );

    const data: DocumentReturnType = {
      status: response.data.status,
      progress: response.data.progress,
      documents: response.data.documents.map(
        ({
          customerName,
          shipperCompany,
          shipperName,
          shipperAddress,
          shipperPhoneNumber,
          shipperPostalCode,
          BOLNumber,
          specialInstructions,
          weight,
          claimedNumberOfPieces,
          barcodeNumber,
          houseReferenceNumber,
          consigneeCompany,
          consigneeName,
          consigneeAddress,
          consigneePhoneNumber,
          consigneePostalCode,
          pieces,
          orderS3Link,
        }) => {
          const commodities: CommodityType[] = pieces
            .split(",+-")
            .map((commodity: string) => ({ description: commodity }));

          return [
            {
              firstParty: customerName,
              shipper: {
                company: shipperCompany,
                name: shipperName,
                address: shipperAddress,
                phoneNum: shipperPhoneNumber,
                postalCode: shipperPostalCode,
              },
              shipmentDetails: {
                specialInst: specialInstructions,
                bolNum: BOLNumber,
                weight,
                numPieces: claimedNumberOfPieces,
                barcode: barcodeNumber,
                refNum: houseReferenceNumber,
              },
              consignee: {
                company: consigneeCompany,
                name: consigneeName,
                address: consigneeAddress,
                phoneNum: consigneePhoneNumber,
                postalCode: consigneePostalCode,
              },
              isPickup: true,
              enterIntoInventory: true,
            },
            commodities,
            { url: orderS3Link },
          ];
        }
      ),
    };

    return data;
  } catch (e) {
    console.error(e);
  }
};
