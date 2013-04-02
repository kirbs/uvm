$(function() {
//});

    var chart;
    $(document).ready(function() {
		
		
		var daysToDisable = ["3-27-2013", "3-28-2013"];
		
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
        //$( "#choice_date_click" ).datepicker({  dateFormat: "yy-mm-dd" ,beforeShowDay: disableSpecificDates ,altField: "#choice_date_click_field"});
        $( "#choice_date_click" ).datepicker({  minDate: '1M' , maxDate : 0 , dateFormat: "mm-dd-yy" ,altField: "#choice_date_click_field", beforeShowDay:function(d) {
      		var dat = $.datepicker.formatDate("yy-mm-dd", d);
			natDays = [["2013-03-25","2013-03-25"],["2013-03-29","2013-03-29"]
						];

			for (var i=0, c=natDays.length; i<c; i++)
 				if (dat >= natDays[i][0] && dat<=natDays[i][1]) {
  					return [false, ""];
          		}
				else  {
					return [true, "0"];
				}

          	}
      	});
        $( "#choice_date_to" ).datepicker({ dateFormat: "yy-mm-dd" });

	});
});
