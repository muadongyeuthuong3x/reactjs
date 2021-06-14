const router = require("express").Router();
const iduserchatuser = require("../models/iduserchatuser");


router.post("/iduserchatuser", async (req, res) => {
    const newConversation = new iduserchatuser({
      members: [req.body.senderId, req.body.receiverId],
    });
  
    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/:userId", async (req, res) => {
    try {
      const conversation = await iduserchatuser.find({
        members: { $in: [req.params.userId] },
      });

      console.log(conversation)
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  });



  module.exports = router;