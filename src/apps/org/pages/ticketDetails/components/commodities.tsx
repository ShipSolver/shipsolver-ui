import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { CardColumn } from "./cardColumn";
import { CreateCommodityModal } from "./createCommodityModal";

import { useRecoilValue } from "recoil";
import { commoditiesAtom } from "../state/commodityState";
import { Paper } from "@mui/material";

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
    <Paper sx={{marginBottom: "8px"}}>
      <Typography>
        <b>Description:</b> {description}
      </Typography>
      {/* <Typography>
          <b>Weight:</b> {weight}
        </Typography>
        <Typography>
          <b>Dimensions:</b> {dimensions}
        </Typography> */}
    </Paper>
  ));

  return (
    <>
      <CardColumn
        cardContents={commoditiesCards}
        isEditable={isEditable}
        action={() => setIsOpen(true)}
        $height="275px"
      />
      <CreateCommodityModal
        open={isOpen}
        handleClose={() => setIsOpen(false)}
      />
    </>
  );
};
