import React, { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { connect } from "react-redux";
import { login } from "../../services/authenticationServices.js";

import ToastFactory from "../components/ToastFactory";
import Loading from "../components/Loading";

import Logo from "../../assets/logos/simpleLandlordFullsize.png";

const errorMessages = {
  email: {
    required: "Please enter your email",
  },
  password: {
    required: "Please enter your password",
  },
};

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "82px",
  },
  logo: {
    width: "100%",
    paddingLeft: "64px",
    paddingRight: "64px",
    paddingTop: "32px",
    paddingBottom: "32px",
  },
  form: {
    width: "100%",
    marginTop: "16px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm();

  const [showPassword, setshowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(true);
  const handleRememberMeChange = (event) => setRememberMe(event.target.checked);

  const [toasts, setToasts] = useState([]);
  const addToast = (content, severity) => setToasts([...toasts, { content, severity }]);

  useEffect(() => {
    const errors = props.error;
    if (typeof errors === "string") {
      addToast(errors, "error");
    } else if (typeof errors === "object") {
      let field;
      for (field in errors) {
        setError(field, {
          type: errors[field],
        });
      }
    }
  }, [props.error]);

  const onSubmit = async (loginData) => {
    const loggedIn = await login(props.dispatch, loginData, rememberMe);
    if (!loggedIn) addToast("The credentials you entered do not match our records, please try again", "error");
    else props.history.push(`/home`);
  };

  const classes = useStyles();

  if (props.loading) {
    return <Loading />;
  }

  return (
    <div className={classes.main}>
      <ToastFactory toasts={toasts} />
      <img src={Logo} className={classes.logo} alt="The Simple Landlord Logo" />
      <Typography variant="h4">Log in</Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="email"
                  label="Email"
                  autoComplete="email"
                  autoFocus
                  error={errors.email && errors.email !== null}
                  helperText={errors.email ? errorMessages["email"][errors.email.type] : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  type={showPassword ? "text" : "password"}
                  id="password"
                  label="Password"
                  autoComplete="current-password"
                  error={errors.password && errors.password !== null}
                  helperText={errors.password ? errorMessages["password"][errors.password.type] : null}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Show Password" PopperProps={{ style: { marginTop: "-8px" } }}>
                          <IconButton
                            onClick={() => {
                              setshowPassword(!showPassword);
                            }}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  icon={<CircleUnchecked />}
                  checkedIcon={<CircleCheckedFilled />}
                />
              }
              label="Remember me"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
              Log in
            </Button>
          </Grid>
          <Grid container>
            <Grid item xs>
              <Link href="/authentication/forgotpassword" variant="body2">
                <b>Forgot password?</b>
              </Link>
            </Grid>
            <Grid item>
              <Link href="/authentication/signup" variant="body2">
                <b>Don't have an account? Sign Up</b>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

const mapState = (state) => {
  return {
    user: state.authentication.user,
    error: state.authentication.error,
    loading: state.authentication.loading,
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatch: (data) => dispatch(data),
  };
};

export default connect(mapState, mapDispatch)(Login);
