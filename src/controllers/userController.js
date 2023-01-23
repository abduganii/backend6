import UserModel from "../models/user.js"

export const login = async(req, res) => {
    try {
        const { name, } = req.body;
        const doc = new UserModel({
            name: name,
        })

        const user = await doc.save()
        
        res.status(200).send({
            status:200,
            data:user
        });

    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: 400,
            message: "failed login"
        });
    }
}

export const getUsers = async(req, res) => {
    try {
        res.send(await UserModel.find())

    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: 400,
            message: "failed login"
        });
    }
}


export const searchUser = async (req, res) => {
    try {
        const payload = req.body.payload.trim();
        let search = await UserModel.find({ name: { $regex: new RegExp('^' + payload + '.*', 'i') } }).exec();
        search = search.slice(0, 6);
        res.send({payload:search})
    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: 400,
            message: "failed"
        });
    }
}
