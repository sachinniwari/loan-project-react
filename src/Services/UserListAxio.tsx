import axios from "axios";

// we need to pass the baseURL as an object
const API = axios.create({
  baseURL: "http://localhost/LoanProject/ApiController/index",
});

export default API;