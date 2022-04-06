import axios from "axios";

export default axios.create({
  baseURL: "https://todolist-react-node.herokuapp.com"
});