const Devs = require("../models/Dev");

module.exports = {
  async store(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggedDev = await Devs.findById(user);
    const targetDev = await Devs.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    loggedDev.dislikes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};
