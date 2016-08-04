/**
 * Created by lixiaodong on 16/8/4.
 */
var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');

var userId = 'ixncm9wj4d';

var BASE_URI = 'http://huaban.com/'+userId+'/';


function fetchData(userId, next){
    var classes = [];//类别

    async.waterfall([
        function (cb) {
            fetchClassData()
        }
    ], function (err) {
        
    });
}

function fetchClassData (next){
    var classes = [];
    console.log('BASE_URI=====>>>',BASE_URI);
    superagent.get(BASE_URI).end(function (err, sres) {
        // 常规的错误处理
        if (err) {
            return next(err);
        }

        // 提取作者博客链接，注意去重
        var $ = cheerio.load(sres.text);
        console.log('$$$$$$$0------>>',sres.text);
        //var array = sres.text.split('app');
        //console.log('array---->>>>>>>>>>>',array);
        $(".Board").each(function (i, e) {
            var classId = $('.inited', e).attr('data-id');
            var largeImg = $(".inited>a>img" , e).eq(0).src;
            var smallImg0 = $(".inited>a>img" , e).eq(1).src;
            var smallImg1 = $(".inited>a>img" , e).eq(2).src;
            var smallImg2 = $(".inited>a>img" , e).eq(3).src;
            var name = $(".over>h3" , e).text();
            var pinCount = $(".over>.pin-count" , e).text();
            var obj = {
                classId     :   classId,
                largeImg    :   largeImg,
                smallImg0   :   smallImg0,
                smallImg1   :   smallImg1,
                smallImg2   :   smallImg2,
                name        :   name,
                count       :   pinCount
            };
            console.log(obj);
            classes.push(obj);
        });
        console.log('get classes successful!\n', classes);
        next(null,classes);
    });
}

fetchClassData(function (err,data) {
    console.log(err,data);
})