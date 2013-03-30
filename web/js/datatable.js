YUI().use(  "calendar", "datatype-date", "datatable", "io", function (Y) {


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

	
	var array = [{'1':'Name'},{'2':'Age'}, {'3':'Gender'}];
	
	var $select = $('#datas');
	$.each(data, function(i,val){
		$select.append($('option />', 
		{value : (i+1), text : val[i+1]
	}));
	});


});

