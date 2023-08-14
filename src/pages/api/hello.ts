// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGODB_URI!


type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = new MongoClient(uri, { 

    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }

  });

  try {
    await client.connect();

    const db = client.db("yourDatabaseName");
    const collection = db.collection("yourCollectionName");

    // Assuming there's a document with a field "counter"
    const query = { _id: "yourDocumentId" };
    const updateDocument = {
      $inc: { counter: 1 },
    };
    const options = { upsert: true, returnOriginal: false };

    const result = await collection.findOneAndUpdate(query as any, updateDocument, options);

    if (result.ok) {
      res.status(200).json({ newCount: result.value?.counter });
    } else {
      res.status(500).json({ message: 'Failed to update counter' });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await client.close();
  }
}
