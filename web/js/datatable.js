YUI().use(  "calendar", "datatable", "io", function (Y) {

    var animal_data = [
        {  aname: 'Lions',  chars:[ 'Leo', 'Simba', 'Elsa', 'Cowardly Lion' ] },
        {  aname: 'Amoebas' },
        {  aname: 'Tigers', chars:[ 'Shere Kahn', 'Tigger', 'Tony' ] },
        {  aname: 'Mules',  chars:[ 'Francis' ] },
        {  aname: 'Bears',  chars:[ 'Smokey', 'Reginald', 'Winnie-the-Pooh', 'Baloo', 'Yogi' ] },
        {  aname: 'Snakes', chars:[ 'Kaa', 'The Serpent', 'Nagini' ] }
    ];

    //
    //   Create the "parent" DataTable
    //
    var dt_master = new Y.DataTable({
        columns : [
            { key:'aname',  label:'Type' },
            { name:'nchars', label:'No. of Chars',
              formatter: function(o){
                   return ( o.data.chars ) ? o.data.chars.length : 0;
                 }
            }
        ],
        data : animal_data,
        width: 200,
        caption: 'Select an animal category below:'
    }).render("#mtable");

    //
    // Add a new attribute to track the last TR clicked,
    //   this is used in the details DT formatter below and later
    //   in the row click handler `delegate` for row highlighting
    //
    //  also setup a click listener to update the "selectedRow" attribute on TR
    //  clicks
    //
    dt_master.addAttr("selectedRow", { value: null });

    dt_master.delegate('click', function (e) {
        this.set('selectedRow', e.currentTarget);
     }, '.yui3-datatable-data tr', dt_master);

    //
    //   Create the characters DataTable and render it (it is hidden initially)
    //
    var dt_detail = new Y.DataTable({
        columns : [
            { name:'aname', label:'Animal Category',
              formatter: function(o){
                    // just retrieve the selected Master record and return the
                    // "aname" column
                    var parent_rec = dt_master.getRecord(
                        dt_master.get('selectedRow') );

                    return parent_rec.get('aname');
                }
            },
            { key:'char_name', label:'Character' }
         ],
        data : [],
        strings : {
            emptyMessage : "No critter characters were found!"
        },
        width: 350,
        caption: 'Characters of the category include:'
    }).render("#dtable");

    //
    //  Setup a listener to the Master "selectedRowChange" event (i.e. after a
    //  row click)
    //
    dt_master.after('selectedRowChange', function (e) {

        var tr = e.newVal,              // the Node for the TR clicked ...
            last_tr = e.prevVal,        //  "   "   "   the last TR clicked ...
            rec = this.getRecord(tr);   // the current Record for the clicked TR

        //
        //  This if-block does double duty,
        //  (a) it tracks the first click to toggle the "details" DIV to visible
        //  (b) it un-hightlights the last TR clicked
        //
        if ( !last_tr ) {
            // first time thru ... display the Detail DT DIV that was hidden
            Y.one("#chars").show();
        } else {
            last_tr.removeClass("myhilite");
        }

        //
        //  After unhighlighting, now highlight the current TR
        //
        tr.addClass("myhilite");


        //
        //  Collect the "chars" member of the parent record into an array of
        //  objects  with property name "aname"
        //
        var detail_data = [];
        if ( rec.get('chars') ) {
            Y.Array.each( rec.get('chars'), function(item){
                detail_data.push( {char_name:item});
            });
        }

        //
        //  Set the "detail_data" to the dt_detail DataTable
        //    also update the heading in "acategory"
        //   ( it automatically refreshes )
        //
        dt_detail.setAttrs({
            data: detail_data,
            caption: 'Characters of the <strong>' + rec.get('aname') +
                        '</strong> category include:'
        });
    });



	// AFFICHE TABLEAU GLOBAL
	
    Y.io('api.php?command=getListGlobal',{
    	on : {
    		success : function(tx,r) {
    			var json = Y.JSON.parse(r.responseText);
    			console.log(json);
    			
    			var entete = new Y.DataTable({
					data : json,
					width: 800
    			}).render("#simple");
    		}
    	}
   	});


	var calendar = new Y.Calendar()({
		contentBox: "#mycalendar",
		width: '340px',
		showPrevMonth: true,
		showNextMonth: true,
		date: new Date()
	}).render();



});

