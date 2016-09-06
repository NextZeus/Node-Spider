/**
 * Created by lixiaodong on 16/9/6.
 */
var Crawler = require("crawler");
var jsdom = require('jsdom');

var articles = [];

var c = new Crawler({
    jQuery: jsdom,
    maxConnections : 100,
    forceUTF8:true,
    // incomingEncoding: 'gb2312',
    // This will be called for each crawled page
    callback : function (error, result, $) {
        var urls = $('.itemlist .athing .title a');

        for(var i = 0,j=0; i< urls.length; i+=2,j++){
            var url = urls[i];
            var _url = $(url).attr('href')+"";
            var title = $(url).text();
            articles.push({
                id  :   j + 1,
                title   :   title,
                url :   _url
            });
        }

        for(var i = 1,j=0; i< urls.length; i+=2,j++){
            var url = urls[i];
            var _url = $(url).attr('href')+"";
            if(articles[j]){
                articles[j].from = _url.substring(10);
            }
        }


        var scores = $('.itemlist .subtext .score');
        for(var i = 0 ; i < scores.length; i++){
            var score = $(scores[i]).text();
            articles[i].score = score;
        }
        var hnusers = $('.itemlist .subtext a:eq(0)');
        for(var i = 0 ; i < hnusers.length; i++){
            var user = $(hnusers[i]).text();
            articles[i].username = user;
        }

        var comments = $('.itemlist .subtext a:eq(3)');
        for(var i = 0 ; i < comments.length; i++){
            var comment = $(comments[i]).text();
            articles[i].comment = parseInt(comment) + ' comments';
        }

        var ages = $('.itemlist .age a');
        for(var i = 0 ; i < ages.length; i++){
            var age = $(ages[i]).text();
            articles[i].age = parseInt(age) + ' hours ago';
            var uid = $(ages[i]).attr('href')+'';
            articles[i].uid = uid.substring(8);
        }

        console.log(articles[0]);
    }
});

c.queue('https://news.ycombinator.com/news?p=1');