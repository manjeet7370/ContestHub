
const axios = require("axios")

const submitCode = async (
    sourceCode,
    languageId,
    stdin

) => {
    const response = await axios.post(
        "https://ce.judge0.com/submissions",
        {
            source_code : sourceCode,
            language_id : languageId,
            stdin : stdin,
        }
    );

    return response.data.token;
};

const getSubmissionResult = async (token) => {
    try{
    const response = await axios.get(
        `https://ce.judge0.com/submissions/${token}?base64_encoded=true`
    );


    return response.data;
} catch(err){
    console.log("Judge0 Error:");
    console.log(err.response?.data)
    throw err;
}
}


module.exports = {
    submitCode,
    getSubmissionResult,
};