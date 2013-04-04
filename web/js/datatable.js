YUI().use( "sortable", "calendar", "datatype-date", "datatable", "io", function (Y) {


	// AFFICHE TABLEAU GLOBAL
	
    Y.io('api.php?command=getListGlobal',{
    	on : {
    		success : function(tx,r) {
    			var json = Y.JSON.parse(r.responseText);
    			
    			var entete = new Y.DataTable({
					data : json,
					width: 800
    			}).render("#simple");
    		}
    	}
   	});
   	

    Y.io('api.php?command=ggetListPfsMere',{
    	on : {
    		success : function(tx,r) {
    			var json = Y.JSON.parse(r.responseText);
    			
				var $select = $('#datas');
				$.each(json, function(i,val){
					$select.append($('<option />', {
						value : val[i+1], text : val[i+1]
					}));
				});
    		}
    	}
   	});	
	
	//var array = [{'1':'Name'},{'2':'Age'}, {'3':'Gender'}];
	
	//var $select = $('#datas');
	//$.each(json, function(i,val){
	//	$select.append($('<option />', {
	//		value : (i+1), text : val[i+1]
	//	}));
	//});





});


