'use strict'
var express = require('express');
var router = express.Router();

var fs = require('fs');
var http = require('http');
var cheerio = require('cheerio');
var pg = require('pg');
var request = require("request");
var async = require('async');

var fetch = require('../server/fetch');
var utils = require('../utilities/utils');

let saveData = [];

var startId = 3950;
var endId = 4000;

var url;

var insertPlayerOutput = '';
var insertBattingOutput = '';
var insertBowlingOutput = '';

router.get('/load', function(req,res,next){
  
      var outputdata = [];

      var q = async.queue(function (task, done) {
        request(task.url, function (err, res, body) {
          if (err) return done(err);
          if (res.statusCode != 200) return done(res.statusCode);

          let match = {}
          var $ = cheerio.load(body);

          match.player = {};
          match.player.name = $('.ciPlayernametxt').children().children('h1').text().trim();
          match.player.country = $('.ciPlayernametxt').children().children('h3').text().trim();
          match.player.urlId = task.url.substring(task.url.length, task.url.indexOf('player/') + 7).slice(0, -5);

          //BATTING STATISTICS
          $("table:nth-child(5)").filter(function () {
            var data = $(this);

            match.batting = [];

            for (var i = 1; i < data.children().children().length; i++) {
              let batinn = {};
              
              if (data.children().text().indexOf('BF') === -1 && data.children().text().indexOf('SR') === -1 && data.children().text().indexOf('4s') === -1 && data.children().text().indexOf('6s') > -1) {
                batinn.battype = utils.returnDefault(data.children().children().eq(i).children().first().text());
                batinn.batmatches = utils.returnDefault(data.children().children().eq(i).children().eq(1).text());
                batinn.batinnings = utils.returnDefault(data.children().children().eq(i).children().eq(2).text());
                batinn.batno = utils.returnDefault(data.children().children().eq(i).children().eq(3).text());
                batinn.batruns = utils.returnDefault(data.children().children().eq(i).children().eq(4).text());
                batinn.baths = utils.returnDefault(data.children().children().eq(i).children().eq(5).text());
                batinn.batave = utils.returnDefault(data.children().children().eq(i).children().eq(6).text());
                batinn.batbf = null;
                batinn.batsr = null;
                batinn.bathundreds = utils.returnDefault(data.children().children().eq(i).children().eq(7).text());
                batinn.batfifties = utils.returnDefault(data.children().children().eq(i).children().eq(8).text());
                batinn.batfours = null;
                //console.log('Test: ' + data.children().children().eq(i).children().eq(9).text().length);
                batinn.batsixes = utils.returnDefault(data.children().children().eq(i).children().eq(9).text());
                batinn.batcatches = utils.returnDefault(data.children().children().eq(i).children().eq(10).text());
                batinn.batstumpings = utils.returnDefault(data.children().children().eq(i).children().eq(11).text());
                
                //console.log(batinn);

              } else if (data.children().text().indexOf('BF') === -1 && data.children().text().indexOf('SR') === -1 && data.children().text().indexOf('4s') === -1 && data.children().text().indexOf('6s') === -1) {
                batinn.battype = utils.returnDefault(data.children().children().eq(i).children().first().text());
                batinn.batmatches = utils.returnDefault(data.children().children().eq(i).children().eq(1).text());
                batinn.batinnings = utils.returnDefault(data.children().children().eq(i).children().eq(2).text());
                batinn.batno = utils.returnDefault(data.children().children().eq(i).children().eq(3).text());
                batinn.batruns = utils.returnDefault(data.children().children().eq(i).children().eq(4).text());
                batinn.baths = utils.returnDefault(data.children().children().eq(i).children().eq(5).text());
                batinn.batave = utils.returnDefault(data.children().children().eq(i).children().eq(6).text());
                batinn.batbf = null;
                batinn.batsr = null;
                batinn.bathundreds = utils.returnDefault(data.children().children().eq(i).children().eq(7).text());
                batinn.batfifties = utils.returnDefault(data.children().children().eq(i).children().eq(8).text());
                batinn.batfours = null;
                batinn.batsixes = null;
                batinn.batcatches = utils.returnDefault(data.children().children().eq(i).children().eq(9).text());
                batinn.batstumpings = utils.returnDefault(data.children().children().eq(i).children().eq(10).text());
                //console.log(batinn);

              }  else if (data.children().text().indexOf('BF') === -1 && data.children().text().indexOf('SR') === -1) {
                batinn.battype = utils.returnDefault(data.children().children().eq(i).children().first().text());
                batinn.batmatches = utils.returnDefault(data.children().children().eq(i).children().eq(1).text());
                batinn.batinnings = utils.returnDefault(data.children().children().eq(i).children().eq(2).text());
                batinn.batno = utils.returnDefault(data.children().children().eq(i).children().eq(3).text());
                batinn.batruns = utils.returnDefault(data.children().children().eq(i).children().eq(4).text());
                batinn.baths = utils.returnDefault(data.children().children().eq(i).children().eq(5).text());
                batinn.batave = utils.returnDefault(data.children().children().eq(i).children().eq(6).text());
                batinn.batbf = null;
                batinn.batsr = null;
                batinn.bathundreds = utils.returnDefault(data.children().children().eq(i).children().eq(7).text());
                batinn.batfifties = utils.returnDefault(data.children().children().eq(i).children().eq(8).text());
                batinn.batfours = utils.returnDefault(data.children().children().eq(i).children().eq(9).text());
                batinn.batsixes = utils.returnDefault(data.children().children().eq(i).children().eq(10).text());
                batinn.batcatches = utils.returnDefault(data.children().children().eq(i).children().eq(11).text());
                batinn.batstumpings = utils.returnDefault(data.children().children().eq(i).children().eq(12).text());
                //console.log(batinn);

              }
              else if (data.children().text().indexOf('6s') === -1) {
                batinn.battype = utils.returnDefault(data.children().children().eq(i).children().first().text());
                batinn.batmatches = utils.returnDefault(data.children().children().eq(i).children().eq(1).text());
                batinn.batinnings = utils.returnDefault(data.children().children().eq(i).children().eq(2).text());
                batinn.batno = utils.returnDefault(data.children().children().eq(i).children().eq(3).text());
                batinn.batruns = utils.returnDefault(data.children().children().eq(i).children().eq(4).text());
                batinn.baths = utils.returnDefault(data.children().children().eq(i).children().eq(5).text());
                batinn.batave = utils.returnDefault(data.children().children().eq(i).children().eq(6).text());
                batinn.batbf = utils.returnDefault(data.children().children().eq(i).children().eq(7).text());
                batinn.batsr = utils.returnDefault(data.children().children().eq(i).children().eq(8).text());
                batinn.bathundreds = utils.returnDefault(data.children().children().eq(i).children().eq(9).text());
                batinn.batfifties = utils.returnDefault(data.children().children().eq(i).children().eq(10).text());
                batinn.batfours = utils.returnDefault(data.children().children().eq(i).children().eq(11).text());
                batinn.batsixes = null;
                batinn.batcatches = utils.returnDefault(data.children().children().eq(i).children().eq(12).text());
                batinn.batstumpings = utils.returnDefault(data.children().children().eq(i).children().eq(13).text());
                //console.log(batinn);
              }
              else {
                batinn.battype = utils.returnDefault(data.children().children().eq(i).children().first().text());
                batinn.batmatches = utils.returnDefault(data.children().children().eq(i).children().eq(1).text());
                batinn.batinnings = utils.returnDefault(data.children().children().eq(i).children().eq(2).text());
                batinn.batno = utils.returnDefault(data.children().children().eq(i).children().eq(3).text());
                batinn.batruns = utils.returnDefault(data.children().children().eq(i).children().eq(4).text());
                batinn.baths = utils.returnDefault(data.children().children().eq(i).children().eq(5).text());
                batinn.batave = utils.returnDefault(data.children().children().eq(i).children().eq(6).text());
                batinn.batbf = utils.returnDefault(data.children().children().eq(i).children().eq(7).text());
                batinn.batsr = utils.returnDefault(data.children().children().eq(i).children().eq(8).text());
                batinn.bathundreds = utils.returnDefault(data.children().children().eq(i).children().eq(9).text());
                batinn.batfifties = utils.returnDefault(data.children().children().eq(i).children().eq(10).text());
                batinn.batfours = utils.returnDefault(data.children().children().eq(i).children().eq(11).text());
                batinn.batsixes = utils.returnDefault(data.children().children().eq(i).children().eq(12).text());
                batinn.batcatches = utils.returnDefault(data.children().children().eq(i).children().eq(13).text());
                batinn.batstumpings = utils.returnDefault(data.children().children().eq(i).children().eq(14).text());
                //console.log(batinn);

              }
              match.batting.push(batinn);
            }

          })

          //BOWLING STATISTICS
          $("table:nth-child(7)").filter(function () {

            var data = $(this);
            match.bowling = [];

            for (var i = 1; i < data.children().children().length; i++) {
              let inn = {}
              //console.log(data.children().text());
              if (data.children().text().indexOf('BBM') === -1) {
                inn.bowltype = utils.returnDefault(data.children().children().eq(i).children().first().text());
                inn.bowlmatches = utils.returnDefault(data.children().children().eq(i).children().eq(1).text());
                inn.bowlinnings = utils.returnDefault(data.children().children().eq(i).children().eq(2).text());
                inn.bowlballs = utils.returnDefault(data.children().children().eq(i).children().eq(3).text());
                inn.bowlruns = utils.returnDefault(data.children().children().eq(i).children().eq(4).text());
                inn.bowlwickets = utils.returnDefault(data.children().children().eq(i).children().eq(5).text());
                inn.bowlbbi = utils.returnDefault(data.children().children().eq(i).children().eq(6).text());
                inn.bowlbbm = '';
                inn.bowlave = utils.returnDefault(data.children().children().eq(i).children().eq(7).text());
                inn.bowlecon = utils.returnDefault(data.children().children().eq(i).children().eq(8).text());
                inn.bowlsr = utils.returnDefault(data.children().children().eq(i).children().eq(9).text());
                inn.bowlfour = utils.returnDefault(data.children().children().eq(i).children().eq(10).text());
                inn.bowlfive = utils.returnDefault(data.children().children().eq(i).children().eq(11).text());
                inn.bowlten = utils.returnDefault(data.children().children().eq(i).children().eq(12).text());
              }
              else if (data.children().text().indexOf('BBM') === -1
                && data.children().text().indexOf('Balls') === -1
                && data.children().text().indexOf('Inns') === -1
                && data.children().text().indexOf('SR') === -1
                && data.children().text().indexOf('Econ') === -1
                && data.children().text().indexOf('4w') === -1) {
                //console.log('In');
                inn.bowltype = utils.returnDefault(data.children().children().eq(i).children().first().text());
                inn.bowlmatches = utils.returnDefault(data.children().children().eq(i).children().eq(1).text());
                inn.bowlinnings = 0;
                inn.bowlballs = 0;
                inn.bowlruns = utils.returnDefault(data.children().children().eq(i).children().eq(2).text());
                inn.bowlwickets = utils.returnDefault(data.children().children().eq(i).children().eq(3).text());
                inn.bowlbbi = utils.returnDefault(data.children().children().eq(i).children().eq(4).text());
                inn.bowlbbm = '';
                inn.bowlave = utils.returnDefault(data.children().children().eq(i).children().eq(5).text());
                inn.bowlecon = 0
                inn.bowlsr = 0;
                inn.bowlfour = 0;
                inn.bowlfive = utils.returnDefault(data.children().children().eq(i).children().eq(6).text());
                inn.bowlten = utils.returnDefault(data.children().children().eq(i).children().eq(7).text());
              }
              else if (data.children().text().indexOf('Inns') === -1) {
                inn.bowltype = utils.returnDefault(data.children().children().eq(i).children().first().text());
                inn.bowlmatches = utils.returnDefault(data.children().children().eq(i).children().eq(1).text());
                inn.bowlinnings = 0;
                inn.bowlballs = utils.returnDefault(data.children().children().eq(i).children().eq(2).text());
                inn.bowlruns = utils.returnDefault(data.children().children().eq(i).children().eq(3).text());
                inn.bowlwickets = utils.returnDefault(data.children().children().eq(i).children().eq(4).text());
                inn.bowlbbi = utils.returnDefault(data.children().children().eq(i).children().eq(5).text());
                inn.bowlbbm = utils.returnDefault(data.children().children().eq(i).children().eq(6).text());
                inn.bowlave = utils.returnDefault(data.children().children().eq(i).children().eq(7).text());
                inn.bowlecon = utils.returnDefault(data.children().children().eq(i).children().eq(8).text());
                inn.bowlsr = utils.returnDefault(data.children().children().eq(i).children().eq(9).text());
                inn.bowlfour = utils.returnDefault(data.children().children().eq(i).children().eq(10).text());
                inn.bowlfive = utils.returnDefault(data.children().children().eq(i).children().eq(11).text());
                inn.bowlten = utils.returnDefault(data.children().children().eq(i).children().eq(12).text());
              }
              else {
                inn.bowltype = utils.returnDefault(data.children().children().eq(i).children().first().text());
                inn.bowlmatches = utils.returnDefault(data.children().children().eq(i).children().eq(1).text());
                inn.bowlinnings = utils.returnDefault(data.children().children().eq(i).children().eq(2).text());
                inn.bowlballs = utils.returnDefault(data.children().children().eq(i).children().eq(3).text());
                inn.bowlruns = utils.returnDefault(data.children().children().eq(i).children().eq(4).text());
                inn.bowlwickets = utils.returnDefault(data.children().children().eq(i).children().eq(5).text());
                inn.bowlbbi = utils.returnDefault(data.children().children().eq(i).children().eq(6).text());
                inn.bowlbbm = utils.returnDefault(data.children().children().eq(i).children().eq(7).text());
                inn.bowlave = utils.returnDefault(data.children().children().eq(i).children().eq(8).text());
                inn.bowlecon = utils.returnDefault(data.children().children().eq(i).children().eq(9).text());
                inn.bowlsr = utils.returnDefault(data.children().children().eq(i).children().eq(10).text());
                inn.bowlfour = utils.returnDefault(data.children().children().eq(i).children().eq(11).text());
                inn.bowlfive = utils.returnDefault(data.children().children().eq(i).children().eq(12).text());
                inn.bowlten = utils.returnDefault(data.children().children().eq(i).children().eq(13).text());

              }
              match.bowling.push(inn);
            }
          })
          saveData.push(match);
          console.log(match.player.urlId);
          done();
        });
      }, 5);

      q.drain = function () {
        res.send('Done');
        insertData(saveData);
        console.log('all items have been processed');
      }

      for (var p = startId; p < endId+1; p++) {
        q.push({ url: 'http://www.espncricinfo.com/ci/content/player/' + p + '.html' });
      } 
});


function insertData(object) {

  var playerId = 1;
  object.forEach(function (item) {
    //console.log(item);
    var fullname = item.player.name.split(' ');
    insertPlayerOutput += '(' + playerId + ',\'' + fullname[0] + '\',\'' + fullname[1] + '\',\'' + item.player.country + '\',' + item.player.urlId + '),';
    //console.log(insertPlayerOutput);
    if (item.batting.length > 0) {
      //console.log(item.batting);
      item.batting.forEach(function (bat) {
        //console.log(bat.baths.indexOf('*'))
        var highscore = bat.baths.indexOf('*') > -1 ? bat.baths.slice(0, -1) : bat.baths;
        var hsnotout = bat.baths.indexOf('*') > -1 ? 1 : 0;
        insertBattingOutput += '(' + playerId + ',' + utils.getType(bat.battype) + ',' + bat.batmatches + ',' + bat.batinnings + ',' + bat.batno + ',' + bat.batruns + ',' + highscore + ',' + hsnotout + ',' + bat.batave + ',' + bat.batbf + ',' + bat.batsr + ',' + bat.bathundreds + ',' + bat.batfifties + ',' + bat.batfours + ',' + bat.batsixes + ',' + bat.batcatches + ',' + bat.batstumpings + '),';
      });
    }

    if (item.bowling.length > 0) {
      item.bowling.forEach(function (bowl) {
        insertBowlingOutput += '(' + playerId + ',' + utils.getType(bowl.bowltype) + ',' + bowl.bowlmatches + ',' + bowl.bowlinnings + ',' + bowl.bowlballs + ',' + bowl.bowlruns + ',' + bowl.bowlwickets + ',\'' + bowl.bowlbbi + '\',\'' + bowl.bowlbbm + '\',' + bowl.bowlave + ',' + bowl.bowlecon + ',' + bowl.bowlsr + ',' + bowl.bowlfour + ',' + bowl.bowlfive + ',' + bowl.bowlten + '),';
      });
    }

    playerId++;
  });

  var insertPlayer = 'INSERT INTO public.player(player_id, player_name,player_surname, country, cid) VALUES ';
  var insertBatting = 'INSERT INTO public.batting(player_id, type_id, matches, innings, no, runs, hs, hsnotout, average, ballsfaced, strikerate, hundres, fifties, fours, sixes, catches, stumpings) VALUES ';
  var insertBowling = 'INSERT INTO public.bowling(player_id, type_id, matches, innings, balls, runs, wickers, bbi, bbm, average, economy, strikerate, four, five, ten) VALUES ';


  var conString = 'postgres://postgres:root@localhost:5432/firstclass'; //Establish database connection - //TODO: Need to be refactored! pass to config file
  var client = new pg.Client(conString);
  client.connect();

  var rollback = function (client) {
    //terminating a client connection will
    //automatically rollback any uncommitted transactions
    //so while it's not technically mandatory to call
    //ROLLBACK it is cleaner and more correct
    client.query('ROLLBACK', function () {
      client.end();
    });
  }

  client.query('BEGIN', function (err, result) {
    if (err) return rollback(client);
    client.query('delete from public.player;delete from public.batting; delete from public.bowling;', function (err, result) {
      if (err) return rollback(client);
      client.query(insertPlayer + insertPlayerOutput.slice(0, -1).trim() + ';', function (err, result) {
        //console.log(result);
        if (err) return rollback(client);
        client.query(insertBatting + insertBattingOutput.slice(0, -1).trim() + ';', function (err, result) {
          if (err) return rollback(client);
          client.query(insertBowling + insertBowlingOutput.slice(0, -1).trim() + ';', function (err, result) {
            if (err) return rollback(client);
            //disconnect after successful commit
            client.query('COMMIT', client.end.bind(client));
            //console.log(444);
          });
        });
      });
    });

    //console.log(insertPlayer + '' + insertPlayerOutput.slice(0, -1).trim());
    //console.log(insertBatting + '' + insertBattingOutput.slice(0, -1).trim());
    //console.log(insertBowling + '' + insertBowlingOutput.slice(0, -1).trim());
  })
}


 module.exports = router;   