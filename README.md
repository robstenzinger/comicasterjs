#ComicasterJS

ComicasterJS is a web-based comic reader and boilerplate for publishing comics or other sequential art galleries. It's a way to publish a set of comics with a reading experience that feels more like an e-reader and less like a blog.

## Status

Experimental alpha release. If you like playing with HTML, JavaScript, and CSS in the name of comics mad science you're in the right place.

## Browser Support

Tested on the latest chrome, Safari, and Firefox. Also tested in mobile WebKit and mobile chrome.

## Example

The first chapter of my comic [Art Geek Zoo: The Way of Sound](http://robstenzinger.github.io/comicasterjs/example/index.html).

## Installation and Directions

- Clone or download this project
- Add your comic artwork to the images folder
- Customize index.html:
    + Page title and meta data
    + Edit the &lt;section&gt; elements: add one or two images to each
    + The section elements are super powerful and have many options you can use such as [custom backgrounds and more via RevealJS]().
    + Edit the menu text and links
    + Edit the javascript variables "exitComicURL", "comicName", and "comicShareText" near the footer of index.html
- Customize the styles in comicasterjs.css
    + fonts: web font(s) or common desktop fonts
    + change additional styles as needed
- Test &gt; tweak &gt; publish &gt; repeat until you have the content and look and feel that's right for your comic.

## Features

- an e-reader style user interface (UI) for a web comic
- responsive layout and minimalist UI
- desktop and touch interface support
- drag to scroll the view
- mouse wheel to scroll the view
- four levels of page zoom
- remembers the reader's furthest page, prompts to continue upon returning
- an action menu with thumbnail navigation
- basic help, available via the action menu
- open source 
- extremely customizable 

## Built Upon Other Projects

I'm very grateful for each of these projects:

- [RevealJS](https://github.com/hakimel/reveal.js) for the primary structure, general slide deck paging behavior, and more.
- [PEP](https://github.com/briangonzalez/jquery.pep.js) for the draggable page scrolling.
- [Hammer](http://eightmedia.github.io/hammer.js/) for touch interface gestures.
- [Mousewheel](https://github.com/brandonaaron/jquery-mousewheel) for page scrolling.
- [Cookie](https://github.com/carhartl/jquery-cookie) to remember the furthest page.
- [FontAwesome](http://fontawesome.io/) for icons.

