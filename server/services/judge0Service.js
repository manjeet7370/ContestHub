
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
    const response = await axios.get(
        `https://ce.judge0.com/submissions/${token}`
    );

    return response.data;
}


module.exports = {
    submitCode,
    getSubmissionResult,
};