import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { mongoDBConnect } from "./utils/database_connections"
import { mongoFindAllRequestById, 
        insertIntoMongo,
        postgresGetAllBins,
        postgresGetAllRequests,
        postgresCreateBin,
        postgresInsertRequest, } from './utils/database_queries';


const app = express();
app.use(express.json());
dotenv.config();


app.get('/', (req: Request, res: Response) => {
    res.send("Hello World!")
})


// get all bins
app.get('/api/bins', async (req: Request, res: Response) => {
    try {
        const result = await postgresGetAllBins(); // returns arr
        res.json(result);
    } catch (error) {
        console.error("Error fetching bins:", error);
        res.status(500).json({
            error: "server error",
            msg: "Could not retrieve bins at this time."
        })
    }
})

// get all requests for a given bin
app.get('/api/bins/:binName/requests', async (req: Request, res: Response) => {
    try {
        const binName = req.params.binName as string;
        const finalResponse = await postgresGetAllRequests(binName);

        console.log('heres the json');
        res.status(200).json(finalResponse);
    } catch (error) {
        console.error("Error fetching requests:", error);
        res.status(500).json({
            error: "server error",
            msg: "Could not retrieve requests at this time."
        })
    }
})

// webhook endpoint
app.all('/bins/:binName', async (req: Request, res: Response) => {
    const time_received = new Date()
    const timeStamp = time_received.toLocaleString('en-US');

    const headerString = Object.entries(req.headers)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

    const pgData = {
        binName: req.params.binName,
        http_method: req.method,
        headers: headerString,
        receivedAt: timeStamp,
    }

    const mongoData = {
        request: req.body
    }

    console.log("pgData is", pgData);
    console.log("mongoData is", mongoData);

    const mongoResult = await insertIntoMongo(mongoData)
    const mongodbID = mongoResult.insertedId.toString();
    await postgresInsertRequest()
    res.status(200).send(`method is ${req.method}`);
    // db insertions precede response above
});


const startServer = async () => {
    const PORT = 3000;
    await mongoDBConnect();
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


}

startServer();