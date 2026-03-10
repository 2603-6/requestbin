import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { postgresGetAllBins } from './utils/database_queries';
import { mongoFindAllRequestById } from './utils/database_queries';

const mockGetRequestsByBinName = async (binName: String) => {
    return {
        'bin_name': binName,
        "requests": [
            {
                "id": 1,
                "bin_name": binName,
                "time_of_day": "10:15:30",
                "date_stamp": "03:07:2026",
                "http_method": "POST",
                "body": "Hello, world!",
                "headers": {
                    "Content-Type": "application/json"
                },
                "path": "/test"
            },
            {
                "id": 2,
                "bin_name": binName,
                "time_of_day": "11:45:00",
                "date_stamp": "03:07:2026",
                "http_method": "POST",
                "body": "Goodbye, world!",
                "headers": {
                    "Content-Type": "application/json"
                },
                "path": "/test"
            }
        ]
    }
}

const app = express();
app.use(express.json());
dotenv.config();
console.log(process.env.DB_USER)

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
        const finalResponse = await mockGetRequestsByBinName(binName);

        // kass
        //const pgMetadata = await postgresGetAllRequests(binName);



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
app.all('/bins/:binName', (req: Request, res: Response) => {
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
    res.status(200).send(`method is ${req.method}`);
    // db insertions precede response above
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
