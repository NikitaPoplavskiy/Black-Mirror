$(document).ready(function(){
	 $('.spoiler-title').click(function(){	
		//$(".spoiler-body").fadeToggle(500); 
		$(".spoiler-body").slideToggle(500);  		
	});
	
    $('a[href*=#][class="test"]')/*.has('.test')*/.bind("click", function(e){
	// $('.test').bind("click", function(e){
      var anchor = $(this);      
      $('html, body').stop().animate({
         scrollTop: $(anchor.attr('href')).offset().top								
      }, 1000);
      e.preventDefault();              
   });
	
	  $('.spoiler-body').click(function(){		
		$(".video-js").slideToggle(500);
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

/*
$('.spoiler-title').click(function(){
	alert("Darova");
  $(".spoiler-body").fadeToggle(100);  
});


$('#spoiler-title').click(function(){
	alert("Darova");
  $(".spoiler-body").fadeToggle(100);  
});
*/

