import express from "express"
const router = express.Router()
  ;
import { messageController, UserController, } from "../controllers/index.js";


router
  .get('/user', UserController.getUsers)
  .post('/user',UserController.login)
  .post('/getuser',UserController.searchUser)
  .post('/messege',messageController.newMessege)
  .post('/replymessege',messageController.replyMessege)
  .get('/messege', messageController.getMessege)
  .get('/messege/:id', messageController.getMessegereply)
  .get('/messegeSended', messageController.SendedMessege)
  .get('/oneMessege/:id', messageController.getoneMessege)
  .delete('/messege/:id',messageController.deleteMessege)
  

export default router;