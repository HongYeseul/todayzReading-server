var express = require('express');
var router = express.Router();
var db_config = require('../config/database.js');
var conn = db_config.init();
db_config.connect(conn);

// 로그인 
router.post('/login', (req, res, next) => {
  try {
    var sql = `SELECT COUNT(userID) as cnt FROM Users WHERE userId='${req.body.id}' AND userPw='${req.body.pw}';`;
    conn.query(sql, function (err, rows, fields) {
      if (err)
        console.log('query is not excuted. select fail...\n' + err);
      else
        res.json(rows[0].cnt);
    });
  } catch (err) {
    res.send(err);
  }
});

// 회원가입
router.route('/signUp')
  .get((req, res, next)=>{ // 회원가입 - 중복 아이디 확인
    try{
      var sql = `SELECT EXISTS (select * from todayzReading.Users where userId='${req.body.id}') as chk;`;    
      conn.query(sql, function (err, rows, fields) {
          if(err) console.log('query is not excuted. select fail...\n' + err);
          else res.json(rows);
      });
    }catch(err){
      res.send(err);
    }
  })
  .post((req, res, next)=>{ // 회원가입
    try{
      var sql = `INSERT INTO Users(userId, userPw, userName) VALUES ('${req.body.id}', '${req.body.pw}', '${req.body.name}');`;
      conn.query(sql, function (err, rows, fields) {
          if(err) console.log('query is not excuted. select fail...\n' + err);
          else res.json({value : 1});
      });
    }catch(err){
      res.send(err);
    }
  })

module.exports = router;
