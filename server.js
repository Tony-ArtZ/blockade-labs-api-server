import express from 'express'
import dotenv from 'dotenv'

import { BlockadeLabsSdk } from '@blockadelabs/sdk';

dotenv.config()

const sdk = new BlockadeLabsSdk({
  api_key: process.env.BLOCKADE_LABS_API_KEY, // REQUIRED
});
const app = express()
const port = process.env.PORT||3000

app.use(express.json())

app.get('/styles', async (req, res)=> {
    const styles = await sdk.getSkyboxStyles()
    res.status(200).json(styles)
})

app.post('/generate', async (req, res) => {
  const {prompt, styleId} = req.body
  console.log(prompt, styleId)
  const generateRequest = await sdk.generateSkybox({prompt: prompt, skybox_style_id: styleId})

  res.status(200).json(generateRequest)
})

app.post('/status', async (req, res) => {
  const {id} = req.body
  const status = await sdk.getImagineById({id: id})

  res.status(200).json(status)
})


app.listen(port)
console.log(`listening on port ${port}`)



