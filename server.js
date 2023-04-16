import express from 'express'
import dotenv from 'dotenv'

import { BlockadeLabsSdk } from '@blockadelabs/sdk';

dotenv.config()

const sdk = new BlockadeLabsSdk({
  api_key: process.env.BLOCKADE_LABS_API_KEY, // REQUIRED
});
const app = express()
const port = process.env.PORT||3000

app.get('/styles', async (req, res)=> {
    const styles = await sdk.getSkyboxStyles()
    res.status(200).json(styles)
})

app.listen(port)
console.log(`listening on port ${port}`)



