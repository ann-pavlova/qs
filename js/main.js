$(document).ready(function(){

    var lastId,
        topMenu = $("header"),
        topMenuHeight = 75,
        menuItems = topMenu.find("a"),
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });

/*===================
 //FIXED MENU
 ===================*/

    $(window).on("scroll touchmove", function () {
        $('header').toggleClass('tiny', $(document).scrollTop() > 50);
    });

/*===================
 //SCROLL AND TARGET
 ===================*/

    $('.menu a[href*=#]').bind('touchstart click', function(e) {
        var target = $(this).attr("href");

        var targetTopOffset = $(target).offset().top;
        if(Math.round(targetTopOffset) ==  $(document).scrollTop()) {return false;}

        var x = targetTopOffset - topMenuHeight;
        $('html, body').stop().animate({ scrollTop: x}, 400);
        $('.navbar-toggle:visible').click();

        e.preventDefault();
        return false;
    });

    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = $(this).scrollTop() + topMenuHeight + 2;

        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
                return this;
        });
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";

        if (lastId !== id) {
            lastId = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href='#"+id+"']").parent().addClass("active");
        }
    });


/*===================
 //RESPONSIVE BACKGROUND
 ===================*/

    $(window).resize(function(){
        background();
    });
    background();

    function background(){
        $("*[data-bg-width]").each(function(){
            var w = $(this).data('bg-width');
            var wts = $(this).data('bg-width-to-show');
            var contain = $(this).find('.container').innerWidth();
            var size = w * (contain / wts);
            $(this).css('background-size',   '50%' + size + 'px auto');
        });
    }

/*===================
 //CAROUSEL
 ===================*/

    $(".carousel").swiperight(function() {
        $(this).carousel('prev');
    });
    $(".carousel").swipeleft(function() {
        $(this).carousel('next');
    });


/*===================
 //PARALLAX
 ===================*/
$('#shell img').plaxify();
$.plax.enable();

/*===================
 //COUNTER
 ===================*/

    $('.counter').counterUp({
        delay: 50,
        time: 1500
    });
});
