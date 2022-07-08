import React, { useEffect } from "react";
import Loading from "../../../../../components/loading";
import { TealBackground, DropZoneInner } from "./uploadTicket";

interface RefetchLoaderProps {
  onComplete: (data: any) => void;
}

export const RefetchLoader = ({ onComplete }: RefetchLoaderProps) => {
  useEffect(() => {
    setTimeout(() => {
      // fetchData

      onComplete("test");
    }, 2000);
  }, []);

  return (
    <TealBackground>
      <DropZoneInner>
        <Loading />
      </DropZoneInner>
    </TealBackground>
  );
};
