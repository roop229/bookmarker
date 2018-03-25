document.getElementById("myForm").addEventListener("submit", submitForm);



function submitForm(e) {

	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteURL').value;


	var bookmark = {
		name: siteName,
		u: siteUrl
	};


	if(!validateform(siteName,siteUrl)){
		return false;
	}
	
	document.getElementById('myForm').reset();

	e.preventDefault();



if(localStorage.getItem('Bookmarks') === null){
	
	var Bookmarks = [];

	Bookmarks.push(bookmark);

	localStorage.setItem('Bookmarks',JSON.stringify(Bookmarks));



}else{

	var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks')); 

	Bookmarks.push(bookmark);

	localStorage.setItem('Bookmarks',JSON.stringify(Bookmarks));
}

fetchBookmark();

}



function deleteBookmark(URL){
	var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));

	for (var i = 0; i <Bookmarks.length; i++) {
			if(Bookmarks[i].u == URL){
				Bookmarks.splice(i,1);
			}
}
	
	localStorage.setItem('Bookmarks',JSON.stringify(Bookmarks));

fetchBookmark();

}

function fetchBookmark(){

	var Bookmarks = JSON.parse(localStorage.getItem('Bookmarks'));
	

	var bookmarkResult = document.getElementById('bookmarkResult');


	bookmarkResult.innerHTML = '';
	for (var i = 0; i < Bookmarks.length; i++) {

		var name = Bookmarks[i].name;
		var URL = Bookmarks[i].u;


		bookmarkResult.innerHTML += '<div class="jumbotron">'+
									'<h2>'+name+'</h2>'+
									'<a class="btn btn-default btn-scondary" role="button" target="_blank" href="'+URL+'" >Visit</a>'+
									'<a class="btn btn-default btn-danger" role="button"  target="_self" href="#" onclick="deleteBookmark(\''+URL+'\')">Delete</a>';
	}
	
}

function validateform(siteName,siteUrl){
	if(!siteName || !siteUrl){
		alert('Please fill the form');
		return false;
	}
	

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex)){
		alert('Please use a valid URL');
		return false;
	}

	return true;
}