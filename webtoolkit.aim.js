// JavaScript Document
/**
*  AJAX IFRAME METHOD (AIM)
*  http://www.webtoolkit.info/
**/

AIM = {
	frame : function(c) {
		var n = 'f' + Math.floor(Math.random() * 99999);
		var d = document.createElement('DIV');
		d.innerHTML = '<iframe style="display:none" src="about:blank" id="'+n+'" name="'+n+'" onload="AIM.loaded(\''+n+'\')"></iframe>';
		document.body.appendChild(d);

		var i = document.getElementById(n);
		if (c && typeof(c.onComplete) === 'function') {
			i.onComplete = c.onComplete;
		}

		if (c && c.returnJson && typeof(c.returnJson) === 'boolean') {
			i.returnJson = c.returnJson;
		} else {
			i.returnJson = false;
		}
		return n;
	},

	form : function(f, name) {
		f.setAttribute('target', name);
	},

	submit: function (f, c) {
		if (f.checkValidity()) {
			AIM.form(f, AIM.frame(c));
			if (c && typeof (c.onStart) === 'function') {
				return c.onStart();
			} else {
				return true;
			}
		}
	},

	loaded : function(id) {
		var i = document.getElementById(id);
		if (i.contentDocument) {
			var d = i.contentDocument;
		} else if (i.contentWindow) {
			var d = i.contentWindow.document;
		} else {
			var d = window.frames[id].document;
		}
		if (d.location.href === "about:blank") {
			return;
		}

		if (typeof(i.onComplete) === 'function') {
			if(i.returnJson){
				i.onComplete(JSON.parse(d.body.innerText));
			} else {
				i.onComplete(d.body.innerHTML);
			}
		}
	}

};


function _isHTML(str) {
	var doc = new DOMParser().parseFromString(str, "text/html");
	return Array.from(doc.body.childNodes).some(function(node){return node.nodeType === 1});
}
