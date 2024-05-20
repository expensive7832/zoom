"use server"
import { StreamClient } from "@stream-io/node-sdk";
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const secret = process.env.STREAM_SECRET_KEY;

async function tokenProvider(id: string){

 
  if (id == "") throw new Error("authentication failed");

  if (!apiKey || !secret) throw new Error("apikey error");

  let client = new StreamClient(apiKey, secret);

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;
  const issued = Math.round(new Date().getTime() / 1000) - 60;

  let token = await client.createToken(id);

  
  return token;
};

export default tokenProvider;
