 var Notify = function(note, options) {
         options = options || {};
         this.note = note;
         this.options = options;

     };
 Notify.prototype = {
     defaults: {
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
     },
     fadeRemove: function(id, speed) {
         id.fadeOut(speed, function() {
             id.remove();
         });
     },
     add: function(content, config) {
         //single var pattern;
         var self = this,
             options = $.extend({}, this.defaults, config),
             note, timeoutId, sendTofadeOut, cancelFadeOut, relatedEvent, jRelatedEvent, relatedWidth, relatedHeight, thisHeight, thisWidth,
             viewPort = {
                 x: $(window).width(),
                 y: $(window).height()
             };
         note = $("<div>", {
             "class": "notification " + options.className,
             "html": content
         }).appendTo("body").fadeTo(options.fadeInSpeed, 1).hover(function() {
             cancelFadeOut();
         }, function() {
             sendTofadeOut(100);
         });
         // set position
         note.css(options.location);
         sendTofadeOut = function(speed) {
             timeoutId = setTimeout(function() {
                 self.fadeRemove(note, options.fadeOutSpeed);
             }, (speed ? speed : options.fadesAfter));
         };
         cancelFadeOut = function() {
             clearTimeout(timeoutId);
         };
         if(options.autoFadeOut) {
             sendTofadeOut();
         }

         return new Notify(note, config); // new instance
     }
 };