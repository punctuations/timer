import prisma from "../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Is method POST?
  if (req.method == "POST") {
    // Method is post, add new timer, good place to check if all fields are in req.body
    await prisma.timer
      .create({
        data: {
          dash: req.body.dashUUID,
          timerUUID: req.body.uuid,
          name: req.body.name,
          notify: req.body.notifyPref,
          childLock: req.body.childLock,
          endsAt: req.body.time,
          rawTime: req.body.rawTime,
          rawUnits: req.body.rawUnits,
          timeLeft: `${moment(req.body.time).diff(
            moment(),
            "hours"
          )} : ${moment(req.body.time).diff(moment(), "minutes")} : ${
            moment(req.body.time).diff(moment(), "seconds") % 60
          }`,
        },
      })
      .catch((err) => console.log(err));

    return res.status(200).json({ success: true, uuid: req.body.dashUUID });
  } else {
    // Method is not POST, return 504 method not allowed
    return res.status(504).json({ success: false, data: "Method not allowed" });
  }
};
