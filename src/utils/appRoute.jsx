import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { refreshUser } from "./services/authenticationServices";
import { setUser } from "./redux/actions/authenticationActions";
import Loading from "./pages/components/Loading";

function AppRoute({ dispatch, user, loading, error, setUser, component: Component, ...rest }) {
    const [userRefreshed, setUserRefreshed] = useState(false)
    useEffect(() => {
        (async () => {
            if (!user && !loading && !error) {
                await refreshUser(dispatch);
                setUserRefreshed(true);
            }
        })();
    }, [user]);

    return loading || (!user && !userRefreshed) ? (
        <Loading />
    ) : (
        <Route
        {...rest}
        render={(props) =>
            user !== null ? (
            <Component {...props} />
            ) : (
            <Redirect
                to={{
                    pathname: "/authentication",
                    state: { referer: props.location },
                }}
            />
            )
        }
        />
    );
}

const mapState = (state) => {
    return {
        user: state.authentication.user,
        loading: state.authentication.loading,
        error: state.authentication.error
    };
};

const mapDispatch = (dispatch) => {
return {
        dispatch: (data) => dispatch(data),
        setUser: (user) => dispatch(setUser(user)),
    };
};

export default connect(mapState, mapDispatch)(AppRoute);
