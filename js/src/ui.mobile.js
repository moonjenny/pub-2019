//ISCROLL
var LnbScroll;

var options = { mouseWheel: true, probeType: 1, scrollY: true, scrollX: false, scrollbars: true , fadeScrollbars: false, tap:iScrollClick(), click:iScrollClick()}
var scroll_count01 = 0;
var scroll_count02 = 0;
var scroll_count03 = 0;

var scroll_lnb_count01 = 0;
var scroll_lnb_count02 = 0;

if(/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)){
	options.preventDefault = false;
}

function LnbCtgScroller() {
	LnbCtgScroll = new IScroll('#lnb_ctg', options);
};

function LnbBrdScroller() {
	LnbBrdScroll = new IScroll('#lnb_brd', options);
};

function LnbDestroy() {
	if(LnbScroll != undefined){
		LnbScroll.destroy();
		LnbScroll = null;
	}
};

function iScrollClick(){
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
    if (/Silk/i.test(navigator.userAgent)) return false;
    if (/Android/i.test(navigator.userAgent)){
      var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
      return parseFloat(s[0]+s[3]) < 44 ? false : true
    }
}

//GOODS ZOOM
function GoodsZoom() {
	if(scroll_count03 == 0) {
		Goods_Zoom = new IScroll('#goods_content', {zoom: true, scrollX: true, scrollY: true, mouseWheel: true, wheelAction: 'zoom'});
		scroll_count03++;
	}else{
		setTimeout(function(){Goods_Zoom.refresh()}, 100);
	}
}
$(function(){
	$('#goods_zoom').on("click", function(){
		$('body').css({'overflow': 'hidden' });
		$('#goods_detail').fadeIn(300);
		GoodsZoom();
		scroll_out();
		$('html, body').scrollTop(0);
	});

	$('.layer_zoom .btn_close').on("click", function(){
		$('body').css('overflow-y', 'auto');
		$('#goods_detail').fadeOut(300);
		scroll_on();
    });

	$(window).on('orientationchange', function(){ //20160314
		if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
			if(scroll_count03) {
				$('body').css('overflow-y', 'auto');
				$('#goods_detail').fadeOut(300);
				scroll_on();
			}
		}
	});

});


//GOODS ORDER
function OrderScorller() {
	if(scroll_count02 == 0) {
		if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
			if (/OS [1-8](.*) like Mac OS X/i.test(navigator.userAgent)){}
			else{options.preventDefault = true;}//IOS9 ABOVE
		}
		OrderScorll = new IScroll('.gd_opt_scroll', options);
		scroll_count02++;
	}else{
		setTimeout(function(){OrderScorll.refresh()}, 100);
	}
}
$(function(){
	$('.goods_ord').find('button.buy').on("click", function(){
		$('.goods_opt').show();
		$('.goods_opt').animate({bottom : 0 }, 250);
		fnGoodsOpt();
		setTimeout(function(){OrderScorller()}, 100);
		$('#btn_top, #btn_back').css('z-index',0);
		if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) { //IOS8 BELOW
			if (/OS [1-8](.*) like Mac OS X/i.test(navigator.userAgent)) {scroll_out()}
		}
	});

	$('.goods_opt .gd_cls').find('button').on("click", function(){
		$('.goods_opt').animate({bottom : '-590px' }, 250);
		setTimeout(function(){$('.goods_opt').hide()}, 300);
		$('#btn_top, #btn_back').css('z-index',110);
		if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) { //IOS8 BELOW
			if (/OS [1-8](.*) like Mac OS X/i.test(navigator.userAgent)) { scroll_on()}
		}
	});

	$(window).resize(function () {
		if($('.goods_opt').css('display') == "block"){
			fnGoodsOptRefresh();
		}
	});
});

function fnGoodsOpt(){
    var p_h = ($(window).height()/2) - 50;
	$('.gd_opt_scroll').css('height', $('.gd_opt_scroll .gd_opt').height() + "px");
	$('.gd_opt_scroll').css('max-height', p_h + "px");
}
function fnGoodsOptRefresh(){
    fnGoodsOpt();
	setTimeout(function(){OrderScorll.refresh()}, 100);
}




//GOODS INFO
function fnToggleRv(this_name){
   if($(this_name).parent().hasClass('on') == false){
		$('.rv_list').find('>ul>li').removeClass('on');
		$(this_name).parent().addClass('on');
	}else{
		$(this_name).parent().removeClass('on');
	}
}

function fnToggleQna(this_name){
  if($(this_name).parents("li").hasClass('on') == false){
		$('.qna_list').find('>ul>li').removeClass('on');
		$(this_name).parents("li").addClass('on');
	}else{
		$(this_name).parents("li").removeClass('on');
	}
}


$(function(){
	$('.goods_data dt').find('button').on("click", function(){
		if($(this).hasClass('on') == false){
			$(this).addClass('on');
			$(this).parent().next('dd').slideDown(100);
		}else{
			$(this).removeClass('on');
			$(this).parent().next('dd').slideUp(100);
		}
		return false;
	});

	$('.goods_list li').find('.g_dbtn > button').on("click", function(){
		if($(this).parent().next('.g_wt').css('display') == 'none'){
			$('.goods_list li').find('.g_wt').hide();
			$(this).parent().next('.g_wt').slideDown(100).addClass('on');
		}else{
			$(this).parent().next('.g_wt').slideUp(100).removeClass('on');
		}
		return false;
	});
});

//TRANSLATE X
function translateX(targetId, dist, speed) {
	$("#"+targetId).css({
		'transform': 'translateX('+dist+'%)',
		'-webkit-transform': 'translateX('+dist+'%)',
		'-moz-transform': 'translateX('+dist+'%)',
		'-o-transform': 'translateX('+dist+'%)',

		'transition': 'all ' +speed+'ms',
		'-webkit-transition': 'all ' +speed+'ms',
		'-moz-transition': 'all ' +speed+'ms',
		'-o-transition': 'all ' +speed+'ms'
	});
}

//LEFT MENU
$(function () {
	var lnbCtgBtn = $('.lnb_mn.ctg_btn').find('a');
	var lnbMallBtn = $('.lnb_mn.mall_btn').find('a');
	var lnbBrdBtn = $('.lnb_mn.brd_btn').find('a');

    /*OPEN 개발 삭제요청 150229
    $('#left_open').on("click", function(){
		//$('#lnb').show().animate({ left: 0 }, 250);
		$('#lnb').show();
		translateX("lnb", 100, 250);
		$('.lnb_dim').css({'display':'block'});
        $('body').bind('touchmove', function (e) { e.preventDefault(); });
        $('body').css('overflow-y', 'hidden');
		if(scroll_lnb_count01 == 0) {
			LnbCtgScroller();
			scroll_lnb_count01++;
		}
		setTimeout(function(){LnbCtgScroll.refresh()}, 200);
    });
	*/

    //CLOSE
	$('#left_cls').on("click", function(){
		//$('#lnb').animate({ left: '-100%' }, 250);
		translateX("lnb", -100, 250);
        $('.lnb_dim').fadeOut(300);
        $('body').css('overflow-y', 'auto');
        $('body').unbind('touchmove');
		setTimeout(function(){$('#lnb').hide()}, 300);
    });

	 //LNB_TAB
	lnbCtgBtn.on("click", function(){
		$('.lnb_mn').find('a').removeClass('on')
		$(this).addClass('on');
		$('.lnb_cont').hide();
		$(this).parent().next('.lnb_cont').show();
		if(scroll_lnb_count01 == 0) {
			LnbCtgScroller();
			scroll_lnb_count01++;
		}
		setTimeout(function(){LnbCtgScroll.refresh()}, 200);
	});
	lnbMallBtn.on("click", function(){
		$('.lnb_mn').find('a').removeClass('on')
		$(this).addClass('on');
		$('.lnb_cont').hide();
		$(this).parent().next('.lnb_cont').show();
	});
	lnbBrdBtn.on("click", function(){
		$('.lnb_mn').find('a').removeClass('on')
		$(this).addClass('on');
		$('.lnb_cont').hide();
		$(this).parent().next('.lnb_cont').show();
		if($("body").hasClass('modern') == false){
			if(scroll_lnb_count02 == 0) {
				LnbBrdScroller();
				scroll_lnb_count02++;
			}
			setTimeout(function(){LnbBrdScroll.refresh()}, 200);
		}
	});
});


//LEFT MENU
$(function(){
	$('#menu ul li').find('a.tit').click(function() {
		var this_cell = $(this).parent();
		if($(this).parent().hasClass('on') == false){
			$('#menu ul ul').slideUp(120);
			$('#menu ul li').removeClass('on');
			$('#menu ul li a').removeClass('select');
			this_cell.find(' > ul').slideDown(120);
			this_cell.addClass('on');
			$(this).addClass('select')
		}
		else{

			this_cell.find(' > ul').slideUp(120);
			this_cell.removeClass('on');
			$(this).removeClass('select')
		}
		setTimeout(function(){LnbCtgScroll.refresh()}, 200);
    });
});

//LEFT BRAND
$(function(){
	$('.brd_word dt').find('button').click(function() {
		$('.brd_word dt').removeClass('on');
		$(this).parent().addClass('on');
		$('.brd_word dd').removeClass('on');
		$(this).parent().next('dd').addClass('on');
		setTimeout(function(){LnbCtgScroll.refresh()}, 200);
	});
});


// TAB CLASS
function fnTab(tabSize, tabId, idx, targetId) {
    for ( var i = 0; i < tabSize; i++ ) {
        if ( i == idx ) {
            $("#"+tabId+i)[0].className = $("#"+tabId+i)[0].className.replace("off", "on");
            if ( $("#"+targetId+i) ) {
				$("#"+targetId+i).show();
				if($(".goods_tab").css("position") == "fixed" && tabId == "gtab"){$("html,body").animate({scrollTop: $("#"+targetId+i).offset().top - 86}, 0)}
			}
        }else{
            $("#"+tabId+i)[0].className = $("#"+tabId+i)[0].className.replace("on", "off");
            if ( $("#"+targetId+i) ) { $("#"+targetId+i).hide(); }
        }
    }

    if(typeof addImpression == 'function') {
    	addImpression($("#"+targetId+idx));
    }
}

function fnToggleSlide(tabId, targetId){
	if($("#"+tabId).hasClass('on')){
		$("#"+tabId).removeClass('on');
		$("#"+targetId).slideUp(200);
    }else{
		$("#"+tabId).addClass('on');
		$("#"+targetId).slideDown(200);
    }
}

// SEARCH
$(function(){
	$("#searchTerm").focus(function() {
		if ($(this).val() == '') {
			$("#sch_del").hide();
			$(".sch_word").hide();
			$(".sch_keyword").show();
		}else{
			$("#sch_del").show();
			$(".sch_word").show();
			$(".sch_keyword").hide();
		}
	}).keyup(function() {
		if ($(this).val() == '') {
			$("#sch_del").hide();
			$(".sch_word").hide();
			$(".sch_keyword").show();
		}else{
			$("#sch_del").show();
			$(".sch_word").show();
			$(".sch_keyword").hide();
		}
	});

	$('#sch_btn').focus(function() {
		$('#sch_del').hide();
	});

	var $btn = $(".sch_keyword dt button");
	var $target = $(".sch_keyword dd");
	$btn.on("click" ,function(){
		$btn.removeClass("on");
		$(this).addClass("on");
		$target.hide();
		$(this).parent().next().show();
	});
	$btn.focus(function() {
		$(".sch_word").hide();
	});

	$("#sch_del").on("click", function(){
		setTimeout(function() { $("#sch_del").hide();}, 100);
		$("#searchTerm").val("");
		$(".sch_word").hide();
		$(".sch_keyword").show();
	});

	$('.sch_keyword li, .sch_word li').find('a').each(function() {
		$(this).focus(function() {
			var key_input = $('#searchTerm');
			var v = $(this).find('span').text();
			key_input.val(v);
			$("#sch_del").show();
		});
		$(this).click(function() {
			$('#sch_btn').focus();
		});
	});

	if($(".sch_word").css('display') == 'block'){
		$('.sch_word .s_word').on('touchstart', function(){
			$('body').css('overflow-y', 'hidden');
		});
		$('.sch_word .s_word').on('touchend', function(e){
			$('body').css('overflow-y', 'auto');
		});
	}

	var $btn_sdt = $(".sch_detail dt button");
	var $target_sdd = $(".sch_detail dd");
	$btn_sdt.on("click" ,function(){
		$btn_sdt.removeClass("on");
		$(this).addClass("on");
		$target_sdd.hide();
		$(this).parent().next().show();
	});

});

//SEARCH SORT
$(function(){
	$(".search_wrap .s_type li").find('button').on("click", function(){
		if($(this).parent("li").hasClass("on")){
			if($(this).parent("li").hasClass("active")){
				$(".search_wrap .s_type li").removeClass("on");
				$(".search_wrap .s_type li").hide();
				$(this).parent("li").show();
				$(this).parent("li").addClass("on");
				$(this).parent("li").removeClass("active");
			}else{
				$(".search_wrap .s_type li").show();
				$(this).parent("li").addClass("active");
			}
		}else{
			$(".search_wrap .s_type li").removeClass("on");
			$(".search_wrap .s_type li").hide();
			$(this).parent("li").show();
			$(this).parent("li").addClass("on");
			$(this).parent("li").removeClass("active");

			$("#goods_list ul").attr("class","");
			$("#goods_list ul").addClass($(this).attr("data-type"));

		}
	});

	$(".sch_kwd").find('button').on("click", function(){
		if($(this).hasClass("on")){
			$(this).removeClass("on");
			$(".sch_kwd dd").css('height','20px');
		}else{
			$(this).addClass("on");
			$(".sch_kwd dd").css('height','auto');
		}
	});
});

//MAIN SWIPER RESIZE
function setSlideHeight() {
	setTimeout(function(){$('.swiper-wrapper, .swiper-slide').css('height', '')}, 100);
}

//OPACITY LAYER
function OpacityLyrOpen(sId) {
	$('body').append($("#"+sId));
	$("#"+sId).fadeIn(300);
    $('#contents').bind('touchmove', function (e) { e.preventDefault(); });
	//$('#contents').css({ 'position': 'fixed', 'z-index': '2'});
}

function OpacityLyrCls(sId) {
	setTimeout(function(){$('.slide_cont').append($("#"+sId))}, 300);
	$("#"+sId).fadeOut(300);
	$('#contents').unbind('touchmove');
	//$('#contents').css({ 'position': '', 'z-index': ''});
	//scroll_on();
}

//TOOL LAYER
function ToolLyrOpen(tid, this_name) {
	$('.tooltip').hide();
	$('.tooltip .arr').remove();
	$("#"+tid).show();
	$("#"+tid+" .tip_info").append("<span class='arr'></span>");
	$("#"+tid).find(".arr").css('left', $(this_name).offset().left);
}

function ToolLyrOpenTop(tid, this_name) {
	$('.tooltip').hide();
	$('.tooltip .arr').remove();
	$("#"+tid).show();
	$("#"+tid+" .tip_info").append("<span class='arr'></span>");
	if($("#"+tid).width() + $(this_name).offset().left > $(window).width()){
		$("#"+tid).css({"left":'auto', "right":'6px'});
		$("#"+tid).find(".arr").css({"left":'auto', "right":'9px'});
	}
}

function ToolLyrCls() {
	$('.tooltip').hide();
	$('.tooltip .arr').remove();
}

// FIXED SCROLL
$(function(){
	if($("div").hasClass("plan_sel")){
		$('.plan_sel').scrollToFixed({marginTop: 44, top: $('.search_wrap').offset().top, zindex:4});
		if( $(".plan_sel").next().text() == "" ) {
			$(".plan_sel").next().hide();
		}
	}

	if($("div").hasClass("goods_tab")){
		$('.goods_tab').scrollToFixed({marginTop: 44, top: $('.goods_wrap').offset().top, zindex:4});
		if( $(".goods_tab").next().text() == "" ) {
			$(".goods_tab").next().hide();
		}
	}
});


// PLAN TITLE SCROLL
$(function(){
	if($("div").hasClass("plan_anchor")){
		$(window).scroll(function(){
			$(".plan_name").each(function(i) {
				var idx = 0;
				if ($(window).scrollTop() > parseInt($(this).offset().top) - 95) {
					if ($(this).attr("data-isproc") === undefined || $(this).attr("data-isproc") == "false") {
						$(this).attr("data-isproc", "true")
					}
				} else {
					$(this).attr("data-isproc", "false")
				}
				for (var n = 0; n < $(".plan_name").size(); n++) {
					if ($($(".plan_name").get(n)).attr("data-isproc") == "true") {
						idx = n
					}
				}
				$(".plan_sel select option:eq("+idx+")").attr("selected", "selected");
			});
		});
	}

	//ANCHOR
	$('.plan_anchor select').change(function (){
		var idx = $('.plan_sel select option').index($('.plan_sel select option:selected'));
		$("html,body").animate({scrollTop: parseInt($(".plan_name").eq(idx).offset().top) - 90}, 100);
	});
});


// HEADER SCROLL
$(function(){
	if($("div").hasClass("head")){
		var top_bn= 50;
		var lastScroll = 0;
		var startScroll = 45;

		if($("div").hasClass("header_bn")){
			$('body').addClass('head_bn');
			startScroll = startScroll + top_bn;
		}else{
			$('body').removeClass('head_bn');
		}


		$(window).scroll(function(){
			var st = $(this).scrollTop();
			if (st > startScroll){
				$('body').addClass('head_up');
			}
			else {
				$('body').removeClass('head_up');
			}
			//lastScroll = st;
		});
	}
});


// TOP_BTN
$(function(){
	//START HIDE
	$("#btn_top, #btn_back").hide();

	//POSITION UP
	if($("div").hasClass("goods_ord")){
		$("#btn_top, #btn_back").css('bottom', '70px');
	}

	//POSITION UP 160308
	if($("div").hasClass("basketwrap")){
		$("#btn_top, #btn_back").css('bottom', '105px');
		$("#footer").css('paddingBottom', '90px')
	}

	if($("div").hasClass("btn_top")){
		$(window).scroll(function () {
			if ($(this).scrollTop() > 200) {
				$('#btn_top, #btn_back').fadeIn(100);
			} else {
				$('#btn_top, #btn_back').fadeOut();
			}
		});
	}
	$("#btn_top a").on("click", function(){
		$("html,body").animate({scrollTop: 0}, 300);
		return false;
	});
});

function setPlus(sid) {
	var value = $("#"+sid).val();
	value++;
	if(value > 9999999){return false;}
	$("#"+sid).val(value);
}

function setMinus(sid) {
	var value = $("#"+sid).val();
	value--;
	if(value < 1){return false;}
	$("#"+sid).val(value);
}

function limitText(textid, limit, limitid){
	var text = $('#'+textid).val(); // 이벤트가 일어난 컨트롤의 value 값
	var textlength = text.length; // 전체길이

	// 변수초기화
	var i = 0;				// for문에 사용
	var li_byte = 0;		// 한글일경우는 2 그밗에는 1을 더함
	var li_len = 0;			// substring하기 위해서 사용
	var ls_one_char = "";	// 한글자씩 검사한다
	var text2 = "";			// 글자수를 초과하면 제한할수 글자전까지만 보여준다.

	for(i=0; i< textlength; i++)
	{
		// 한글자추출
		ls_one_char = text.charAt(i);

		// 한글이면 2를 더한다.
		if (escape(ls_one_char).length > 4) { li_byte += 2;}
		else{li_byte++; } // 그밗의 경우는 1을 더한다.

		// 전체 크기가 limit를 넘지않으면
		if(li_byte <= limit){li_len = i + 1;}
	}

	$('#'+limitid).text(parseInt(li_byte/2));

	// 전체길이를 초과하면
	if(li_byte > limit){
		alert("글자를 초과 입력할수 없습니다. 초과된 내용은 자동으로 삭제 됩니다.");
		text2 = text.substr(0, li_len);
		$('#'+textid).val(text2);
		$('#'+limitid).val(parseInt(limit/2));
	}
	$('#'+textid).focus();
}


//LAYER POPUP
    // Scroll
    function scroll_out() {
        $('.dimlay').bind('touchmove', function (e) { e.preventDefault(); });
        $('body').bind('touchmove', function (e) { e.preventDefault(); });
        $('body').css('overflow-y', 'hidden');
    }

    function scroll_on() {
        $('.dimlay').unbind('touchmove');
        $('body').unbind('touchmove');
        $('body').css('overflow-y', 'auto');
    }

   // Dim
    function dim_out() {
        $(".dimlay").remove();
        scroll_on();
    }

    function dim_on() {
		$("body").append("<div class='dimlay'></div>");
		$('.dimlay').css('display', 'block');
        scroll_out();
    }


    //Layer Open info
    function layer_open(name) {

        $('body').unbind('touchmove');
		$(name).show();
        $(window).resize(function () {
            layer_size(name);
        });
    }

	 function layer_size(name) {
		var note_name = name;
		var note_data = $(note_name).height();

		var note_h = ($(window).height() - note_data) / 2;

		if (note_h > 0) {
			$(note_name).css({ 'top': note_h + 'px'});
		} else {
			$(note_name).css({ 'top': '0' });
		}
	}

    // Layer Close
    $('.layer_pop .btn_close, .layer_con .btn_close').click(function () {
        var this_name = '#' + $(this).parent().parent().attr('id');
		//$('#contents').css({ 'position': '', 'z-index': ''});
        $('#contents').unbind('touchmove');
		layer_close(this_name);
        dim_out();
    });

    // Layer Close
    $('.layer_fix .btn_close').click(function () {
        var this_name = '#' + $(this).parent().attr('id');
		$('#header').css('z-index', '');
		$('#contents').unbind('touchmove');

		$('#contents').css({ 'position': '', 'z-index': ''});//20160315
		$("html,body").scrollTop(scrpos);

        layer_close(this_name);
        scroll_on();
    });


	var scrpos = 0; 	//20160315

	// Layer Open
	function fn_layer_open(sId) {

		$('body').css({ 'height': '100%', 'overflow': 'hidden' });

        name = "#"+sId;

        layer_open(name);

        if ($(name).hasClass('layer_fix')) {
			//layer_size(name);
			$('#header').css('z-index', '1');

			scrpos = $(window).scrollTop();	//20160315
			$('#contents').css({ 'position': 'fixed', 'z-index': '2'});

			$('#contents').bind('touchmove', function (e) { e.preventDefault(); });
        }

        if ($(name).hasClass('layer_pop')) {
            layer_size(name);
            $('.dimlay').css('z-index', '2000');
            dim_on();
        }

		if ($(name).hasClass('layer_con')) {
            layer_size(name);
            $('.dimlay').css('z-index', '2000');
            dim_on();
        }

        if ($(name).hasClass('lyr_opc')) {
			$('#contents').bind('touchmove', function (e) { e.preventDefault(); });
			//$('#contents').css({ 'position': 'fixed', 'z-index': '2'});
			$('.dimlay').css('z-index', '2000');
			scroll_on();
        }

		if ($(name).hasClass('nodim')) {
            layer_size(name);
            dim_out();
        }

		if ($(name).hasClass('timeout')) {
		    setTimeout(function() {
                $(name).fadeOut(200);
            }, 2000);
        }
	}

	function layer_fix_close(n) {
		var this_name = '#'+n;
		$('#header').css('z-index', '');
		$('#contents').unbind('touchmove');

		if($(this_name).hasClass('layer_fix')){ //20160315
			$('#contents').css({ 'position': '', 'z-index': ''});
			$("html,body").scrollTop(scrpos);
		}

        layer_close(this_name);
        scroll_on();
	}

    // Layer Close info
    function layer_close(n) {
        $(n).fadeOut(200);
    }

    //dim out
    $('.dimlay').click(function () {
        dim_out();
        $('.layer_pop').fadeOut(100);
    });

//장바구니
$(function(){

    //품절,판매종료 상품
    $(document).ready(function() {
        $(".soldout .btn_open").bind("click", function(e){
            e.preventDefault();
            $(this).toggleClass("on");
            $(this).parent().parent().parent().find(".soldout_con").slideToggle(200);
        });
    });

    //찜하기 알림
    $(function(){
        $(".btn_wish").bind("click", function(e){
            e.preventDefault();

            function zzimStart(){
                $(".layer_pop.pop_zzim").show();
            }

            function zzimStop(){
                setTimeout(function() {
                    $(".layer_pop.pop_zzim").fadeOut(200);
                }, 2000);
            }
            zzimStart();
            zzimStop();
        });
        $(".layer_pop.pop_zzim .btn_close").bind("click", function(){
            $(".layer_pop.pop_zzim").fadeOut(200);
        });
    });

});
