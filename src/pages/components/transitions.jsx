import { forwardRef } from "react";
import Slide from "@mui/material/Slide";

export const TransitionUp = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});
