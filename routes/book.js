var express = require('express');
var request = require('request');
var router = express.Router();
var db_config = require('../config/database.js');
var {KAKAO_REST_API_KEY} = require('../secret/KAKAO_API_KEY');
var conn = db_config.init();
db_config.connect(conn);

const options = {
  headers:{"Authorization": `KakaoAK ${KAKAO_REST_API_KEY}`},
  url:"https://dapi.kakao.com/v3/search/book",
  json:true
}

// 도서검색
router.post('/search/',function(req, res, next) {
  options.qs = {target: 'title', query:`${req.body.title}`}
  request.get(options, function(err, response, body){
    if(err)
      res.send("ERROR");
    else{
      let result = [];
      let document = body.documents;
      for(let i=0; i<document.length; i++){
        let temp = {
          title : document[i].title,
          authors : document[i].authors,
          publisher : document[i].publisher
        }
        result.push(temp);
      }
      res.json(result);
    }
  })
});

// 유저가 저장한 독후감 중 도서 검색
router.post('/search/user/:id',function(req, res, next) {
  try{
    var sql = `SELECT * FROM Books WHERE userId = '${req.params.id}' AND title LIKE '%${req.body.title}%';`;    
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
            inform.push(temp)
          }
          res.json(inform);
        } 
    });
  }catch(err){
    res.send(err);
  }
});

router.route('/review/:id')
  .get((req, res, next)=> { // 독후감의 상세페이지
    try{
      var sql = `SELECT * FROM Books WHERE userId = '${req.params.id}' AND title = '${req.body.title}';`;    
      conn.query(sql, function (err, rows, fields) {
          if(err) res.send(err);
          else{
            const inform = {
              title : rows[0].title,
              authors : rows[0].authors,
              publisher : rows[0].publisher,
              grade : rows[0].grade,
              review : rows[0].review
            }
            res.json(inform);
          } 
      });
    }catch(err){
      res.send(err);
    }
  })
  .post((req, res, next)=>{ // 독후감 추가
    try{
      var sql = `INSERT INTO Books(userId, title, authors, publisher, grade, review) 
                  VALUES('${req.params.id}', '${req.body.title}', '${req.body.authors}', '${req.body.publisher}', '${req.body.grade}', '${req.body.review}');`;    
      conn.query(sql, function (err, rows, fields) {
          if(err) console.log('query is not excuted. select fail...\n' + err);
          else res.json({value : 1});
      });
    }catch(err){
      res.send(err);
    }
  })
  .delete((req,res, next)=>{ // 독후감 삭제
    try{
      let sql = `DELETE FROM Books WHERE userId = '${req.params.id}' AND title = '${req.body.title}';`;
      conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else res.json({value : 1});
      });
    }catch(err){
      res.send(err);
    }
  })
  .patch((req, res, next)=>{ // 독후감 수정
    try{
      let sql = `UPDATE Books SET grade='${req.body.grade}', review='${req.body.review}' 
                  WHERE userId = '${req.params.id}' AND title = '${req.body.title}';`;
      conn.query(sql, function (err, rows, fields) {
        if(err) console.log('query is not excuted. select fail...\n' + err);
        else{
          res.json({value : 1});
        }
      });
    }catch(err){
      res.send(err);
    }
  })

module.exports = router;