'use strict'
var express = require('express');
var router = express.Router();
var db = require('../server/db');

router.get('/api/players/:id', db.selectAll);
router.get('/api/players/type/:type', db.selectStatsByType);
router.get('/api/batting/:id', db.selectSinglebatting);
router.get('/api/batting', db.selectManybatting);
router.post('/api/batting', db.createbatting);
router.put('/api/batting/:id', db.updatebatting);
router.delete('/api/batting/:id', db.deletebatting);
router.get('/api/bowling/:id', db.selectSinglebowling);
router.get('/api/bowling', db.selectManybowling);
router.post('/api/bowling', db.createbowling);
router.put('/api/bowling/:id', db.updatebowling);
router.delete('/api/bowling/:id', db.deletebowling);
router.get('/api/player/:id', db.selectSingleplayer);
router.get('/api/player', db.selectManyplayer);
router.post('/api/player', db.createplayer);
router.put('/api/player/:id', db.updateplayer);
router.delete('/api/player/:id', db.deleteplayer);
router.get('/api/type/:id', db.selectSingletype);
router.get('/api/type', db.selectManytype);
router.post('/api/type', db.createtype);
router.put('/api/type/:id', db.updatetype);
router.delete('/api/type/:id', db.deletetype);
module.exports = router;
