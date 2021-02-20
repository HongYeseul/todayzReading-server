var express = require('express');
var router = express.Router();
var db_config = require('../config/database.js');
var conn = db_config.init();
db_config.connect(conn);

/* GET users listing. TEST */
// router.get('/', (req, res, next)=>{
//   var sql = 'SELECT * FROM Users';    
//   conn.query(sql, function (err, rows, fields) {
//       if(err) console.log('query is not excuted. select fail...\n' + err);
//       else res.send(rows);
//   });
// })

// 로그인 
router.post('/login', function(req, res, next) {
  try{
    var sql = `SELECT EXISTS (select * from todayzReading.Users where userId='${req.body.userId}') as chk;`;    
    conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.send(rows);
    });
  }catch(err){
    res.send(err);
  }
});

// 회원가입
router.route('/signUp')
  .get((req, res, next)=>{ // 회원가입 - 중복 아이디 확인
    try{

    }catch(err){

    }
  })
  .post((req, res, next)=>{ // 회원가입
    try{

    }catch(err){

    }
  })

module.exports = router;
