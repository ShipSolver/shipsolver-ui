import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { CardColumn } from "./cardColumn";
import { CreateCommodityModal } from "./createCommodityModal";

import { useRecoilValue } from "recoil";
import { commoditiesAtom } from "../state/commodityState";

export interface CommodityType {
  description: string;
  // weight: string;
  // dimensions: string;
}

interface CommoditiesProps {
  isEditable: boolean;
}

export const Commodities = ({ isEditable }: CommoditiesProps) => {
  const commodities = useRecoilValue(commoditiesAtom);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const commoditiesCards = commodities?.map(({description}) => (
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
  ));

  return (
    <>
      <CardColumn
        cardContents={commoditiesCards}
        customHeight="29vh"
        isEditable={isEditable}
        action={() => setIsOpen(true)}
      />
      <CreateCommodityModal
        open={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </>
  );
};
