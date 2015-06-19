'use strict';

angular.module('bs').directive('droppable', function(){
  return {
    restrict: 'A',
    scope: {
      drop      : '&', //parent
      dragover  : '&',
      dragenter : '&',
      dragleave : '&',
      dropper   : '=' //bi-directional scope
    },
    link: function(scope, element){
      var elem = element[0];

      elem.addEventListener('dragover', function(event){
        if(event.preventDefault) event.preventDefault(); // allows us to drop
        this.classList.add('over');
        event.dataTransfer.dropEffect = 'copy';

        var types = event.dataTransfer.types;
        var l = types.length;
        var rx = /^battleship\/(\w+)$/;
        var self = this;

        for(var i=0; i<l; i++){
          var match = rx.exec(types[i].toLowerCase());
          if(!match) continue;

          var item = document.getElementById(match[1]);
          if(item === null) throw new Error(this.id + '.dragenter failed because target item does not exist');
          // call the passed dragenter function
          scope.$apply(function(scope){
            var dragover = scope.dragover();
            if(typeof dragover === 'function'){
              dragover(item, self);
            }
          });

          return false;
        }
        
        return false;
      }, false);

      elem.addEventListener('dragenter', function(event){
        this.classList.add('over');

        var types = event.dataTransfer.types;
        var l = types.length;
        var rx = /^battleship\/(\w+)$/;
        var self = this;

        for(var i=0; i<l; i++){
          var match = rx.exec(types[i].toLowerCase());
          if(!match) continue;
          
          var item = document.getElementById(match[1]);
          if(item === null) throw new Error(this.id + '.dragenter failed because target item does not exist');
          // call the passed dragenter function
          scope.$apply(function(scope){
            var dragenter = scope.dragenter();
            if(typeof dragenter === 'function'){
              dragenter(item, self);
            }
          });
          
          return false;
        }
        
        return false;
      }, false);
      
      elem.addEventListener('dragleave', function(event){
        this.classList.remove('over');

        var types = event.dataTransfer.types;
        var l = types.length;
        var rx = /^battleship\/(\w+)$/;
        var self = this;

        for(var i=0; i<l; i++){
          var match = rx.exec(types[i].toLowerCase());
          if(!match) continue;

          var item = document.getElementById(match[1]);
          if(item === null) throw new Error(this.id + '.dragleave failed because target item does not exist');
          // call the passed dragleave function
          scope.$apply(function(scope){
            var dragleave = scope.dragleave();
            if(typeof dragleave === 'function'){
              dragleave(item, self);
            }
          });

          return false;
        }
        
        return false;
      }, false);

      elem.addEventListener('drop', function(event){
        if(event.stopPropagation) event.stopPropagation(); // stops some browser from redirecting
        this.classList.remove('over');
        var item = document.getElementById(event.dataTransfer.getData('Text'));
        if(item === null) throw new Error(elem.id + '.drop failed because target item does not exist');

        var fn = 'dragleave'; //abort drop if object has class bs-notDroppable
        if(!this.classList.contains('bs-notDroppable')){
          item.parentNode.removeChild(item);
          fn = 'drop';
        }
        var self = this;
        scope.$apply(function(scope){
          var callback = scope[fn]();
          if(typeof callback === 'function'){
            callback(item, self);
          }
        });

        return false;
      }, false);
    }
  };
});
