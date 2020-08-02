var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
  const unsplash_api_key = 'af3a60bdad192d5212326574457dc2404ea8f867cc262f5b50646858ec3e8fcd';
  const unsplash_api_secret = '26a1734570e4c5885bcfdb56f51bb6a46b77511d3de59dd003d46f0bf454e4df';
  const unsplash_options = {
    url: 'https://api.unsplash.com/search/photos',
    method: 'GET',
    headers: {
      'Authorization': `Client-ID ${unsplash_api_key}`,
      'Content-Type': 'application/json',
    },
    qs: {
      query: req.query.query,
      per_page: req.query.total,
      page: '1',
      orientation: 'landscape'
    }
  };

  const unsplash_req = request.get(unsplash_options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  });
  unsplash_req.end;
});

module.exports = router;
