	var API = {};

	API.page_data = {
		"pages" : {

			"0_0" : {
				"coords": [0,0],
				"url": "404/index.html",
				"title": "404",
				"author": "Polyducks",
				"desc": "A poem about 404 pages"
			},
			"0_-1" : {
				"coords": [0,-1],
				"url": "gazebo/index.html",
				"title": "Gazebo",
				"author": "Polyducks",
				"desc": "A living description of a park"
			},
			"1_-1" : {
				"coords": [1,-1],
				"url": "indian_balsam/index.html",
				"title": "Indian Balsam",
				"author": "Polyducks",
				"desc": "A plant study"
			},
		},
		"settings":{
			path: "../"
		}
	};

	//INJECT NAVIGATION
	(function(){

		//grab injection target

		var inject_target = document.querySelector("#sidebar");
		if ( !inject_target ){
			return;
		}


		//FUNCTIONS AND GLOBAL VARS
		function Make_Room_URL(room){
			return API.page_data.settings.path + room.url;
		}
		//user current room
		var user_room = (function(){
			//find current URL in the API
			var href = document.location.href;

			var found_page = null;
			var match = "";
			//for( var i = 0; i < API.page_data.pages.length; i++ ){
			for( var i in API.page_data.pages ){
				if ( API.page_data.pages.hasOwnProperty(i) ){
					var page = API.page_data.pages[i];
					var regex = new RegExp( page.url.replace(".", "\\.") + "$", "i" );
					var temp_match = regex.exec( href )

					if ( temp_match ){
						if ( temp_match[0].length > match.length ){
							found_page = page;
						}
					}
				}
			}
			return found_page;
		})();

		//rooms as an array
		var room_array = Object.values( API.page_data.pages );





		var inject_HTML = document.createElement("DIV");

		inject_HTML.innerHTML = `
			<div id="sidebar-button">
				<span id="sidebar-button-text"></span>
			</div>

			<nav id="sidebar-nav">

				<a id="sidebar-title-link" href="https://wanderverse.org/">
					<h2 id="sidebar-title" title="Wanderverse.org">Wanderverse.org</h2>
				</a>

				<ul id="sidebar-map">
				</ul>

				<ul id="nav-options">
					<li>
						<a id="nav-options-prev" href="" title="Previous" alt="Previous">&lt;</a>
					</li>
					<li>
						<a id="nav-options-rand" title="Find a random page" alt="Find a random page">?</a>
					</li>
					<li>
						<a id="nav-options-next" href="" title="Next" alt="Next">&gt;</a>
					</li>
				</ul>

			</nav>`;

		var sidebar_map = inject_HTML.querySelector("#sidebar-map");

		function lookup_room_relative(x,y){
			if ( user_room ){
				var rel_x = user_room.coords[0];
				var rel_y = user_room.coords[1];
				return [ rel_x+x,rel_y+y ];
			}
			return [ x, y ];
		}

		//populate the map
		for ( var y = -1; y <= 1; y++ ){
			for ( var x = -1; x <= 1; x++ ){
				var el = document.createElement("LI");

				var coords = lookup_room_relative(x,y);

				el.setAttribute("data-coord-x", coords[0] );
				el.setAttribute("data-coord-y", coords[1] );

				if ( x == 0 && y == 0 ){
					el.classList.add("home");
				}

				var link_page = API.page_data.pages[ coords[0] + "_" + coords[1] ];

				if ( link_page ){
					el.classList.add("populated-room");
					var link = document.createElement("A");
					link.href = API.page_data.settings.path + link_page.url;
					link.title = link_page.title + " by " + link_page.author;
					el.appendChild(link);
				}

				sidebar_map.appendChild( el );
			}
		}

		//set up buttons
		(function(){
			//prev
			var prev = inject_HTML.querySelector("#nav-options-prev");
			//next
			var next = inject_HTML.querySelector("#nav-options-next");

			var index = room_array.indexOf(user_room);

			if ( index > 0 ){
				prev.href = API.page_data.settings.path + room_array[index-1].url;
			}else{
				prev.removeAttribute("href");
				prev.classList.add("button-disabled");
			}
			if ( index < room_array.length -1 ){
				next.href = API.page_data.settings.path + room_array[index+1].url;
			}else{
				next.removeAttribute("href");
				next.classList.add("button-disabled");
			}

		})();

		//populate

		inject_target.innerHTML = inject_HTML.innerHTML;

		//-------------------------------
		//add event listeners
		//-------------------------------
		(function(){
			var btn = document.querySelector("#sidebar-button");

			btn.addEventListener("click", function(){
				inject_target.classList.toggle("sidebar-open");
			});
		})();

		//------------
		//Random btn
		//------------
		(function(){
			var btn = document.querySelector("#nav-options-rand");

			btn.addEventListener("click", function(e){
				e.preventDefault();

				user_index = room_array.indexOf( user_room )

				var length = room_array.length;

				var rnd_index;

				do{
					rnd_index = Math.floor( Math.random() * length );
				}
				while ( rnd_index == user_index );

				var URL = Make_Room_URL( room_array[ rnd_index ] );

				document.location.href = URL;

			});
		})();

	})();