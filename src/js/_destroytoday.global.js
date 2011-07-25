(function() {
  var linkify, rgb2hex;
  jQuery.easing.def = 'easeInOutCubic';
  jQuery.timeago.settings.strings = {
    prefixAgo: null,
    prefixFromNow: 'in',
    suffixAgo: 'ago',
    suffixFromNow: null,
    seconds: 'several seconds',
    minute: 'a minute',
    minutes: '%d minutes',
    hour: 'an hour',
    hours: '%d hours',
    day: 'a day',
    days: '%d days',
    month: 'a month',
    months: '%d months',
    year: 'a year',
    years: '%d years'
  };
  rgb2hex = function(rgb) {
    var b, g, parse, r;
    parse = function(c) {
      return ("0" + parseInt(c, 10).toString(16)).slice(-2);
    };
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    r = parse(rgb[1]);
    g = parse(rgb[2]);
    b = parse(rgb[3]);
    return r + g + b;
  };
  linkify = function(text) {
    var exp;
    exp = /((?:ftp|http|https):\/\/)((\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
    return text.replace(exp, "<a href=\"$1$2\">$2</a>");
  };
  $(document).ready(function() {
    var getLatestTweet, twitterWidgets;
    $('.email').html('<a href="mailto:jonnie@destroytoday.com">jonnie@destroytoday.com</a>');
    $('.direction').mouseenter(function(event) {
      var title, title_wrapper;
      title_wrapper = $(event.currentTarget).children('a').children('.title_wrapper');
      title = title_wrapper.children('.title');
      title_wrapper.stop();
      title_wrapper.css('visibility', 'visible');
      return title_wrapper.animate({
        width: title.width()
      }, {
        duration: 350
      });
    });
    $('.direction').mouseleave(function(event) {
      var title, title_wrapper;
      title_wrapper = $(event.currentTarget).children('a').children('.title_wrapper');
      title = title_wrapper.children('.title');
      title_wrapper.stop();
      return title_wrapper.animate({
        width: 1
      }, {
        duration: 350,
        complete: function() {
          return title_wrapper.css('visibility', 'hidden');
        }
      });
    });
    $('.direction').click(function(event) {
      return window.location = $(event.currentTarget).children('a').attr('href');
    });
    $('.flash').each(function() {
      return $(this).html("<div class=\"swf\"></div>\n<div class=\"play\"></div>\n<div class=\"stop\"></div>\n<div class=\"placeholder\">" + ($(this).html()) + "</div>");
    });
    $('.flash').mouseenter(function(event) {
      var play, stop;
      play = $(this).children('.play');
      stop = $(this).children('.stop');
      if ($(this).children('.swf').css('display') === 'none') {
        play.css('opacity', 1);
        return stop.css('opacity', 0);
      } else {
        play.css('opacity', 0);
        return stop.css('opacity', 1);
      }
    });
    $('.flash').mouseleave(function(event) {
      $(this).children('.play').css('opacity', 0);
      return $(this).children('.stop').css('opacity', 0);
    });
    $('.flash').click(function(event) {
      var swf;
      if ($(this).children('.swf').css('display') === 'none') {
        event.preventDefault();
        $('.flash .swf').html('');
        $('.flash .swf').css('display', 'none');
        $('.flash .stop').css('opacity', 0);
        $('.flash .play').css('opacity', 0);
        swf = $(this).children('.swf');
        $(this).children('.stop').css('opacity', 1);
        swf.css('display', 'block');
        return swf.flash({
          swf: $(this).children('.placeholder').children('img').attr('src').replace(/\.(gif|jpg|jpeg|png)/i, '.swf'),
          width: swf.width(),
          height: swf.height(),
          bgcolor: rgb2hex($('body').css('background-color')),
          scale: 'noscale'
        });
      }
    });
    $('.flash .stop').click(function(event) {
      if ($(this).siblings('.swf').css('display') !== 'none') {
        event.stopPropagation();
        $(this).css('opacity', 0);
        $(this).siblings('.swf').html('');
        $(this).siblings('.swf').css('display', 'none');
        return $(this).siblings('.play').css('opacity', 1);
      }
    });
    if ($('#latest-tweet').length > 0) {
      getLatestTweet = function() {
        return $.ajax({
          url: "http://twitter.com/statuses/user_timeline/destroytoday.json?count=10",
          dataType: 'jsonp',
          success: function(data) {
            return $.each(data, function(key, value) {
              var tweet;
              if (value.text.substring(0, 1) !== "@") {
                tweet = linkify(value.text) + "<br/><a href=\"http://twitter.com/destroytoday\">destroytoday</a> <a class=\"timestamp\" href=\"http://twitter.com/destroytoday/status/" + value.id_str + "\">" + jQuery.timeago(value.created_at).replace(/[\s]+/ig, '&nbsp;') + "</a>";
                $('#latest-tweet p').html(tweet);
                $('#latest-tweet').css('height', $('#latest-tweet p').height() + $('#latest-tweet hr').height());
                return false;
              }
            });
          }
        });
      };
      getLatestTweet();
    }
    /*
        if ($("#latest-flickr"))
        {
            $.ajax({
                url: "http://api.flickr.com/services/feeds/photos_public.gne?id=13185812@N03&lang=en-us&format=json",
                dataType: "jsonp",
                jsonpCallback: "jsonFlickrFeed",
                success: function(data)
                {
                    $('#latest-flickr').html('<img src="' + data.items[0].media.m + '" />');
                }
            });
        }
        */
    $(".twitter-follow-button").attr('data-text-color', rgb2hex($("body").css('color')));
    $(".twitter-follow-button").attr('data-link-color', rgb2hex($(".twitter-follow-button").css('color')));
    twitterWidgets = document.createElement('script');
    twitterWidgets.type = 'text/javascript';
    twitterWidgets.async = true;
    twitterWidgets.src = 'http://platform.twitter.com/widgets.js';
    return document.getElementsByTagName('head')[0].appendChild(twitterWidgets);
  });
}).call(this);
