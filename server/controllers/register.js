const knex = require("../models/knex");
const bcrypt = require("bcrypt");

exports.postRegister= async(req,res)=>{
  const {username, firstname, lastname, email,password, user_icon} = req.body;
  // console.log(req.body)
  // const file = req.file;
  // console.log(file, file.image, ' this is formData from server/register')
    let query;
    let hashedPassword = await bcrypt.hash(password, 10);
    try{
      query = await knex.from('users').select().where('username',username);
      if(query.length>0){
        // console.log('from server/register.js__username is already registered, please pick a new one')
        res.json({userNameRepeated: true})
      }else if(username!==''&&firstname!==''&&lastname!==''&&email!==''&&password!==''){
        await knex('users')
          .insert({
            username: username,
            user_pw: hashedPassword,  
            first_name: firstname,
            last_name: lastname,
            email: email,
            user_icon: user_icon
          })
          res.json({userNameRepeated:false})
      }
    }catch(e){
      console.error(e.message)
    }
}

