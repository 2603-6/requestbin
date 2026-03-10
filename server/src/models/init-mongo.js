db = db.getSiblingDB('requestsdb');

db.createCollection("requests");

db.requests.insertMany([
    {

        request: {
            headers: { "Content-Type": "application/json",
                        "Accept-Language": "en-US",
                        "path": "/"

            },
            body: null,
            query_params: {},
            status_code: 200,

        }
    },
    {
        request: {
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0"
            },
            body: { message: "hello world"},
            query_params: { page: "1"}, 
        }
    },
]);