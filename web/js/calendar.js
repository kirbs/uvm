$(function() {

    $(document).ready(function() {
		
			var availableDates = new Array();
			$.getJSON('api.php?command=getListDate', function(data) {
	        	availableDate = data;
	        	
				function availableDates(date) {	        	
					//availableDate = ["2013-3-25","2013-3-28","2013-4-1"];
					ymd = date.getFullYear()  + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
					console.log(ymd);
					if ($.inArray(ymd, availableDate) == -1) {
						return [false, "", "aucun traitement ce jour"];
					} else {
						return [true,"","OK"];
					}
				};
	        	//$( "#choice_date_click" ).datepicker({ minDate: '-1M' , maxDate : 0 , dateFormat: "mm-dd-yy" ,altField: "#choice_date_click_field", beforeShowDay: availableDates});
	        	$( "#choice_date_click" ).datepicker({ minDate: '-1M' , maxDate : 0 , dateFormat: "yy-mm-dd" ,altField: "#choice_date_click_field", beforeShowDay: availableDates});
	     	});

        //<!-- DEFINITION DU CALENDRIER -->

        $( "#datepicker" ).datetimepicker({ dateFormat: "yy-mm-dd", timeFormat: "hh:mm:ss", hourGrid: 4, minuteGrid: 10, });
        $( "#duration" ).timepicker({ timeFormat: "hh:mm:ss", hourGrid: 4, minuteGrid: 10  });
        $( "#choice_date" ).datepicker({ dateFormat: "yy-mm-dd" });
        //$( "#choice_date_click" ).datepicker({  dateFormat: "yy-mm-dd" ,beforeShowDay: disableSpecificDates ,altField: "#choice_date_click_field"});
        //$( "#choice_date_click" ).datepicker({  minDate: '-1M' , maxDate : 0 , dateFormat: "mm-dd-yy" ,altField: "#choice_date_click_field", beforeShowDay: availableDates});
        $( "#choice_date_to" ).datepicker({ dateFormat: "yy-mm-dd" });



		$("#choix").live("change keyup", function () {
			$("#form").submit();
		});

	});
});
