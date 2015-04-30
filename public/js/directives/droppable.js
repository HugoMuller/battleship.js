'use strict';

angular.module('bs').directive('droppable', function(){
  return {
    scope: {
      drop: '&', //parent
      dropper: '=' //bi-directional scope
    },
    link: function(scope, element){
      var elem = element[0];

      elem.addEventListener('dragover', function(event){
        if(event.preventDefault) event.preventDefault(); // allows us to drop
        this.classList.add('over');
        event.dataTransfer.dropEffect = 'copy';
        return false;
      }, false);

      elem.addEventListener('dragenter', function(event){
        this.classList.add('over');
        return false;
      }, false);
      
      elem.addEventListener('dragleave', function(event){
        this.classList.remove('over');
        return false;
      }, false);

      elem.addEventListener('drop', function(event){
        if(event.stopPropagation) event.stopPropagation(); // stops some browser from redirecting
        this.classList.remove('over');
        var item = document.getElementById(event.dataTransfer.getData('Text'));
        item.parentNode.removeChild(item);
        var dropId = this.id;
        // call the passed drop function
        scope.$apply(function(scope){
          var fn = scope.drop();
          if(typeof fn !== 'undefined'){
            fn(item.id, dropId);
          }
        });
        
        return false;
      }, false);
    }
  };
});
