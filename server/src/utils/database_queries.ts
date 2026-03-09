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

export const insertIntoMongo = async (request_id: string, request_payload: unknown) => {

    if (typeof request_payload !== "object" || request_payload === null) {
        throw new Error("Request payload must be an object")
  }
    return mongoCollection().insertOne( {
        request_id,
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

const postgresGetAllRequests = async (binName: string) => {

}
// const run = async () => {
//     await mongoDBConnect()
//     // const result = await mongoFindRequestById('1234567890')
//     //console.log(result)
//     // const all_records =await mongoFindAllRequestById(['1234567890', '9876543210' ])
//     // console.log(all_records)
//     const payload=     {

//             headers: {
//                 "Content-Type": "application/json",
//                 "User-Agent": "Mozilla/5.0"
//             },
//             body: { message: "im a bunch of 1's"},
//             query_params: { one: "yes"}, 
        
//     }


//     const result = await insertIntoMongo('1111111', payload)
//     console.log(result)

// }





//run();
