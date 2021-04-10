var get_vimeo_videoID=function(e){return e.indexOf("vimeo.com")>0?e.substr(e.lastIndexOf("/")+1,e.length):e.length>15?null:e};(function($){jQuery.vimeo_player={name:"jquery.mb.vimeo_player",author:"Matteo Bicocchi (pupunzi)",version:"1.0.6",build:"373",defaults:{containment:"body",ratio:"16/9",videoURL:null,startAt:0,stopAt:0,autoPlay:!0,vol:50,addRaster:!1,opacity:1,mute:!1,loop:!0,showControls:!0,show_vimeo_logo:!0,stopMovieOnBlur:!0,realfullscreen:!0,mobileFallbackImage:null,gaTrack:!0,optimizeDisplay:!0,mask:!1,align:"center,center",onReady:function(e){}},controls:{play:"P",pause:"p",mute:"M",unmute:"A",fullscreen:"O",showSite:"R",logo:"V"},buildPlayer:function(options){var isIframe=function(){var e=!1;try{self.location.href!=top.location.href&&(e=!0)}catch(r){e=!0}return e},script=document.createElement("script");return script.src="https://player.vimeo.com/api/player.js",script.onload=function(){jQuery(document).trigger("vimeo_api_loaded")},document.head.appendChild(script),this.each((function(){var vimeo_player=this,$vimeo_player=jQuery(vimeo_player);vimeo_player.loop=0,vimeo_player.opt={},vimeo_player.state={},vimeo_player.id=vimeo_player.id||"YTP_"+(new Date).getTime(),$vimeo_player.addClass("vimeo_player");var property=$vimeo_player.data("property")&&"string"==typeof $vimeo_player.data("property")?eval("("+$vimeo_player.data("property")+")"):$vimeo_player.data("property");if(jQuery.extend(vimeo_player.opt,jQuery.vimeo_player.defaults,options,property),vimeo_player.opt.ratio="auto"==vimeo_player.opt.ratio?"16/9":vimeo_player.opt.ratio,eval(vimeo_player.opt.loop)&&(vimeo_player.opt.loop=9999),vimeo_player.isRetina=window.retina||window.devicePixelRatio>1,vimeo_player.canGoFullScreen=!(jQuery.browser.msie||jQuery.browser.opera||isIframe()),vimeo_player.canGoFullScreen||(vimeo_player.opt.realfullscreen=!1),vimeo_player.isAlone=!1,vimeo_player.hasFocus=!0,vimeo_player.videoID=this.opt.videoURL?get_vimeo_videoID(this.opt.videoURL):!!$vimeo_player.attr("href")&&get_vimeo_videoID($vimeo_player.attr("href")),vimeo_player.isSelf="self"==vimeo_player.opt.containment,vimeo_player.opt.containment="self"==vimeo_player.opt.containment?jQuery(this):jQuery(vimeo_player.opt.containment),vimeo_player.isBackground=vimeo_player.opt.containment.is("body"),!vimeo_player.isBackground||!vimeo_player.backgroundIsInited){vimeo_player.canPlayOnMobile=vimeo_player.isSelf&&0===jQuery(this).children().length,vimeo_player.isSelf||$vimeo_player.hide();var overlay=jQuery("<div/>").css({position:"absolute",top:0,left:0,width:"100%",height:"100%"}).addClass("vimeo_player_overlay");vimeo_player.isSelf;var playerID="vimeo_player_"+vimeo_player.id,wrapper=jQuery("<div/>").addClass("vimeo_player_wrapper").attr("id","vimeo_player_wrapper_"+playerID);if(wrapper.css({position:"absolute",zIndex:0,minWidth:"100%",minHeight:"100%",left:0,top:0,overflow:"hidden",opacity:0}),vimeo_player.playerBox=jQuery("<iframe/>").attr("id",playerID).addClass("playerBox"),vimeo_player.playerBox.css({position:"absolute",zIndex:0,width:"100%",height:"100%",top:-10,frameBorder:0,overflow:"hidden",left:0}).attr({src:"https://player.vimeo.com/video/"+vimeo_player.videoID+"?background=1&autopause=0"}),jQuery.browser.mobile&&!vimeo_player.canPlayOnMobile)return vimeo_player.opt.mobileFallbackImage&&wrapper.css({backgroundImage:"url("+vimeo_player.opt.mobileFallbackImage+")",backgroundPosition:"center center",backgroundSize:"cover",backgroundRepeat:"no-repeat",opacity:1}),void $vimeo_player.remove();wrapper.append(vimeo_player.playerBox),vimeo_player.opt.containment.children().not("script, style").each((function(){"static"==jQuery(this).css("position")&&jQuery(this).css("position","relative")})),vimeo_player.isBackground?(jQuery("body").css({boxSizing:"border-box"}),wrapper.css({position:"fixed",top:0,left:0,zIndex:0})):"static"==vimeo_player.opt.containment.css("position")&&vimeo_player.opt.containment.css({position:"relative"}),vimeo_player.opt.containment.prepend(wrapper),vimeo_player.wrapper=wrapper,vimeo_player.playerBox.css({opacity:1}),jQuery.browser.mobile||(vimeo_player.playerBox.after(overlay),vimeo_player.overlay=overlay),vimeo_player.isBackground||overlay.on("mouseenter",(function(){vimeo_player.controlBar&&vimeo_player.controlBar.length&&vimeo_player.controlBar.addClass("visible")})).on("mouseleave",(function(){vimeo_player.controlBar&&vimeo_player.controlBar.length&&vimeo_player.controlBar.removeClass("visible")})),jQuery(document).on("vimeo_api_loaded",(function(){vimeo_player.player=new Vimeo.Player(playerID,options),vimeo_player.player.ready().then((function(){var VEvent;function start(){vimeo_player.isReady=!0,vimeo_player.opt.mute&&setTimeout((function(){$vimeo_player.v_mute()}),1e3),vimeo_player.opt.showControls&&jQuery.vimeo_player.buildControls(vimeo_player),vimeo_player.opt.autoPlay?setTimeout((function(){$vimeo_player.v_play(),setTimeout((function(){VEvent=jQuery.Event("VPStart"),$vimeo_player.trigger(VEvent)}),1500)}),100):$vimeo_player.v_pause(),VEvent=jQuery.Event("VPReady"),$vimeo_player.trigger(VEvent)}vimeo_player.opt.startAt?(vimeo_player.player.play().then((function(){vimeo_player.player.pause()})),$vimeo_player.v_seekTo(vimeo_player.opt.startAt,(function(){start()}))):start(),$vimeo_player.v_optimize_display(),jQuery(window).off("resize.vimeo_player_"+vimeo_player.id).on("resize.vimeo_player_"+vimeo_player.id,(function(){$vimeo_player.v_optimize_display()})),vimeo_player.player.on("progress",(function(e){console.debug("progress:: ",e)})),vimeo_player.player.on("error",(function(e){vimeo_player.state=-1,(VEvent=jQuery.Event("VPError")).error=e,$vimeo_player.trigger(VEvent)})),vimeo_player.player.on("play",(function(data){vimeo_player.state=1,$vimeo_player.trigger("change_state"),vimeo_player.controlBar&&vimeo_player.controlBar.length&&vimeo_player.controlBar.find(".vimeo_player_pause").html(jQuery.vimeo_player.controls.pause),"undefined"!=typeof _gaq&&eval(vimeo_player.opt.gaTrack)&&_gaq.push(["_trackEvent","vimeo_player","Play",vimeo_player.videoID]),"undefined"!=typeof ga&&eval(vimeo_player.opt.gaTrack)&&ga("send","event","vimeo_player","play",vimeo_player.videoID),VEvent=jQuery.Event("VPPlay"),VEvent.error=data,$vimeo_player.trigger(VEvent)})),vimeo_player.player.on("pause",(function(e){vimeo_player.state=2,$vimeo_player.trigger("change_state"),vimeo_player.controlBar&&vimeo_player.controlBar.length&&vimeo_player.controlBar.find(".vimeo_player_pause").html(jQuery.vimeo_player.controls.play),(VEvent=jQuery.Event("VPPause")).time=e,$vimeo_player.trigger(VEvent)})),vimeo_player.player.on("seeked",(function(e){vimeo_player.state=3,$vimeo_player.trigger("change_state")})),vimeo_player.player.on("ended",(function(e){vimeo_player.state=0,$vimeo_player.trigger("change_state"),(VEvent=jQuery.Event("VPEnd")).time=e,$vimeo_player.trigger(VEvent)})),vimeo_player.player.on("timeupdate",(function(e){if(vimeo_player.duration=e.duration,vimeo_player.percent=e.percent,vimeo_player.seconds=e.seconds,vimeo_player.state=1,vimeo_player.player.getPaused().then((function(e){e&&(vimeo_player.state=2)})),vimeo_player.opt.stopMovieOnBlur&&(document.hasFocus()||1==vimeo_player.state&&(vimeo_player.hasFocus=!1,$vimeo_player.v_pause(),vimeo_player.document_focus=setInterval((function(){document.hasFocus()&&!vimeo_player.hasFocus&&(vimeo_player.hasFocus=!0,$vimeo_player.v_play(),clearInterval(vimeo_player.document_focus))}),300))),vimeo_player.opt.showControls){var r=jQuery("#controlBar_"+vimeo_player.id),o=r.find(".vimeo_player_pogress"),t=r.find(".vimeo_player_loaded"),i=r.find(".vimeo_player_seek_bar"),a=o.outerWidth(),l=Math.floor(e.seconds)*a/Math.floor(e.duration),n=100*e.percent;t.css({left:0,width:n+"%"}),i.css({left:0,width:l}),e.duration?vimeo_player.controlBar.find(".vimeo_player_time").html(jQuery.vimeo_player.formatTime(e.seconds)+" / "+jQuery.vimeo_player.formatTime(e.duration)):vimeo_player.controlBar.find(".vimeo_player_time").html("-- : -- / -- : --")}if(vimeo_player.opt.addRaster){var s="dot"==vimeo_player.opt.addRaster?"raster-dot":"raster";vimeo_player.overlay.addClass(vimeo_player.isRetina?s+" retina":s)}else vimeo_player.overlay.removeClass((function(e,r){var o=r.split(" "),t=[];return jQuery.each(o,(function(e,r){/raster.*/.test(r)&&t.push(r)})),t.push("retina"),t.join(" ")}));vimeo_player.opt.stopAt=vimeo_player.opt.stopAt>e.duration?e.duration-.6:vimeo_player.opt.stopAt;var u=vimeo_player.opt.stopAt||e.duration-.6;e.seconds>=u&&(vimeo_player.loop=vimeo_player.loop||0,vimeo_player.opt.loop&&vimeo_player.loop<vimeo_player.opt.loop?($vimeo_player.v_seekTo(vimeo_player.opt.startAt),vimeo_player.loop++):($vimeo_player.v_pause(),vimeo_player.state=0,$vimeo_player.trigger("change_state"))),(VEvent=jQuery.Event("VPTime")).time=e.seconds,$vimeo_player.trigger(VEvent)}))})),$vimeo_player.on("change_state",(function(){console.debug("player state:: ",vimeo_player.state),0==vimeo_player.state&&vimeo_player.wrapper.fadeOut(500,(function(){$vimeo_player.v_seekTo(0)}))}))}))}}))},formatTime:function(e){var r=Math.floor(e/60),o=Math.floor(e-60*r);return(r<=9?"0"+r:r)+" : "+(o<=9?"0"+o:o)},play:function(){var e=this.get(0);if(!e.isReady)return this;e.player.play(),setTimeout((function(){e.wrapper.fadeTo(1e3,e.opt.opacity)}),1e3);var r=jQuery("#controlBar_"+e.id);r.length&&r.find(".mb_YTPPvimeo_player_playpause").html(jQuery.vimeo_player.controls.pause);return e.state=1,jQuery(e).css("background-image","none"),this},togglePlay:function(e){var r=this.get(0);return 1==r.state?this.v_pause():this.v_play(),"function"==typeof e&&e(r.state),this},pause:function(){var e=this.get(0);return e.player.pause(),e.state=2,this},seekTo:function(e,r){var o=this.get(0),t=o.opt.stopAt&&e>=o.opt.stopAt?o.opt.stopAt-.5:e;return o.player.setCurrentTime(t).then((function(e){"function"==typeof r&&r(e)})),this},setVolume:function(e){var r=this.get(0);return console.debug("setVolume:: ",e),console.debug("volume:: ",r.opt.vol),e||r.opt.vol||!r.isMute?!e&&!r.isMute||e&&r.opt.vol==e?r.isMute?jQuery(r).v_mute():jQuery(r).v_unmute():(r.opt.vol=e,r.player.setVolume(r.opt.vol),r.volumeBar&&r.volumeBar.length&&r.volumeBar.updateSliderVal(100*e)):jQuery(r).v_unmute(),this},toggleVolume:function(){var e=this.get(0);if(e)return e.isMute?(jQuery(e).v_unmute(),!0):(jQuery(e).v_mute(),!1)},mute:function(){var e=this.get(0);if(!e.isMute)return e.isMute=!0,e.player.setVolume(0),e.volumeBar&&e.volumeBar.length&&e.volumeBar.width()>10&&e.volumeBar.updateSliderVal(0),jQuery("#controlBar_"+e.id).find(".vimeo_player_muteUnmute").html(jQuery.vimeo_player.controls.unmute),jQuery(e).addClass("isMuted"),e.volumeBar&&e.volumeBar.length&&e.volumeBar.addClass("muted"),this},unmute:function(){var e=this.get(0);if(e.isMute)return e.isMute=!1,jQuery(e).v_set_volume(e.opt.vol),e.volumeBar&&e.volumeBar.length&&e.volumeBar.updateSliderVal(e.opt.vol>.1?e.opt.vol:.1),jQuery("#controlBar_"+e.id).find(".vimeo_player_muteUnmute").html(jQuery.vimeo_player.controls.mute),jQuery(e).removeClass("isMuted"),e.volumeBar&&e.volumeBar.length&&e.volumeBar.removeClass("muted"),this},changeMovie:function(e){var r=this.get(0);r.player.loadVideo(e.url).then((function(e){jQuery(r).v_setState()}))},buildControls:function(vimeo_player){var data=vimeo_player.opt;if(!jQuery("#controlBar_"+vimeo_player.id).length){vimeo_player.controlBar=jQuery("<span/>").attr("id","controlBar_"+vimeo_player.id).addClass("vimeo_player_bar").css({whiteSpace:"noWrap",position:vimeo_player.isBackground?"fixed":"absolute",zIndex:vimeo_player.isBackground?1e4:1e3});var buttonBar=jQuery("<div/>").addClass("buttonBar"),playpause=jQuery("<span>"+jQuery.vimeo_player.controls.play+"</span>").addClass("vimeo_player_pause vimeo_icon").click((function(){1==vimeo_player.state?jQuery(vimeo_player).v_pause():jQuery(vimeo_player).v_play()})),MuteUnmute=jQuery("<span>"+jQuery.vimeo_player.controls.mute+"</span>").addClass("vimeo_player_muteUnmute vimeo_icon").click((function(){vimeo_player.isMute?jQuery(vimeo_player).v_unmute():jQuery(vimeo_player).v_mute()})),volumeBar=jQuery("<div/>").addClass("vimeo_player_volume_bar").css({display:"inline-block"});vimeo_player.volumeBar=volumeBar;var idx=jQuery("<span/>").addClass("vimeo_player_time"),vURL="https://vimeo.com/"+vimeo_player.videoID,movieUrl=jQuery("<span/>").html(jQuery.vimeo_player.controls.logo).addClass("vimeo_url vimeo_icon").attr("title","view on Vimeo").on("click",(function(){console.debug(vURL),window.open(vURL,"viewOnVimeo")})),fullscreen=jQuery("<span/>").html(jQuery.vimeo_player.controls.fullscreen).addClass("vimeo_fullscreen vimeo_icon").on("click",(function(){jQuery(vimeo_player).v_fullscreen(data.realfullscreen)})),progressBar=jQuery("<div/>").addClass("vimeo_player_pogress").css("position","absolute").click((function(e){timeBar.css({width:e.clientX-timeBar.offset().left}),vimeo_player.timeW=e.clientX-timeBar.offset().left,vimeo_player.controlBar.find(".vimeo_player_loaded").css({width:0});var r=Math.floor(vimeo_player.duration);vimeo_player.goto=timeBar.outerWidth()*r/progressBar.outerWidth(),console.debug(vimeo_player.goto),jQuery(vimeo_player).v_seekTo(parseFloat(vimeo_player.goto)),vimeo_player.controlBar.find(".vimeo_player_loaded").css({width:0})})),loadedBar=jQuery("<div/>").addClass("vimeo_player_loaded").css("position","absolute"),timeBar=jQuery("<div/>").addClass("vimeo_player_seek_bar").css("position","absolute");progressBar.append(loadedBar).append(timeBar),buttonBar.append(playpause).append(MuteUnmute).append(volumeBar).append(idx),data.show_vimeo_logo&&buttonBar.append(movieUrl),(vimeo_player.isBackground||eval(vimeo_player.opt.realfullscreen)&&!vimeo_player.isBackground)&&buttonBar.append(fullscreen),vimeo_player.controlBar.append(buttonBar).append(progressBar),vimeo_player.isBackground?jQuery("body").after(vimeo_player.controlBar):vimeo_player.wrapper.before(vimeo_player.controlBar),volumeBar.simpleSlider({initialval:vimeo_player.opt.vol,scale:100,orientation:"h",callback:function(e){0==e.value?jQuery(vimeo_player).v_mute():jQuery(vimeo_player).v_unmute(),vimeo_player.player.setVolume(e.value/100),vimeo_player.isMute||(vimeo_player.opt.vol=e.value)}})}},optimizeVimeoDisplay:function(e){var r=this.get(0),o={};r.opt.align=e||r.opt.align,r.opt.align="undefined "!=typeof r.opt.align?r.opt.align:"center,center";var t=r.opt.align.split(",");if(r.opt.optimizeDisplay){var i=r.isPlayer?0:80,a={},l=r.wrapper;a.width=l.outerWidth(),a.height=l.outerHeight()+i,o.width=a.width,o.height="16/9"==r.opt.ratio?Math.ceil(o.width*(9/16)):Math.ceil(o.width*(3/4)),o.marginTop=-(o.height-a.height)/2,o.marginLeft=0;var n=o.height<a.height;for(var s in n&&(o.height=a.height+i,o.width="16/9"==r.opt.ratio?Math.floor(o.height*(16/9)):Math.floor(o.height*(4/3)),o.marginTop=0,o.marginLeft=-(o.width-a.width)/2),t){if(t.hasOwnProperty(s))switch(t[s].replace(/ /g,"")){case"top":o.marginTop=n?-(o.height-a.height)/2:0;break;case"bottom":o.marginTop=n?0:-(o.height-a.height);break;case"left":o.marginLeft=0;break;case"right":o.marginLeft=n?-(o.width-a.width):0;break;default:o.width>a.width&&(o.marginLeft=-(o.width-a.width)/2)}}}else o.width="100%",o.height="100%",o.marginTop=0,o.marginLeft=0;r.playerBox.css({width:o.width,height:o.height,marginTop:o.marginTop,marginLeft:o.marginLeft,maxWidth:"initial"})},setAlign:function(e){this.v_optimize_display(e)},getAlign:function(){return this.get(0).opt.align},fullscreen:function(real){var vimeo_player=this.get(0),$vimeo_player=jQuery(vimeo_player),VEvent;void 0===real&&(real=vimeo_player.opt.realfullscreen),real=eval(real);var controls=jQuery("#controlBar_"+vimeo_player.id),fullScreenBtn=controls.find(".vimeo_fullscreen"),videoWrapper=vimeo_player.isSelf?vimeo_player.opt.containment:vimeo_player.wrapper;if(real){var fullscreenchange=jQuery.browser.mozilla?"mozfullscreenchange":jQuery.browser.webkit?"webkitfullscreenchange":"fullscreenchange";jQuery(document).off(fullscreenchange).on(fullscreenchange,(function(){RunPrefixMethod(document,"IsFullScreen")||RunPrefixMethod(document,"FullScreen")?(VEvent=jQuery.Event("VPFullScreenStart"),$vimeo_player.trigger(VEvent)):(vimeo_player.isAlone=!1,fullScreenBtn.html(jQuery.vimeo_player.controls.fullscreen),videoWrapper.removeClass("vimeo_player_Fullscreen"),videoWrapper.fadeTo(500,vimeo_player.opt.opacity),videoWrapper.css({zIndex:0}),vimeo_player.isBackground?jQuery("body").after(controls):vimeo_player.wrapper.before(controls),jQuery(window).resize(),VEvent=jQuery.Event("VPFullScreenEnd"),$vimeo_player.trigger(VEvent))}))}if(vimeo_player.isAlone)jQuery(document).off("mousemove.vimeo_player"),clearTimeout(vimeo_player.hideCursor),vimeo_player.overlay.css({cursor:"auto"}),real?cancelFullscreen():videoWrapper.fadeTo(1e3,vimeo_player.opt.opacity).css({zIndex:0}),fullScreenBtn.html(jQuery.vimeo_player.controls.fullscreen),vimeo_player.isAlone=!1;else{function hideMouse(){vimeo_player.overlay.css({cursor:"none"})}jQuery(document).on("mousemove.vimeo_player",(function(e){vimeo_player.overlay.css({cursor:"auto"}),clearTimeout(vimeo_player.hideCursor),jQuery(e.target).parents().is(".vimeo_player_bar")||(vimeo_player.hideCursor=setTimeout(hideMouse,3e3))})),hideMouse(),real?(videoWrapper.css({opacity:0}),videoWrapper.addClass("vimeo_player_Fullscreen"),launchFullscreen(videoWrapper.get(0)),setTimeout((function(){videoWrapper.fadeTo(1e3,1),vimeo_player.wrapper.append(controls),jQuery(vimeo_player).v_optimize_display()}),500)):videoWrapper.css({zIndex:1e4}).fadeTo(1e3,1),fullScreenBtn.html(jQuery.vimeo_player.controls.showSite),vimeo_player.isAlone=!0}function RunPrefixMethod(e,r){for(var o,t,i=["webkit","moz","ms","o",""],a=0;a<i.length&&!e[o];){if(o=r,""==i[a]&&(o=o.substr(0,1).toLowerCase()+o.substr(1)),"undefined"!=(t=typeof e[o=i[a]+o]))return i=[i[a]],"function"==t?e[o]():e[o];a++}}function launchFullscreen(e){RunPrefixMethod(e,"RequestFullScreen")}function cancelFullscreen(){(RunPrefixMethod(document,"FullScreen")||RunPrefixMethod(document,"IsFullScreen"))&&RunPrefixMethod(document,"CancelFullScreen")}return this}},jQuery.fn.vimeo_player=jQuery.vimeo_player.buildPlayer,jQuery.fn.v_play=jQuery.vimeo_player.play,jQuery.fn.v_toggle_play=jQuery.vimeo_player.togglePlay,jQuery.fn.v_change_movie=jQuery.vimeo_player.changeMovie,jQuery.fn.v_pause=jQuery.vimeo_player.pause,jQuery.fn.v_seekTo=jQuery.vimeo_player.seekTo,jQuery.fn.v_optimize_display=jQuery.vimeo_player.optimizeVimeoDisplay,jQuery.fn.v_set_align=jQuery.vimeo_player.setAlign,jQuery.fn.v_get_align=jQuery.vimeo_player.getAlign,jQuery.fn.v_fullscreen=jQuery.vimeo_player.fullscreen,jQuery.fn.v_mute=jQuery.vimeo_player.mute,jQuery.fn.v_unmute=jQuery.vimeo_player.unmute,jQuery.fn.v_set_volume=jQuery.vimeo_player.setVolume,jQuery.fn.v_toggle_volume=jQuery.vimeo_player.toggleVolume})(jQuery);var nAgt=navigator.userAgent;if(!jQuery.browser){var isTouchSupported=function(){var e=nAgt.msMaxTouchPoints,r="ontouchstart"in document.createElement("div");return!(!e&&!r)},nameOffset,verOffset,ix;if(jQuery.browser={},jQuery.browser.mozilla=!1,jQuery.browser.webkit=!1,jQuery.browser.opera=!1,jQuery.browser.safari=!1,jQuery.browser.chrome=!1,jQuery.browser.androidStock=!1,jQuery.browser.msie=!1,jQuery.browser.edge=!1,jQuery.browser.hasTouch=isTouchSupported(),jQuery.browser.ua=nAgt,jQuery.browser.name=navigator.appName,jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10),-1!=(verOffset=nAgt.indexOf("Opera")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+6),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8));else if(-1!=(verOffset=nAgt.indexOf("OPR")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+4);else if(-1!=(verOffset=nAgt.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",jQuery.browser.fullVersion=nAgt.substring(verOffset+5);else if(-1!=nAgt.indexOf("Trident")){jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer";var start=nAgt.indexOf("rv:")+3,end=start+4;jQuery.browser.fullVersion=nAgt.substring(start,end)}else-1!=(verOffset=nAgt.indexOf("Edge"))?(jQuery.browser.edge=!0,jQuery.browser.name="Microsoft Edge",jQuery.browser.fullVersion=nAgt.substring(verOffset+5)):-1!=(verOffset=nAgt.indexOf("Chrome"))?(jQuery.browser.webkit=!0,jQuery.browser.chrome=!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1<nAgt.indexOf("mozilla/5.0")&&-1<nAgt.indexOf("android ")&&-1<nAgt.indexOf("applewebkit")&&!(-1<nAgt.indexOf("chrome"))?(verOffset=nAgt.indexOf("Chrome"),jQuery.browser.webkit=!0,jQuery.browser.androidStock=!0,jQuery.browser.name="androidStock",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1!=(verOffset=nAgt.indexOf("Safari"))||-1!=(verOffset=nAgt.indexOf("AppleWebkit"))?(jQuery.browser.webkit=!0,jQuery.browser.safari=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("Firefox"))?(jQuery.browser.mozilla=!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&(jQuery.browser.name=nAgt.substring(nameOffset,verOffset),jQuery.browser.fullVersion=nAgt.substring(verOffset+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName));-1!=(ix=jQuery.browser.fullVersion.indexOf(";"))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix)),-1!=(ix=jQuery.browser.fullVersion.indexOf(" "))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix)),jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10),isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10)),jQuery.browser.version=jQuery.browser.majorVersion}jQuery.browser.android=/Android/i.test(nAgt),jQuery.browser.blackberry=/BlackBerry|BB|PlayBook/i.test(nAgt),jQuery.browser.ios=/iPhone|iPad|iPod|webOS/i.test(nAgt),jQuery.browser.operaMobile=/Opera Mini/i.test(nAgt),jQuery.browser.windowsMobile=/IEMobile|Windows Phone/i.test(nAgt),jQuery.browser.kindle=/Kindle|Silk/i.test(nAgt),jQuery.browser.mobile=jQuery.browser.android||jQuery.browser.blackberry||jQuery.browser.ios||jQuery.browser.windowsMobile||jQuery.browser.operaMobile||jQuery.browser.kindle,jQuery.isMobile=jQuery.browser.mobile,jQuery.isTablet=jQuery.browser.mobile&&765<jQuery(window).width(),jQuery.isAndroidDefault=jQuery.browser.android&&!/chrome/i.test(nAgt);var nAgt=navigator.userAgent;if(!jQuery.browser){var nameOffset,verOffset,ix;if(jQuery.browser={},jQuery.browser.mozilla=!1,jQuery.browser.webkit=!1,jQuery.browser.opera=!1,jQuery.browser.safari=!1,jQuery.browser.chrome=!1,jQuery.browser.androidStock=!1,jQuery.browser.msie=!1,jQuery.browser.ua=nAgt,jQuery.browser.name=navigator.appName,jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10),-1!=(verOffset=nAgt.indexOf("Opera")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+6),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8));else if(-1!=(verOffset=nAgt.indexOf("OPR")))jQuery.browser.opera=!0,jQuery.browser.name="Opera",jQuery.browser.fullVersion=nAgt.substring(verOffset+4);else if(-1!=(verOffset=nAgt.indexOf("MSIE")))jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer",jQuery.browser.fullVersion=nAgt.substring(verOffset+5);else if(-1!=nAgt.indexOf("Trident")||-1!=nAgt.indexOf("Edge")){jQuery.browser.msie=!0,jQuery.browser.name="Microsoft Internet Explorer";var start=nAgt.indexOf("rv:")+3,end=start+4;jQuery.browser.fullVersion=nAgt.substring(start,end)}else-1!=(verOffset=nAgt.indexOf("Chrome"))?(jQuery.browser.webkit=!0,jQuery.browser.chrome=!0,jQuery.browser.name="Chrome",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):nAgt.indexOf("mozilla/5.0")>-1&&nAgt.indexOf("android ")>-1&&nAgt.indexOf("applewebkit")>-1&&!(nAgt.indexOf("chrome")>-1)?(verOffset=nAgt.indexOf("Chrome"),jQuery.browser.webkit=!0,jQuery.browser.androidStock=!0,jQuery.browser.name="androidStock",jQuery.browser.fullVersion=nAgt.substring(verOffset+7)):-1!=(verOffset=nAgt.indexOf("Safari"))||-1!=(verOffset=nAgt.indexOf("AppleWebkit"))?(jQuery.browser.webkit=!0,jQuery.browser.safari=!0,jQuery.browser.name="Safari",jQuery.browser.fullVersion=nAgt.substring(verOffset+7),-1!=(verOffset=nAgt.indexOf("Version"))&&(jQuery.browser.fullVersion=nAgt.substring(verOffset+8))):-1!=(verOffset=nAgt.indexOf("Firefox"))?(jQuery.browser.mozilla=!0,jQuery.browser.name="Firefox",jQuery.browser.fullVersion=nAgt.substring(verOffset+8)):(nameOffset=nAgt.lastIndexOf(" ")+1)<(verOffset=nAgt.lastIndexOf("/"))&&(jQuery.browser.name=nAgt.substring(nameOffset,verOffset),jQuery.browser.fullVersion=nAgt.substring(verOffset+1),jQuery.browser.name.toLowerCase()==jQuery.browser.name.toUpperCase()&&(jQuery.browser.name=navigator.appName));-1!=(ix=jQuery.browser.fullVersion.indexOf(";"))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix)),-1!=(ix=jQuery.browser.fullVersion.indexOf(" "))&&(jQuery.browser.fullVersion=jQuery.browser.fullVersion.substring(0,ix)),jQuery.browser.majorVersion=parseInt(""+jQuery.browser.fullVersion,10),isNaN(jQuery.browser.majorVersion)&&(jQuery.browser.fullVersion=""+parseFloat(navigator.appVersion),jQuery.browser.majorVersion=parseInt(navigator.appVersion,10)),jQuery.browser.version=jQuery.browser.majorVersion}jQuery.browser.android=/Android/i.test(nAgt),jQuery.browser.blackberry=/BlackBerry|BB|PlayBook/i.test(nAgt),jQuery.browser.ios=/iPhone|iPad|iPod|webOS/i.test(nAgt),jQuery.browser.operaMobile=/Opera Mini/i.test(nAgt),jQuery.browser.windowsMobile=/IEMobile|Windows Phone/i.test(nAgt),jQuery.browser.kindle=/Kindle|Silk/i.test(nAgt),jQuery.browser.mobile=jQuery.browser.android||jQuery.browser.blackberry||jQuery.browser.ios||jQuery.browser.windowsMobile||jQuery.browser.operaMobile||jQuery.browser.kindle,jQuery.isMobile=jQuery.browser.mobile,jQuery.isTablet=jQuery.browser.mobile&&jQuery(window).width()>765,jQuery.isAndroidDefault=jQuery.browser.android&&!/chrome/i.test(nAgt),function(e){e.simpleSlider={defaults:{initialval:0,scale:100,orientation:"h",readonly:!1,callback:!1},events:{start:e.browser.mobile?"touchstart":"mousedown",end:e.browser.mobile?"touchend":"mouseup",move:e.browser.mobile?"touchmove":"mousemove"},init:function(r){return this.each((function(){var o=this,t=e(o);t.addClass("simpleSlider"),o.opt={},e.extend(o.opt,e.simpleSlider.defaults,r),e.extend(o.opt,t.data());var i="h"==o.opt.orientation?"horizontal":"vertical";i=e("<div/>").addClass("level").addClass(i);t.prepend(i),o.level=i,t.css({cursor:"default"}),"auto"==o.opt.scale&&(o.opt.scale=e(o).outerWidth()),t.updateSliderVal(),o.opt.readonly||(t.on(e.simpleSlider.events.start,(function(r){e.browser.mobile&&(r=r.changedTouches[0]),o.canSlide=!0,t.updateSliderVal(r),"h"==o.opt.orientation?t.css({cursor:"col-resize"}):t.css({cursor:"row-resize"}),r.preventDefault(),r.stopPropagation()})),e(document).on(e.simpleSlider.events.move,(function(r){e.browser.mobile&&(r=r.changedTouches[0]),o.canSlide&&(e(document).css({cursor:"default"}),t.updateSliderVal(r),r.preventDefault(),r.stopPropagation())})).on(e.simpleSlider.events.end,(function(){e(document).css({cursor:"auto"}),o.canSlide=!1,t.css({cursor:"auto"})})))}))},updateSliderVal:function(r){var o=this.get(0);if(o.opt){o.opt.initialval="number"==typeof o.opt.initialval?o.opt.initialval:o.opt.initialval(o);var t=e(o).outerWidth(),i=e(o).outerHeight();o.x="object"==typeof r?r.clientX+document.body.scrollLeft-this.offset().left:"number"==typeof r?r*t/o.opt.scale:o.opt.initialval*t/o.opt.scale,o.y="object"==typeof r?r.clientY+document.body.scrollTop-this.offset().top:"number"==typeof r?(o.opt.scale-o.opt.initialval-r)*i/o.opt.scale:o.opt.initialval*i/o.opt.scale,o.y=this.outerHeight()-o.y,o.scaleX=o.x*o.opt.scale/t,o.scaleY=o.y*o.opt.scale/i,o.outOfRangeX=o.scaleX>o.opt.scale?o.scaleX-o.opt.scale:0>o.scaleX?o.scaleX:0,o.outOfRangeY=o.scaleY>o.opt.scale?o.scaleY-o.opt.scale:0>o.scaleY?o.scaleY:0,o.outOfRange="h"==o.opt.orientation?o.outOfRangeX:o.outOfRangeY,o.value=void 0!==r?"h"==o.opt.orientation?o.x>=this.outerWidth()?o.opt.scale:0>=o.x?0:o.scaleX:o.y>=this.outerHeight()?o.opt.scale:0>=o.y?0:o.scaleY:"h"==o.opt.orientation?o.scaleX:o.scaleY,"h"==o.opt.orientation?o.level.width(Math.floor(100*o.x/t)+"%"):o.level.height(Math.floor(100*o.y/i)),"function"==typeof o.opt.callback&&o.opt.callback(o)}}},e.fn.simpleSlider=e.simpleSlider.init,e.fn.updateSliderVal=e.simpleSlider.updateSliderVal}(jQuery);