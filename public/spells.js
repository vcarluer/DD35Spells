var spellList = {
	pageCreated : function(event) {		
		spellList.init();			
	},
	
	init : function() {		
		$.getJSON("spells.json", spellList.createList);
	},
	
	createList : function(data) {		
		$.each(data, spellList.createItem);		
		$('#list').listview('refresh');		
	},
	
	createItem : function(i,item){		
		var li = '<li>';
		li += '<a href="#">';		
		li += '<strong>' + item.Name + '</strong>';
		li += '<p>' + item.ShortDescription + '</p>';
		li += '</a>';
		
		li += '<a href="#" data-dividertheme="b">Favoris</a>';
		
		li += '</li>';				
		$('#list').append(li);
	}
};

$('#spellList').live('pagecreate ', spellList.pageCreated);