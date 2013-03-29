$(function() {
//});

    var chart;
    $(document).ready(function() {
		
		
		var daysToDisable = ["2013-03-27", "2013-03-28"];
		
		function disableSpecificDates(date) {
			var month = date.getMonth();
			var day = date.getDate();
			var year = date.getFullYear();
			for (i = 0 ; i < daysToDisable.length; i++) {
					if ($.inArray((month + 1) + '-' + day + '-' + year.daysToDisable) != -1) {
						return [false];
				}
			}
			return [true];
		}

        <!-- DEFINITION DU CALENDRIER -->

        $( "#datepicker" ).datetimepicker({ dateFormat: "yy-mm-dd", timeFormat: "hh:mm:ss", hourGrid: 4, minuteGrid: 10, });
        $( "#duration" ).timepicker({ timeFormat: "hh:mm:ss", hourGrid: 4, minuteGrid: 10  });
        $( "#choice_date" ).datepicker({ dateFormat: "yy-mm-dd" });
        $( "#choice_date_click" ).datepicker({  dateFormat: "yy-mm-dd" ,beforeShowDay: disableSpecificDates ,altField: "#choice_date_click_field"});
        $( "#choice_date_to" ).datepicker({ dateFormat: "yy-mm-dd" });

	});
});
