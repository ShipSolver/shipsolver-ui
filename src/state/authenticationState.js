import { makeAutoObservable } from "mobx";

export default class AuthenticationState {
  user = null;
  loading = false;
  error = null;

  userDefault = null;
  loadingDefault = false;
  errorDefault = null;

  constructor(AuthenticationService) {
    this.AuthenticationService = AuthenticationService;

    makeAutoObservable(this);
  }

  setError = (error) => {
    this.error = error;
  };

  setLoading = (loading) => {
    this.loading = loading;
  };

  setUser = (user) => {
    this.user = user;
  };

  login = async (email, password, rememberMe) => {
    this.setLoading(true);
    const { user, error } = await this.AuthenticationService.login({
      email,
      password,
      rememberMe,
    });
    if (user) {
      this.setUser(user);
    } else {
      this.setError(error || "Could not log user in");
    }
    this.setLoading(false);
  };

  refreshUser = async () => {
    this.setLoading(true);
    const { user, error } = await this.AuthenticationService.refreshUser();
    if (user && !error) {
      this.setUser(user);
    } else if (error) {
      this.setError(error);
    } else {
      this.setUser(this.userDefault);
    }
    this.setLoading(false);
  };

  logout = async () => {
    this.setLoading(true);
    const { error } = await this.AuthenticationService.logout();
    if (error) {
      this.setError(error);
    } else {
      this.setUser(this.userDefault);
      this.setError(this.errorDefault);
    }
    this.setLoading(false);
    return { success: !error };
  };
}
