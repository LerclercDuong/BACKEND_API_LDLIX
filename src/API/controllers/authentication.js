const Users = require('../models/users');
const bcrypt = require('bcrypt')
const saltRounds = 10;
var jwt = require('jsonwebtoken');
class authentication {

  
    async register(req, res, next) {
        const USER = req.body;
        const isExist = Users.findOne({username: USER.username});
        
        if(await isExist){
          res.json({ message: 'UserName exist'});
        }else{
            const salt = bcrypt.genSaltSync(saltRounds);
            const password_Hash = bcrypt.hashSync(USER.password, salt);
            const userinfo = new Users({username: USER.username, password: password_Hash, email: USER.email});
            await userinfo.save();
            res.json({message: 'success',
            data: {user: USER.username, email: USER.email }
        });
        }
      }
    async login(req, res, next){
        const USER = req.body;
        const ACCOUNT = await Users.findOne({username: USER.username});
        
        try{
          if(ACCOUNT){
           
            bcrypt.compare(USER.password, ACCOUNT.password, function(err, result) {
              if(result == true){
                var token = jwt.sign({ username: USER.username, exp: Math.floor(Date.now() / 1000) + (60 * 60), }, 'shhhhh');
                res.status(200).json({message: 'success',
                data: {user: USER.username, accessToken: token}})
                
              }else{
                throw new Error('Wrong username or password');
              }
          });
          }else{
            throw new Error('Wrong username or password');
          }
        }catch(err){
            res.status(404).send({message: `${err}`});
        }
    }
}

module.exports = new authentication;