'use strict';

angular.module('bs').directive('draggable', function(){
  return function(scope, element){
    var elem = element[0]; // get us the native JS object
    elem.draggable = true;

    elem.addEventListener('dragstart', function(event){
      event.dataTransfer.effectAllowed = 'copy'; // only dropEffect='copy' will be dropable
      event.dataTransfer.setData('Text', this.id); // required otherwise doesn't work
      event.dataTransfer.setData('battleship/'+this.id, this.id); // hack
      this.classList.add('drag');
      return false;
    }, false);

    elem.addEventListener('dragend', function(event){
      this.classList.remove('drag');
      return false;
    }, false);
  };
});
