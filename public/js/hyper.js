(function($){

  $.fn.hyper = function(o) {
    var s = $.extend({
      wrapper_tag: "div",
      wrapper_class_prefix: "time_",
      unit_tags: "span",
      unit_class: "units",
      label_tags: "span",
      label_class: "labels",
      lang: "en",
      local: {
        en : {
          d: "day",
          ds: "days",
          h: "hour",
          hs: "hours",
          m: "minute",
          ms: "minutes",
          s: "second",
          ss: "seconds"
        }
      }
    } , o);

    if (typeof(s.starts_at) === "undefined") {
      return false;
    }

    var as_time = s.starts_at.getTime();
    var start = parseInt( as_time , 10);
    var element = this;

    var calculate_date = function() {

      var todays_date = new Date();

      var today = todays_date.getTime();
      var remainder = start - today;

      var sec = Math.floor(remainder/1000);
      var min = Math.floor(sec/60);
      var hours = Math.floor(min/60);
      var days = Math.floor(hours/24);

      return {
        secs: zeroify(String(sec%60)),
        mins: zeroify(String(min%60)),
        hours: zeroify(String(hours%24)),
        days: zeroify(String(days%365))
      };

    };

    var zeroify = function(string) {
      if ( string.length < 2 ) {
        return '0'+string;
      }
      return string;
    };

    var update_date = function(on) {
      var element = $(on);
      var latest = calculate_date();

      var l = s.local[s.lang];

      element.find("."+l.d).text(latest.days);
      element.find("."+l.h).text(latest.hours);
      element.find("."+l.m).text(latest.mins);
      element.find("."+l.s).text(latest.secs);

      element.trigger("hype.tick" , [latest]);

    };

    var create_elements = function(on) {
      $.each(['d','h','m','s'] , function(key,value){
        var holder = $('<'+s.wrapper_tag+'></'+s.wrapper_tag+'>').addClass(s.wrapper_class_prefix+value);
        var unit = $('<'+s.unit_tags+'></'+s.unit_tags+'>').addClass(s.unit_class).addClass(s.local[s.lang][value]);
        var label = $('<'+s.label_tags+'></'+s.label_tags+'>').addClass(s.label_class).text(s.local[s.lang][value+"s"]);

        holder.append(unit);
        holder.append(label);
        $(on).append(holder);  
      });
    };

    var init = function() {
      element.each(function(){
        var el = this;
        create_elements(el);
        update_date(el);

        setInterval(function(){
          update_date(el);
        },1000);

      });
    }();
  };

})(jQuery);