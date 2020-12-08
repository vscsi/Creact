const knex = require("../models/knex");
const bcrypt = require('bcrypt');

exports.getRegister= async(req,res)=>{
  
}
exports.postRegister= async(req,res)=>{
  const {username, firstname, lastname, email,password} = req.body;
    let query;
    let hashedPassword = await bcrypt.hash(password, 10);
    try{
      query = await knex.from('users').select().where('username',username);
    }catch(e){
      console.error(e.message)
    }
    // console.log('from server/register.js__',query, query.length)

    if(query.length>0){
      console.log('from server/register.js__username is already registered, please pick a new one')
    }else{
      await knex('users')
        .insert({
          username: username,
          user_pw: hashedPassword,  
          first_name: firstname,
          last_name: lastname,
          email: email
        })
    }
  
  // console.log(username, password)
}