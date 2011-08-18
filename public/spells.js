var spellList = {
	list : null,
	initing : false,
	
	pageCreated : function(event) {		
		spellList.init();			
	},
	
	init : function() {		
		if (spellList.list == null) {						
			spellList.initing = true;								
			$.getJSON("spells.json", spellList.createList);			
		}				
	},
	
	createList : function(data) {			
		spellList.list = data;
		spellList.listShow();
		spellList.initing = false;		
	},
	
	listPageShow : function(event, ui){
		if (!spellList.initing) {				
			spellList.listShow();
		}
	},
	
	listShow : function(){				
		if (spellList.list != null) {				
			$.each(spellList.list, spellList.createItem);
			// $('#spellList').trigger('create');
			// $('#spellList').page();
			// alert($('#list').listview);
			$('#list').listview('refresh');				
		}
	},
	
	createItem : function(i,item){		
		var li = '<li>';
		li += '<a href="detailspell.html?name=' + item.Name + '">';		
		li += '<strong>' + item.Name + '</strong>';
		li += '<p>' + item.ShortDescription + '</p>';
		li += '</a>';
		
		li += '<a href="index.html" data-dividertheme="b">Favoris</a>';
		
		li += '</li>';				
		$('#list').append(li);		
	},
	
	detailShow : function(event, ui){
  		var selected = getParameterByName("name");  		
  		$.each(spellList.list, function(i, item) {
  			if (item.Name == selected) {
  				var detail = '<h1>' + item.Name + '</h1>';
  				var desc = item.Description.replace(/_NL_/g, "<br>");  				
  				detail += '<p>' + desc + '</p>';
  				$('#spellcontent').append(detail);
  				return true;  				
  			}
  		})
  	}
};

$('#spellList').live('pagecreate', spellList.pageCreated);
$('#spellList').live('pageshow', spellList.listPageShow);
$('#pageDetail').live('pageshow', spellList.detailShow);

function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if(results == null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}