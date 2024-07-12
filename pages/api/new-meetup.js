import { MongoClient } from 'mongodb';
// /api/new-meetup
// POST /api/new-meetup

const CONNECTION_STRING = 'test';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(CONNECTION_STRING);
    const db = client.db();

    const meetupsCollection = db.collection('meetups') ;
    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: 'Meetup inserted!'});
  }
}

export default handler;
