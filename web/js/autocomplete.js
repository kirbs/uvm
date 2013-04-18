$(function() {

    $(document).ready(function() {
		
		var availableDates = new Array();
		$.getJSON('api.php?command=getListVM', function(data) {
			$( "#tags" ).autocomplete({
				source: data
			});
     	});
     	
     	



	});
});
