// 20241002 LHI

var event = {
	navOpen: function(){
		$(document).on("click",".rel_wrap > a",function(){
			$(this).parent().toggleClass('on');
			$(this).next('ul').slideToggle();
			return false;
		});
	},
	//popup open event
	popOpen: function(){
		$(document).on("click",".btn_layer",function(){
			$('a[data-focus~=on], button[data-focus~=on]').removeAttr('data-focus');
			$('html').css({'overflow': 'hidden', 'height': '100%'});
			var el = $(this);
			var id = $(this).data('id');
			$("."+ id +"").show().addClass('layer_open').attr("tabindex", "0").focus().css('outline','0');
			el.attr('data-focus','on');
			
		});
		$(document).on("click",".layer_wrap .btn_close",function(){
			$(this).closest(".layer_wrap").hide().removeClass('layer_open').removeAttr("tabindex", "0");
			$('a[data-focus~=on], button[data-focus~=on]').focus();
			if($(".layer_wrap.layer_open").length == 0){
				$('html').css({'overflow': 'auto', 'height': 'auto'});
			}
		});
	},
	//tab click event
	tabList: function(){
		$(".tab_list > li").eq(0).addClass('on');
		$(".tab_cont > div").eq(0).addClass('on');
		$(document).on("click",".tab_list > li > a",function(){
			var id = $(this).attr("href");
			$(this).closest('li').siblings().removeClass('on');
			$(this).closest('li').addClass('on');
			$(">.tab_cont>div",$(this).closest(".tab_wrap")).hide();
			$(">.tab_cont>div"+id,$(this).closest(".tab_wrap")).show();
			return false;
		});
	},
	gnb: function(){
		$(document).on("mouseenter focusin",".gnb > li > a",function(){
			$('.header').addClass('on');
			$(this).closest('li').siblings().removeClass('on')
			$(this).closest('li').addClass("on");
			return false;
		}).on("mouseleave",".header",function(){
			$(this).removeClass('on');
			$('.gnb').find('li').removeClass("on");
			return false;
		});
		// 접근성 추가
		$(document).on("focusin",".logo a, .btn_time",function(){
			$('.header').removeClass('on').find('li').removeClass("on");
			return false;
		});	
	},
	mobGnb: function(){
		$(document).on("click",".btn_menu",function(){
			$(this).toggleClass('on');
			$('.mob_wrap').toggleClass('on');
			if($('.btn_menu').hasClass('on')) {
				$('html, body').css({'overflow': 'hidden', 'height': '100%'});
				$(this).attr('title','메뉴열림');
			} else {
				$('html, body').css({'overflow': 'auto', 'height': 'auto'});
				$(this).removeAttr('title');
			}
		});
		$(document).on("click",".gnb_mob > li > a",function(){
			$(this).closest('li').toggleClass('on');
			$(this).closest('li').find('.gnb_2dpt').slideToggle();
			if($('.gnb_mob > li').hasClass('on')) {
				$(this).removeAttr('title');
			} else {
				$(this).attr('title','메뉴열림');
			}	
		})
	}
}


$(document).ready(function(){
	event.navOpen()
	event.popOpen()
	event.tabList()
	event.gnb();
	event.mobGnb();

	$(window).on("resize", function(){
		//react();
	}).resize();

});

// 버튼 클릭하면 하단섹션이 열림
$(document).ready(function(){		
	let isSectionVisible = false; // 하단 섹션이 열려 있는지 추적
	$('#toggleButton').on('click', function() {
		if (!isSectionVisible) {
			$('#bottomSection').slideDown(); // 하단 섹션을 펼침
			isSectionVisible = true;
		} else {
			$('#bottomSection').slideUp(); // 하단 섹션을 닫음
			isSectionVisible = false;
		}
	});
})

//레이어팝업
$(document).ready(function() {
    // 모든 solution 링크에 클릭 이벤트 리스너 추가
    $('.solution').on('click', function(e) {
        e.preventDefault();
        var popupId = $(this).data('popup');
        $('#' + popupId).fadeIn(); // 팝업을 나타내기 위해 fadeIn 사용
    });

    // 팝업 닫기 버튼
    $('.close_btn').on('click', function() {
        $(this).closest('.popup_layer').fadeOut(); // 팝업을 닫기 위해 fadeOut 사용
    });

    // 팝업 외부 클릭 시 닫기
    $(window).on('click', function(event) {
        $('.popup_layer').each(function() {
            if (event.target == this) {
                $(this).fadeOut(); // 외부 클릭 시 팝업 닫기
            }
        });
    });
});
