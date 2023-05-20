import mongoose from "mongoose";

const messagesCollection = "messages";

const messagesSchema = new mongoose.Schema({
    user:{ type:String, required:true},
    message:{ type:String, required:true},
});

export const chatModel = mongoose.model(messagesCollection,messagesSchema);