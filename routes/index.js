var request = require('request');
var express = require('express');
var router = express.Router();
var {KAKAO_REST_API_KEY} = require('../secret/KAKAO_API_KEY');

const options = {
  headers:{"Authorization": `KakaoAK ${KAKAO_REST_API_KEY}`},
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
  // close Issue commit
});

module.exports = router;
