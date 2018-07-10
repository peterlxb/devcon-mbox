import { observable, computed, reaction, action } from "mobx";
import jwt_decode from "jwt-decode";
import axios from "axios";

class AuthStore {
  @observable isAuthenticated = false;

  constructor(user) {
    this.user = user;
  }

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

  @action
  loginUser(userData) {
    axios
      .post("/api/users/login", userData)
      .then(res => {
        // Save to localStorage
        console.log(res);
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
      .catch(err => console.log(err));
  }
}

const authStore = new AuthStore();

export default authStore;
export { AuthStore };
