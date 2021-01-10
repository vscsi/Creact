import Axios from "axios";

const get_User_Logout = (cb) => {
  try {
    Axios.get("http://localhost:4000/checkloginusers", {
      // Axios.get(`${process.env.REACT_APP_API_SERVER}/checkloginusers`, {
      headers: { "x-access-token": localStorage.getItem("token") },
    }).then((res) => {
      return cb(res.data);
    });
  } catch (error) {
    console.error(error.message);
  }
};

export { get_User_Logout };
