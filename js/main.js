var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getStreamerInfo(){

  streams.forEach(function(stream) {

      function makeURL(type, name) {
        return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
      };
      $.getJSON(makeURL("streams", stream), function(data) {
            var game;
            var status;

            if(data.stream ===null){
              game = "Offline";
              status = "Offline";
            }else if (data.stream === undefined) {
              game = "Account Closed";
              status = "Offline";
            }else{
              game = data.stream.game;
              status = "online";
            };
            $.getJSON(makeURL("streams", stream), function(data) {

                var logo, name, description, url, game;

                if(data.stream === null){
                  logo = "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F";
                  name = data._links.channel.replace("https://api.twitch.tv/kraken/channels/", "");
                  description = "";
                  url = 'https://www.twitch.tv/'+name;
                  game = "Offline";
                  status = "offline";
                }else{
                  logo = data.stream.channel.logo;
                  name = data.stream.channel.name;
                  description = data.stream.channel.status;
                  url = data.stream.channel.url;
                  game = data.stream.channel.game;
                }

                html = '<div class="row"><div class="col-md-2" id="icon"><img src="' +
                        logo + '" class="logo"></div><div class="col-md-5" id="name"><a href="' +
                        url + '" target="_blank">' +
                        name + '</a></div><div class="col-md-5" id="streaming">'+
                        game + description + '</span></div></div><br>'

                if(status === "online"){
                  $("#all").prepend(html);
                  $("#online").append(html);
                }else{
                  $("#all").append(html);
                  $("#offline").append(html);
                }



            });
      });
  });
};

$(document).ready(function(){
    getStreamerInfo();

});
