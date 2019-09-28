let player;
let movePlayer = true;
let moveSeasons = true;

$(document).ready(function(){	 
	
    $('a[href*=#][class="test"]').bind("click", function(e){
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
    $('.spoiler-title').click(function(){        
        
        $(".spoiler-body").slideToggle(500);             
	});

    $('.spoiler-body').click(function(){        
        if(movePlayer == true){
            $(".gif").hide();
		    $(".video-js").slideToggle(500);
            movePlayer = false;
        }               
    });
    
    let seasons = {};    
    
    $.getJSON("data.json", function(data){
        seasons = data;
    }).done(function() {
        console.log("Test");
          renderSeasonsButtons(seasons);        
        $('.spoiler-title').click(function(event)
        {	                                   
            let episodes = event.target.getAttribute("data");            
            $("#episode-container").empty();
            
            /*if(moveSeasons == true){
               
                $(".spoiler-body").slideDown("slow");    
                moveSeasons = false;
            }
            else{
                
                $(".spoiler-body").slideUp("slow");    
                $(".spoiler-body").slideDown("slow");                
            }*/
            renderEpisodesButtons(episodes);

            //Назначаем проигрывание выбраного эпизода по щелчку            
            $('.episode-button').click(function(event)
            {
                let videoSource = event.target.getAttribute("data-source");

                let title = event.target.getAttribute("data-title");

                 $('#episode-name').text(title);
                // renderPlayer(videoSource);
                let player = videojs('player');
                player.src(videoSource);

            });                        
            if(moveSeasons == true){
               
                $(".spoiler-body").slideDown("slow");    
                moveSeasons = false;
            }
            /*else{
                
                $(".spoiler-body").slideUp("slow");    
                $(".spoiler-body").slideDown("slow");                
            }*/
        });
    });
});


function renderSeasonsButtons(data)
{
    let source = document.getElementById('season-button-template').innerHTML;
    let template = Handlebars.compile(source);
    let context;    
    
    for (let season  of data.seasons) {
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

    for (let episode of episodes) {
        context = {episode_num: episode.num, source: episode.source, title: episode.title};
        let html = template(context);

        $("#episode-container").append(html);
    }    
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



