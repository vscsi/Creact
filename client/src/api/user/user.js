import Axios from "axios";

const get_User_Info = (cb) => {
  try {
    Axios.get("http://localhost:4000/username", {
      // Axios.get(`${process.env.REACT_APP_API_SERVER}/username`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((res) => cb(res.data));
  } catch (error) {
    console.error(error.message);
  }
};

const get_User_Workspaces = (cb) => {
  try {
    Axios.get("http://localhost:4000/workspace/list", {
      // Axios.get(`${process.env.REACT_APP_API_SERVER}/workspace/list`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((res) => cb(res.data));
  } catch (error) {
    console.error(error.message);
  }
};

export { get_User_Info, get_User_Workspaces };
