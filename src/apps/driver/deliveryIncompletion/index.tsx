import { useRecoilValue, useResetRecoilState } from "recoil";
import { DeliveryCompletionTicketAtom } from "../../../state/deliveryCompletion";

import { Navigate, useNavigate } from "react-router-dom";
import { ReasonsPage, ReasonsType } from "../reasonsPage";

export const IncompleteDeliveryReasons: ReasonsType[] = [
  { reason: "Closed", id: "closed" },
  { reason: "Customer Refusal", id: "custRefusal" },
  { reason: "Customer Not Home", id: "custNotHome" },
  { reason: "Other", id: "other" },
];

export default function DeliveryInCompletion() {
  const navigate = useNavigate();

  const completionDelivery = useRecoilValue(DeliveryCompletionTicketAtom);
  const resetCompletionDelivery = useResetRecoilState(
    DeliveryCompletionTicketAtom
  );

  const handleSubmit = async () => {
    resetCompletionDelivery();
    navigate("/");
  };

  const handleCancel = async () => {
    resetCompletionDelivery();
    navigate("/");
  };

  return completionDelivery == null ? (
    <Navigate to="/" />
  ) : (
    <ReasonsPage
      title="Reason for incomplete delivery"
      reasons={IncompleteDeliveryReasons}
      textfieldLabel="Enter Reason:"
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
}
