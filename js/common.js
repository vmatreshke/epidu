head.ready(function() {


	$(document).on("click",function(){
		$(".js-overlay").hide();
		$("html").removeClass("has-open-popup");
		//$(".js-select-list").hide();
		//$(".js-select").removeClass("is-active");
		$(".js-drop").removeClass("is-active");
		$(".js-drop-link").removeClass("is-active");
		$(".js-drop-list").hide();
		//$(".js-item-popup").fadeOut(200);
		$(".js-window").fadeOut(200);
		$(".js-sidebar-filter").hide();
		$(".js-sidebar").removeClass("has-open-filter");
		$(".js-grid").removeClass("has-open-window");
	});

	$(".js-drop-link").on("click", function(event){
		//alert();
		$(this).parents(".js-drop").toggleClass("is-active");
		$(this).toggleClass("is-active");
		$(this).parents(".js-drop").find(".js-drop-list").fadeToggle(200);
		event.stopPropagation();
		return false;
	});


	// ie9 detect
	if ($("html").hasClass("ie9") || $("html").hasClass("ie8") || $("html").hasClass("ie7")) {
		alert('Old Browser');
	}

	// popups
	$(".js-popup-link").on("click", function(event){
		$(".js-overlay").fadeOut(200);
		var popup = $(this).attr("href");
		$("html").addClass("has-open-popup");
		$("."+popup).parent().fadeIn(200);
		//alert();
		// $("."+popup).find('.js-slider-popup').slick({
		// 	slidesToShow: 1,
		// 	infinite: true,
		// 	speed: 300,
		// 	touchMove: true,
		// 	dots: true,
		// 	autoplay: true,
	 //  		autoplaySpeed: 5000,
		// });
		event.stopPropagation();
		return false;
	});

	$(".js-popup-close").on("click", function(){
		$(".js-overlay").fadeOut(200);
		$("html").removeClass("has-open-popup")
		return false;
	});
	$(".js-popup").on("click", function(event){
		event.stopPropagation();
	});

	$("body").on("click", ".ui-multiselect-menu", function(event){
		event.stopPropagation();
	});

	$("body").on("click", "#ui-datepicker-div", function(event){
		event.stopPropagation();
	});

	$(".js-categ").on("click", function(){
		$(this).parent().find(".js-categ").removeClass("is-active");
		$(this).addClass("is-active");
		return false;
	});

	$(".js-window-link").on("click", function(event){
		var left = $(this).offset().left + $(this).outerWidth();
		var top = $(this).offset().top;
		var popup = $(this).attr("href");
		var popup_height = $("."+popup).outerHeight();
		$("."+popup).css({
			top: top-popup_height,
			left: left
		});
		$("."+popup).fadeIn(200);

		event.stopPropagation();
		return false;
	});

	$(".js-window-close").on("click", function(){
		$(this).parents(".js-window").fadeOut(200);
		return false;
	});
	$(".js-window").on("click", function(event){
		event.stopPropagation();
	});

	var tip = $(".js-tip");
	var timer;
    var delay = 200;
	$(".js-tip-link").hover(

		function() {

		    var left = $(this).offset().left
		    var top = $(this).offset().top;
		    var tip_html = $(this).attr("data-tip-html");

		    if ($(this).attr("data-tip-width")) {
		    	var tip_width = $(this).attr("data-tip-width");
		    }
		    else {
		    	var tip_width = $(this).outerWidth();
		    }
		    tip.children().html(tip_html);
		    tip.css({
		    	top: top+$(this).outerHeight(),
		    	left: left,
		    	width: tip_width
		    });
		    timer = setTimeout(function() {
                tip.fadeIn(200);
            }, delay);


		},

		function() {
			clearTimeout(timer);
		    tip.hide();

		}
	);
	tip.hover(
	    function() {
	        $(this).show();
	    }, function() {
	        $(this).hide();
	    }
    );

	function stop(e) {
		setTimeout(function(){
			$('.ui-datepicker').on('click', function(e) {
				e.stopPropagation();
			});
		}, 1);
	};

	function showDatePicker() {
		$(".js-date-group").each(function(){
			var date_from = $(this).find(".js-date-from input");
			var date_to = $(this).find(".js-date-to input");

			if (date_from.length) {
				date_from.datepicker({
						dateFormat: 'yy-mm-dd',
						firstDay: 1,
						changeMonth: true,
						changeYear: true,
						showOtherMonths: true,
						//showTimezone: true,
						selectOtherMonths: true,
						yearRange: '-10:+3',
						//showSecond: true,
						showButtonPanel: false,
						//timeFormat: 'HH:mm:ss z',
						//timeFormat: 'HH:mm:ss',
						onClose: function( selectedDate ) {
						  date_to.datepicker( "option", "minDate", selectedDate );
						},
						beforeShow: function(e) {
							stop(e);
						},
						onChangeMonthYear: function(e) {
							stop(e);
						}
					});
			}
			if (date_to.length) {
				date_to.datepicker({
						dateFormat: 'yy-mm-dd',
						firstDay: 1,
						changeMonth: true,
						changeYear: true,
						showOtherMonths: true,
						//showTimezone: true,
						selectOtherMonths: true,
						yearRange: '-10:+3',
						//showSecond: true,
						showButtonPanel: false,
						//timeFormat: 'HH:mm:ss z',
						//timeFormat: 'HH:mm:ss',
						//hour: 23,
						// minute: 59,
						//second: 59,
						onClose : function( selectedDate ) {
							date_from.datepicker( "option", "maxDate", selectedDate );
						},
						beforeShow: function(e) {
							stop(e);
						},
						onChangeMonthYear: function(e) {
							stop(e);
						}
					});
			}
		});
	}
	showDatePicker();
	function inlineDatePicker() {
		$.datepicker.regional['ru'] = {
			closeText: 'Закрыть',
			prevText: '&#x3c;Пред',
			nextText: 'След&#x3e;',
			currentText: 'Сегодня',
			monthNames: ['Января','Февраля','Марта','Апреля','Мая','Июня',
			'Июля','Августа','Сентября','Октября','Ноября','Декабрь'],
			monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
			'Июл','Авг','Сен','Окт','Ноя','Дек'],
			dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
			dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
			dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
			dateFormat: 'dd.mm.yy', firstDay: 1,
			isRTL: false};
		$.datepicker.setDefaults($.datepicker.regional['ru']);
		$(".js-datepicker").datepicker({
	        dateFormat: 'dd MM yy',
	        firstDay: 1,
	        changeMonth: true,
	        changeYear: true,
	        showOtherMonths: true,
	        onSelect : function( selectedDate ) {
		       	$(".js-datepicker-date").val(selectedDate );
		    },

	    });
	}
	inlineDatePicker();
	$(".js-date-from .fa").on("click",function(){
		$(this).parent().find(".input").focus();
	});
	$(".js-date-to .fa").on("click",function(){
		$(this).parent().find(".input").focus();
	});
	$(".js-date").datepicker({
        dateFormat: 'yy-mm-dd',
        firstDay: 1,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        //showTimezone: true,
        selectOtherMonths: true,
        yearRange: '-10:+3',
        //showSecond: true,
        showButtonPanel: false,
        //timeFormat: 'HH:mm:ss z',
        //timeFormat: 'HH:mm:ss',
     	//    onClose: function( selectedDate ) {
	    //     date_to.datepicker( "option", "minDate", selectedDate );
	    // }
    });

    $(".js-date").parent().find(".fa").on("click",function(){
		$(this).parent().find(".input").focus();
	});

	//rating
	if ($('.js-rating').length > 0) {
		$('.js-rating').each(function(){
			$(this).raty({
				width: 150,
				hints: ['Отвратительно', 'Плохо', 'Неплохо', 'Очень хорошо', 'Отлично'],
				starOff: 'img/star.png',
				starOn : 'img/star-act.png',
				score: function() {
					return $(this).attr('data-score');
				}
			});
		});

	}
	if ($('.js-rating-small').length > 0) {
		$('.js-rating-small').each(function(){
			$(this).raty({
				width: 83,
				hints: ['Отвратительно', 'Плохо', 'Неплохо', 'Очень хорошо', 'Отлично'],
				starOff: 'img/star-s.png',
				starOn : 'img/star-s-act.png',
				score: function() {
					return $(this).attr('data-score');
				}
			});
		});

	}

	if ($('.js-rating-read').length > 0) {
		$('.js-rating-read').each(function(){
			$(this).raty({
				width: 150,
				readOnly: true,
				hints: ['Отвратительно', 'Плохо', 'Неплохо', 'Очень хорошо', 'Отлично'],
				starOff: 'img/star.png',
				starOn : 'img/star-act.png',
				score: function() {
					return $(this).attr('data-score');
				}
			});
		});
	}
	if ($('.js-rating-small-read').length > 0) {
		$('.js-rating-small-read').each(function(){
			$(this).raty({
				width: 83,
				readOnly: true,
				hints: ['Отвратительно', 'Плохо', 'Неплохо', 'Очень хорошо', 'Отлично'],
				starOff: 'img/star-s.png',
				starOn : 'img/star-s-act.png',
				score: function() {
					return $(this).attr('data-score');
				}
			});
		});
	}

	$(".js-download-btn").on("click",function(){
		$(this).parents(".js-download").find(".js-download-input").trigger("click")
	});

	if ($(".js-input-tel").length) {
        $(".js-input-tel").mask("+999 99 99 99 99");
    }

 //    $(".js-show-extend").on("click",function(){
	// 	$(this).parents(".js-comment").addClass("has-open-extend");
	// 	return false;
	// });
	$(".js-show-extend").on("click",function(){
		$(this).parents(".js-comment").find(".js-comment-short").hide();
		$(this).parents(".js-comment").find(".js-comment-extend").show();
		$(this).parents(".js-comment").find(".js-comment-extend textarea").focus()
		return false;
	});
	$(".js-hide-extend").on("click",function(){
		$(this).parents(".js-comment").find(".js-comment-short").show();
		$(this).parents(".js-comment").find(".js-comment-extend").hide();
		return false;
	});

    $(".textarea textarea").focusin(function() {
	  $(this).parent().addClass("is-focused")
	});
	$(".textarea textarea").focusout(function() {
	  $(this).parent().removeClass("is-focused")
	});

	$(".js-select-multi").multiselect({
		selectedList: 7,
		noneSelectedText: $(this).attr("data-placeholder"),
		header: "",
 		open: function () {
 			//$(this).multiselect("widget").addClass("is-focused");
 		},
 		close: function () {
 			//$(this).multiselect("widget").find("input[type='search']:first").val("");
 			//$(this).multiselect("widget").find(".ui-multiselect-checkboxes li").removeAttr("style");
 		}
	}).on("multiselectclick", function(event, ui) {
		if ($(this).multiselect("widget").find("input").is(":checked")) {
			$(this).next().addClass("has-value").removeClass("has-placeholder");
		}
		else {
			$(this).next().addClass("has-placeholder").removeClass("has-value");
		}

	});
	// $(".js-select-width").multiselect({
	// 	selectedList: 7,
	// 	noneSelectedText: $(this).attr("data-placeholder"),
	// 	header: "",
 // 		open: function () {
 // 			$(this).multiselect("widget").addClass("is-full-width");
 // 		},
 // 		close: function () {
 // 			$(this).multiselect("widget").removeClass("is-full-width");
 // 		}
	// }).on("multiselectclick", function(event, ui) {
	// 	if ($(this).multiselect("widget").find("input").is(":checked")) {
	// 		$(this).next().addClass("has-value").removeClass("has-placeholder");
	// 	}
	// 	else {
	// 		$(this).next().addClass("has-placeholder").removeClass("has-value");
	// 	}

	// });
	$(".js-select-age").multiselect({
		selectedList: 1,
		noneSelectedText: $(this).attr("data-placeholder"),
		header: "",
		multiple: false,
 		open: function () {
 			$(this).multiselect("widget").addClass("is-small");
 		},
 		close: function () {
 			$(this).multiselect("widget").removeClass("is-small");
 		}
	}).on("multiselectclick", function(event, ui) {
		if ($(this).multiselect("widget").find("input").is(":checked")) {
			$(this).next().addClass("has-value").removeClass("has-placeholder");
		}
		else {
			$(this).next().addClass("has-placeholder").removeClass("has-value");
		}

	});
	function selectList() {
		$(".js-select-single").multiselect({
			selectedList: 1,
			noneSelectedText: $(this).attr("data-placeholder"),
			header: "",
			multiple: false,
	 		open: function () {
	 			if ($(this).hasClass("has-not-checkbox")) {
	 				$(this).multiselect("widget").addClass("has-not-checkbox");
	 			}

	 		},
	 		close: function () {
	 			//$(this).multiselect("widget").removeClass("is-small");
	 		}
		}).on("multiselectclick", function(event, ui) {
			if ($(this).multiselect("widget").find("input").is(":checked")) {
				$(this).next().addClass("has-value").removeClass("has-placeholder");
			}
			else {
				$(this).next().addClass("has-placeholder").removeClass("has-value");
			}

		});
	}
	selectList();


	$(".js-textarea textarea").keyup(function () {
		var counter = $(this).parents(".js-textarea").find('.js-char-counter');
		var max = +counter.attr("data-max");
		var len = $(this).val().length;
		var char = max - len;
		if (len >= max) {
		    counter.addClass("is-limit").text(char);
		} else {
		    counter.removeClass("is-limit").text(char);
		}
	});
	$("body").on("keyup",".js-input input",function () {
		var counter = $(this).parents(".js-input").find('.js-char-counter');
		var max = +counter.attr("data-max");
		var len = $(this).val().length;
		var char = max - len;
		if (len >= max) {
		    counter.addClass("is-limit").text(char);
		} else {
		    counter.removeClass("is-limit").text(char);
		}
	});

	// function tab() {
 //       $(".js-tab").each(function(){
 //        	var tab_link = $(this).find("a");
 //        	var tab_cont = $(this).parents(".js-tab-group").find(".js-tab-cont");
 //        	tab_cont.hide();
 //            var id_active = $(this).find(".is-active").attr("href");
 //        	$("."+id_active).show();
 //        	$(this).parents(".js-tab-group").find(".js-tab1").show();
 //        	$("body").on("click",".js-tab a", function() {
 //            	var index = $(this).attr("href");
 //            	$(this).parents(".js-tab").find("li").removeClass("is-active");
 //            	$(this).parent().addClass("is-active");
 //            	$(this).parents(".js-tab-group").find(".js-tab-cont").hide();
 //            	$(this).parents(".js-tab-group").find("."+index).show();
 //            	return false;
 //          	});
 //       });
 //  	}
 //  	tab();
 	if ($(".js-tab").length) {
        $(".js-tab").tabs({
            beforeActivate: function(event, ui) {
                window.location.hash=ui.newPanel.selector;
            },
            // activate: function(event, ui) {
            // },
            load: function( event, ui ) {

            	fotoramaInit();

				inlineDatePicker();

				$( '.js-cycle' ).cycle();

				$("body").find(".js-sortable").sortable({
				      revert: true,
				      receive: function( event, ui ) {
				      	$(this).parent().find(".js-grid-message").hide();
				      }
				});
				if ($('.js-rating').length > 0) {
					$('.js-rating').each(function(){
						$(this).raty({
							width: 150,
							hints: ['Отвратительно', 'Плохо', 'Неплохо', 'Очень хорошо', 'Отлично'],
							starOff: 'img/star.png',
							starOn : 'img/star-act.png',
							score: function() {
								return $(this).attr('data-score');
							}
						});
					});

				}

				heightSidebar();
            }

        });
    }


	$("body").on("click",".js-more-lang",function(){
    	var lang = $(this).attr("href");
    	$("."+lang).slideToggle(200);
        return false;
    });
  	// $('.js-fotorama').fotorama({
  	// 	dots: true
  	// });

	function fotoramaInit() {
	  	var $fotoramaDiv = $('.js-fotorama').on('fotorama:ready', function () {
		    $('.js-fotorama').addClass("is-ready");
		}).fotorama();
	  	var fotorama = $fotoramaDiv.data('fotorama');
	  	$(".js-next-slide").on("click",function(){
			fotorama.show(">");
			return false;
		});
	}
	fotoramaInit();

	$(".js-radio-box input").on("change",function(){
		if ($(this).is(":checked")) {
			$(this).parents(".js-radio-box-group").find(".js-radio-box").removeClass("is-checked");
			$(this).parents(".js-radio-box").addClass("is-checked");
		}
	});

	$("body").on("change",".js-check input",function(){
		var checkGroup = $(this).closest(".js-check-group");
		var checkHidden = checkGroup.children(".js-check-hidden");
		if ($(this).is(":checked")) {
			checkHidden.addClass("is-visible");
			$(this).parent().addClass("is-checked");
		}
		else {
			checkHidden.removeClass("is-visible").addClass("is-hidden");
			$(this).parent().removeClass("is-checked");
		}
	});
	$("body").on("change",".js-check-add input",function(){
		if ($(this).is(":checked")) {
			$(this).parents(".js-check-group").addClass("is-active-add")
		}
		else {
			$(this).parents(".js-check-group").removeClass("is-active-add")
		}
	});
	$(".js-radio input").on("change",function(){
		var radio = $(this).closest(".js-radio");
		var radioGroup = $(this).parents(".js-radio-group");
		var radioHidden = radio.find(".js-radio-hidden");
		if ($(this).is(":checked")) {
			//radioHidden.removeAttr("hidden");
			radioGroup.find(".js-radio").removeClass("is-checked");
			radio.addClass("is-checked");
		}
		// else {
		// 	//radioHidden.attr("hidden","");
		// 	radioGroup.removeClass("is-checked");
		// }
	});

	$("body").on("click",".js-remove-btn",function(){
		$(this).parents(".js-removeable").addClass("is-remove-ready");
	    setTimeout(function(){
	    	$(".is-remove-ready").remove();
	    }, 200);

		return false;
	});
	$("body").on("click",".js-remove-btn",function(){
		if ($(this).parents(".js-grid").find(".js-draggable").length > 1) {

		}
		else {
			$(this).parents(".js-grid").find(".js-grid-message").show();
		}
		return false;
	});
	$("body").on("click",".js-add-btn",function(){
		var new_el = $(this).attr("data-hidden");
		var html = $("."+new_el).html();
		$(this).before(html);
		$(".js-select-single-added").multiselect({
			selectedList: 1,
			noneSelectedText: $(this).attr("data-placeholder"),
			header: "",
			multiple: false,
		});
		return false;
	});



	$("body").on("click",".js-show-invite",function(event) {
		$(".js-invite").removeAttr("hidden");
		$(this).addClass("is-disabled");
		event.stopPropagation();
		return false;
	});
	$(".js-show-filter").on("click",function() {
		var filterHeight = $(window).height() - $(this).offset().top - 143
		$(".js-sidebar-filter .sidebar__filter-scroll").css({
			height: filterHeight
		});
		$(".js-sidebar-filter").slideDown(200);
		$(this).parents(".js-sidebar").addClass("has-open-filter");
		
		return false;
	});
	$(".js-sidebar-filter").on("click",function(event) {
		event.stopPropagation();
	})

	$(".js-scroll-btn").on("click",function(){
    	var categ = $(this).attr("href");
    	var el = $('[data-el="'+categ+'"]');
    	var top = el.offset().top;
    	$('html, body').animate({
            scrollTop: top
        }, 200);
        return false;
    });

    $("body").on("click",".js-edit-grid",function(event){
    	$(this).parents(".js-grid").toggleClass("has-open-window");
    	event.stopPropagation();
        return false;
    });
    $("body").on("click",".js-remove-grid",function(event){
    	$(this).parents(".js-grid").addClass("is-remove-ready");
	    setTimeout(function(){
	    	$(".js-grid.is-remove-ready").remove();
	    }, 200);
    	event.stopPropagation();
        return false;
    });
    $("body").on("click",".js-grid-window",function(event) {
		event.stopPropagation();
	});

    // $(".js-drag-list").sortable({
    // 	items: ".js-drag-item"
    // });

	$("body").find(".js-sortable").sortable({
      revert: true,
      receive: function( event, ui ) {
      	$(this).parent().find(".js-grid-message").hide();
      }
    });
    function dragObject() {
    	$(".js-draggable").draggable({
    	connectToSortable: ".js-sortable",
    	helper: "clone",
    	revert: "invalid",
    	start: function( event, ui ) {
        	var top = $(".js-sidebar .sidebar__in").scrollTop();
        	$(".js-sidebar").addClass("disable-scroll");
        	$(".js-sidebar .sidebar__in").css({
        		marginTop: -top
        	});

    	  },
    	  stop: function( event, ui ) {
    	  	$(".js-sidebar").removeClass("disable-scroll");
    	  	$(".js-sidebar .sidebar__in").css({
    	  		marginTop: 0
    	  	});
    	  }

    	});
    }
    dragObject();


    $("body").on("click",".js-grid-save",function() {
    	var name = $(this).parents(".js-grid").find(".js-grid-input").val();
    	if (name.length>0) {
    		$(this).parents(".js-grid").removeClass("has-open-window").find(".js-grid-name").text(name);
    	}
		return false;
	});
	$("body").on("click",".js-grid-add",function(){
		//alert();
		var new_el = $(this).attr("data-hidden");
		var html = $("."+new_el).html();
		//if ($(this).parents(".js-add-btn-wrap")) {
			//$(this).parents(".js-add-btn-wrap").before(html);
		//}
		//else {
			$(this).parents(".js-grid").before(html);
		//}
		//$(".js-sortable").sortable("refresh");
		$(".js-new-grid .js-sortable").sortable({
		      revert: true,
		      receive: function( event, ui ) {
		      	$(this).parent().find(".js-grid-message").hide();
		      	$(this).parents(".js-new-grid").removeClass(".js-new-grid");
		      },
		});
		return false;
	});

	var header = $(".header");
	var footer = $(".footer");
	var sidebar = $(".js-sidebar");
	var sidebar_parent = $(".js-sidebar").parents(".l-cols");
	var filter = $(".js-filter");
	var body = $("body");
	var headerHeight = header.outerHeight();
	var footerHeight = footer.outerHeight();
	var sidebarHeight = sidebar.outerHeight();
	var filterHeight = filter.outerHeight();
	if (sidebar_parent.length >0) {
		var top = sidebar_parent.offset().top;
	}

    function fixedSidebar() {
    	if ($(document).scrollTop() >= top) {
    		body.addClass("has-fixed-sidebar");
    	}
    	else {
    		body.removeClass("has-fixed-sidebar");
    	}
    	if ($(document).scrollTop() >= footer.offset().top - $(window).height()) {
    		body.addClass("has-abs-sidebar")
    		sidebar.css({
    			bottom: 111
    		});
    	}
    	else {
    		body.removeClass("has-abs-sidebar");
    		sidebar.css({
    			bottom: 'auto'
    		});
    	}
    	//console.log($(document).scrollTop());
		//console.log(+footer.offset().top - $(window).height());
    }

  	function heightSidebar() {

		var height = $(window).height()

		if (sidebarHeight > height ) {
			sidebar.addClass("has-scroll").find(".sidebar__in").css({
				height: height - 25
			});
		}
		else {
			sidebar.removeClass("has-scroll").find(".sidebar__in").css({
				height: height -  25
			});
		}
		var heightCol = $(".js-content").outerHeight() + filterHeight + headerHeight;
		if ((heightCol <= body.height()) && $(".js-content").length > 0)  {
			if (filter.length > 0) {
				sidebar.find(".sidebar__in").css({
					height: body.height() - headerHeight - filterHeight - footerHeight - 30
				});
			}
			else {
				sidebar.find(".sidebar__in").css({
					height: body.height() - headerHeight - footerHeight - 30
				});
			}

		}

    }
    heightSidebar();
    $(".js-show-search").on("click",function(){
    	$(".js-filter-search").show();
    	$(".js-filter-result").hide();

        return false;
    });
    // if (sidebar.length>0) {
    // 	fixedSidebar();
    // }

    $(window).scroll(function() {
    	if (sidebar.length>0) {
    		fixedSidebar();
    	}
    });
	// $(window).resize(function() {
 //    	if (sidebar.length>0) {
 //    		fixedSidebar();
 //    	}
 //    });



    function ui_slider_range() {
		$(".js-ui-slider-range").each(function(){
			var slider = $(this).find(".js-ui-slider-main");
			var slider_min = $(this).find(".ui-slider-handle");
			var input_from = $(this).find(".js-ui-slider-from");
			var input_to = $(this).find(".js-ui-slider-to");
			var min_val = +$(this).attr("data-min");
			var max_val = +$(this).attr("data-max");
			slider_min.addClass("js-slider-min");
			slider.slider({
				range: true,
				min: min_val,
				max: max_val,
				step: 50,
				values: [ min_val, max_val ],
				slide: function( event, ui ) {
					$(this).find(".ui-slider-handle").html("<span></span>");
					$(this).find(".ui-slider-range").next().addClass("slider__min")
					$(this).find(".ui-slider-range").next().next().addClass("slider__max");
					input_from.text(ui.values[0]);
					input_to.text(ui.values[1]);
					//handle_0.text(ui.values[0]);
					//handle_1.text(ui.values[1]);
				}
			});
			//console.log(handle_0);
			//console.log(handle_1);
			$(this).find(".ui-slider-handle").html("<span></span>");
			$(this).find(".ui-slider-range").next().addClass("ui-slider__min")
			$(this).find(".ui-slider-range").next().next().addClass("ui-slider__max");
			//handle_0.text(slider.slider( "values", 0 ));
			//handle_1.text(slider.slider( "values", 1 ));
			input_from.text(slider.slider( "values", 0 ));
			input_to.text(slider.slider( "values", 1 ));
		});
	}
	ui_slider_range();

	 function ui_slider_age() {
		$(".js-ui-slider-age").each(function(){
			var slider = $(this).find(".js-ui-slider-main");
			var slider_min = $(this).find(".ui-slider-handle");
			var input_from = $(this).find(".js-ui-slider-from");
			var input_to = $(this).find(".js-ui-slider-to");
			var min_val = +$(this).attr("data-min");
			var max_val = +$(this).attr("data-max");
			slider_min.addClass("js-slider-min");
			slider.slider({
				range: true,
				min: min_val,
				max: max_val,
				step: 1,
				values: [ min_val, max_val ],
				slide: function( event, ui ) {
					$(this).find(".ui-slider-handle").html("<span></span>");
					$(this).find(".ui-slider-range").next().addClass("slider__min")
					$(this).find(".ui-slider-range").next().next().addClass("slider__max");
					input_from.text(ui.values[0]);
					input_to.text(ui.values[1]);
					//handle_0.text(ui.values[0]);
					//handle_1.text(ui.values[1]);
				}
			});
			//console.log(handle_0);
			//console.log(handle_1);
			$(this).find(".ui-slider-handle").html("<span></span>");
			$(this).find(".ui-slider-range").next().addClass("ui-slider__min")
			$(this).find(".ui-slider-range").next().next().addClass("ui-slider__max");
			//handle_0.text(slider.slider( "values", 0 ));
			//handle_1.text(slider.slider( "values", 1 ));
			input_from.text(slider.slider( "values", 0 ));
			input_to.text(slider.slider( "values", 1 ));
		});
	}
	ui_slider_age();


	$(".js-digits-only").keypress(function (e) {
	    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	        return false;
	    }
   	});


   $(".js-select select").on("change",function(){
		var	val = $(this).val();
		$(this).parent().find(".js-select-text").text(val);
	});

   function accordion() {
        //$(".js-accordion-list").hide();
        $(".js-accordion-title").click(function(){
            if ($(this).parent().hasClass("js-one-active")) {
                $(".js-accordion").removeClass("is-active");
                $(".js-accordion-list").slideUp("fast");
                $(this).parent().toggleClass("is-active");
                $(this).parents(".js-accordion").find(".js-accordion-list").slideToggle("fast");
            }
            else {
                $(this).parent().toggleClass("is-active");
                $(this).parents(".js-accordion").find(".js-accordion-list").slideToggle("fast");
            }
            $(".js-select-single").multiselect({
				selectedList: 1,
				noneSelectedText: $(this).attr("data-placeholder"),
				header: "",
				multiple: false,
			});

        });
        $(".js-show-all-accordion").on("click",function(){
            if ($(this).hasClass("is-active")) {
                $(".js-show-all-accordion").removeClass("is-active");
                $(".js-accordion-list").slideUp("fast");
                $(".js-show-all-accordion").text("ПОКАЗАТЬ ВСЕ ПУНКТЫ");
            }
            else {
                $(".js-show-all-accordion").addClass("is-active");
                $(".js-accordion-list").slideDown("fast");
                $(".js-show-all-accordion").text("скрыть все списки");
            }
            return false;
        });
    }
    accordion();

// show/hide any element
    $(".js-toggle-key").on("click", function(){
		var el = $(this).attr("data-toggle");
		$("."+el).fadeToggle(300);
		return false;
	});

// hide any element
	$(".js-hide-key").on("click", function(){
		var el = $(this).attr("data-hide");
		$("."+el).fadeOut(300);
		return false;
	});

	$(".js-open-help").on("click", function(){
		$(".js-content").hide();
		$(".js-help").show();
		return false;
	});
	$(".js-hide-help").on("click", function(){
		$(".js-content").show();
		$(".js-help").hide();
		return false;
	});

});