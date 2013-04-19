$(function() {

    $(document).ready(function() {
		
		var availableDates = new Array();
		$.getJSON('api.php?command=getListVM', function(data) {
			$( "#tags" ).autocomplete({
				source: data
			});
     	});
     	
     	
		
		
		/* 
		$("#demo1").jstree({ 
			"json_data" : {
				"data" : [
					{ 
						"data" : "A node", 
						"metadata" : { id : 23 },
						"children" : [ "Child 1", "A Child 2" ]
					},
					{ 
						"attr" : { "id" : "li.node.id1" }, 
						"data" : { 
							"title" : "Long format demo", 
							"attr" : { "href" : "#" } 
						} 
					}
				]
			},
			"plugins" : [ "themes", "json_data", "ui" ]
		}).bind("select_node.jstree", function (e, data) { 
			alert(data.rslt.obj.data("id"));
			});
		*/

		$("#demo1").jstree({ 
			"json_data" : {
				"ajax" : {
					"url" : "jstree/_docs/_json_data.json", 
					//"data" : function (n) { 
					//	return { id : n.attr ? n.attr("id") : 0	};
					//}
				}
			},
			"plugins" : [ "themes", "json_data"]
		});

	});
});
