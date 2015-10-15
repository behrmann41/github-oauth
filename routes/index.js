var express = require('express');
var router = express.Router();
var unirest = require('unirest');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.isAuthenticated()){
      unirest.get('https://github.com/login/oauth/authorize?scope=user:email')
        .header("Authorization", "Bearer" + req.user.token)
        .header('x-li-format', 'json')
        .end(function(response){
          res.render('index', { title: 'GitHub-OAuth', profile: response.body})
        })
    } else {
      res.render('index', { title: 'GitHub-OAuth'});
    }
});

router.get('/logout', function (req, res, next){
  req.session = null;
  res.redirect('/')
})

module.exports = router;
