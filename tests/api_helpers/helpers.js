const axios = require("axios");
const SWAGGER_API_URL = "http://localhost:5000/api";

//Users helpers
const sendUserRequest = async (url, data = null, method = "get") => {
    let returned;
    try {
        const fullUrl = `${SWAGGER_API_URL}/${url}`;
        console.log(`Sending ${method.toUpperCase()} to ${fullUrl}`);
        const response = await axios({
            url: fullUrl,
            method,
            headers: {
                'accept': 'application/json'
            },
            data,
        });
        console.log(`Received response status: ${response.status}`);
        returned = {
          status: response.status,
          data: response.data,
        };
    } catch (error){
        console.log(`Error occurred: ${error.message}`);
        if (error.response) {
            returned = {
              status: error.response.status,
              data: error.response.data
            };
        } else {
            returned = {
              status: 500,
              data: { message: 'Network error or server not responding' }
            };
        }
    }
    return returned;
}

module.exports = {
    sendUserRequest
}