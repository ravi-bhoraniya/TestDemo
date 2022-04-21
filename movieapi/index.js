const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

const { body, validationResult } = require('express-validator');


app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/list', function (req, res) {
      fs.readFile(__dirname + "/" + "movieList.json", "utf-8", function (error, result) {
            var data = JSON.parse(result);
            res.json(data);
      })
})

app.post('/login',
      body('email').isEmail().normalizeEmail(),
      body('password').isLength({
            min: 6
      }),
      (req, res) => {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                  return res.status(400).json({
                        success: false,
                        errors: errors.array()
                  })
            }

            return res.status(200).json({
                  success: true,
                  message: 'login sucessfully done'
            })
      })

var server = app.listen(8081, function () {
      var host = server.address().address;
      var port = server.address().port
      console.log(host + ':' + port);
})