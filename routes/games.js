var express = require('express');
var router = express.Router();
var Game = require('../models').Game;

router.get('/', function(req, res) {
  Game.all({
    order: [
      ['createdAt', 'ASC']
    ]
  })
  .then(function(games) {
    return res.render('games', { games: games });
  });
});

router.get('/:id/edit', function(req, res) {
  Game.findById(req.params.id)
    .then(function(game) {
      return res.render('edit', {game: game});
    });
});

router.post('/', function(req, res) {
  var title = req.body.title;
  Game.create({title: title})
    .then(function() {
      res.redirect('/games');
    });
});

router.put('/:id', function(req, res) {
  Game.update(
    {title: req.body.title},
    {where: {id: req.params.id}}
  )
  .then(function() {
    return res.redirect('/games');
  });
});

router.delete('/:id', function(req, res) {
  Game.findById(req.params.id)
    .then(function(game) {
      game.destroy();
    })
    .then(function() {
      return res.redirect('/games');
    });
});

module.exports = router;