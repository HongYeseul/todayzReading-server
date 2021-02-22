var express = require('express');
var router = express.Router();
var db_config = require('../config/database.js');
var conn = db_config.init();
db_config.connect(conn);

/* 메인페이지 - 유저가 저장한 도서 목록 */
router.get('/:id',function(req, res, next) {
  try{
    var sql = `SELECT * FROM Books WHERE userId = '${req.params.id}';`;    
    conn.query(sql, function (err, rows, fields) {
        if(err) res.send(err);
        else{
          let inform = [];
          for(let i=0; i<rows.length; i++){
            let temp = {
              title : rows[i].title,
              authors : rows[i].authors,
              publisher : rows[i].publisher,
              grade : rows[i].grade,
              review : rows[i].review
            }
            inform.push(temp);
          }
          res.json(inform);
        } 
    });
  }catch(err){
    res.send(err);
  }
});

module.exports = router;
