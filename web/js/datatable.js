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
   	

    Y.io('api.php?command=getListPfsMere',{
    	on : {
    		success : function(tx,r) {
    			var json = Y.JSON.parse(r.responseText);
    			
				var $select = $('#datas');
				console.log(json);
				$.each(json, function(){
					$select.append($('<option />', {
						value : this, text : this
					}));
				});
    		}
    	}
   	});
   	
   	
    Y.io('api.php?command=getDetailAllUvm',{
    	on : {
    		success : function(tx,r) {
    			var json = Y.JSON.parse(r.responseText);
    			
    			var dt_master = new Y.DataTable({
    				columns: [
    					{key:'pfs_mere', label:'Nom de la PFS mere'},
    					{name:'pfs_fille', label:'Nom de la PFS fille'}
    				],
					data : json,
					width: 200,
					caption: "Choisir la PFS"
    			}).render("#mtable");
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


