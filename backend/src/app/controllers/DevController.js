const axios = require("axios");
const Devs = require("../models/Dev");

class DevController {
  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Devs.findById(user);

    const users = await Devs.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } }
      ]
    });

    return res.json(users);
  }

  async store(req, res) {
    const { username } = req.body;

    const userExists = await Devs.findOne({ user: username });

    if (userExists) {
      return res.json(userExists);
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const { name, bio, avatar_url: avatar } = response.data;

    const dev = await Devs.create({
      name,
      user: username,
      bio,
      avatar
    });

    return res.json(dev);
  }
}

module.exports = new DevController();
