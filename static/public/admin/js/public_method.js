
	$(function(){
		init();
		$(window).resize(function(){
			init();
		});
		$('.left_nav a').click(function(){
			var url = $(this).attr('data_url');
			$('.mainiframe').attr('src',url);
		});
	})
	function init(){
		var w = $(window).width();
		var per = w/1903;
		$('.main_left').height(911*per);
		$('.main_right').height(911*per);
		$('.main_right_up').height(875*per);
		$('.main_nav>li').css('margin-bottom',20*per+'px');
		$('.li_left').css('line-height',32*per+'px');
		$('.li_right>input').height(32*per);
		$('.li_right>textarea').height(100*per);
		$('.workslist_nav td').css('line-height',35*per+'px');
		$('.workslist_nav th').css('line-height',35*per+'px');
		$('.banner_img_td img').width(140*per+'px');
		$('.banner_img_td img').height(60*per+'px');
		$('.works_img_td img').width(100*per+'px');
		$('.works_img_td img').height(60*per+'px');
	}

	function page_post(url,id,type="_blank") { 
		var f = document.createElement("form");    
		f.action = url;     
	    f.target = type;
	    f.method = "post";  
	    f.innerHTML="<input type='hidden' name='id' value='"+id+"'/>"+  
	    document.body.appendChild(f);   
	    f.submit();   
	    document.body.removeChild(f);  
	} 
