import React, { useState } from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";

import {signupCodeConfirmation} from '../services/authenticationServices'
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ErrorAtom, UnconfirmedUsernameAtom } from "../state/authentication";
import Loading from "../components/loading";

function SignupCodeEntry() {
  const navigate = useNavigate()

  const unconfirmedUsername = useRecoilValue(UnconfirmedUsernameAtom)

  const [confirmationCode, setConfirmationCode] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const setError = useSetRecoilState(ErrorAtom)

  const confirmSignup = async () => {
    if(unconfirmedUsername == null){
      setError("No user has attempted to sign up")
      return
    }
    setLoading(true)
    const {error: err} = await signupCodeConfirmation({
      email: unconfirmedUsername, 
      code: confirmationCode
    })
    setError(err)
    setLoading(false)
    if(err == null){
      navigate("/authentication/signup-thank-you")
    }
  }
  return (
    loading ? <Loading/> :
    <Paper
      sx={{
        marginTop: "64px",
        padding: "calc(var(--ss-brand-spacing)*3)",
        textAlign: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ marginBottom: "32px" }} color="primary" variant="h2">
        Please check your email for a confirmation code and enter it below:
      </Typography>
      <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      label="Confirmation Code"
      autoFocus
      value={confirmationCode}
      onChange={(event) => setConfirmationCode(event.target.value)}
      sx={{
        marginBottom:"var(--ss-brand-spacer-height-small)"
      }}
      />
      <Button 
        fullWidth 
        variant="contained" 
        color="primary" 
        onClick={confirmSignup}>
        Confirm Account
      </Button>
    </Paper>
  );
}

export default SignupCodeEntry;
