import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export async function userLogin(userData) {
    
    const res = await axios({
        method: "post",
        url: "/user/login",
        headers: {
            "Content-Type": "application/json"
        },
        data: userData
    });

    return res;
      
}