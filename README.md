# webtoolkit.aim
Post form data using AJAX. Modified code from http://www.webtoolkit.info/ajax_file_upload.html

# Usage
Include the webtoolkit.aim.js file in your html page
`<script src="webtoolkit.aim.js"></script>`

Add an `onsubmit` callback to your form thus
```
<form method="post" action="form_processing_url" onsubmit="AIM.submit(this, callback)">
...
</form>
```

Then define `callback` as a javascript object var like this:

``` js
<script type="text/javascript">
var callback = {
	onStart: function () {
		showLoader();
	}, 
	onComplete: function (s) {
		$.unblockUI();
			if (s.status === 'success') {
			toastr.success(s.message);
		} else if (s.status === 'error' || s.error_message !== undefined || s.error !== undefined) {
			toastr.error(s.message || s.error || s.error_message);
		}
	}, returnJson: true
};
</script>
```

# Parameters
`callback` is json of this form: `{onStart, onComplete, returnJson}` where:
`onStart`, `onComplete` are functions and `returnJson` is boolean.

onComplete is a function with the return data as parameter: 
```
onComplete:function(data){
// do something with data
// data will be json if the returnJson is set to true
}
```

# Extras
* Plays nicely with http://reactiveraven.github.io/jqBootstrapValidation/ when form has `novalidate="novalidate"` attribute.
* Plays nicely with https://github.com/CodeSeven/toastr to display notices as well.
* You can invoke `$.blockUI()` from http://jquery.malsup.com/block/ in the onStart function to display a loader which you can clear `$.unblockUI()` during `onComplete`.
* `webtoolkit.aim.js` only submits the data when the form is valid.

