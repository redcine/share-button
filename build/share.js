!function(){function getStyles(config){ return "<style>"+config.selector+"{width:90px;height:20px;position:relative}"+config.selector+" label{cursor:pointer;margin:0;padding:3px 9px;border-radius:3px;background:#aaa;background:-webkit-linear-gradient(top,#aaa 0,#666 100%);background:-webkit-gradient(linear,left top,left bottom,from(#aaa),to(#666));background:linear-gradient(to bottom,#aaa 0,#666 100%);color:#222;-webkit-box-shadow:rgba(0,0,0,.55)0 1px 1px;box-shadow:rgba(0,0,0,.55)0 1px 1px;-webkit-font-smoothing:antialiased}"+config.selector+" label:hover{color:#900}"+config.selector+" label i{font-size:16px}"+config.selector+" label span{text-transform:uppercase;font-weight:700;padding-left:4px}"+config.selector+".light label{background:-webkit-linear-gradient(top,#ddd 0,#aaa 100%);background:-webkit-gradient(linear,left top,left bottom,from(#ddd),to(#aaa));background:linear-gradient(to bottom,#ddd 0,#aaa 100%)}"+config.selector+" .social{width:180px;-webkit-transform-origin:50% 0;-ms-transform-origin:50% 0;transform-origin:50% 0;-webkit-transform:scale(0) translateY(-180px);-ms-transform:scale(0) translateY(-180px);transform:scale(0) translateY(-180px);opacity:0;margin-left:-15px;-webkit-box-shadow:rgba(0,0,0,.55)0 5px 25px;box-shadow:rgba(0,0,0,.55)0 5px 25px;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}"+config.selector+" .social.active{opacity:1;-webkit-transition:all .4s ease;transition:all .4s ease}"+config.selector+" .social.active.center{margin-left:-45px}"+config.selector+" .social.active.left{margin-left:-115px}"+config.selector+" .social.active.right{margin-left:10px}"+config.selector+" .social.active.top{-webkit-transform:scale(1) translateY(-90px);-ms-transform:scale(1) translateY(-90px);transform:scale(1) translateY(-90px)}"+config.selector+" .social.active.top.center ul:after{margin:35px auto;border-top:20px solid #ddd}"+config.selector+" .social.active.top.left ul:after{margin:35px 0 0 129px;border-top:20px solid #ddd}"+config.selector+" .social.active.top.right ul:after{margin:35px 0 0 10px;border-top:20px solid #ddd}"+config.selector+" .social.active.bottom{-webkit-transform:scale(1) translateY(45px);-ms-transform:scale(1) translateY(45px);transform:scale(1) translateY(45px);margin-top:-14px}"+config.selector+" .social.active.bottom.center ul:after{margin:-10px auto;border-bottom:20px solid #ddd}"+config.selector+" .social.active.bottom.left ul:after{margin:-10px 0 0 129px;border-bottom:20px solid #ddd}"+config.selector+" .social.active.bottom.right ul:after{margin:-10px 0 0 10px;border-bottom:20px solid #ddd}"+config.selector+" .social ul{position:relative;left:0;right:0;width:180px;height:46px;color:#333;background:#ddd;margin:auto;padding:0;list-style:none}"+config.selector+" .social ul li{font-size:20px;cursor:pointer;width:60px;margin:0;padding:12px 0;text-align:center;float:left;display:block;height:22px;position:relative;z-index:2;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box}"+config.selector+" .social ul li:hover{color:#900}"+config.selector+" .social ul li i{padding-top:4px;-webkit-font-smoothing:antialiased}"+config.selector+" .social ul:after{content:'';display:block;width:0;height:0;position:absolute;left:0;right:0;border-left:20px solid transparent;border-right:20px solid transparent}"+config.selector+" .social li[class*=google-plus],"+config.selector+" .social li[class*=twitter]{background:#e6e6e6}</style>"};var $;

$ = jQuery;

$.fn.share = function(opts) {
  var $body, $head;
  if ($(this).length === 0) {
    console.log("Share Button: No elements found.");
    return;
  }
  $head = $('head');
  $body = $('body');
  return $(this).each(function(i, el) {
    var $sharer, bubble, bubbles, click_link, close, config, open, parent, paths, set_opt, toggle,
      _this = this;
    $sharer = $(this);
    $sharer.addClass("sharer-" + i);
    $sharer.hide();
    if (opts == null) {
      opts = {};
    }
    config = {};
    config.url = opts.url || window.location.href;
    config.text = opts.text || $('meta[name=description]').attr('content') || '';
    config.app_id = opts.app_id;
    config.title = opts.title;
    config.image = opts.image;
    config.flyout = opts.flyout || 'top center';
    config.button_color = opts.color || '#333';
    config.button_background = opts.background || '#e1e1e1';
    config.button_icon = opts.icon || 'share';
    config.button_text = typeof opts.button_text === 'string' ? opts.button_text : 'Share';
    set_opt = function(base, ext) {
      if (opts[base]) {
        return opts[base][ext] || config[ext];
      } else {
        return config[ext];
      }
    };
    config.twitter_url = set_opt('twitter', 'url');
    config.twitter_text = set_opt('twitter', 'text');
    config.fb_url = set_opt('facebook', 'url');
    config.fb_title = set_opt('facebook', 'title');
    config.fb_caption = set_opt('facebook', 'caption');
    config.fb_text = set_opt('facebook', 'text');
    config.fb_image = set_opt('facebook', 'image');
    config.gplus_url = set_opt('gplus', 'url');
    config.selector = "." + ($sharer.attr('class').split(" ").join("."));
    config.twitter_text = encodeURIComponent(config.twitter_text);
    if (typeof config.app_id === 'integer') {
      config.app_id = config.app_id.toString();
    }
    config.protocol = opts.protocol || (['http', 'https'].indexOf(window.location.href.split(':')[0]) === -1 ? 'https://' : '//');
    if (!$("meta[name='sharer" + config.selector + "']").length) {
      $('head').append(getStyles(config)).append("<meta name='sharer" + config.selector + "'>");
    }
    $(this).html("<label>\n  <i class='icon icon-share'></i>\n  <span>" + config.button_text + "</span>\n</label>\n<div class='social " + config.flyout + "'>\n  <ul>\n    <li class='twitter' data-network='twitter'>\n      <i class='icon icon-twitter icon-large'></i>\n    </li>\n    <li class='facebook' data-network='facebook'>\n      <i class='icon icon-facebook icon-large'></i>\n    </li>\n    <li class='google-plus' data-network='gplus'>\n      <i class='icon icon-google-plus icon-large'></i>\n    </li>\n  </ul>\n</div>");
    if (!window.FB && config.app_id && ($('#fb-root').length === 0)) {
      $body.append("<div id='fb-root'></div><script>(function(a,b,c){var d,e=a.getElementsByTagName(b)[0];a.getElementById(c)||(d=a.createElement(b),d.id=c,d.src='" + config.protocol + "connect.facebook.net/en_US/all.js#xfbml=1&appId=" + config.app_id + "',e.parentNode.insertBefore(d,e))})(document,'script','facebook-jssdk');</script>");
    }
    paths = {
      twitter: "http://twitter.com/intent/tweet?text=" + config.twitter_text + "&url=" + config.twitter_url,
      facebook: "https://www.facebook.com/sharer/sharer.php?u=" + config.fb_url,
      gplus: "https://plus.google.com/share?url=" + config.gplus_url
    };
    parent = $sharer.parent();
    bubbles = parent.find(".social");
    bubble = parent.find("" + config.selector + " .social");
    toggle = function(e) {
      e.stopPropagation();
      return bubble.toggleClass('active');
    };
    open = function() {
      return bubble.addClass('active');
    };
    close = function() {
      return bubble.removeClass('active');
    };
    click_link = function() {
      var link, popup;
      link = paths[$(this).data('network')];
      if (($(this).data('network') === 'facebook') && config.app_id) {
        if (!window.FB) {
          console.log("The Facebook JS SDK hasn't loaded yet.");
          return;
        }
        window.FB.ui({
          method: 'feed',
          name: config.fb_title,
          link: config.fb_url,
          picture: config.fb_image,
          caption: config.fb_caption,
          description: config.fb_text
        });
      } else {
        popup = {
          width: 500,
          height: 350
        };
        popup.top = (screen.height / 2) - (popup.height / 2);
        popup.left = (screen.width / 2) - (popup.width / 2);
        window.open(link, 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + popup.left + ",top=" + popup.top + ",width=" + popup.width + ",height=" + popup.height);
      }
      return false;
    };
    $sharer.find('label').on('click', toggle);
    $sharer.find('li').on('click', click_link);
    $body.on('click', function() {
      return bubbles.removeClass('active');
    });
    setTimeout((function() {
      return $sharer.show();
    }), 250);
    return {
      toggle: toggle.bind(this),
      open: open.bind(this),
      close: close.bind(this),
      options: config,
      self: this
    };
  });
};
}.call(this)