import members from "../models/member.model.js";
import bcrypt from 'bcryptjs';

export const memberRegister = async(req , res) => {
  try{
    const memberData = req.body;
    memberData.password = await bcrypt.hash(memberData.password , 10);
    await members.create(memberData);
    res.status(200).send({status: true , message:'successfully registered!'})
  }catch(error){
    res.status(500).send({status: false , message: error.message});
  }
}

export const memberLogin = async(req , res) => {
 try{
    const {email , password} = req.body;
    const data = await members.findOne({email: email.toLowerCase()}).select('+password');
    if(!data || !await bcrypt.compare(password , data.password)){
        res.status(401).send({status: false , message: 'invalid credentials'});
        return;
    }
    const jwtToken = await data.generateJWTToken();
    res.cookie('token' , jwtToken , {
        maxAge: 2*24*60*60*1000
    });
    res.status(200).send({ status: true, message: 'Logged in successfully!' });

 }catch(error){
    res.status(500).send({status: false , message: error.message});
 } 
}