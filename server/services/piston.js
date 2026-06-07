const axios = require("axios")

async function executeCode(language, code){
        const response = await axios.post(
            "https://emkc.org/api/v2/piston/execute",
            {
                language: language.toLowerCase(),
                version: "*",
                files: [
                    {
                        content: code,
                    }
                ]
            }
        );

    return response.data;
}

module.exports = { executeCode };

