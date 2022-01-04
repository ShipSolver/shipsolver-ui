import React, { useEffect, useState } from "react";

import { useForm, Controller, useFormState } from "react-hook-form";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FulfilledIcon from "@material-ui/icons/CheckRounded";
import UnfulfilledIcon from "@material-ui/icons/CloseRounded";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import UploadIcon from "@material-ui/icons/CloudUploadRounded";
import Collapse from "@material-ui/core/Collapse";

import { connect } from "react-redux";
import { signup, login } from "../../services/authenticationServices.js";

import PhoneNumber from "../components/PhoneNumber";
import ReCAPTCHA from "react-google-recaptcha";
import { GooglePlacesAutocompleteField } from "../components/googlePlacesAutocomplete";
import Dropzone from "../components/DropzoneDialog";
import ToastFactory from "../components/ToastFactory";
import Loading from "../components/Loading";

import Logo from "../../assets/logos/simpleLandlordFullsize.png";

const errorMessages = {
  firstName: {
    required: "Please enter your first name",
    length: "Your first name cannot exceed 64 characters",
  },
  lastName: {
    required: "Please enter your last name",
    length: "Your last name cannot exceed 64 characters",
  },
  email: {
    required: "Please enter your email",
    pattern: "Your email must be in the correct format, e.g. username@domain.com",
    length: "Your email cannot exceed 254 characters",
    alreadyExists: "A User already exists with this email",
  },
  unitNum: {
    pattern: "Must be between 0 and 9999999",
  },
  address: {
    chooseOption: "Please choose your address from the given options",
  },
  dayPhone: {
    required: "Please enter your phone number",
    pattern: "Your phone number must be in the correct format, e.g. (123) 456-7890",
  },
  password: {
    required: "Please enter your password",
    requirementsFulfilled: "Please make sure your password meets all of the requirements",
  },
  confirmPassword: {
    required: "Please enter a confirmation password",
    passwordEquality: "Please make sure the passwords you entered match",
  },
  driversLicense: {
    required: "Please upload an image file of your drivers license",
    type: "File type must be JPEG, JPG, or PNG",
    size: "File size must be smaller than 8MB",
    error: "Unexpected error occured, please upload the file again",
  },
};

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "12px",
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
  fulfilled: {
    color: "springgreen",
  },
  passwordRequirements: {
    margin: theme.spacing(1, 0, -2),
  },
  recaptcha: {
    margin: theme.spacing(1, 0, 1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialAddressData = {
  streetNum: "",
  streetName: "",
  streetType: "",
  direction: "",
  municipality: "",
  province: "",
  postalCode: "",
};

function SignUp(props) {
  const {
    handleSubmit,
    watch,
    getValues,
    setValue,
    setError,
    clearErrors,
    trigger,
    control,
    formState: { errors },
  } = useForm();

  const { isSubmitted } = useFormState({
    control,
  });

  const [recaptchaValue, setRecaptchaValue] = useState();
  const handleRecaptcha = (value) => setRecaptchaValue(value);

  const [showPassword, setshowPassword] = useState(false);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const watchPassword = watch("password", "");
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    hasNumber: false,
    hasUppercase: false,
    hasSpecial: false,
  });

  useEffect(() => {
    let lengthCheck = false;

    let hasNumberCheck = false;
    const hasNumberRegex = /\d/;

    let hasUppercaseCheck = false;
    const hasUppercaseRegex = /[A-Z]/;

    let hasSpecialCheck = false;
    const hasSpecialRegex = /[$&+,:;=?@#|'<>.^*()%!{}-]/;

    if (watchPassword.length >= 8 && watchPassword.length <= 128) lengthCheck = true;
    if (hasNumberRegex.test(watchPassword)) hasNumberCheck = true;
    if (hasUppercaseRegex.test(watchPassword)) hasUppercaseCheck = true;
    if (hasSpecialRegex.test(watchPassword)) hasSpecialCheck = true;

    setPasswordRequirements({
      length: lengthCheck,
      hasNumber: hasNumberCheck,
      hasUppercase: hasUppercaseCheck,
      hasSpecial: hasSpecialCheck,
    });
    if (isSubmitted) trigger(["confirmPassword"]);
  }, [watchPassword]);

  const [addressData, setAddressData] = useState(initialAddressData);
  const [isAddressSelected, setIsAddressSelected] = useState(false);

  const onAddressSelected = (isAddressSelected, addressData) => {
    setIsAddressSelected(isAddressSelected);
    addressData ? setAddressData(addressData) : setAddressData(initialAddressData);

    if (isSubmitted) isAddressSelected ? trigger("address") : setError("address", { type: "chooseOption" });
  };

  const [driversLicenseDialogOpen, setDriversLicenseDialogOpen] = useState(false);
  const [driversLicense, setDriversLicense] = useState(null);
  const onDriversLicenseUpload = (files) => {
    setDriversLicense(files);
    clearErrors("driversLicense");
    setValue("driversLicense", files.name);
    addToast("Drivers License Uploaded", "success");
  };

  const [toasts, setToasts] = useState([]);
  const addToast = (content, severity) => setToasts([...toasts, { content, severity }]);

  useEffect(() => {
    const errors = props.error;
    setRecaptchaValue(null);
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

  const onSubmit = async (registrationData) => {
    const formattedAddress = `${addressData.streetNum}, ${addressData.streetName}, ${addressData.streetType}, ${addressData.direction}, ${registrationData.unitNum}, ${addressData.municipality}, ${addressData.province}, ${addressData.postalCode}`;
    registrationData = {
      ...registrationData,
      address: formattedAddress,
      driversLicense: driversLicense,
    };
    delete registrationData.confirmPassword;
    console.log(registrationData);

    const registered = await signup(props.dispatch, registrationData);
    if (!registered) addToast("Registration Failed", "error");
    else {
      const loggedIn = await login(
        props.dispatch,
        {
          email: registrationData.email,
          password: registrationData.password,
        },
        true
      );

      if (loggedIn)
        props.history.push({
          pathname: "/authentication/checkout",
          state: {
            notisDialog: true,
          },
        });
      else props.history.push("/authentication");
    }

    // props.history.push({
    //   pathname: "/authentication/billing",
    //   state: {
    //     email: registrationData.email,
    //     password: registrationData.password,
    //     userID: registered.userID,
    //     customerID: registered.customerID,
    //   },
    // });
  };

  const classes = useStyles();

  if (props.loading) {
    return <Loading />;
  }

  return (
    <div className={classes.main}>
      <ToastFactory toasts={toasts} />
      <img src={Logo} className={classes.logo} alt="The Simple Landlord Logo" />
      <Typography variant="h4">Sign Up</Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: {
                  length: (value) => value.length <= 64,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={errors.firstName && errors.firstName !== null}
                  helperText={errors.firstName ? errorMessages["firstName"][errors.firstName.type] : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: {
                  length: (value) => value.length <= 64,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="lastName"
                  label="Last Name"
                  error={errors.lastName && errors.lastName !== null}
                  helperText={errors.lastName ? errorMessages["lastName"][errors.lastName.type] : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^\S+@\S+\.\S+$/,
                validate: {
                  length: (value) => value.length <= 254,
                },
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
                  error={errors.email && errors.email !== null}
                  helperText={errors.email ? errorMessages["email"][errors.email.type] : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controller
              name="unitNum"
              control={control}
              defaultValue=""
              rules={{
                pattern: /^\d{0,7}$/,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="unitNum"
                  label="Unit #"
                  error={errors.unitNum && errors.unitNum !== null}
                  helperText={errors.unitNum ? errorMessages["unitNum"][errors.unitNum.type] : null}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Controller
              name="address"
              control={control}
              rules={{
                validate: { chooseOption: () => isAddressSelected },
              }}
              render={() => (
                <GooglePlacesAutocompleteField error={errors.address} onAddressSelected={onAddressSelected} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="dayPhone"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^\(\d{3}\) \d{3}-\d{4}$/,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="dayPhone"
                  label="Phone"
                  name="dayPhone"
                  error={errors.dayPhone && errors.dayPhone !== null}
                  helperText={errors.dayPhone ? errorMessages["dayPhone"][errors.dayPhone.type] : null}
                  InputProps={{
                    inputComponent: PhoneNumber,
                  }}
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
                validate: {
                  requirementsFulfilled: () =>
                    passwordRequirements.length &&
                    passwordRequirements.hasNumber &&
                    passwordRequirements.hasUppercase &&
                    passwordRequirements.hasSpecial,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  onFocus={() => setShowPasswordRequirements(true)}
                  onBlur={() => setShowPasswordRequirements(false)}
                  onKeyUp={() => {
                    if (isSubmitted) trigger("password");
                  }}
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
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
          </Grid>
          <Collapse in={showPasswordRequirements}>
            <Grid item xs={12} className={classes.passwordRequirements}>
              <Typography variant="body1" htmlFor="passwordRequirements" style={{ paddingLeft: "14px" }}>
                Password Requirements:
              </Typography>
              <ul name="passwordRequirements" id="passwordRequirements">
                <li>
                  {passwordRequirements.length ? (
                    <FulfilledIcon className={classes.fulfilled} />
                  ) : (
                    <UnfulfilledIcon color="error" />
                  )}
                  <Typography variant="body2">&nbsp;Must be between 8 and 128 characters</Typography>
                </li>
                <li>
                  {passwordRequirements.hasNumber ? (
                    <FulfilledIcon className={classes.fulfilled} />
                  ) : (
                    <UnfulfilledIcon color="error" />
                  )}
                  <Typography variant="body2">&nbsp;Must have at least one number</Typography>
                </li>
                <li>
                  {passwordRequirements.hasUppercase ? (
                    <FulfilledIcon className={classes.fulfilled} />
                  ) : (
                    <UnfulfilledIcon color="error" />
                  )}
                  <Typography variant="body2">&nbsp;Must have at least one uppercase character</Typography>
                </li>
                <li>
                  {passwordRequirements.hasSpecial ? (
                    <FulfilledIcon className={classes.fulfilled} />
                  ) : (
                    <UnfulfilledIcon color="error" />
                  )}
                  <Typography variant="body2">&nbsp;Must have at least one special character</Typography>
                </li>
              </ul>
            </Grid>
          </Collapse>
          <Grid item xs={12}>
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                validate: {
                  passwordEquality: (value) => value === getValues().password,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="confirmPassword"
                  label="Confirm Password"
                  error={errors.confirmPassword && errors.confirmPassword !== null}
                  helperText={
                    errors.confirmPassword ? errorMessages["confirmPassword"][errors.confirmPassword.type] : null
                  }
                />
              )}
            />
          </Grid>
          <Dropzone
            fileName={"Drivers License"}
            onFileUpload={onDriversLicenseUpload}
            dropzoneDialogOpen={driversLicenseDialogOpen}
            setDropzoneDialogOpen={setDriversLicenseDialogOpen}
          />
          <Grid item xs={12}>
            <Controller
              name="driversLicense"
              control={control}
              defaultValue="Upload An Image File"
              rules={{
                validate: {
                  required: () => driversLicense !== null,
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  onClick={() => setDriversLicenseDialogOpen(true)}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  id="driversLicense"
                  label="Drivers License"
                  error={errors.driversLicense && errors.driversLicense !== null}
                  helperText={
                    errors.driversLicense ? errorMessages["driversLicense"][errors.driversLicense.type] : null
                  }
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Upload File" PopperProps={{ style: { marginTop: "-8px" } }}>
                          <IconButton onClick={() => setDriversLicenseDialogOpen(true)}>
                            <UploadIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ style: { cursor: "pointer" } }}
                />
              )}
            />
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ReCAPTCHA
              sitekey={"6Ld7EN4UAAAAAOulgGD47wUFuaxVQ6lvbHAp9_1e"}
              onChange={handleRecaptcha}
              className={classes.recaptcha}
              theme="dark"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" style={{ color: "#8c8b8b", fontSize: "12px" }} gutterBottom>
              By clicking "Sign Up", you are agreeing to our{" "}
              <Link href="/terms" style={{ fontWeight: "bold" }}>
                Terms & Conditions
              </Link>{" "}
              of creating an account
            </Typography>
            <Button
              type="submit"
              disabled={!recaptchaValue}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{ marginTop: "8px" }}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/authentication/login" variant="body2">
                <b>Already have an account? Log in</b>
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

export default connect(mapState, mapDispatch)(SignUp);
