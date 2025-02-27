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
	// tabList: function(){
	// 	$(".tab_list > li").eq(0).addClass('on');
	// 	$(".tab_cont > div").eq(0).addClass('on');
	// 	$(document).on("click",".tab_list > li > a",function(){
	// 		var id = $(this).attr("href");
	// 		$(this).closest('li').siblings().removeClass('on');
	// 		$(this).closest('li').addClass('on');
	// 		$(">.tab_cont>div",$(this).closest(".tab_wrap")).hide();
	// 		$(">.tab_cont>div"+id,$(this).closest(".tab_wrap")).show();
	// 		return false;
	// 	});
	// },

	// tabList: function(){
	// 	$(".tab_wrap").each(function() {
	// 		var $wrap = $(this); // 현재 탭 래퍼
	// 		$wrap.find(".tab_list > li").eq(0).addClass('on');
	// 		$wrap.find(".tab_cont > div").eq(0).addClass('on').show();
	
	// 		$wrap.on("click", ".tab_list > li > a", function(e) {
	// 			e.preventDefault(); // 기본 동작 막기
	// 			var id = $(this).attr("href");
				
	// 			// 탭 상태 변경
	// 			$(this).closest('li').siblings().removeClass('on');
	// 			$(this).closest('li').addClass('on');
				
	// 			// 콘텐츠 상태 변경
	// 			$wrap.find(".tab_cont > div").hide();
	// 			$wrap.find(".tab_cont > div" + id).show();
	// 		});
	// 	});
	// },
	tabList: function() {
		$(".tab_wrap").each(function() {
		  var $wrap = $(this); // 현재 탭 래퍼
		  initTabs($wrap); // 초기화 함수 호출
	  
		  $wrap.on("click", ".tab_list > li > a", function(e) {
			e.preventDefault(); // 기본 동작 막기
			var id = $(this).attr("href"); // 연결된 콘텐츠 ID
	  
			// 현재 탭이 이미 활성화되어 있으면 종료
			if ($(this).closest('li').hasClass('on')) {
			  return; // 더 이상 처리하지 않음
			}
	  
			// 현재 탭 활성화 처리
			$(this).closest('li').siblings().removeClass('on');
			$(this).closest('li').addClass('on');
	  
			// 같은 탭 래퍼 내 콘텐츠 처리
			$wrap.find(".tab_cont > div").hide(); // 현재 래퍼의 모든 콘텐츠 숨기기
			$wrap.find(".tab_cont > div" + id).show(); // 선택한 콘텐츠 표시
	  
			// 내부 탭 활성화 로직 추가
			if (id === "#tab1") {
			  var $innerTabWrap = $wrap.find("#tab1 .tab_wrap");
			  if ($innerTabWrap.length > 0) {
				// 내부 탭 초기화 및 첫 번째 탭 활성화
				$innerTabWrap.find(".tab_list > li").removeClass('on').eq(0).addClass('on');
				$innerTabWrap.find(".tab_cont > div").hide().eq(0).show();
			  }
			}
			if (id === "#tab2") {
				var $innerTabWrap = $wrap.find("#tab2 .tab_wrap");
				if ($innerTabWrap.length > 0) {
				  // 내부 탭 초기화 및 첫 번째 탭 활성화
				  $innerTabWrap.find(".tab_list > li").removeClass('on').eq(0).addClass('on');
				  $innerTabWrap.find(".tab_cont > div").hide().eq(0).show();
				}
			  }
		  });
		});
	  
		function initTabs($wrap) {
		  // 초기화: 첫 번째 탭과 콘텐츠 활성화
		  $wrap.find(".tab_list > li").eq(0).addClass('on');
		  $wrap.find(".tab_cont > div").hide(); // 모든 콘텐츠 숨기기
		  $wrap.find(".tab_cont > div").eq(0).show(); // 첫 번째 콘텐츠 표시
	  
		  // 내부 탭 초기화
		  $wrap.find(".tab_cont .tab_wrap").each(function() {
			var $innerWrap = $(this);
			$innerWrap.find(".tab_list > li").eq(0).addClass('on');
			$innerWrap.find(".tab_cont > div").hide().eq(0).show();
		  });
		}
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

// 마우스 오버하면 슬라이드로 나타나는 콘텐츠
$(document).ready(function() {
    $('.hover_box').on('mouseenter focusin', function() {
        var $panel = $(this).find('.slide_panel');
        if (!$panel.is(':animated')) { // 애니메이션이 진행 중인지 확인
            $panel.stop(true, true).slideDown(300);
        }
    }).on('mouseleave blur', function() {
        var $panel = $(this).find('.slide_panel');
        if (!$panel.is(':animated')) { // 애니메이션이 진행 중인지 확인
            $panel.stop(true, true).slideUp(300);
        }
    });
});



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

//진단문항
$(document).ready(function() {
	let currentSlide = 0;
	const $slides = $('.surv_form > li');
	const totalSlides = $slides.length;
	const $progress = $('.surv_prog');

	// 초기 설정: 첫 번째 슬라이드를 제외한 모든 슬라이드 숨기기
	$slides.hide();
	$slides.eq(currentSlide).show();
	updateProgress();
	updateButtons();

	// 다음 단계 버튼 클릭 이벤트
	$('.surv_next').on('click', function() {
		if (currentSlide < totalSlides - 1) {
			$slides.eq(currentSlide).hide();
			currentSlide++;
			$slides.eq(currentSlide).show();
			updateProgress();
			updateButtons();
		}
	});

	// 이전 단계 버튼 클릭 이벤트
	$('.surv_prev').on('click', function() {
		if (currentSlide > 0) {
			$slides.eq(currentSlide).hide();
			currentSlide--;
			$slides.eq(currentSlide).show();
			updateProgress();
			updateButtons();
		}
	});

	// 진행 상황 업데이트 함수
	function updateProgress() {
		const progressValue = ((currentSlide + 1) / totalSlides) * 100;
		$progress.val(progressValue);
	}

	// 버튼 상태 업데이트 함수
	function updateButtons() {
		// 이전 단계 버튼 비활성화 처리
		$('.surv_prev').prop('disabled', currentSlide === 0);

		// 마지막 슬라이드에서는 '다음 단계' 버튼을 숨기고 '결과 조회' 버튼 표시
		if (currentSlide === totalSlides - 1) {
			$('.surv_next').prop('disabled', true);
			$('.surv_result').show();
		} else {
			$('.surv_next').prop('disabled', false);
			$('.surv_result').hide();
		}
	}

	// 페이지 로드 시 '결과 조회' 버튼 숨김
	$('.surv_result').hide();
});

// 검색바 del 
$(document).ready(function() {
	// 텍스트 입력 시 search_del 버튼 보이기
	$('.search_input').on('input', function() {
		if ($(this).val().trim() !== '') { // 입력된 값이 비어있지 않다면
			$('.search_del').css('display', 'inline-block'); // del 버튼 보이기
		} else {
			$('.search_del').hide(); // 값이 없으면 숨김
		}
	});

	// search_del 버튼 클릭 시 입력 내용 지우기
	$('.search_del').on('click', function() {
		$('.search_input').val('').focus(); // 입력 필드 비우기
		$(this).hide(); // del 버튼 숨기기
	});
});

//목록형 테이블
$(window).on('load resize orientationchange', function () {
	$('.tb_base.tb_list tbody > tr > td').each(function () {
		var tableIndex = $(this).index();
		var tableT = $(this).parents('tbody').prev().children().children().eq(tableIndex).text();
		if ($(window).width() < 800) {
			$(this).attr('data-label', tableT);
		}
	});
});
//컨텐츠형 테이블
$(window).on('load resize orientationchange', function () {
	$('.tb_base.tb_view tbody > tr > td').each(function () {
		var tableT = $(this).prev().text();
		if ($(window).width() < 800) {
			$(this).attr('data-label', tableT);
		}
	});
});

