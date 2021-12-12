import { connectToDatabase } from '../../lib/mongodb'

export default async function handler(req, res) {


    try {
        if (req.method == 'POST') {

            const body = JSON.parse(req.body)
            const { db } = await connectToDatabase();

            const user = await db.collection('amigos').insertOne({ name: body.name })

        }

    } catch (err) {
        console.log(err)

    }


}
