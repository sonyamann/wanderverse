var API = {};

API.page_data = {
	"pages" : {
		"0_0_0" : {
			"coords": [0,0,0],
			"url": "../wanderpath/test_page.html",
			"title": "a test page",
			"author": "polyducks",
			"desc": "A ponderous page ponders itself."
		},
		"1_0_0" : {
			"coords": [1,0,0],
			"url": "../wanderpath/navigation_demo.html",
			"title": "a navigation demo",
			"author": "polyducks",
			"desc": "A demonstration of navigation."
		},
		"2_0_0" : {
			"coords": [2,0,0],
			"url": "../wanderpath/poetry_template.html",
			"title": "a simple poetry template",
			"author": "polyducks",
			"desc": "A demonstration of poetry."
		}
	}
};

API.settings = {
	map_size: 5
};

API.user = {
	x: 0,
	y: 0,
	visited: [],
	cookies: false
};













(function(){
	Page_Ready = function(callback){
		var activated = false;
		if (document.readyState == "loaded" || document.readyState == "interactive" || document.readyState == "complete"){
			activated = true;
			callback();
		}else{
			document.addEventListener("readystatechange", function(){
				if (( document.readyState == "loaded" || document.readyState == "interactive" || document.readyState == "complete" ) && !activated){
					activated = true;
					callback();
				}
			});
		}
	}

	Page_Ready(function(){
		var navigation = document.querySelector("#wanderverse-navigation");
		if ( navigation ){

			/*

				<div id="wn-map">
					<ul>
						<li class="wn-populated">
							<a class="wn-link" href="">
								<span class="wn-title"></span>
								<span class="wn-author"></span>
								<span class="wn-desc"></span>
							</a>
						</li>
						<li class="wn-unpopulated"></li>
						...
					</ul>
				</div>

			*/

			var map = document.createElement("DIV");
			map.id = "wn-map";
			var ul = document.createElement("UL");
			for ( var x = 0; x < API.settings.map_size; x++ ){
				for ( var y = 0; y < API.settings.map_size; y++ ){
					let li = document.createElement("LI");
						var title = document.createElement("SPAN");
							title.className = "wn-title";
							li.appendChild(title);
						var author = document.createElement("SPAN");
							author.className = "wn-author";
							li.appendChild(author);
						var desc = document.createElement("SPAN");
							desc.className = "wn-desc";
							li.appendChild(desc);
					ul.appendChild(li);
				}
			}
			map.appendChild(ul);
			navigation.appendChild(map);


		}
	});
})();