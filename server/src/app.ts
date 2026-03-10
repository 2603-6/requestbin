import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { mongoDBConnect } from "./utils/database_connections"
import {
    insertIntoMongo,
    postgresGetAllBins,
    postgresGetAllRequests,
    postgresCreateBin,
    postgresInsertRequest,
} from './utils/database_queries';
import { mongo } from 'mongoose';

const app = express();
app.use(express.json());
dotenv.config();


app.get('/', (req: Request, res: Response) => {
    res.send("Hello World!")
})

// creates new bin with name: 201, 400 if bad name, 409 if name conflict
app.post('/api/bins', async (req: Request, res: Response) => {
    try {
        const binName = req.body.bin_name;
        const pgRow = await postgresCreateBin(binName);
        res.status(201).json({ id: pgRow.name });
    } catch (error) {
        console.error("Error creating bin:", error);
        res.status(400).json({
            error: "server error",
            msg: "Could not create bin at this time."
        })
    }
})

// get all bins     returns [{ id: string }]
app.get('/api/bins', async (req: Request, res: Response) => {
    try {
        const result = await postgresGetAllBins();
        console.log("Bins retrieved: ", result);
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
        const requests = await postgresGetAllRequests(binName);
        res.status(200).json(requests);
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
    try {
        const mongoData = {
            request: {
                headers: req.headers,
                body: req.body,
                path: req.originalUrl,
                query_params: req.query
            }
        };
        
        const binName = req.params.binName as string;

        const mongoResult = await insertIntoMongo(mongoData)
        const mongodbID = mongoResult.insertedId.toString();
        if (!mongodbID) {
            throw new Error("MongoDB insert failed, no insertedID returned");  
        }
        if (!binName) {
            throw new Error("Bin name is missing in the request parameters");   
        }
        const pgRow = await postgresInsertRequest(
            binName,
            mongodbID,
            req.method)

        res.status(201).json(pgRow)
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({
            error: "server error",
            msg: "Could not record request at this time."
        })
    }
});


const startServer = async () => {
    const PORT = 3000;
    await mongoDBConnect();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })


}

startServer();
