/**
 * Created by thonatos on 15/6/12.
 */

var init = function () {

    var _protected = {};
    var blogTimeLine = {};

    // For timeline items(DOM) & mood items(Json);

    var currentPage = 1,
        pageCount = 1;

    var $cleanItem = $('.item');
    var $queryNextBtn = $('.query-next');
    var $queryPrevBtn = $('.query-prev');

    // Protected Functions

    _protected.queryMood = function(cPage,callback){

        $.get('/api/moods/gets/'+cPage,function(data) {

            if(data && data.code === 200){

                //console.log(data);

                callback(data.data);

            }else{
                console.log('err');
            }
        });
    };

    _protected.initTimeline = function () {

        var timeline = require('../utils/timeline');

        blogTimeLine = timeline('.timeline',{
            item   : '.item',
            margin : 60, //左右之间的间距
            top    : 20 ,  //距离上一个item的间距
            minTop : 10,  //如在手机下显示，可以将上下间距适当缩小
            resize : true, //监听窗口变化
            minScreen : 640 //当窗口小于640时，单列显示
        });

        blogTimeLine.render();
    };

    // Call Protected Methods;

    _protected.initTimeline();

    _protected.render = function (data) {

        currentPage = data.currentPage;
        pageCount = data.pageCount;
        var showNextBtn = pageCount > currentPage;
        var showPrevBtn = currentPage > 1;

        if(showNextBtn){
            // show nextPage btn;
            $queryNextBtn.show();

        }else{
            // hide nextPage btn;
            $queryNextBtn.hide();
        }
        
        if(showPrevBtn){
            // show prevPage btn;
            $queryPrevBtn.show();

        }else{
            // hide prevPage btn;
            $queryPrevBtn.hide();
        }        
                
        if(currentPage === 1){
            $('.item').remove();
        }
        
        $('.timeline').html('');
        
        var _moods = data.moods;

        for (var i = _moods.length - 1; i >= 0; i--) {
            var _mood = _moods[i];

            var _tMood = $cleanItem.clone();
            
            $(_tMood).find('.card-content').html(_mood.content);
            $(_tMood).find('.card-action').html(_mood.datetime);            

            $('.timeline').append(_tMood);

            //blogTimeLine.render();
            _protected.initTimeline();
        }
    };

    _protected.queryMood(currentPage, _protected.render);

    $queryNextBtn.click(function(e){
        e.preventDefault();

        if(pageCount > currentPage){
            _protected.queryMood(parseInt(currentPage+1),_protected.render);
        }else{
            alert('No more to load...');
        }

    });
    
    $queryPrevBtn.click(function(e){
        e.preventDefault();

        if(currentPage > 1){
            _protected.queryMood(parseInt(currentPage-1),_protected.render);
        }else{
            alert('No Prev to load...');
        }        
    });

};

init();