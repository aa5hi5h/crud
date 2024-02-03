import mongoose from "mongoose";

const MongoConnect = async () => { try {
    await mongoose.connect("mongodb://localhost:27017/books")
    console.log("Database Connected!!!")
} catch (error) {
    console.log(`connection failed due to ${error}`)

}
}
export default MongoConnect ;