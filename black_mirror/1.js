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
	
    /*$('.spoiler-body').click(function(event){
        episodes_name = event.target.getAttribute("data");
        $("#episode-name").empty();
        renderEpisodeName(episodes_name);
        $(".episode-name").slideToggle(500);
		$(".video-js").slideToggle(500);
    });*/

    $('.spoiler-body').click(function(){        
		$(".video-js").slideToggle(500);
    });
    
    let seasons = {};    
    
    $.getJSON("data.json", function(data){
        seasons = data;
        console.log(seasons);
    }).done(function() {
        console.log("Test");
          renderSeasonsButtons(seasons);
        $('.spoiler-title').click(function(event)
        {	           
            episodes = event.target.getAttribute("data");
            console.log(event.target);    
            console.log(episodes);
            $("#episode-container").empty();
            renderEpisodesButtons(episodes);    
            $(".spoiler-body").slideToggle(500);                                
        });
        let list =  document.getElementsByTagName();
        $("list").click(function(event)
        {
            episodes_name = event.target.getAttribute("data");
            console.log(event.target);
            console.log(episodes_name);
            $("#episode-name").empty();
            renderEpisodeName(episodes_name);
        });
    });
    
    player = videojs('player');
});


function renderSeasonsButtons(data)
{
    let source = document.getElementById('season-button-template').innerHTML;
    let template = Handlebars.compile(source);
    let context;    
    
    for (let season  of data.seasons) {
        
//            console.log(`Season  ${season.num}, episode ${JSON.stringify(episode)}`);
            context = {season_num: season.num, episodes: JSON.stringify(season.episodes)};
            let html = template(context);

            $("#season-container").append(html);        
    }
}

function renderEpisodesButtons(episodesTxt)
{
    let source = document.getElementById('episode-button-template').innerHTML;
    let template = Handlebars.compile(source);
    let context;
    let episodes = JSON.parse(episodesTxt);    
    
//    console.log(JSON.stringify(episodes));    
    for (let episode of episodes) {
//            console.log(`Season  ${season.num}, episode ${JSON.stringify(episode)}`);
        context = {episode_num: episode.num};
        let html = template(context);

        $("#episode-container").append(html);
    }    
}

/*function renderSeasons(data)
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
}*/

function renderEpisodeName(nameTxt)
{
    let source   = document.getElementById('name-template').innerHTML;
    let template = Handlebars.compile(source);
    let context;
    
    let episodes_name = JSON.parse(nameTxt);
    
    for (let episode of episodes_name) {
//            console.log(`Season  ${season.num}, episode ${JSON.stringify(episode)}`);
        context = {episode_name: episode.title};
        let html = template(context);

        $("#episode-name").append(html);
    }        
}


function showPlayer(identifier)
{
    // console.log(JSON.stringify(event));
    // alert(event.type + " на " + event.currentTarget);
    // alert(event.clientX + ":" + event.clientY);
    console.log($(identifier).data("data"));
//    let src = `http://s1.seplay.net/content/stream/films/black.mirror.${$(identifier).data("data")}.1080p.rus.lostfilm.tv/hls/index.m3u8`
    let src = 'https://streamguard.cc/manifest/index.m3u8?sksklajd=cbn983jknmd&tok=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzb3VyY2UiOiJzZXNzaW9uIiwiZXhwIjoxNTY4NTczMjYyLCJ2IjoiMGYyNDk2MzY0NThlNzBjNSIsImEiOnRydWUsInAiOjE1NywiaCI6ImEyNTdiZjZlZWQyNjFiMGYyNWE4ZmM5YmRmNzQ5MjMzNTVmY2FkMTk5MzU5MWEzNWYzNmJiMzYxM2Y0MzViNDUiLCJyIjp0cnVlfQ.qN5FOUpgw6HsxWosDrj6lxr6BQHFKncNIy_vfrVt3eY';
    console.log(src);
    $("#player-container").find("source").attr("src") = src;
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

/*$('#spoiler-title').click(function(){
	alert("Darova");
  $(".spoiler-body").fadeToggle(100);  
});*/


