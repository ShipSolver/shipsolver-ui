import React from "react";

import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

interface LoadingProps {
  text?: string;
}

export const Loading = ({ text }: LoadingProps) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(80vh - 96px)",
        justifyContent: "center",
      }}
    >
      <Typography
        color="primary"
        variant="h2"
        sx={{ margin: "calc(var(--ss-brand-spacing)*5)" }}
      >
        {text ?? Loading}
      </Typography>
      <CircularProgress sx={{ margin: "calc(var(--ss-brand-spacing)*5)" }} />
    </Container>
  );
};

export default Loading;
