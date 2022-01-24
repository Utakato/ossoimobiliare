; 

$('#imageCarousel').on("slide", function(e) {
    //SCROLLING LEFT
    var prevItem = $('.active.item', this).prev('.item');
    //Account for looping to LAST image
    if(!prevItem.length){
        prevItem = $('.active.item', this).siblings(":last");
    }
    //Get image selector
    prevImage = prevItem.find('img');
    //SCROLLING RIGHT
    var nextItem = $('.active.item', this).next('.item');
    //Account for looping to FIRST image
    if(!nextItem.length){
        nextItem = $('.active.item', this).siblings(":first");
    }
    //Get image selector
    nextImage = nextItem.find('img');
});

// custom functions
function showFullText() {
    var dots = document.getElementById("dots");
    var fullText = document.getElementById("fullText");
    var btnText = document.getElementById("fullTextBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Citește toată descrierea";
      fullText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "";
      fullText.style.display = "inline";
    }
  }

function isNumber(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ( (charCode > 31 && charCode < 48) || charCode > 57) {
            return false;
        }
        return true;
    }


function redirect(goto){
    window.location = goto;
    // console.log("redirect", goto)
}
// $(function() {
//     $('#hide-header-mobile').css("background-image", "");
// })

function getParamsObjectFromUrl() {
    const url =  window.location.href.split("?")[1]
    const params = url.split("&")
    const paramsObject = {}
    params.forEach(param => {
        let kv = param.split("=")
        paramsObject[kv[0]] = kv[1]
    })
    delete paramsObject.page
    return paramsObject
}

$(function() {
    
    let paramsObject = getParamsObjectFromUrl()
    // console.log(paramsObject) 
    for (param in paramsObject){
        if ( param == "sortBy") {
            const select = $("#"+ param + paramsObject[param])[0]
            select.selected = true

        }else if ( param == "minRooms" || param == "maxRooms" || param == "transactionType"){
            const select = $("#" + param + paramsObject[param])[0]
            // console.log("this", select)
            select.selected = true   
        } else if (param == "propType"){

            // console.log(paramsObject[param])
            const decodedParam = paramsObject[param].replaceAll("%2C+", ", ")
            // console.log("decoded" , decodedParam)
            const propTypeObj = {
             "1, 3, 4, 5, 6, 7" : "propType1",
             "1" : "propType2",
             "3" : "propType3",
             "4, 5, 7" : "propType4",
             "6" : "propType5",
            }
            const select = $("#"+propTypeObj[decodedParam])[0]
            // console.log("this", select)
            select.selected = true
        } else if (param == "areas") {
            const decodedParam = paramsObject[param].replaceAll("+", " ")
            const areasList = decodedParam.split("%2C")
            // console.log(areasList)
            areasList.forEach(area => {
                const checkbox = $("#zona_" + area.replace(" ","_"))[0]
                // console.log(checkbox)
                if (checkbox != null){
                    checkbox.checked = true
                }
                
            })
        } else if (paramsObject[param] != "undefined"){ 
            const select = $("#" + param)[0]
            select.defaultValue = paramsObject[param]
            // console.log(select)
        }
    }

})



$(function () {
    "use strict";

    $(document).ready(function () {
        // custom js

        
        
        $('.carousel').on('touchstart', function(event){
            const xClick = event.originalEvent.touches[0].pageX;
            $(this).one('touchmove', function(event){
                const xMove = event.originalEvent.touches[0].pageX;
                const sensitivityInPx = 5;
        
                if( Math.floor(xClick - xMove) > sensitivityInPx ){
                    $(this).carousel('next');
                }
                else if( Math.floor(xClick - xMove) < -sensitivityInPx ){
                    $(this).carousel('prev');
                }
            });
            $(this).on('touchend', function(){
                $(this).off('touchmove');
            });
        });
        $(".sortSelect").on("change", function(){
            var url = window.location.href
            var goto;
            var sortBy = "&sortBy=" + this.value

            if (url.includes("&sortBy=")){
                goto = url.replace(/&sortBy=\d/, sortBy) 

            }else if (url.includes("sortBy=")){
                sortBy = "sortBy=" + this.value
                goto = url.replace(/sortBy=\d/, sortBy) 

            }else {
                if ( url.split("?")[1].length < 1){
                    sortBy = "sortBy=" + this.value
                }
                goto = url + sortBy;
            }
            redirect(goto)
        })
        
                 
        /**-----------------------------
         *  Navbar fix
         * ---------------------------*/
        $(document).on('click', '.navbar-area .navbar-nav li.menu-item-has-children>a', function (e) {
            e.preventDefault();
        })
       
        /*-------------------------------------
            menu
        -------------------------------------*/
        $('.menu').click (function(){
            $(this).toggleClass('open');
        });
    
        // mobile menu
        if ($(window).width() < 992) {
            $(".in-mobile").clone().appendTo(".sidebar-inner");
            $(".in-mobile ul li.menu-item-has-children").append('<i class="fas fa-chevron-right"></i>');
            $('<i class="fas fa-chevron-right"></i>').insertAfter("");

            $(".menu-item-has-children a").click(function(e) {
                // e.preventDefault();

                $(this).siblings('.sub-menu').animate({
                    height: "toggle"
                }, 300);
            });
        }

        var menutoggle = $('.menu-toggle');
        var mainmenu = $('.navbar-nav');
        
        menutoggle.on('click', function() {
            if (menutoggle.hasClass('is-active')) {
                mainmenu.removeClass('menu-open');
            } else {
                mainmenu.addClass('menu-open');
            }
        });

        /*--------------------------------------------------
            select onput
        ---------------------------------------------------*/
        if ($('.single-select').length){
            $('.single-select').niceSelect();
        }
        

        /*--------------------------------------------------
            service slider
        ---------------------------------------------------*/
        var $serviceCarousel = $('.service-slider');
        if ($serviceCarousel.length > 0) {
            $serviceCarousel.slick({
                dots: false,
                slidesToScroll: 1,
                speed: 400,
                loop: true,
                slidesToShow: 4,
                autoplay: false,
                prevArrow: '<span class="slick-prev"><i class="fa fa-angle-left"></i></span>',
                nextArrow: '<span class="slick-next"><i class="fa fa-angle-right"></i></span>',
                responsive: [
                    {
                        breakpoint: 1100,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                        }
                    },
                    {
                        breakpoint: 575,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                        }
                    }
                ]
            });
        }

        
        /* --------------------------------------------------
            city 
        ---------------------------------------------------- */
        var $cityFilterArea = $('.city-filter-area');
        /*Grid*/
        $cityFilterArea.each(function(){
            var $this = $(this),
            $cityFilterItem = '.rld-city-item';
            $this.imagesLoaded( function() {
                $this.isotope({
                    itemSelector: $cityFilterItem,
                    percentPosition: true,
                    masonry: {
                        columnWidth: '.city-sizer',
                    }
                });
            });
        });


        /* --------------------------------------------------
            property filter 
        ---------------------------------------------------- */
        var $Container = $('.property-filter-area');
        if ($Container.length > 0) {
            $('.property-filter-area').imagesLoaded(function () {
                var festivarMasonry = $Container.isotope({
                    itemSelector: '.rld-filter-item', // use a separate class for itemSelector, other than .col-
                    masonry: {
                        gutter: 0
                    }
                });
                $(document).on('click', '.property-filter-menu > button', function () {
                    var filterValue = $(this).attr('data-filter');
                    festivarMasonry.isotope({
                        filter: filterValue
                    });
                });
            });
            $(document).on('click','.property-filter-menu > button' , function () {
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
            });
        }

        /*--------------------------------------
            Active
        ---------------------------------------*/
        $(document).on('mouseover','.single-intro-media',function() {
            $(this).addClass('single-intro-media-active');
            $('.single-intro-media').removeClass('single-intro-media-active');
            $(this).addClass('single-intro-media-active');
        });

        /*--------------------------------------
            range slider
        ---------------------------------------*/
        $( function() {
            var handle = $( ".ui-slider-handle-price" );
            $( ".rld-price-slider" ).slider({
                range: "min",
                value: 750,
                min: 1,
                max: 3500,
                create: function() {
                    handle.text( $( this ).slider( "value" ) );
                },
                slide: function( event, ui ) {
                    handle.text( ui.value );
                }
            });
        } );
        $( function() {
            var handle = $( ".ui-slider-handle-size" );
            $( ".rld-size-slider" ).slider({
                range: "min",
                value: 600,
                min: 1,
                max: 6500,
                create: function() {
                    handle.text( $( this ).slider( "value" ) );
                },
                slide: function( event, ui ) {
                    handle.text( ui.value );
                }
            });
        } );

        /*--------------------------------------------
            News Search
        ---------------------------------------------*/
        if ($('.news-search-btn').length){
            $(".news-search-btn").on('click', function(){
                $(".news-search-box").toggleClass("news-search-box-show", "linear");
            });
            $('body').on('click', function(event) {
                if (!$(event.target).closest('.news-search-btn').length && !$(event.target).closest('.news-search-box').length) {
                    $('.news-search-box').removeClass('news-search-box-show');
                }
            });
        }

        /*-------------------------------------------------
           back to top
       --------------------------------------------------*/
        $(document).on('click', '.back-to-top', function () {
            $("html,body").animate({
                scrollTop: 0
            }, 2000);
        });


        /*-------------------------------------------------
           parallax
        --------------------------------------------------*/
        if ($.fn.jarallax) {
            $('.jarallax').jarallax({
                speed: 0.5
            });
        }


    });

    $(window).on("scroll", function() {
        /*---------------------------------------
        sticky menu activation && Sticky Icon Bar
        -----------------------------------------*/
        var mainMenuTop = $(".navbar-area");
        if ($(window).scrollTop() >= 1) {
            mainMenuTop.addClass('navbar-area-fixed');
        }
        else {
            mainMenuTop.removeClass('navbar-area-fixed');
        }
        
        var ScrollTop = $('.back-to-top');
        if ($(window).scrollTop() > 1000) {
            ScrollTop.fadeIn(1000);
        } else {
            ScrollTop.fadeOut(1000);
        }
    });


    $(window).on('load', function () {

        /*-----------------
            preloader
        ------------------*/
        var preLoder = $("#preloader");
        preLoder.fadeOut(0);

        /*-----------------
            back to top
        ------------------*/
        var backtoTop = $('.back-to-top')
        backtoTop.fadeOut();

        /*---------------------
            Cancel Preloader
        ----------------------*/
        $(document).on('click', '.cancel-preloader a', function (e) {
            e.preventDefault();
            $("#preloader").fadeOut(2000);
        });
    });
})
// (jQuery);