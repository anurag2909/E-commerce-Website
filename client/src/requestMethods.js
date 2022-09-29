import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMjJiZThlOTM1NTYwYTljNmQ2MjU2MiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MzMwNTM5OCwiZXhwIjoxNjYzNTY0NTk4fQ.2q72GL-wEWYrczGs8WpbeiMwTqlSimeNX5AmdDUr11c"

export const publicRequest = axios.create({
    baseURL: BASE_URL,  
})

export const userRequest = axios.create({
    baseURL: BASE_URL, 
    header: {token: `Bearer ${TOKEN}`} 
})