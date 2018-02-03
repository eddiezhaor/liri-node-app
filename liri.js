


require("dotenv").config();
var fs=require("fs")
var request=require("request");
var Twitter = require('twitter');
var Spotify=require('node-spotify-api');
var keys=require('./keys.js');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userInput=process.argv[2];
var choice=process.argv.slice(3).join(" ");

function formatData (track) {
    // Look through the data object and find the info you need and return a new object with that info

    console.log(`
Artist: ${track.artists[0].name }
Name: ${track.name}
Link: ${track.preview_url}
Album: ${track.album.name}
    `)

}





if(userInput==="my-tweets"){ 
    
    fs.appendFile("log.txt","\n"+userInput+" "+choice,function(err){
        if(err){
            console.log(err);
        }
    })   
    var param={ user_id:3863262616,
                count:20}
    client.get('statuses/user_timeline', param, function(error, tweets, response) {
        if(error) throw error;
        for (var i=0;i<tweets.length;i++){
            console.log(i+1+'. '+'Tweets: '+tweets[i].text+" "+'Posted Time: '+tweets[i].created_at);  
        }
      });
}

if(userInput==="spotify-this-song"){
    fs.appendFile("log.txt","\n"+userInput+" "+choice,function(err){
        if(err){
            console.log(err);
        }
    })   
    if(choice===""){

    spotify.search({ type: 'track', query: 'The Sign' }, function(err, data) {
        
        if (err) {
          return
           console.log('Error occurred: ' + err);
        }
        
        formatData(data.tracks.items[0])
      });
    }else{
        spotify.search({ type: 'track', query: `${choice}` }, function(err, data) {
            
            if (err) {
              return
               console.log('Error occurred: ' + err);
            }
            
            formatData(data.tracks.items[0])
          });
    }    
}

if(userInput==="movie-this"){
    fs.appendFile("log.txt","\n"+userInput+" "+choice,function(err){
        if(err){
            console.log(err);
        }
    })   
    if(choice===""){
        var url="http://www.omdbapi.com/?apikey=trilogy&t=Mr. Nobody"
        request(url,function(error,response, body){
            if(!error && response.statusCode===200){
                var data=JSON.parse(body)
                console.log(`
Title: ${data.Title}
Year: ${data.Year} 
IMDB Rating: ${data.imdbRating}
Rotten Tomatoes Rating: ${data.Ratings[1].Value}
Country: ${data.Country}
Language: ${data.Language}
Plot: ${data.Plot}
Actors: ${data.Actors}`)
            }
        })
    }else{
        var url="http://www.omdbapi.com/?apikey=trilogy&t="+choice
        request(url,function(error,response, body){
            if(!error && response.statusCode===200){
                var data=JSON.parse(body)
                console.log(`
Title: ${data.Title}
Year: ${data.Year} 
IMDB Rating: ${data.imdbRating}
Rotten Tomatoes Rating: ${data.Ratings[1].Value}
Country: ${data.Country}
Language: ${data.Language}
Plot: ${data.Plot}
Actors: ${data.Actors}`)
            }
        })

    }
}

if(userInput==="do-what-it-says"){
    fs.appendFile("log.txt","\n"+userInput+" "+choice,function(err){
        if(err){
            console.log(err);
        }
    })   
    fs.readFile("random.txt","utf8",function(err,data){
        if(err) throw err
        console.log(data);
    })
}
                             
      