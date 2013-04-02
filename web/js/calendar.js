$(function() {
//});

    var chart;
    $(document).ready(function() {
		
		function availableDates(date) {
			unavailableDates = ["25-3-2013","28-3-2013","1-4-2013"];
			dmy = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
			if ($.inArray(dmy, unavailableDates) == -1) {
				return [false, "", "aucun traitement ce jour"];
			} else {
				return [true,"","OK"];
			}
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
