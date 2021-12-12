import { connectToDatabase } from '../../lib/mongodb'

export default async function handler(req, res) {

    try {

        const { db } = await connectToDatabase();

        const users = await db
            .collection('amigos')
            .find({})
            .sort({})
            .limit(20)
            .toArray();

        res.status(200).json({ response: users })

    } catch (err) {
        console.log(err)

    }


}
