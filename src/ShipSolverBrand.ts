import { createTheme } from "@mui/material/styles";
import { blue, indigo } from "@mui/material/colors";

const theme = createTheme();
const ShipSolverBrand = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: indigo[500],
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "h1" },
          style: {
            [theme.breakpoints.down("sm")]: {
              fontSize: "3rem",
            },
          },
        },
        {
          props: { variant: "h3" },
          style: {
            [theme.breakpoints.down("sm")]: {
              fontSize: "1.5rem",
            },
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "var(--ss-brand-border-radius)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        container: {
          [theme.breakpoints.down("xs")]: {
            alignItems: "flex-end",
          },
        },
        paper: {
          borderRadius: "var(--ss-brand-border-radius)",
          [theme.breakpoints.down("xs")]: {
            margin: 0,
            width: "100%",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1.25rem",
          lineHeight: 2,
          padding: "8px 16px",
          textTransform: "none",
          [theme.breakpoints.down("sm")]: {
            fontSize: "0.95rem",
          },
        },
      },
      variants: [
        {
          props: { variant: "contained" },
          style: {
            transition: "all var(--ss-brand-transition-time)",
            boxShadow: "var(--ss-brand-box-shadow)",
            borderRadius: "var(--ss-brand-border-radius)",
            "&:active": {
              boxShadow: "none !important",
              transform: "translate3d(0px, 1px, 0px)",
            },
            "&:hover": {
              boxShadow: "var(--ss-brand-box-shadow-hover)",
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "all var(--ss-brand-transition-time)",
          boxShadow: "var(--ss-brand-box-shadow)",
          "&:hover": {
            boxShadow: "var(--ss-brand-box-shadow-hover)",
            transform: "translate3d(0px, -1px, 0px)",
          },
          borderRadius: "var(--ss-brand-border-radius)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "var(--ss-brand-card-padding)",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          marginLeft: "6px",
          "@supports (-webkit-touch-callout: none)": {
            marginLeft: "18px",
          },
        },
      },
    },
  },
});

export default ShipSolverBrand;
