$(function() {
//});

    var chart;
    $(document).ready(function() {
		
		function availableDates(date) {
			$.getJSON('api.php?command=getListDate', function(data) {
	        	availableDates = data;
			
				//availableDates = ["3-25-2013","3-28-2013","4-1-2013"];
				ymd = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
				if ($.inArray(ymd, availableDates) == -1) {
					return [false, "", "aucun traitement ce jour"];
				} else {
					return [true,"","OK"];
				}
			});
		}

        <!-- DEFINITION DU CALENDRIER -->

        $( "#datepicker" ).datetimepicker({ dateFormat: "yy-mm-dd", timeFormat: "hh:mm:ss", hourGrid: 4, minuteGrid: 10, });
        $( "#duration" ).timepicker({ timeFormat: "hh:mm:ss", hourGrid: 4, minuteGrid: 10  });
        $( "#choice_date" ).datepicker({ dateFormat: "yy-mm-dd" });
        //$( "#choice_date_click" ).datepicker({  dateFormat: "yy-mm-dd" ,beforeShowDay: disableSpecificDates ,altField: "#choice_date_click_field"});
        $( "#choice_date_click" ).datepicker({  minDate: '-1M' , maxDate : 0 , dateFormat: "mm-dd-yy" ,altField: "#choice_date_click_field", beforeShowDay: availableDates});
        $( "#choice_date_to" ).datepicker({ dateFormat: "yy-mm-dd" });

	});
});
