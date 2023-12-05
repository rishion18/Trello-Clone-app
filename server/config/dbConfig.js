import mongoose, { connect } from "mongoose"

export const  connectToDatabase = async() => {
    const {connection} = await mongoose.connect(
        `mongodb+srv://kvkvraj83:${process.env.database_password}@cluster0.iszx2ts.mongodb.net/TrelloClone?retryWrites=true&w=majority`
    )

    if(connection){
        console.log(`connecteed to database${mongoose.connection.host}`)
    }
}

export default connectToDatabase;