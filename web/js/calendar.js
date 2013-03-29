$(function() {
//});

    var chart;
    $(document).ready(function() {


        <!-- DEFINITION DU CALENDRIER -->

        $( "#datepicker" ).datetimepicker({ dateFormat: "yy-mm-dd", timeFormat: "hh:mm:ss", hourGrid: 4, minuteGrid: 10, });
        $( "#duration" ).timepicker({ timeFormat: "hh:mm:ss", hourGrid: 4, minuteGrid: 10  });
        $( "#choice_date" ).datepicker({ dateFormat: "yy-mm-dd" });
        $( "#choice_date_click" ).datepicker({  dateFormat: "yy-mm-dd" ,beforeShowDay: "04-01-2013",altField: "#choice_date_click_field"});
        $( "#choice_date_to" ).datepicker({ dateFormat: "yy-mm-dd" });

	});
});
