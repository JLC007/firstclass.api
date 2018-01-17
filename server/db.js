var express = require('express');
var app = express();
var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL;
var db = pgp(connectionString);


function selectAll(req, res) {
  var id = req.params.id;
  db.any('SELECT p.player_id,p.player_name,p.player_surname,p.country,p.cid,t1.type_name BatType, t2.type_name BowlType,b.matches,b.innings,b.no,b.runs,b.hs,b.hsnotout,b.average,b.ballsfaced,b.strikerate,b.hundres,b.fifties,b.fours,b.sixes,b.catches,b.stumpings,bo.innings inn, bo.balls, bo.runs bowlruns, bo.wickers, bo.bbi, bo.bbm, bo.average ave, bo.economy, bo.strikerate, bo.four, bo.five, bo.ten FROM public.player p left join batting b on b.player_id = p.player_id left join bowling bo on bo.player_id = b.player_id and bo.type_id = b.type_id inner join type t1 on t1.type_id = b.type_id inner join type t2 on t2.type_id = bo.type_id where p.player_id = $1 OR $1 =0;', [id])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved player stats'
        });
    })
    .catch(function (err) {
      //return next(err);
    })
    .finally(function () {
      pgp.end();
    });
}

function selectStatsByType(req, res) {
  var type = req.params.type;
  db.any('SELECT p.player_id,p.player_name,p.player_surname,p.country,p.cid,t1.type_name BatType, t2.type_name BowlType,b.matches,b.innings,b.no,b.runs,b.hs,b.hsnotout,b.average,b.ballsfaced,b.strikerate,b.hundres,b.fifties,b.fours,b.sixes,b.catches,b.stumpings,bo.innings inn, bo.balls, bo.runs bowlruns, bo.wickers, bo.bbi, bo.bbm, bo.average ave, bo.economy, bo.strikerate, bo.four, bo.five, bo.ten FROM public.player p left join batting b on b.player_id = p.player_id left join bowling bo on bo.player_id = b.player_id and bo.type_id = b.type_id inner join type t1 on t1.type_id = b.type_id inner join type t2 on t2.type_id = bo.type_id where t1.type_name = $1 OR $1 = \'all\';', [type])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved player stats by type'
        });
    })
    .catch(function (err) {
      //return next(err);
    })
    .finally(function () {
      pgp.end();
    });
}

function selectSinglebatting(req, res) {
  var id = req.params.id;
  db.any('SELECT batting_id,player_id,type_id,matches,innings,no,runs,hs,hsnotout,average,ballsfaced,strikerate,hundres,fifties,fours,sixes,catches,stumpings,date_created FROM public.batting where batting_id = $1;', [id])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one batting'
        });
    })
    .catch(function (err) {
      //return next(err);
    })
    .finally(function () {
      pgp.end();
    });
}

function selectManybatting(req, res) {
  db.any('SELECT batting_id,player_id,type_id,matches,innings,no,runs,hs,hsnotout,average,ballsfaced,strikerate,hundres,fifties,fours,sixes,catches,stumpings,date_created FROM public.batting;')
    .then(function (data) {
      //console.log(data);
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL batting'
        });
    })
    .catch(function (err) {
      //return next(err);
    })
    .finally(function () {
      pgp.end();
    });
}

function createbatting(req, res, next) {
  db.none('insert into share(batting_id,player_id,type_id,matches,innings,no,runs,hs,hsnotout,average,ballsfaced,strikerate,hundres,fifties,fours,sixes,catches,stumpings,date_created) values (${batting_id},${player_id},${type_id},${matches},${innings},${no},${runs},${hs},${hsnotout},${average},${ballsfaced},${strikerate},${hundres},${fifties},${fours},${sixes},${catches},${stumpings},${date_created})', req.query)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one batting'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatebatting(req, res, next) {
  var id = req.params.id;
  db.none('update public.batting set batting_id= $0,player_id= $1,type_id= $2,matches= $3,innings= $4,no= $5,runs= $6,hs= $7,hsnotout= $8,average= $9,ballsfaced= $10,strikerate= $11,hundres= $12,fifties= $13,fours= $14,sixes= $15,catches= $16,stumpings= $17,date_created= $18} where batting_id=$1', [parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated batting'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deletebatting(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('delete from public.batting where batting_id = $1', [id])
    .then(function (result) {

      res.status(200)
        .json({
          status: 'success',
          message: 'Removed batting_id'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function selectSinglebowling(req, res) {
  var id = req.params.id;
  db.any('SELECT bowling_id,player_id,type_id,matches,innings,balls,runs,wickers,bbi,bbm,average,economy,strikerate,four,five,ten,date_created FROM public.bowling where bowling_id = $1;', [id])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one bowling'
        });
    })
    .catch(function (err) {
      //return next(err);
    })
    .finally(function () {
      pgp.end();
    });
}

function selectManybowling(req, res) {
  db.any('SELECT bowling_id,player_id,type_id,matches,innings,balls,runs,wickers,bbi,bbm,average,economy,strikerate,four,five,ten,date_created FROM public.bowling;')
    .then(function (data) {
      //console.log(data);
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL bowling'
        });
    })
    .catch(function (err) {
      //return next(err);
    })
    .finally(function () {
      pgp.end();
    });
}

function createbowling(req, res, next) {
  db.none('insert into share(bowling_id,player_id,type_id,matches,innings,balls,runs,wickers,bbi,bbm,average,economy,strikerate,four,five,ten,date_created) values (${bowling_id},${player_id},${type_id},${matches},${innings},${balls},${runs},${wickers},${bbi},${bbm},${average},${economy},${strikerate},${four},${five},${ten},${date_created})', req.query)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one bowling'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatebowling(req, res, next) {
  var id = req.params.id;
  db.none('update public.bowling set bowling_id= $0,player_id= $1,type_id= $2,matches= $3,innings= $4,balls= $5,runs= $6,wickers= $7,bbi= $8,bbm= $9,average= $10,economy= $11,strikerate= $12,four= $13,five= $14,ten= $15,date_created= $16} where bowling_id=$1', [parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated bowling'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deletebowling(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('delete from public.bowling where bowling_id = $1', [id])
    .then(function (result) {

      res.status(200)
        .json({
          status: 'success',
          message: 'Removed bowling_id'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function selectSingleplayer(req, res) {
  var id = req.params.id;
  db.any('SELECT player_id,player_name,player_surname,country,cid FROM public.player where player_id = $1;', [id])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one player'
        });
    })
    .catch(function (err) {
      //return next(err);
    })
    .finally(function () {
      pgp.end();
    });
}

function selectManyplayer(req, res) {
  console.log('selectManyplayer')
  db.any('SELECT player_id,player_name,player_surname,country,cid FROM public.player;')
    .then(function (data) {
      console.log(data);
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL player'
        });
    })
    .catch(function (err) {
      console.log(err);
    })
    .finally(function () {
      pgp.end();
    });
}

function createplayer(req, res, next) {
  db.none('insert into share(player_id,player_name,player_surname,country,cid) values (${player_id},${player_name},${player_surname},${country},${cid})', req.query)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one player'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateplayer(req, res, next) {
  var id = req.params.id;
  db.none('update public.player set player_id= $0,player_name= $1,player_surname= $2,country= $3,cid= $4} where player_id=$1', [parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated player'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deleteplayer(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('delete from public.player where player_id = $1', [id])
    .then(function (result) {

      res.status(200)
        .json({
          status: 'success',
          message: 'Removed player_id'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function selectSingletype(req, res) {
  var id = req.params.id;
  db.any('SELECT type_id,type_name FROM public.type where type_id = $1;', [id])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one type'
        });
    })
    .catch(function (err) {
      //return next(err);
    })
    .finally(function () {
      pgp.end();
    });
}

function selectManytype(req, res) {
  db.any('SELECT type_id,type_name FROM public.type;')
    .then(function (data) {
      //console.log(data);
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL type'
        });
    })
    .catch(function (err) {
      //return next(err);
    })
    .finally(function () {
      pgp.end();
    });
}

function createtype(req, res, next) {
  db.none('insert into share(type_id,type_name) values (${type_id},${type_name})', req.query)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one type'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatetype(req, res, next) {
  var id = req.params.id;
  db.none('update public.type set type_id= $0,type_name= $1} where type_id=$1', [parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated type'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deletetype(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('delete from public.type where type_id = $1', [id])
    .then(function (result) {

      res.status(200)
        .json({
          status: 'success',
          message: 'Removed type_id'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  selectAll: selectAll,
  selectStatsByType: selectStatsByType,
  selectSinglebatting: selectSinglebatting,
  selectManybatting: selectManybatting,
  createbatting: createbatting,
  updatebatting: updatebatting,
  deletebatting: deletebatting,
  selectSinglebowling: selectSinglebowling,
  selectManybowling: selectManybowling,
  createbowling: createbowling,
  updatebowling: updatebowling,
  deletebowling: deletebowling,
  selectSingleplayer: selectSingleplayer,
  selectManyplayer: selectManyplayer,
  createplayer: createplayer,
  updateplayer: updateplayer,
  deleteplayer: deleteplayer,
  selectSingletype: selectSingletype,
  selectManytype: selectManytype,
  createtype: createtype,
  updatetype: updatetype,
  deletetype: deletetype,

}