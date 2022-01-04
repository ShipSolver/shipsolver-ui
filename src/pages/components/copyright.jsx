import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center" style={{ marginBottom: 32, display: "none" }}>
      {"Copyright © "}
      <Link color="inherit" href="/about">
        The Simple Landlord
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
