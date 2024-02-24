import type { NextApiRequest, NextApiResponse } from "next";

import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { userId } = req.query;

    if (!userId) {
      res.status(400).json({ users: [], error: "User ID is required" });
    }

    const client = await clientPromise;
    const db = client.db("usersData");

    const getUserPapayaSubscription = async () => {
      const userServiceSubscription = await db
        .collection("userSubscription")
        .find({ userId })
        .sort({ metacritic: -1 })
        .toArray();

      return JSON.parse(JSON.stringify(userServiceSubscription[0] || null));
    };

    const getUserServiceSubscription = async () => {
      const userServiceSubscription = await db
        .collection("userServiceSubscription")
        .find({ userId })
        .sort({ metacritic: -1 })
        .toArray();

      return JSON.parse(JSON.stringify(userServiceSubscription[0] || null));
    };

    res.status(200).json({
      userEnrollmentStatus: {
        userId,
        papayaSubscription: await getUserPapayaSubscription(),
        serviceSubscription: await getUserServiceSubscription(),
      },
    });
  } catch (err) {
    res.status(400).json({ userEnrollmentStatus: null, error: err });
  }
}
