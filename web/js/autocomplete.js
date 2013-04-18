YUI().use('autocomplete', 'autocomplete-filters', 'autocomplete-highlighters', function (Y) {
	
	Y.io('api.php?command=getListVM',{
    	on : {
    		success : function(tx,r) {
    			var json = Y.JSON.parse(r.responseText);
    		
 
				Y.one('#tabs').plug(Y.Plugin.AutoComplete, {
					resultFilters    : 'phraseMatch',
				    resultHighlighter: 'phraseMatch',
				    source           : json
				});	
    		}
    	}
   	});
});	







//$(function() {
//
//    $(document).ready(function() {
//		
//		var availableDates = new Array();
//		$.getJSON('api.php?command=getListVM', function(data) {
//			$( "#tags" ).autocomplete({
//				source: data
//			});
//     	});
//	});
//});
