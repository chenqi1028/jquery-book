(function(){
    var Util = (function(){
        var prefix= 'html5_reader_';
        var storageGetter = function(key){
            return localStorage.getItem(prefix + key);
        }
        var storageSetter = function(key,val){
            return localStorage.setItem(prefix + key,val);
        }
        // var getBSONP = function(url,callback){
        //     return $.jsonp({
        //         url : url,
        //         cache:true,
        //         callback:"duokan_fiction_chapter",
        //         success : function(result){
        //             var data = $.base64.decode(result);
        //             var json = decodeURIComponent(escape(data));
        //             callback(data);
        //         }
        //     })
        // }
        return{
            storageGetter:storageGetter,
            storageSetter:storageSetter,
            // getBSONP : getBSONP
        }
    })();



    var Dom = {
        top_nav:$('#top-nav'),
        bottom_nav:$('.bottom-nav'),
        font_container:$('.font-container')
    }

    var Win = $(window);
    var Doc = $(document);
    var rootContainer = $('#fiction_container');
    //存储字体
    var initFontSize = Util.storageGetter('font-size');
    initFontSize = parseInt(initFontSize);
    if(!initFontSize){
        initFontSize = 16;
    }
    rootContainer.css('font-size',initFontSize);
    //存储背景色
    var initBk = Util.storageGetter('background-color');
    if(!initBk){
        initBk = '#c4b395';
    }

    $('body').css('background-color',initBk);

    function main(){
        //todo 整个项目的入口函数
        EventHanlder();
    }

    // function ReaderModel(){
    //     //todo 实现和阅读器相关的数据交互的方法
    //     var Chapter_id;
    //     var init = function(){
    //         getFictionInfo(function(){
    //             getCurChapterContent(Chapter_id,function(){
    //                 //todo 
    //             });
    //         })
    //     }
    //     var getFictionInfo = function(callback){
    //         $.get('data/chapter.json',function(){
    //             //todo 获得章节信息之后的回调
    //             Chapter_id = data.chapters[1].chapter_id;
    //             callback && callback();
    //         },'json');
    //     }
    //     var fetCurChapterContent = function(chapter_id,data){
    //         $.get('data/data' + chapter_id + '.json',function(data){
    //             if(data.result == 0){
    //                 var url = data.jsonp;
    //                 Util.getBSONP(url , function(data){
    //                     callback && callback(data);
    //                 });
    //             }
    //         },'json')
    //     }
    //     return{
    //         init : init
    //     }
    // }

    function ReaderBaseFrame(){
        //todo 渲染基本的UI结构
    }
    
    function EventHanlder(){
        //todo 交互的事件绑定
        $('#action-mid').click(function(){
            if(Dom.top_nav.css('display') == 'none'){
                Dom.top_nav.show();
                Dom.bottom_nav.show();
            }else {
                Dom.top_nav.hide();
                Dom.bottom_nav.hide();
                Dom.font_container.hide();
                $('#p_font').attr('fill','#e6e6e6');
            }
        });


        $('.font-button').click(function(){
            if(Dom.font_container.css('display') == 'none'){
                Dom.font_container.show();
                $('#p_font').attr('fill','#ff7800');
            }else {
                Dom.font_container.hide();
                $('#p_font').attr('fill','#e6e6e6');
            }
        });

        //todo 触发夜间模式切换的事件
        var flag = 1;
        $('.night-button').click(function(){
            if(flag == 1){
                $('body').css('background-color','#222');
                rootContainer.css('color','#8c8c8c');
                $('#p_night').attr('fill','#ff7800');
                flag++;
            }else{
                $('body').css('background-color','#c4b395');
                rootContainer.css('color','#222');
                $('#p_night').attr('fill','#e6e6e6');
                flag--;
            }
        });
        //滚动隐藏边栏
        Win.scroll(function(){
            Dom.top_nav.hide();
            Dom.bottom_nav.hide();
            Dom.font_container.hide();
            $('#p_font').attr('fill','#e6e6e6');
        });

        //todo 触发背景切换的事件
        $('.bk1').click(function(){
            initBk = '#c4b395';
            $('body').css('background-color',initBk);
            //存储背景色
            Util.storageSetter('background-color',initBk);
        });

        $('.bk2').click(function(){
            initBk = '#c3d4e6';
            $('body').css('background-color',initBk);
            Util.storageSetter('background-color',initBk);
        });

        $('.bk3').click(function(){
            initBk = '#c8e8c8';
            $('body').css('background-color',initBk);
            Util.storageSetter('background-color',initBk);
        });

        $('.bk4').click(function(){
            initBk = '#fff';
            $('body').css('background-color',initBk);
            Util.storageSetter('background-color',initBk);
        });

        $('#large-font').click(function(){
            //tode 放大字体
            if(initFontSize > 20){
                return;
            }
            initFontSize +=1;
            rootContainer.css('font-size',initFontSize);
            Util.storageSetter('font-size',initFontSize);
        });
        $('#small-font').click(function(){
            //todo 缩小字体
            if(initFontSize < 13){
                return;
            }
            initFontSize -=1;
            rootContainer.css('font-size',initFontSize);
            Util.storageSetter('font-size',initFontSize);
        });               
        // 文章目录
        $('.list-button').click(function(){
            $('html').css('overflow-y','hidden');
            $('.nav-show').animate({right:'+=80%'}); //菜单块向左移动
            $('#side_close').show();
        });

        $('#side_close').click(function(){
            $('html').css('overflow-y','auto');
            $('.nav-show').animate({right:'-=80%'});//菜单块向右移动
            $('#side_close').hide();
        });
        // Ajax加载小说内容
        var arrItems = [];
        var items = $('.items');
        for(var i = 0;i < items.length;i++){
            arrItems.push(items[i].getAttribute('name'));
        };
        //首次加载
        var indexN = Util.storageGetter('indexN');
        if(!indexN){
            indexN=0;
        }
        var name = arrItems[indexN];
        $('#fiction_container').attr("name",name);
        name = "bookData\\"+name+".html";
        $('#fiction_container').load(name);
        $(items[indexN]).css('color','red');
        //批量添加点击事件
        for(var i = 0;i < items.length;i++){
            (function(i){
                items[i].onclick=function(){
                    //隐藏
                    $('#fiction_container').html("");
                    Dom.top_nav.hide();
                    Dom.bottom_nav.hide();
                    Dom.font_container.hide();
                    $('html').css('overflow-y','auto');
                    $('.nav-show').animate({right:'-=80%'});//菜单块向右移动
                    $('#side_close').hide();
                    //ajax加载
                    var name = arrItems[i];
                    $('.items').css('color','black');
                    $(items[i]).css('color','red');
                    $('#fiction_container').attr("name",name);
                    name = "bookData\\"+name+".html";
                    $('#fiction_container').load(name);
                    Util.storageSetter('indexN',i);
                 }
           })(i)
        };
        //下一章 下一章
        $('#next_button').click(function(){
            var Next = $('#fiction_container').attr("name");
            if(Next<10052){
            $('#fiction_container').html("");
            Next = parseInt(Next)+1;
            Next = "00"+Next;
            $('.items').css('color','black');
            $('.items[name="'+Next+'"]').css('color','red');
            NextPage = "bookData\\"+Next+".html";
            $('#fiction_container').load(NextPage);
            Next = $('#fiction_container').attr("name",Next);
            }else{
                $('.nomore').fadeIn(150,function(){
                setTimeout(function(){
                    $('.nomore').fadeOut(350);
                },1200);
                });
            };
        });
        $('#prev_button').click(function(){
            var Next = $('#fiction_container').attr("name");
            if(Next>10001){
            $('#fiction_container').html("");
            Next = parseInt(Next)-1;
            Next = "00"+Next;
            $('.items').css('color','black');
            $('.items[name="'+Next+'"]').css('color','red');
            NextPage = "bookData\\"+Next+".html";
            $('#fiction_container').load(NextPage);
            Next = $('#fiction_container').attr("name",Next);
            }else{
                $('.nomore').fadeIn(150,function(){
                setTimeout(function(){
                    $('.nomore').fadeOut(350);
                },1200);
                });
            };
        });
        // //自动加载
        // function windowHeight(){
        //     return (document.compatMode == "CSS1Compat")?
        //     document.documentElement.clientHeight:
        //     document.body.clientHeight;
        // }
        // //获取页面顶部被卷起来的高度
        // function scrollTop(){
        // return Math.max(
        // //chrome
        // document.body.scrollTop,
        // //firefox/IE
        // document.documentElement.scrollTop);
        // }
        // //获取页面文档的总高度
        // function documentHeight(){
        // //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
        // return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
        // }
        // console.log(documentHeight());
        // $(window).on('scroll',function(){
        // if(scrollTop() + windowHeight() >= (documentHeight() - 50/*滚动响应区域高度取50px*/)){

        // }
        // });
}
    main();
})();