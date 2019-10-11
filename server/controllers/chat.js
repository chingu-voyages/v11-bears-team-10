const { MessageChat } = require("../models/chat");

const findMessages = async (req, res) => {
 try {
  const rooms = req.query.rooms;
  if(!rooms) return res.status(422).end()
  const projectIDs = rooms.split(',')
  if(!projectIDs.length) return res.status(422).end()
  const messagesList = {}
  await Promise.all(
    projectIDs.map(async id => {
      try {
        const messages = await MessageChat.find({room: id}).limit(10);
        console.log('messages =', messages)
        messagesList[id] = [...messages]
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      return id;
    })
  );
  res.status(200).json({messagesList})
 } catch (error) {
  console.error(error)
  res.status(500).json({ error: error.message });
 }
}

module.exports = {findMessages}