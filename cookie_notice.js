var rgb = function(r, g, b) {
	r = Math.floor(r);
	g = Math.floor(g);
	b = Math.floor(b);
	return "rgb("+ r +","+ g+ ","+ b +")";
}

NodeList.prototype.forEach = HTMLCollection.prototype.forEach = Array.prototype.forEach;

Object.prototype.forEach = function(func, context) {
	let value;
	context = context || this;
	for (key in this) {
		if (this.hasOwnProperty(key)) {
			value = this[key];
			func.call(context, key, value);
		}
	}    
};

HTMLElement.prototype.Add = function(tag, eclass){ 
	let child = document.createElement(tag);
	if (eclass) {
		child.className = eclass;
	}
	this.append(child);
	return child;
}

function isObject(val) {
	return val instanceof Object; 
}

function setCookie(name,value,days) {
	let expires = "";
	if (days) {
		let date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	} else {
		expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
	}
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
	let nameEQ = name + "=";
	let ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

let config = {
	show: false,
	text: {
		we_use_cookies: "We use cookies",
		more_details: "More details",
		accept: "Accept"
	},
	more_details_url: "https://ec.europa.eu/info/cookies_en",
	colors: {
		background: rgb(6, 6, 6),
		text_we_use_cookies: rgb(190, 185, 175),
		text_more_details: rgb(240, 240, 235),
		text_accept: rgb(240, 240, 235),
		accept_button: rgb(30, 30, 30),
		accept_button_hovered: rgb(210, 10, 10),
	},
	parent_selector: "body"
};

var cookieNotice = function(cfg) {
	if (!cfg) {
		config.show = true;
	} else {
		cfg.forEach(function(key, val) {
			if (isObject(val)) {
				val.forEach(function(key2, val2) {
					config[key][key2] = val2;
				});
			} else {
				config[key] = val;
			}
		});
		config.show = true;
	}
}

document.addEventListener("DOMContentLoaded", function() {
	if (config.show === true && !getCookie("allow_cookies")) {
		let parent = document.querySelector(config.parent_selector);

		let notice = parent.Add("div");
		notice.id = "cookie_notice";
		notice.style.backgroundColor = config.colors.background;
		notice.style.padding = "1em 2em";
		notice.style.position = "fixed";
		notice.style.zIndex = 9999;
		notice.style.bottom = "2em";
		notice.style.right = "2em";
		notice.style.alignItems = "center";
		notice.style.display = "flex";

		let we_use_cookies = notice.Add("p");
		we_use_cookies.style.color = config.colors.text_we_use_cookies;
		we_use_cookies.style.marginRight = "1em";
		we_use_cookies.style.fontSize = "1em";
		we_use_cookies.innerHTML = config.text.we_use_cookies;

		we_use_cookies.Add("br");

		let more_details = we_use_cookies.Add("a");
		more_details.style.color = config.colors.text_more_details;
		more_details.style.fontSize = "1.4em";
		more_details.innerHTML = config.text.more_details;
		more_details.href = config.more_details_url;

		let accept_button = notice.Add("p");
		accept_button.id = "test";
		accept_button.style.padding = "0.7em 1.4em";
		accept_button.style.margin = "0";
		accept_button.style.marginLeft = "auto";
		accept_button.style.marginRight = "0";
		accept_button.style.color = config.colors.text_accept;
		accept_button.style.backgroundColor = config.colors.accept_button;
		accept_button.style.fontSize = "1.4em";
		accept_button.style.fontWeight = "300";
		accept_button.style.transition = "0.3s";
		accept_button.style.cursor = "pointer";
		accept_button.innerHTML = config.text.accept;
		accept_button.onmouseover = function() {
			this.style.backgroundColor = config.colors.accept_button_hovered;
		}
		accept_button.onmouseleave = function() {
			this.style.backgroundColor = config.colors.accept_button;
		}
		accept_button.onclick = function() {
			setCookie("allow_cookies", "1");
			notice.remove();
		}
	}
});
