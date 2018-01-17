'use strict'
var request = require('request');
var cheerio = require('cheerio');
var utils = require('../utilities/utils');
var async = require('async');

let match = {};
function fetchPlayers(url) {
var q = async.queue(function (task, done) {
    var r = request.defaults();

    r(url, function (error, response, html) {
        // First we'll check to make sure no errors occurred when making the request

        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
        var $ = cheerio.load(html);
console.log($);
        //GET PLAYER NAME AND COUNTRY     
        match.player = {};
        match.player.name = $('.ciPlayernametxt').children().children('h1').text().trim();
        match.player.country = $('.ciPlayernametxt').children().children('h3').text().trim();
        match.player.urlId = url.substring(url.length, url.indexOf('player/') + 7).slice(0, -5);

        //BATTING STATISTICS
        $("table:nth-child(4)").filter(function () {
            var data = $(this);
            match.batting = [];

            for (var i = 1; i < data.children().children().length; i++) {
                let batinn = {};
                if (data.children().text().indexOf('BF') === -1 && data.children().text().indexOf('SR') === -1) {
                    batinn.battype = utils.returnDefault(data.children().children().eq(i).children().eq(0).text());
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

                } else if (data.children().text().indexOf('BF') === -1 && data.children().text().indexOf('SR') === -1 && data.children().text().indexOf('6s') === -1) {
                    batinn.battype = utils.returnDefault(data.children().children().eq(i).children().eq(0).text());
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

                } else if (data.children().text().indexOf('6s') === -1) {
                    batinn.battype = utils.returnDefault(data.children().children().eq(i).children().eq(0).text());
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
                else {
                    batinn.battype = utils.returnDefault(data.children().children().eq(i).children().eq(0).text());
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
        $("table:nth-child(6)").filter(function () {

            var data = $(this);
            //console.log('bowling');
            match.bowling = [];

            for (var i = 1; i < data.children().children().length; i++) {
                let inn = {}
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
        done();
    })
    }, 5);
}

module.exports = { fetchPlayers: fetchPlayers };