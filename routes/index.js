var request = require('request');
var express = require('express');
var router = express.Router();

const options = {
  headers:{"Authorization": "KakaoAK KAKAO-REST-API-KEY"},
  url:"https://dapi.kakao.com/v3/search/book",
  qs:{
    target: 'title',
    query: '안녕',
  },
  json:true
}

/* GET home page. */
router.get('/',function(req, res, next) {
  request.get(options, function(err, response, body){
    if(err)
      res.send("ERROR");
    else
      res.json(body);
  })
  //res.render('index', { title: 'Express' });
  // For test commit
  // Close Issue commit
});

module.exports = router;
