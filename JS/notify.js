 var Notify = function() {};
 Notify.prototype.defaults = {
     location: {
         top: 0,
         left: 0
     },
     autoFadeOut: true,
     fadesAfter: 5000,
     fadeInSpeed: 300,
     fadeOutSpeed: 300,
     className: "note",
     relatedEvent: {}
 };

Notify.prototype.fadeRemove = function (id, speed) {
     id.fadeOut(speed, function() {
         id.remove();
     });
 };

 Notify.prototype.add = function(content, config) {
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
 };



var note = new Notify({  // new instance

});