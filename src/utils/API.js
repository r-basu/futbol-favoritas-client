//local
// const URL_PREFIX = "http://localhost:3000";
//deployment
const URL_PREFIX = "https://futbol-favoritas-server-9958536b1fa0.herokuapp.com"

const API = {
  login: async (userObj) => {
    const res = await fetch(`${URL_PREFIX}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("network request failed");
    }
  },
  signup: async (userObj) => {
    const res = await fetch(`${URL_PREFIX}/api/users`, {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("network request failed");
    }
  },
  logout: async (jwtToken) => {
    const res = await fetch(`${URL_PREFIX}/api/users/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      return res.json();
    } else {
      throw new Error("network request failed");
    }
  },
};

export default API;
