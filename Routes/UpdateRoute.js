import express from "express"
import multer from "multer"
import Todo from "../Models/TodoModel.js"

const UpdateRoute = express.Router()

const storage = multer.diskStorage({

    destination: function (req, img, cb) {
        return cb(null, "./uploads/")
    },

    filename: function (req, img, cb) {
        return cb(null, `${img.originalname}`) //${Date.now()}-
    }

})

const upload = multer({ storage })

UpdateRoute.get("/gettodo", async (req, res) => {

    try {
        const todo = await Todo.find()
        res.status(200).json(todo)
    } catch (err) {
        console.log(err)
    }

})

UpdateRoute.get("/gettodobyid/:id", async (req, res) => {

    try {
        const itemId = req.params.id
        const todo = await Todo.findById({ _id : itemId})
        res.status(200).json(todo)
    } catch (err) {
        console.log(err)
    }


})

UpdateRoute.post("/posttodo", upload.single("img"), async (req, res) => {

    try {
        const { filename } = req.file
        const todo = new Todo({
            img: filename,
            ...req.body
        })
        await todo.save()
        res.status(200).json({ message: 'Todo saved successfully' });
    } catch (err) {
        console.log(err)
    }

})


UpdateRoute.delete("/deletetodo/:id", async (req, res) => {
    
    try {
        const itemId = req.params.id
        const todo = await Todo.findById({ _id: itemId })
        if (todo) {
            await Todo.findByIdAndDelete(itemId)
            res.status(200).json({ message: 'Todo Delete successfully' });
        }
    } catch (err) {
        console.lof(err)
    }

})

UpdateRoute.put("/updatetodo/:id", upload.single("img"), async (req, res) => {

    console.log(req.body, req.file)
    try{
        const itemId = req.params.id
        const todo = await Todo.findByIdAndUpdate({ _id : itemId})
        if(req.file){
            const { filename } = req.file
            todo.name = req.body.name 
            todo.des = req.body.des 
            todo.img = filename 
        }
        if(!req.file){
            todo.name = req.body.name 
            todo.des = req.body.des 
        }
        res.status(200).json({ message: 'Todo Updated successfully' });
        await todo.save()
    }catch(err){
        console.log(err)
    }

})


export default UpdateRoute;