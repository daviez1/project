import { dbConnect } from '$lib/server/config/db';
import { GridFSBucket } from 'mongodb';
import type { RequestHandler } from '@sveltejs/kit';
import mongoose from 'mongoose';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const db = await dbConnect();
    if (!db) {
      return new Response('Error connecting to database', { status: 500 });
    }

    const bucket = new GridFSBucket(db);

    const fileId = params.id;
    if (!mongoose.Types.ObjectId.isValid(fileId)) {
      return new Response('Invalid file ID', { status: 400 });
    }

    const file = await db.collection('fs.files').findOne({ _id: new mongoose.Types.ObjectId(fileId) });

    if (!file) return new Response('File not found', { status: 404 });

    const downloadStream = bucket.openDownloadStream(new mongoose.Types.ObjectId(fileId));

    const readableStream = new ReadableStream({
      start(controller) {
        downloadStream.on('data', (chunk) => controller.enqueue(chunk));

        downloadStream.on('end', () => controller.close());

        downloadStream.on('error', (error) => controller.error(error));
      }
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': file.contentType || 'application/octet-stream'
      }
    });
  } catch (error:any) {
    return new Response(`Error retrieving image: ${error.message}`, { status: 500 });
  }
};
