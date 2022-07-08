import React, { useState} from "react";
import Typography from "@mui/material/Typography";
import { CardColumn } from "./cardColumn";
import { CreateCommodityModal } from "./createCommodityModal";

export interface CommodityType {
  description: string;
  // weight: string;
  // dimensions: string;
}

interface CommoditiesProps {
  commodities?: CommodityType[];
  isEditable: boolean;
}

export const Commodities = ({ commodities, isEditable }: CommoditiesProps) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const commoditiesCards = commodities?.map(
    (description) => (
      <div>
        <Typography>
          <b>Description:</b> {description}
        </Typography>
        {/* <Typography>
          <b>Weight:</b> {weight}
        </Typography>
        <Typography>
          <b>Dimensions:</b> {dimensions}
        </Typography> */}
      </div>
    )
  );

  return (
    <>
      <CardColumn
        cardContents={commoditiesCards}
        customHeight="29vh"
        isEditable={isEditable}
        action={() => setIsOpen(true)}
      />
      <CreateCommodityModal open={isOpen} handleClose={() => setIsOpen(false)} />
    </>
  );
};
