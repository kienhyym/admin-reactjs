import axios from "./axios.custiomzie";

const createrUserApi = async (name, email, password) => {
const URL_API = `/v1/api/register`;
const data = {
    name,
    email,
    password
}
return await axios.post(URL_API, data);
}

export { createrUserApi }