$(function(){
    var twitter = $("#tweet");
    var tweet = twitter.data("text");
    $(".timer").on("hype.tick" , function(e,time){
      var time_string = time.days+" days, "+time.hours+" hours, "+time.mins+" mins, "+time.secs+" secs";
      twitter.attr("data-text" , tweet+" "+time_string);
    });
    $(".timer").hyper({starts_at: new Date(2013,10,29,0,0,0,0)});
});