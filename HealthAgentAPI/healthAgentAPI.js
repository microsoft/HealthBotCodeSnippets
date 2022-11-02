const jwt = require("jsonwebtoken");
const rp = require("request-promise");
const fs = require('fs')

if (process.argv.length !== 5) {
    console.log("Usage: node healthAgentAPI.js <post_scenarios|get_scenarios> <tenantName> <API_JWT_secret>");
    process.exit();
}
const action = process.argv[2];
const tenantName = process.argv[3]
const jwtSecret = process.argv[4];

const BASE_URL = "https://eastus.healthbot.microsoft.com/";
const jwtToken = jwt.sign({
    tenantName: tenantName,
    iat: Math.floor(Date.now()  / 1000)
  }, jwtSecret);

/**** Scenarios ****/

if (action === "post_scenarios") {
    const options = {
        method: 'POST',
        uri: `${BASE_URL}api/account/${tenantName}/scenarios`,
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        },
        body: [
            {
                "name":"Hello World",
                "scenario_trigger":"hello_world",
                "description":"",
                "code":"{\n  \"version\": 2,\n  \"steps\": [\n    {\n      \"id\": \"aaa3073dc553-32a44525cced8e2f-2200\",\n      \"type\": \"statement\",\n      \"designer\": {\n        \"xLocation\": 479,\n        \"yLocation\": 196\n      },\n      \"text\": \"Hello World!\"\n    }\n  ]\n}"
            },
            {
                "name":"Greetings",
                "scenario_trigger":"greetings",
                "description":"",
                "code":"{\n  \"version\": 2,\n  \"steps\": [\n    {\n      \"id\": \"aaa3073dc553-32a44525cced8e2f-2200\",\n      \"type\": \"statement\",\n      \"designer\": {\n        \"xLocation\": 479,\n        \"yLocation\": 196\n      },\n      \"text\": \"Greetings!\"\n    }\n  ]\n}"
            }
        ],
        json: true
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err.message);
        });
}

if (action === "get_scenarios") {
    const options = {
        method: 'GET',
        uri: `${BASE_URL}api/account/${tenantName}/scenarios`,
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        }
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err.message);
        });
}

/**** Backup ****/

if (action === "post_backup") {
    const options = {
        method: 'POST',
        uri: `${BASE_URL}api/account/${tenantName}/backup`,
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        },
        body: {
                "hbs": "Get Backup Output"
            }
        ,
        json: true
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err.message);
        });
}

if (action === "get_backup") {
    const options = {
        method: 'GET',
        uri: `${BASE_URL}api/account/${tenantName}/backup`,
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        }
    };
    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err.message);
        });
}

/**** Resources ****/

if (action === "post_resources") {
    const options = {
        method: 'POST',
        uri: `${BASE_URL}api/account/${tenantName}/resources`,
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        },
        formData: {
            file: {
                value: fs.readFileSync('myfile.txt'),
                options: {
                    filename: 'myfile.txt',
                    contentType: 'text/plain'
                }
            }
        },
        json: true
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err.message);
        });
}

if (action === "get_resources") {
    const options = {
        method: 'GET',
        uri: `${BASE_URL}api/account/${tenantName}/resources`,
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        }
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err.message);
        });
}

/**** Localization ****/

if (action === "post_localization") {
    const options = {
        method: 'POST',
        uri: `${BASE_URL}api/account/${tenantName}/localization`,
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        },
        body: {
            "custom": [{
                "en-us": "test1",
                "stringId": "test1"

            }],
            "system": []
        },
        json: true
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err.message);
        });
}

if (action === "get_localization") {
    const options = {
        method: 'GET',
        uri: `${BASE_URL}api/account/${tenantName}/localization`,
        headers: {
            'Authorization': 'Bearer ' + jwtToken
        }
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody);
        })
        .catch(function (err) {
            console.log(err.message);
        });
}
