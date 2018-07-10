import { observable, computed, reaction } from "mobx";
import jwt_decode from "jwt-decode";

class AuthStore {
  @observable isAuthenticated = false;
  @observable user = {};

  registerUser(userData) {
    reaction(
      () => userData,
      userData =>
        window.fetch &&
        fetch("/api/users/register", {
          method: "post",
          body: JSON.stringify({ userData }),
          headers: new Headers({
            "Content-Type": "application/json"
          })
        })
    );
  }

  loginUser(userData) {
    reaction(
      () => userData,
      userData =>
        window.fetch &&
        fetch("/api/users/login", {
          method: "post",
          body: JSON.stringify({ userData }),
          headers: new Headers({
            "Content-Type": "application/json"
          })
        })
          .then(res => {
            // Save to localStorage
            console.log(res.data);
            const { token } = res.data;
            // Set Token to localStorage
            localStorage.setItem("jwtToken", token);
            // // Set token to Auth Header
            // setAuthToken(token);
            // Decode token to get User date
            const decoded = jwt_decode(token);
            // Set Current user
            this.user[token] = decoded;
          })
          .catch(err => console.log(err))
    );
  }
}

const authStore = new AuthStore();

export default authStore;
export { AuthStore };
