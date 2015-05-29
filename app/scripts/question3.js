(function() {
    'use strict';

    var from = document.querySelector('#from');
    var to = document.querySelector('#to');
    var re = /(\d*)\s*(INR)/g;
    var exchangeRate = 9.95;
    
    function replace(str, value, currency){
    	var newValue = parseFloat(value)/exchangeRate;

    	return '£' + (Math.round(newValue * 100) / 100).toFixed(2);
    }

    to.innerHTML = from.value.replace(re, replace);

    from.addEventListener('blur', function(){
    	to.innerHTML = from.value.replace(re, replace);
    });
})();