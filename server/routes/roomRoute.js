const express = require("express")
const router = express.Router()
const { room, getAllrooms } = require("../controller/roomController")

router.post("/getroombyid/", room)

router.get("/getallrooms", getAllrooms)

// router.post("/addroom", async (req, res) => {
//   try {
//     const newRoom = req.body;
//     console.log(req.body);
//     const room = new Room();
//     room.name = newRoom.name;
//     room.maxcount = newRoom.maxcount;
//     room.phonenumber = newRoom.phonenumber;
//     room.rentperday = newRoom.rentperday;
//     room.type = newRoom.type;
//     room.description = newRoom.description;
//     room.currentbookings = [];
//     if (newRoom.imageurl1 && newRoom.imageurl1.length > 0) {
//       room.imageurls.push(newRoom.imageurl1);
//     }
//     if (newRoom.imageurl2 && newRoom.imageurl2.length > 0) {
//       room.imageurls.push(newRoom.imageurl2);
//     }
//     if (newRoom.imageurl3 && newRoom.imageurl3.length > 0) {
//       room.imageurls.push(newRoom.imageurl3);
//     }

//     const result = await room.save();
//     res.send(result);
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ message: error });
//   }
// });

module.exports = router
