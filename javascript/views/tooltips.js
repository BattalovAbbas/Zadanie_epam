(function () {
  Table.views.tooltips = (function () {
       
    // Добавление новой подсказки    
    function AddTooltip(ElementId, txt){
        var element = document.getElementById(ElementId);
        document.getElementById(ElementId).onmouseover = function() { tooltip(element,txt)};
        document.getElementById(ElementId).onmouseout = function() { hidetooltip(element)}; 
    }
    var messageTooltip = document.getElementById('tooltip');
    function tooltip(el,txt) {        
        document.getElementById('messageTooltip').innerHTML = txt;
        messageTooltip.style.opacity = 0.7; 
        messageTooltip.style.visibility="visible";
        messageTooltip.style.position = "absolute";
        messageTooltip.style.left = el.offsetLeft+150;
        messageTooltip.style.top = el.offsetTop+80;
        messageTooltip.style.background = "rgb(232, 232, 232)";
        messageTooltip.style.borderRadius =  "10px";
    }
    function hidetooltip(el) {
        messageTooltip.style.visibility='hidden';            
    } 
    return {
        AddTooltip: AddTooltip
    }    
   })();    
})();