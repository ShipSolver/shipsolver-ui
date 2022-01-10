import { createTheme } from "@mui/material/styles";
import { green, indigo } from "@mui/material/colors";

const theme = createTheme();
const WLPBrand = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: green["A400"],
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "var(--wlp-brand-border-radius)",
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
          borderRadius: "var(--wlp-brand-border-radius)",
          [theme.breakpoints.down("xs")]: {
            margin: 0,
            width: "100vw",
            borderRadius:
              "var(--wlp-brand-border-radius) var(--wlp-brand-border-radius) 0px 0px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "all var(--wlp-brand-transition-time)",
          boxShadow: "rgba(0, 0, 0, 0.06) 0px 1px 2px",
          "&:active": {
            boxShadow: "none !important",
            transform: "translate3d(0px, 1px, 0px)",
          },
          borderRadius: "var(--wlp-brand-border-radius)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "all var(--wlp-brand-transition-time)",
          boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px",
          "&:hover": {
            boxShadow: "rgba(0, 0, 0, 0.22) 0px 19px 43px",
            transform: "translate3d(0px, -1px, 0px)",
          },
          borderRadius: "var(--wlp-brand-border-radius)",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "var(--wlp-brand-card-padding)",
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

export default WLPBrand;
