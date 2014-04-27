
// STATE
var menuOn = false;
var cookieName = "COMICPAGE";
var comicCookieName = cookieName + "_" + comicName;

// ----------------------------------
//
// comicaster navigation and menu functions
//

function exitComic(){
	location.href = exitComicURL;
}

function gotoPage(n){
	Reveal.slide(n);
	hideMenu();
}

function toggleMenu(){
	if(menuOn === false){
		showMenu();
	}else{
		hideMenu();
	}
}

function showMenu(){
	menuOn = true;
	showModal("#menu-actions");

	//show the thumbnails menu
	updateComicThumbsMenu();

}

function hideMenu(){
	menuOn = false;
	hideModal("#menu-actions");
}

function showHint(){
	hideModal("#menu-actions");
	hideModal("#menu-continue");
	showModal("#menu-hint");
}

function hideHint(){
	hideModal("#menu-hint");
}

function showMessage(text){
	hideModal("#menu-actions");
	hideModal("#menu-hint");
	hideModal("#menu-continue");

	$("#message").text(text);

	showModal("#message-alert");

	setTimeout(function(){
		$("#message-alert").fadeOut(function(){
			hideModal("#message-alert");
		})
	}, 700);
}

function showContinue(){
	hideModal("#menu-actions");
	hideModal("#menu-hint");
	showModal("#menu-continue");
}
function hideContinue(){
	hideModal("#menu-continue");
}

function showModal(id){
	$(id).css("display", "block");
	$(id).css("height", "100%");
	$(id).show();
	$(id).css("opacity", 1);
}
function hideModal(id){
	$(id).css("opacity", 0);
	$(id).hide();
}

// ----------------------------------
//
// general comicaster helper functions
//

// save the URL to resume reading the comic
function saveCurrentSlideURL(){
	var hash = document.location.hash;
	var encodedHash = encodeURIComponent(hash);

	if(hash){
		$.cookie(comicCookieName, encodedHash, { expires: 90 });
	}else{
		$.cookie(comicCookieName, null);
	}
}

// get the URL to resume reading the comic
function getLatestPositionSlideURL(){
	return decodeURIComponent($.cookie(comicCookieName));
}

// load the URL to resume reading the comic
function loadLatestPositionSlideURL(){
	var savedPageURL = getLatestPositionSlideURL();
	if(savedPageURL){
		location.hash = savedPageURL;
	}
}

//get the current slide
function slideStatusIndex(){
	var slideIndex = Reveal.getIndices();
	var slideIndexLookup = slideIndex.h + "-" + slideIndex.v;

	return slideIndexLookup;
}

var zoomLevel = 1;

// helper function reused by many of the
// input event handlers
function handleDoubleTap(){

	var $currentSlide = $(getCurrentSlideDOM());
	var currentComics = $currentSlide.find(".comic");
	var zoomAmount = 0;

	console.log("handleDoubleTap");
	console.log("$currentSlide");
	console.log($currentSlide);

	if($currentSlide.hasClass("zoom1")){
		$currentSlide.addClass("zoom2");
		$currentSlide.removeClass("zoom1");
		$currentSlide.removeClass("zoom3");
		$currentSlide.removeClass("zoom4");
		zoomAmount = 2;

		$(".fa-search-minus").addClass("fa-search-plus");
		$(".fa-search-minus").removeClass("fa-search-minus");
		$(".button-zoom-1").addClass("button-zoom-2");
		$(".button-zoom-1").removeClass("button-zoom-3");
		$(".button-zoom-1").removeClass("button-zoom-4");
		$(".button-zoom-1").removeClass("button-zoom-1");


	}else if($currentSlide.hasClass("zoom2")){
		$currentSlide.addClass("zoom3");
		$currentSlide.removeClass("zoom2");
		$currentSlide.removeClass("zoom1");
		$currentSlide.removeClass("zoom4");
		zoomAmount = 3;

		$(".fa-search-minus").addClass("fa-search-plus");
		$(".fa-search-minus").removeClass("fa-search-minus");
		$(".button-zoom-2").addClass("button-zoom-3");
		$(".button-zoom-2").removeClass("button-zoom-4");
		$(".button-zoom-2").removeClass("button-zoom-1");
		$(".button-zoom-2").removeClass("button-zoom-2");


	}else if($currentSlide.hasClass("zoom3")){
		$currentSlide.addClass("zoom4");
		$currentSlide.removeClass("zoom3");
		$currentSlide.removeClass("zoom2");
		$currentSlide.removeClass("zoom1");
		zoomAmount = 4;

		$(".fa-search-plus").addClass("fa-search-minus");
		$(".fa-search-plus").removeClass("fa-search-plus");

		$(".button-zoom-3").addClass("button-zoom-4");
		$(".button-zoom-3").removeClass("button-zoom-1");
		$(".button-zoom-3").removeClass("button-zoom-2");
		$(".button-zoom-3").removeClass("button-zoom-3");

	}else if($currentSlide.hasClass("zoom4")){
	// }else{
		$currentSlide.addClass("zoom1");
		$currentSlide.removeClass("zoom4");
		$currentSlide.removeClass("zoom3");
		$currentSlide.removeClass("zoom2");
		zoomAmount = 1;

		$(".fa-search-minus").addClass("fa-search-plus");
		$(".fa-search-minus").removeClass("fa-search-minus");

		$(".button-zoom-4").addClass("button-zoom-1");
		$(".button-zoom-4").removeClass("button-zoom-2");
		$(".button-zoom-4").removeClass("button-zoom-3");
		$(".button-zoom-4").removeClass("button-zoom-4");

	}else{
		$currentSlide.addClass("zoom2");
		$currentSlide.removeClass("zoom1");
		$currentSlide.removeClass("zoom3");
		$currentSlide.removeClass("zoom4");
		zoomAmount = 2;

		$(".fa-search-minus").addClass("fa-search-plus");
		$(".fa-search-minus").removeClass("fa-search-minus");
		$(".button-zoom-1").addClass("button-zoom-2");
		$(".button-zoom-1").removeClass("button-zoom-3");
		$(".button-zoom-1").removeClass("button-zoom-4");
		$(".button-zoom-1").removeClass("button-zoom-1");
	}

	console.log("zoomAmount", zoomAmount);
	zoomLevel = zoomAmount;

    var positionData = getRepositionData();
    var moveLeftAmount = positionData[0];
    var moveTopAmount = positionData[1];

    if(zoomAmount == 1){
    	moveLeftAmount = 7; //moveLeftAmount-5;
    	moveTopAmount = 5; //moveTopAmount-3;
    }else if(zoomAmount == 2){
    	//default
    }else if(zoomAmount == 3){
    	moveLeftAmount = moveLeftAmount+5;
    	moveTopAmount = moveTopAmount+3;
    }else if(zoomAmount == 4){
    	moveLeftAmount = moveLeftAmount+15;
    	moveTopAmount = moveTopAmount+6;
    }

    console.log("moveTopAmount", moveTopAmount);
    console.log("moveLeftAmount", moveLeftAmount);

	if(currentComics.length > 1){
		$currentSlide.parent().css({"top":"-"+moveTopAmount+"em", "left":"-"+moveLeftAmount+"em"});
	}else{
		$currentSlide.parent().css({"top":"-"+moveTopAmount+"em", "left":"-"+(moveLeftAmount)+"em"});
	}

}// handleDoubleTap

// prepares and shows thumbnail menu
// as part of the main comic menu
function updateComicThumbsMenu(){
	// get the comic slide pages
	// $(".comic-container")

	if($("#menu-thumbs").children().length == 0){
		var containerNumber = -1;
		$(".comic-container").each(function(){
			containerNumber += 1;
			// get each comic image within the given slide pages
			// $(this).find("img")
			var div = $("<div class='comic-thumb-page fullpage"+containerNumber+"'></div>")
			$(this).find("img").each(function(){
				// clone the image, or get the source and make a new image
				var img = "<img class='comic-thumb page"+containerNumber+"' src='" + $(this).attr("src") + "' onclick='gotoPage("+containerNumber+");'>";

				// add it to the menu
				div.append(img);
			});
			$("#menu-thumbs").append(div);
		});
	}

	var currentIndex = String(slideStatusIndex()).replace("-0", "");
	$(".comic-thumb-selected").removeClass("comic-thumb-selected");
	$(".page" + currentIndex).addClass("comic-thumb-selected");

	$(".comic-thumb-page-selected").removeClass("comic-thumb-page-selected");
	$(".fullpage" + currentIndex).addClass("comic-thumb-page-selected");

}

// get the DOM element for the current slide
function getCurrentSlideDOM(){
	return	$(Reveal.getCurrentSlide()).find(".comic-container")[0];
}

// based on the viewport size,
// get top and left repositioning
// puts the pages in a better place
// to start reading
function getRepositionData(){
    var w = $(window).width();
    var moveLeftAmount = 0;
    var moveTopAmount = 0;
    if(w >= 1200){
    	moveLeftAmount = 24;
    	moveTopAmount = 11;

    }else if(w <= 1200 && w >= 900){
    	moveLeftAmount = 20;
    	moveTopAmount = 11;

    }else if(w <= 900 && w >= 700){
    	moveLeftAmount = 15;
    	moveTopAmount = 11;

    }else if(w <= 700 && w >= 400){
    	moveLeftAmount = 14;
    	moveTopAmount = 12;

    }else if(w <= 400){
    	moveLeftAmount = 14;
    	moveTopAmount = 19;

    }
    return [moveLeftAmount-12, moveTopAmount-11];
}

// put the page in a readable starting position
function repositionPage(zoomLevel){
	var $currentSlide = $(getCurrentSlideDOM());

	//make sure drag and slide is working
	$currentSlide.pep({
		useCSSTranslation: false,
		rest: recoverSlidePosition
	});

	$currentSlide.css("top", "0px");
	$currentSlide.css("left", "0px");

}

// helper function to rescue the slide
// it is dragged off screen
function recoverSlidePosition(ev, obj){

	var wh = $(window)[0].innerHeight;
	var ww = $(window)[0].innerWidth;
	var currentSlideDom = getCurrentSlideDOM();
	var $currentSlide = $(currentSlideDom);

	var currentComics = $currentSlide.find(".comic");
	var $comicPageLeft = $(currentComics[0]);

	var pos = $comicPageLeft.offset();
	var totalPages = currentComics.length;

	var width = $comicPageLeft.width() * zoomLevel * totalPages;
	var height = $comicPageLeft.height() * zoomLevel;

	var leftLimit = (width/2)*-1;
	var rightLimit = ww + (width/2);
	var topLimit = height*-1;
	var bottomLimit = wh + (height/2);

	var rightTest = pos.left + (width/2);
	var leftTest = pos.left;
	var topTest = pos.top - (height/2);
	var bottomTest = pos.top + (height/2);

	var outOfBounds = false;

	//right
	if(!outOfBounds && rightTest > rightLimit && zoomLevel < 4){
		console.log("out of bounds: RIGHT");
		this.moveTo(width/2,null);
		outOfBounds = true;
	}

	//left
	if(!outOfBounds && leftTest < leftLimit && zoomLevel < 4){
		console.log("out of bounds: LEFT");
		this.moveTo(-1*(width/2), null);
		outOfBounds = true;
	}

	//top
	if(!outOfBounds && topTest < topLimit && zoomLevel < 4){
		console.log("out of bounds: TOP", topTest, topLimit);

		this.moveTo(null,0-(height/2));
		outOfBounds = true;
	}

	//bottom
	if(!outOfBounds && bottomTest > bottomLimit && zoomLevel < 4){
		console.log("out of bounds: BOTTOM");
		this.moveTo(null,wh-(height/2));
		outOfBounds = true;
	}

}


function gotoLastComicPage(){
	var slideNumber = $(".slides").children().length - 2;
	Reveal.slide(slideNumber);
	hideMenu();
	return false;
}

// ----------------------------------
//
// prepare and show the comic as a RevealJS deck
//
$(document).ready(function(){

	// ----------------------------------
	//
	// Reveal JS (turns the comic into a paged deck of slides)
	// configure and initialize...
	//
	// Full list of configuration options available here:
	// https://github.com/hakimel/reveal.js#configuration
	Reveal.initialize({
		controls: false,
		progress: true,
		history: true,
		center: false,
		overview: false,
		touch: false,
		mouseWheel: false,
		transitionSpeed: 'fast', // default/fast/slow
		backgroundTransition: 'none', // default/linear/none
		transition: 'fade' // default/cube/page/concave/zoom/linear/fade/none
	});

	Reveal.addEventListener( 'ready', function( event ) {
		var $currentSlide = $(getCurrentSlideDOM());
		var currentComics = $currentSlide.find(".comic");
	    repositionPage();
	} );

	Reveal.configure({
	  keyboard: {
	    13: 'next',
	    27: showMenu
	  }
	});

	Reveal.addEventListener( 'slidechanged', function( event ) {

		var savedPageURL = getLatestPositionSlideURL();

		saveCurrentSlideURL();

		hideContinue();
		hideMenu();
		hideHint();

		repositionPage();

		//reset zoom indicator based on current page zoom
		$(".fa-search-minus").addClass("fa-search-plus");
		$(".fa-search-minus").removeClass("fa-search-minus");
		$("#button-zoom i").addClass("button-zoom-1");
		$("#button-zoom i").removeClass("button-zoom-2");
		$("#button-zoom i").removeClass("button-zoom-3");
		$("#button-zoom i").removeClass("button-zoom-4");

		//now adjust to correct zoom indicator for current page zoom
		var $currentSlide = $(getCurrentSlideDOM());
		if($currentSlide.hasClass("zoom2")){
			$(".button-zoom-1").addClass("button-zoom-2");
			$(".button-zoom-1").removeClass("button-zoom-3");
			$(".button-zoom-1").removeClass("button-zoom-4");
			$(".button-zoom-1").removeClass("button-zoom-1");
		}else if($currentSlide.hasClass("zoom3")){
			$(".button-zoom-1").addClass("button-zoom-3");
			$(".button-zoom-1").removeClass("button-zoom-2");
			$(".button-zoom-1").removeClass("button-zoom-4");
			$(".button-zoom-1").removeClass("button-zoom-1");
		}else if($currentSlide.hasClass("zoom4")){
			$(".fa-search-plus").addClass("fa-search-minus");
			$(".fa-search-plus").removeClass("fa-search-plus");
			$(".button-zoom-1").addClass("button-zoom-4");
			$(".button-zoom-1").removeClass("button-zoom-3");
			$(".button-zoom-1").removeClass("button-zoom-2");
			$(".button-zoom-1").removeClass("button-zoom-1");
		}

	} );


	// ----------------------------------
	//
	// input event handling: touch, click, etc.
	//

	// -----------
	// full page interactions
	// -----------
	var fullPageBackground = $(".state-background").hammer();

	fullPageBackground.on("tap", function(ev) {
		event.preventDefault();


		hideMenu();

		return false;
	});

	// -----------
	// comic page interactions
	// -----------
	var comicPage = $(".comic").hammer();

	comicPage.on("hold", function(ev) {
		// event.preventDefault();

		toggleMenu();
		return false;
	});

	comicPage.on("doubletap", function(ev) {
		event.preventDefault();

		hideMenu();
		handleDoubleTap();
		return false;
	});

	comicPage.on("pinchin", function(ev) {
		// event.preventDefault();

		hideMenu();
		// resetPageView();
		return false;
	});

	comicPage.on("pinchout", function(ev) {
		// event.preventDefault();

		hideMenu();
		handleDoubleTap();
		return false;
	});

	comicPage.on("tap", function(ev){
		event.preventDefault();

		hideMenu();
		// ---
		return false;
	});


	// mouse wheel events
	var mouseScrollPixels = 5;
	$(window).mousewheel(function(event){

		//vertical scrolling
		var $currentSlide = $(getCurrentSlideDOM());
		var moveTopAmount = Number($currentSlide.css("top").replace("px",""));
	    if(event.deltaY > 0){
			moveTopAmount = moveTopAmount + (mouseScrollPixels*zoomLevel) + (mouseScrollPixels * event.deltaY);// + (1/zoomLevel);
			$currentSlide.css("top", moveTopAmount + "px");
	    }else if(event.deltaY < 0){
			moveTopAmount = moveTopAmount - (mouseScrollPixels*zoomLevel) + (mouseScrollPixels * event.deltaY);
			$currentSlide.css("top", moveTopAmount + "px");
	    }

	    //horizontal scrolling
	    var horizontalMouseScrollPixels = mouseScrollPixels/2;
		var moveLeftAmount = Number($currentSlide.css("left").replace("px",""));
		if(event.deltaX < 0){
			moveLeftAmount = moveLeftAmount + (horizontalMouseScrollPixels*zoomLevel) + (horizontalMouseScrollPixels * event.deltaX);// + (1/zoomLevel);
			$currentSlide.css("left", moveLeftAmount + "px");
		}else if(event.deltaX > 0){
			moveLeftAmount = moveLeftAmount - (horizontalMouseScrollPixels*zoomLevel) + (horizontalMouseScrollPixels * event.deltaX);
			$currentSlide.css("left", moveLeftAmount + "px");
		}
	});

	// determine if the continue? dialog should show
	var savedPageURL = getLatestPositionSlideURL();
	if(savedPageURL && savedPageURL != "" && savedPageURL != "#" && savedPageURL != "#/" && savedPageURL != document.location.hash){
		showContinue();
	}

	//prep the thumbnails
	updateComicThumbsMenu();

	//prep the share links
	$(".sharevia-googleplus").attr("href", "https://plus.google.com/share?url=" + location.href);
	$(".sharevia-facebook").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + location.href);
	$(".sharevia-twitter").attr("href", "https://twitter.com/intent/tweet?text=" + comicShareText + "&url=" + location.href);

}); // document ready


