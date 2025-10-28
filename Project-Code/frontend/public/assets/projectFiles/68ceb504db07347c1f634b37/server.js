/* Ane' Burger, 33 - 24565068 */

import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://test-user:test-password@imyproject.uvrd6ue.mongodb.net/?retryWrites=true&w=majority&appName=imyProject";
const client = new MongoClient(uri);

async function getEvents() {
  try {
    await client.connect();

    const db = client.db("projectDB"); 
    const eventsCollection = db.collection("events");
    const results = await eventsCollection.find(
      {
        locations: {
          $elemMatch: {
            area: "Brooklyn",
            capacity: { $gt: 20 },
            date: { $gt: "2025/10/08", $lt: "2025/10/26" }
          }
        }
      },
      {
        projection: { _id: 0, name: 1, description: 1 }
      }
    ).toArray();

    console.log(results);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

getEvents();
