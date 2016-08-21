$(document).ready(function(){
	var container = document.getElementById("vjs-container");
	var index = 0;
	
	create_video(container);		
	
	function create_video(container)
	{
		var videoTag;
		if (index > 0)
			videoTag = '<video id="video-js" class="video-js vjs-default-skin" width=960 height=396 controls preload="auto" poster="" >'  +
						'<source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"/>' +
						'<source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm"/>' +
						'<source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg"/>' +
						'<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that ' +
						'<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>' +
						'</p>' +
						'</video>';
		else 
			videoTag = '<video id="video-js" class="video-js vjs-default-skin" width=960 height=396 controls preload="auto" poster="http://s22.postimg.org/lfnkkdrv4/vidoverlay.jpg" >'  +
						'<source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4"/>' +
						'<source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm"/>' +
						'<source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg"/>' +
						'<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that ' +
						'<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>' +
						'</p>' +
						'</video>';
		container.innerHTML = videoTag;
		
		var video_container = document.getElementById("video-js");
		videojs.plugin('ads-setup', function (opts) {
			var player = this;
			var adsCancelTimeout = 3000000;

			var vastAd = player.vastClient({
			  adTagUrl : getAdsUrl,
			  playAdAlways: true,
			  adCancelTimeout: adsCancelTimeout,
			  adsEnabled: true
			});
			
			player.on('reset', function () {
				if (!vastAd.isEnabled()) {
					vastAd.enable();
				} else {
					vastAd.enable();
				}
			});
		});
		
		var adPluginOpts = {"plugins":{"ads-setup":{}}};	
		player = videojs(video_container, adPluginOpts);
		if (index > 0) player.play();
		if(player) {
			  player.on('vast.adStart', function() {
				player.one('vast.adEnd', function() {										
					player.dispose();
					index ++;
					index = index % 4;
					create_video(container);
				});
			  });
			  player.on('vast.adError', function() {
				alert("Vast Ads Error");
				player.dispose();
				index ++;
				index = index % 4;
				create_video(container);
			  });
			}
	}
	function getAdsUrl() 
	{
		switch(index)
		{
			case 0:
				return "http://servedby.flashtalking.com/imp/1/31714;812030;208;xml;DailyMail;640x360VASTHTML5/?cachebuster=%%CACHEBUSTER%%";
			case 1:
				return "http://rtr.innovid.com/r1.5554946ab01d97.36996823;cb=%25%CACHEBUSTER%25%25";
			case 2:
				return "https://loopme.me/api/vast/ads?appId=e18c19fa43&vast=2&uid=1234&ip=8.8.8.8&bundleid=com.loopme&appname=my_talking_pet&sdk=16.2&exchange=admarvel";
			case 3:
				return "http://vast.bp3867826.btrll.com/vast/3867826?n=__random-number__&br_pageurl=&br_w=__player-width__&br_h=__player-height__&br_conurl=";
			default:
				break;
		}
	}
});