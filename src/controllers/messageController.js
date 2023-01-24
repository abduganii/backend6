import UserModel from "../models/user.js"
import MessegeModel from "../models/message.js"
import ReplyMessege from "../models/replyMessege.js"

export const newMessege = async(req, res) => {
    try {
        const {  recipientId, title, message } = req.body;

        const recipientFilter = await UserModel.findById({ _id: recipientId })

        if (recipientFilter) {

            const doc = new MessegeModel({
                recipient: recipientId,
                title: title,
                message: message,
                user: req.headers.userid,
            })
    
        
            const newMessege = await doc.save()
            res.status(200).send({
                status:200,
                data:newMessege
            });
        } else {
            res.status(400).send({
                status: 400,
                message: "No Recipiented"
            });
        }


    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Failed to Messege"
        });
    }
}
export const getMessege = async (req, res) => { 
    try {
        const message = await MessegeModel.find().populate('recipient').populate('user').exec()

        const rec = message.reverse().filter(e => e.recipient?.id === req.headers.userid)
        const vaiw = rec.filter(e=>e.View === false)
        

        res.send({rec:rec,vaiw:vaiw.length})
      
    } catch (error) {
        
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Failed to Messege"
        });
    }
}

export const SendedMessege = async (req, res) => { 
    try {
        const message = await MessegeModel.find().populate('recipient').populate('user').exec()

        const rec = message.reverse().filter(e => e.user?.id === req.headers.userid)  

        res.send(rec)
      
    } catch (error) {
        
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Failed to Messege"
        });
    }
}

export const getoneMessege = async (req, res) => { 
    try {

        const messegeId = req.params.id
        const message = await MessegeModel.findByIdAndUpdate({_id:messegeId},{View:true}).populate('recipient').populate('user').exec()
       
        res.send(message)
      
    } catch (error) {
        
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Failed to Messege"
        });
    }
}

export const deleteMessege = async (req, res) => { 
    try {

        const messegeId = req.params.id
        const message = await MessegeModel.findByIdAndDelete({_id:messegeId})
       
        res.send(message)
      
    } catch (error) {
        
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Failed to Messege"
        });
    }
}


export const replyMessege = async(req, res) => {
    try {
        const { messegeId, recipientId, message } = req.body;
         await MessegeModel.findByIdAndUpdate({_id:messegeId},{View:false}).exec()
        const recipientFilter = await UserModel.findById({ _id: recipientId })

        if (recipientFilter) {
            const doc = new ReplyMessege({
                recipient: recipientId,
                message: message,
                user: req.headers.userid,
                messegeId:messegeId
            })
    
        
            const newMessege = await doc.save()
            res.status(200).send({
                status:200,
                data:newMessege
            });

        } else {
            res.status(400).send({
                status: 400,
                message: "No Recipiented"
            });
        }


    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            message: "Failed to Messegereplay"
        });
    }
}
export const getMessegereply = async (req, res) => {
    try {
        const messegeId = req.params.id
        const message = await ReplyMessege.find({messegeId:messegeId}).populate('recipient').populate('user').populate('messegeId').exec()
        

        res.send(message)
              
    
} catch (error) {
    
    console.log(error)
    res.status(500).send({
        status: 500,
        message: "Failed to Messege"
    });
}
}