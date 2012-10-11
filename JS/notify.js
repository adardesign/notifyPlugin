 var notify = {
     defaults: {
         location: {
             top: 0,
             left: 0
         },
         centerTop: true,
         autoFadeOut: true,
         fadesAfter: 5000,
         fadeInSpeed: 300,
         fadeOutSpeed:300,
         className: "note",
         relatedEvent: {}
     },
     add: function(content, config){
         //single var pattern;
         var self = this,
             options = $.extend({}, this.defaults, config),
             notification, timeoutId, sendTofadeOut, cancelFadeOut, relatedEvent, jRelatedEvent, relatedWidth, relatedHeight, thisHeight, thisWidth, viewPort = {
                 x: $(window).width(),
                 y: $(window).height()
             };
         notification = $("<div>", {
             "class": "notification " + options.className,
             "html": content
         }).appendTo("body").fadeTo(options.fadeInSpeed, 1).hover(function() {
             cancelFadeOut();
         }, function() {
             sendTofadeOut(100);
         });
         if(options.centerTop) {
             relatedEvent = options.relatedEvent;
             options.location.top = relatedEvent.clientY;
             options.location.left = relatedEvent.clientX;
             jRelatedEvent = $(relatedEvent.target);
             thisHeight = notification.outerHeight();
             thisWidth = notification.width();
             relatedWidth = jRelatedEvent.width();
             relatedHeight = jRelatedEvent.height();
             options.location.top = options.location.top - (thisHeight + relatedHeight);
             options.location.left = options.location.left - (thisWidth / 2);
             if(options.location.left + thisWidth > viewPort.x) {
                 options.location.left = options.location.left - (thisWidth / 2);
             }
             if(relatedEvent.clientX - (thisWidth / 2) < 0) {
                 options.location.left = options.location.left + (thisWidth / 2);
             }
             if(options.location.top < thisHeight) {
                 options.location.top = options.location.top + (relatedHeight + (thisHeight + 10));
             }
         } else {
             // must supply location object
             if(options.location.top === 0) {
                 //alert("looks like you didnt supply a specific location");
             }
         }
         // add "px" to
         options.location.top = options.location.top + "px";
         options.location.left = options.location.left + "px";
         // set position
         notification.css(options.location);
         sendTofadeOut = function(speed) {
             timeoutId = setTimeout(function() {
                 self.fadeRemove(notification, options.fadeOutSpeed);
             }, (speed ? speed : options.fadesAfter));
         };
         cancelFadeOut = function() {
             clearTimeout(timeoutId);
         };
         if(options.autoFadeOut) {
             sendTofadeOut();
         }
     },
     fadeRemove: function(id, speed) {
         id.fadeOut(speed, function() {
             id.remove();
         });
     }
 };