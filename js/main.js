jQuery(document).ready(function($){

/*===================
 //FIXED MENU
 ===================*/

    $(window).on("scroll touchmove", function () {
        $('header').toggleClass('tiny', $(document).scrollTop() > 50);
    });

/*===================
 //NAVIGATION LINE
 ===================*/

//click-target
    $(document).ready(function() {
        $('.menu a[href*=#]').bind('touchstart click', function(e) {
            e.preventDefault();

            var target = $(this).attr("href");
            var hh = $(".header").height();

            $('html, body').stop().animate({ scrollTop: $(target).offset().top - hh}, 500, function() {
                location.hash = target;
            });
            $('.navbar-toggle:visible').click();
            return true;
        });
    });

//scroll-target
    var lastId,
        topMenu = $("header"),
        topMenuHeight = topMenu.outerHeight()+15,
    // All list items
        menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
        scrollItems = menuItems.map(function(){
            var item = $($(this).attr("href"));
            if (item.length) { return item; }
        });


    menuItems.on('touchstart click', function(e){
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });


    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = $(this).scrollTop()+topMenuHeight;

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
 //COUNTER
 ===================*/
    var time = 2;
    var cc = 1;
    $(window).scroll(function(){
        $('#counter').each(function(){
            var
                cPos = $(this).offset().top,
                topWindow = $(window).scrollTop();
            if(cPos < topWindow + 400) {
                if (cc < 2) {
                    $(".number").addClass("viz");
                    $('span.number').each(function () {
                        var
                            i = 1,
                            num = $(this).data('num'),
                            step = 1000 * time / num,
                            that = $(this),
                            int = setInterval(function () {
                                if (i <= num) {
                                    that.html(i);
                                }
                                else {
                                    cc = cc + 2;
                                    clearInterval(int);
                                }
                                i++;
                            }, step);
                    });
                }
            }
        });
    });

/*===================
 //PARALLAX
 ===================*/
    $('#shell img').plaxify();
    $.plax.enable();

});
