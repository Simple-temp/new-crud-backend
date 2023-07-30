import mongoose from "mongoose";

const TodoSchema = mongoose.Schema(
    {
        name: { type: String, require: true },
        des: { type: String, require: true },
        img: { type: String, require: true }
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model("Todo", TodoSchema)

export default Todo;