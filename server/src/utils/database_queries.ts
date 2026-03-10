import mongoose from "mongoose"
import { mongoDBConnect, postgresPool } from "./database_connections"

//mongodb queries
const mongoCollection = () => mongoose.connection.collection("requests")

const mongoFindRequestById = async (id: string ) => {
    return mongoCollection().findOne({ request_id: id})
}

export const mongoFindAllRequestById = async (ids: string[]): Promise<unknown[]> => {
    return mongoCollection().find( {
        request_id: { $in: ids}
    }).toArray();
}

export const insertIntoMongo = async (request_payload: unknown) => {

    if (typeof request_payload !== "object" || request_payload === null) {
        throw new Error("Request payload must be an object")
  }
    return mongoCollection().insertOne( {
        request: request_payload
        //returns object {acknowledged: true||false, insertedId: new ObjectId({id})}
    })
}

//postgres queries

export const postgresGetAllBins = async () => {
    const result = await postgresPool.query('SELECT name FROM bins');
    const binNames = result.rows.map(row => row.name);
    return binNames
    };

const postgresGetSingleBin = async (binName: string) => {
    const binResult = await postgresPool.query(
        `SELECT id FROM bins where name = $1`, [binName]
    )
    return binResult.rows[0]
}

export const postgresGetAllRequests = async (binName: string) => {
    const result = await postgresPool.query(`select requests.id, bin.name as bin_name, 
        requests.mongodb_id, requests.time_stamp, requests.http_method
        FROM "requests" 
        JOIN bins bin on requests.bin_id = bin.id
        WHERE bin.name = $1`,
        [binName]
    );
    return result.rows;
}

export const postgresCreateBin = async (binName: string) => {
    let singleBin = await postgresGetSingleBin(binName)
    if (!singleBin) {
        throw new Error(`Bin ${binName} does not exist`)
    }    
    const result = await postgresPool.query(
        `INSERT INTO bins (name) VALUES ($1)`, [binName]
    );
    return result
}

export const postgresInsertRequest = async (binName: string, mongodbID: string, httpMethod: string) => {
    let singleBin = await postgresGetSingleBin(binName)
    if (!singleBin) {
        throw new Error(`Bin ${binName} does not exist`)
    }
    const result = await postgresPool.query(
        `INSERT INTO requests (bin_id, mongodb_id, http_method)
        VALUES ((SELECT id from bins where name = $1), $2, $3)
        RETURNING *`, 
        [binName, mongodbID, httpMethod]
    );
    return result.rows[0];
}