import { MongoClient, GridFSBucket } from 'mongodb';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { dbConnect } from '$lib/server/config/db';

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'Hanoi';
const client = new MongoClient(url);

export const POST: RequestHandler = async ({ request }) => {
  try {
    await dbConnect();
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db);

    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
      return json({ error: 'No file uploaded' }, { status: 400 });
    }

    const uploadStream = bucket.openUploadStream(file.name);
    const buffer = await file.arrayBuffer();
    uploadStream.end(Buffer.from(buffer));

    return new Promise((resolve, reject) => {
      uploadStream.on('finish', () => {
        resolve(json({ fileId: uploadStream.id }, { status: 200 }));
      });

      uploadStream.on('error', (error) => {
        reject(json({ error: 'Error uploading file' }, { status: 500 }));
      });
    });
  } catch (error) {
    return json({ error: 'Error connecting to database' }, { status: 500 });
  }
};
