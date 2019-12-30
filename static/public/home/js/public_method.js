$(function(){
    //判断打开设备，是否跳转移动端
    if(/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){ 
        window.location.href="<{U m=wap c=main a=index}>";
    }

    //底部点击回到顶部
    $(window).scroll(function(){
        if($(window).scrollTop()>=500){
            $('.to_up').css('display','block');
            $('.to_up').click(function(){
                $(window).scrollTop(0);
            });
        }else{
            $('.to_up').css('display','none');
        }                       
    })
    
    //banner幻灯片
    int();
    var loop = setInterval(function(){
        change();
    },5000);
    $('.banner_footer_list>li').mouseover(function(){
        clearInterval(loop);
        $(this).addClass('active').siblings().removeClass('active');
        var index = $(this).index();
        $('.banner_list>li').eq(index).addClass('active').siblings().removeClass('active');
    })
    $('.banner_footer_list>li').mouseout(function(){
        loop = setInterval(function(){
            change();
        },5000);
    })  

    //header部分Hover事件
    $('.header_nav>li').mouseover(function(){
        $('.header_down').css('display','block');
        // $('.header_down').css('padding-bottom',30);
        var index = $(this).index();
        $('.header_nav_two>li').eq(index).addClass('active').siblings().removeClass('active');
    })
    $('.header_nav>li').mouseleave(function(){
        $('.header_down').css('display','none');
    })
    $('.header_down').mouseover(function(){
        $(this).css('display','block');
    })
    $('.header_down').mouseout(function(){
        $(this).css('display','none');
    })

    //footer部分Hover事件
    $('.footer_up_right_button').mouseover(function(){
        $(this).css('display','none');
        $(this).next('.footer_up_right_img').css('display','block');
    })
    $('.footer_up_right_img').mouseleave(function(){
        $(this).css('display','none');
        $(this).prev('.footer_up_right_button').css('display','block');
    })


    //视频播放遮罩层点击
    $('.work_five_down_cover').click(function(){
        var video_url=$(this).attr('data-url');
        var content='<div style="height:534px;width:800px;position: absolute;top:50%;left:50%;margin-left:-400px;margin-top:-267px;">';
            content+='<video style="width:100%;height:100%;background: #000;" class="current_video" src="'+video_url+'" poster="" controls="controls">您的浏览器不支持 video 标签。</video>';
            content+='</div>';
        $('body').append('<div class="fullbg">'+content+'<i class="fa fa-close cover_close" aria-hidden="true"></i></div>');
    })

    //关闭视频屏蔽罩
    $('body').on('click','.cover_close',function(){
        $('.fullbg').remove();
    })
})

//banner幻灯片初始化
function int(){
    var size = $('.banner_list>li').size();
    var i = 0;
    while(i<size){
        $('.banner_footer_list').append('<li></li>');
        i++;
    }
    $('.banner_list>li:first-child').addClass('active');
    $('.banner_footer_list>li:first-child').addClass('active');
    var footer_width = $('.banner_footer_list').width();
    $('.banner_footer_list').css('margin-left',-footer_width/2);
}
function change(){
    var index = $('.banner_list>li.active').index();
    var size = $('.banner_list>li').size();
    if(index<size-1){
        $('.banner_list>li.active').next().addClass('active').siblings().removeClass('active');
        $('.banner_footer_list>li').eq(index+1).addClass('active').siblings().removeClass('active');
    }else{
        $('.banner_list>li:first').addClass('active').siblings().removeClass('active');
        $('.banner_footer_list>li:first-child').addClass('active').siblings().removeClass('active');
    }
}

