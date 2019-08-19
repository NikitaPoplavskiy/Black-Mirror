$(document).ready(function(){
   $('a[href*=#]').bind("click", function(e){
      var anchor = $(this);      
      $('html, body').stop().animate({
         scrollTop: $(anchor.attr('href')).offset().top
      }, 1000);
      e.preventDefault();              
   });
   return false;
});

$(window).scroll(function(){
    if($(window).scrollTop() > 500)
    {
        $(".arrow").addClass("active");
    }
    else
    {
        $(".arrow").removeClass("active");
    }
});

