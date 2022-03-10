'use strict';


window.onload = function (){

    let flow = gameFlow();
    let game = gameObject();

// make the hammer respond to mouse changes
// found on https://stackoverflow.com/questions/7790725/javascript-track-mouse-position#7790764
    let hammer = document.getElementById('hammer');

    document.onmousemove = function (event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        
        // Use event.pageX / event.pageY here
        hammer.style.top = (event.pageY - 50) + 'px';
        hammer.style.left = (event.pageX - 12) + 'px';
    }

    document.onmousedown = function (params) {
        hammer.classList.toggle('active');
    }
    document.onmouseup = function (params) {
        hammer.classList.toggle('active');
    }
}