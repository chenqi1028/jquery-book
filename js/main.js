//nomore
$('.top2,.hb2').click(function(){
    $('.nomore').fadeIn(150,function(){
        setTimeout(function(){
            $('.nomore').fadeOut(350);
        },1200);
    });
});
//轮播图的JS代码
var items = document.getElementsByClassName('item'); //图片
var points = document.getElementsByClassName('point');//点
var goPreBtn = document.getElementById('goPre');
var goNextBtn = document.getElementById('goNext');
var time = 0; //定时器参数

var index = 0; //index 表示第几张图片

var clearActive = function(){
    for(var i=0;i < items.length ; i++){
        items[i].className = 'item';
    }
    for(var i=0;i < points.length ; i++){
        points[i].className = 'point';
    }
}

function goIndex(){
    clearActive();
    items[index].className = 'item active';
    points[index].className = 'point active';
}

var goNext = function(){
    if(index < 4){
        index++;
    }else{
        index = 0;
    }

    goIndex();    
}
var goPre = function(){
    if(index == 0){
        index = 4;
    }else{
        index--;
    }

    goIndex();    
}

goNextBtn.addEventListener('click',function(){
    goNext();
    time = 0;
})
goPreBtn.addEventListener('click',function(){
    goPre();
    time = 0;
})


for(var i = 0;i<points.length;i++){
    points[i].addEventListener('click',function(){
        var pointIndex = this.getAttribute('data-index');
        index = pointIndex;
        goIndex();
        time = 0;
    })
}

setInterval(function(){
    time++;
    if(time == 28){
        goNext();
        time = 0;
    }
},100);

//搜索栏

var list =['全球高手','诡秘之主','凡人修仙之仙界篇','九星毒奶','第一序列'];  //如果项目数据过多，请不要继续使用锚点，数据较少请按照名称手动排序
var len = list.length;

$('.search a').click(function(){
    var arr = [];
    var mao_value = $('#mao_value').val(); 
    var reg = new RegExp('.*' + mao_value + '.*');
    for(var i=0;i<list.length;i++){
        //如果字符串中不包含目标字符会返回-1
        if(list[i].match(reg)){
            arr.push(list[i]);
        }
    } 
    var mao = "#"+arr[0];
    $('.search a').attr('href',mao);
});
//轮播导航栏

//导航栏
$(document).ready(function(){
    $('#list').click(function(){
            $('html').css('overflow-y','hidden');
            $('#side_open').animate({right:'+=80%'}); //菜单块向左移动
            $('#side_close').show();
            $('.nav-show-list').fadeIn();
    });
    $('#cv').click(function(){
            $('html').css('overflow-y','hidden');
            $('#side_open').animate({right:'+=80%'}); //菜单块向左移动
            $('#side_close').show();
            $('.nav-show-cv').fadeIn();
    });
    $('#findJob').click(function(){
            $('html').css('overflow-y','hidden');
            $('#side_open').animate({right:'+=80%'}); //菜单块向左移动
            $('#side_close').show();
            $('.nav-show-findjob').fadeIn();
    });
    $('#side_close').click(function(){
        $('html').css('overflow-y','auto');
        $('#side_open').animate({right:'-=80%'});//菜单块向右移动
        $('#side_close').hide();
        $('.nav-show-list').fadeOut();
        $('.nav-show-cv').fadeOut();
        $('.nav-show-findjob').fadeOut();
    })
});

// 添加跳转
onclick="window.open('index.html','_self')"
$('.rollNav .navItem').click(function(){
    window.open('reader.html','_self');
})
$('.book').click(function(){
    window.open('reader.html','_self');
})

//json加载小说数据
$.ajax({
    url:"json\\bookmodel.json",
    type:"get",
    datatype:"json",
    success: function(data){
        for(var i=0;i<5;i++){
            $(".book"+i+" img").attr("src",data.books[i].img);
            $(".book"+i+" .book-title").html(data.books[i].name);
            $(".book"+i+" .book-content").html(data.books[i].content);
            $(".book"+i+" .book-writer").html(data.books[i].writer);
            $(".book"+i+" .bn1 span").html(data.books[i].bn1);
            $(".book"+i+" .bn2 span").html(data.books[i].bn2);
            $(".book"+i+" .bn3 span").html(data.books[i].bn3);
        }
    }
})

