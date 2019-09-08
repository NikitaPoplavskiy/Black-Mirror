let player;

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

    let seasons = {};
    $.getJSON("data.json", function(data){
        seasons = data;
        console.log(seasons);
    }).done(function() {
        console.log("Test");
        renderSeasons(seasons);
    });

    player = videojs('player');
});


function renderSeasons(data)
{
    console.log(JSON.stringify(data));
    let source   = document.getElementById('text-template').innerHTML;
    let template = Handlebars.compile(source);
    let context;

    for (let season  of data.seasons) {
        for (let episode of season.episodes) {
            console.log(`Season  ${season.num}, episode ${JSON.stringify(episode)}`);
            context = {play_id: `s0${season.num}e0${episode.num}`, episode_num: episode.num, title: episode.title};
            let html = template(context);

            $("#episodeName").append(html);
        }
    }
}


function showPlayer(identifier)
{
    // console.log(JSON.stringify(event));
    // alert(event.type + " на " + event.currentTarget);
    // alert(event.clientX + ":" + event.clientY);
    console.log($(identifier).data("data"));
    let src = `http://s1.seplay.net/content/stream/films/black.mirror.${$(identifier).data("data")}.1080p.rus.lostfilm.tv/hls/index.m3u8 `
    console.log(src);
    // $("#player-container").find("source").attr("src") = src;
    $(".video-js").slideToggle(500);
    // $(".video-js").updateSrc(src);
    // player.updateSrc(src);
    // videojs('player').updateSrc(src);
    // videojs('player').src = src;
    // $("#player-container source").attr("src", src);
}

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

