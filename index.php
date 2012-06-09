<?php
$color       = isset($_GET[ 'theme' ]) ? $_GET[ 'theme' ] : 'stylish-yellow';
$themeroller = isset($_GET[ 'themeroller' ]);

function css($link)
{
	return '<link href="' . $link . '" rel="stylesheet" type="text/css"/>';
}

function js($link)
{
	return '<script src="' . $link . '"></script>';
}

?>

<!doctype html>
<html>
<head>
	<title>jQuery Tagit Demo Page (PHP<?php echo isset($themeroller) ? '/ThemeRoller' : ''; ?>)</title>
	<?php
	echo js('demo/js/jquery.1.7.2.min.js');
	echo js('demo/js/jquery-ui.1.8.20.min.js');
	echo css('demo/css/demo.css');

	if(!$themeroller)
	{
		echo js('js/tagit.js');
		echo css('demo/css/jquery-ui-base-1.8.20.css');
		echo css('css/tagit-' . $color . '.css');
	}
	else
	{
		echo js('js/tagit-themeroller.js');
		echo js('demo/themeswitcher/jquery.themeswitcher.js');
		echo css('css/themeroller/tagit.css');
		echo css('css/themeroller/bootstrap/Bootstrap.css');
	} ?>
	<script>
		$(function () {

		<?php if($themeroller)
		{
			?>
			$('#switcher').themeswitcher({
				imgpath:'demo/themeswitcher/images/',
				additionalThemes:[
					{
						title:'Aristo',
						name:'aristo',
						icon:'theme_90_aristo.png',
						url:'css/themeroller/aristo/Aristo.css'
					},
					{
						title:'Twitter Bootstrap',
						name:'bootstrap',
						icon:'theme_90_aristo.png',
						url:'css/themeroller/bootstrap/Bootstrap.css'
					}
				],
				loadTheme:'Bootstrap'
			});
			<?php } ?>

			var availableTags = [
				"ActionScript",
				"AppleScript",
				"Asp",
				"BASIC",
				"C",
				"C++",
				"Clojure",
				"COBOL",
				"ColdFusion",
				"Erlang",
				"Fortran",
				"Groovy",
				"Haskell",
				"Java",
				"JavaScript",
				"Lisp",
				"Perl",
				"PHP",
				"Python",
				"Ruby",
				"Scala",
				"Scheme"
			];

			$('#demo1').tagit({tagSource:availableTags, select:true, sortable:true});
			$('#demo2').tagit({tagSource:availableTags});
			$('#demo3').tagit({tagSource:availableTags, triggerKeys:['enter', 'comma', 'tab']});
			$('#demo4').tagit({tagSource:availableTags, sortable:true, tagsChanged:function (a, b) {
				$('#demo4Out').html(a + ' was ' + b);
			} });
			$('#demo5').tagit({maxLength:5, maxTags:5 });
			$('#demo6').tagit({tagSource:availableTags, sortable:true});
			$('#demo7').tagit({tagSource:availableTags, sortable:'handle'});


			$('#demo1GetTags').click(function () {
				showTags($('#demo1').tagit('tags'))
			});
			$('#demo2GetTags').click(function () {
				showTags($('#demo2').tagit('tags'))
			});
			$('#demo2ResetTags').click(function () {
				$('#demo2').tagit('reset')
			});
			$('#demo3GetTags').click(function () {
				showTags($('#demo3').tagit('tags'))
			});
			$('#demo4GetTags').click(function () {
				showTags($('#demo4').tagit('tags'))
			});
			$('#demo5GetTags').click(function () {
				showTags($('#demo5').tagit('tags'))
			});
			$('#demo6GetTags').click(function () {
				showTags($('#demo6').tagit('tags'))
			});
			$('#demo7GetTags').click(function () {
				showTags($('#demo7').tagit('tags'))
			});

			function showTags(tags) {
				console.log(tags);
				var string = "Tags (label : value)\r\n";
				string += "--------\r\n";
				for (var i in tags)
					string += tags[i].label + " : " + tags[i].value + "\r\n";
				alert(string);
			}

			$('.browser').hover(
				function () {
					$(this).children('a').children('div').show('fast');
				},
				function () {
					$(this).children('a').children('div').hide('fast');
				});
		});
	</script>
</head>
<body>
<div id="wrap">
<div id="switcher_parent">
	<?php if(!$themeroller)
{
	?>
	<div id="switcher" class="notr">
		<a href="?themeroller=true">
			Tried Tagit with ThemeRoller?<br/>
			<img class="tr"
			     src="http://www.filamentgroup.com/examples/RollAUI/images/themeroller_ready_white_400px.gif"/>
		</a>
	</div>
	<?php
}
else
{
	?>
	<div id="switcher"></div>
	<?php } ?>
</div>
<h1>jQuery Tagit Demo Page</h1>

<div id="description" class="box"><a name="description"></a>
	The jQuery Tagit plugin transforms an html unordered list into a unique tagging plugin.<br/>
	Why unique? Because jQuery Tagit uses jQuery Ui's auto-complete plugin to supply suggestions to users
	as they type.
</div>

<div class="box"><a href="#demos">Jump straight to the demos!</a></div>

<h2><a name="browsers">Browser Support</a></h2>

<div class="box">
	<div class="browser">
		<a id="chrome" href="http://www.google.com/chrome">
			<div>Works in Google Chrome!</div>
		</a>
	</div>
	<div class="browser">
		<a id="firefox" href="http://www.mozilla.com">
			<div>Works in Firefox!</div>
		</a>
	</div>
	<div class="browser">
		<a id="ie" href="http://www.microsoft.com/windows/internet-explorer">
			<div>Works in IE7+!</div>
		</a>
	</div>
	<div class="browser">
		<a id="opera" href="http://www.opera.com">
			<div>Works in Opera!</div>
		</a>
	</div>
	<div class="browser" style="margin-right: 0">
		<a id="safari" href="http://www.apple.com/safari">
			<div>Works in Safari!</div>
		</a>
	</div>
	<div style="clear: both;"></div>
</div>

<h2><a name="features">Features</a></h2>

<div class="box features">
	<ul>
		<li>Convenient way for users to enter a list of items</li>
		<li>Fully integrated with jQuery ui auto complete</li>
		<li>Automatically adds current input as tag if input loses focus</li>
		<li>Easy to use public methods</li>
		<li>Easy to theme e.g.(<a href="?theme=simple-green#demos">Simple Green</a> <a href="?theme=simple-blue#demos">Simple
			Blue</a> <a href="?theme=simple-grey#demos">Simple Grey</a>)
		</li>
		<li>Customizable <em>accept</em> keys</li>
		<li>Backspace on empty input deletes previous tag</li>
		<li>Ability to provide <em>initial tags</em> on creation through options</li>
		<li>Ability to provide <em>initial tags</em> on creation via list items</li>
		<li>Option to toggle usage of a hidden select so the tags can be sent using a normal form!</li>
		<li>Ability to re-arrange tags by drag and drop!</li>
		<li><a href="?themeroller=true">Optional ThemeRoller compatibility!</a></li>
	</ul>
</div>

<h2><a name="code">The Minimum Code Required</a></h2>

<div class="code box">
	$(<span class="green">'#tags'</span>).tagit();
</div>

<h2><a name="options">Options</a></h2>

<table class="options">
	<thead>
	<tr>
		<th>Name</th>
		<th>Type</th>
		<th>Default</th>
		<th>Note</th>
	</tr>
	</thead>
	<tbody>
	<tr class="odd">
		<td>tagSource</td>
		<td>String, Array, Callback</td>
		<td>[]</td>
		<td class="left">This option maps directly to the <a href="http://jqueryui.com/demos/autocomplete/">jQuery
			UI Autocomplete source option</a></td>
	</tr>

	<tr class="even">
		<td>triggerKeys</td>
		<td>Array</td>
		<td>['enter', 'space', 'comma', 'tab']</td>
		<td class="left">An array containing all or any of the default options.<br/>
			These are the keys that will trigger a tag completion
		</td>
	</tr>

	<tr class="odd">
		<td>allowNewTags</td>
		<td>Bool</td>
		<td>true</td>
		<td class="left">Allow tags that do not exist in tagSource to be entered?</td>
	</tr>

	<tr class="even">
		<td>initialTags</td>
		<td>Array</td>
		<td>[]</td>
		<td class="left">An array containing tags to pre-populate the field with</td>
	</tr>

	<tr class="odd">
		<td>minLength</td>
		<td>Int</td>
		<td>1</td>
		<td class="left">The minimum length before a triggerKey will create a tag</td>
	</tr>

	<tr class="even">
		<td>select</td>
		<td>Bool</td>
		<td>false</td>
		<td class="left">Maintain a hidden select in place for form submissions<br/>
			To name the select simply give your UL a name attribute!
			<hr/>
			Don't forget
			to include &#91; and &#93; if your language (e.g. PHP) requires them!
		</td>
	</tr>

	<tr class="odd">
		<td>tagsChanged</td>
		<td>Callback</td>
		<td>function(tagValue, action, element)</td>
		<td class="left">Callback on changed tags:<br>
			<b>tagValue:</b> string<br>
			<b>action:</b> string - either 'added', 'popped', 'moved' or 'reset'<br>
			<b>element:</b> object - reference to the added LI element
		</td>
	</tr>

	<tr class="even">
		<td>caseSensitive</td>
		<td>Bool</td>
		<td>false</td>
		<td class="left">
			The check for existing tags is case sensitive. If false the words "Foo" and "foo" considered the same
		</td>
	</tr>

	<tr class="odd">
		<td>highlightOnExistColor</td>
		<td>String</td>
		<td>#0F0</td>
		<td class="left">
			If the user tries to add a tag, that already exists, the existing tag will run a highlight effect using
			the defined background color.
			If null, the highlight effect is turned off.
		</td>
	</tr>

	<tr class="even">
		<td>maxLength</td>
		<td>Int</td>
		<td><em>unlimited</em></td>
		<td class="left">
			The maximum allowable length of a tag.<br/>
			If omitted, tags of unlimited length are allowed.
		</td>
	</tr>

	<tr class="odd">
		<td>maxTags</td>
		<td>Int</td>
		<td><em>unlimited</em></td>
		<td class="left">
			The maximum number of tags that the user can enter.<br/>
			If omitted, an unlimited number of tags are allowed.
		</td>
	</tr>

	<tr class="even">
		<td>sortable</td>
		<td>Bool, String</td>
		<td><em>false</em></td>
		<td class="left">
			Allows the user to re-order the tags using drag and drop.<br/>
			If true the whole tag is draggable, if 'handle' a handle is <br/>
			rendered and the tag is only draggable using the handle.
		</td>
	</tr>
	</tbody>
</table>

<h2><a name="methods">Methods</a></h2>

<table class="methods">
	<thead>
	<tr>
		<th>Name</th>
		<th>Return</th>
		<th>Note</th>
	</tr>
	</thead>
	<tbody>
	<tr class="odd">
		<td>.tagit("destroy")</td>
		<td>null</td>
		<td class="left">Returns the ul to its original state</td>
	</tr>

	<tr class="even">
		<td>.tagit("tags")</td>
		<td>Array</td>
		<td class="left">Returns an array of objects about all the tags.</td>
	</tr>

	<tr class="odd">
		<td>.tagit("reset")</td>
		<td>null</td>
		<td class="left">Resets the tags list to the initial value</td>
	</tr>

	<tr class="even">
		<td>.tagit("fill", [{label: 'tag', value: 12}, {label: 'stuff', value: 13}])</td>
		<td>null</td>
		<td class="left">Empties the tags and fills the plugin with the provided tags.</td>
	</tr>

	<tr class="odd">
		<td>.tagit("add", {label: 'tag', value: 12})</td>
		<td>Bool</td>
		<td class="left">Adds a tag to the plugin.</td>
	</tr>

	</tbody>
</table>

<h2><a name="demos">Demos</a></h2>
<?php if(!$themeroller)
{
	?>
<div class="box"><strong>Theme: </strong>
	<a href="?theme=simple-green#demos">Simple Green</a> |
	<a href="?theme=simple-blue#demos">Simple Blue</a> |
	<a href="?theme=simple-grey#demos">Simple Grey</a> |
	<a href="?theme=stylish-yellow#demos">Stylish Yellow</a> |
	<a href="?theme=dark-grey#demos">Dark Grey</a> |
	<a href="?theme=awesome-orange#demos">Awesome Orange</a> |
	<a href="?theme=awesome-blue#demos">Awesome Blue</a> |
</div>
	<?php } ?>

<h3>Hidden Select</h3>

<div class="box">
	<div class="note">
		Normally the select is hidden, however we have shown it for this demo so you can see
		how it operates!
	</div>
	<ul id="demo1" name="nameOfSelect"></ul>
	<div class="buttons">
		<button id="demo1GetTags" value="Get Tags">Get Tags</button>
	</div>
</div>

<h3>Initial Tags</h3>

<div class="box">
	<div class="note">
		You can manually specify tags in your markup by adding <em>list items</em> to the unordered list!
	</div>

	<ul id="demo2" name="demo2">
		<li>here</li>
		<li>are</li>
		<li>some</li>
		<li>initial</li>
		<li>tags</li>
	</ul>
	<div class="buttons">
		<button id="demo2GetTags" value="Get Tags">Get Tags</button>
		<button id="demo2ResetTags" value="Reset Tags">Reset Tags</button>
	</div>
</div>

<h3>Allowing Spaces</h3>

<div class="box">
	<div class="note">
		By overriding the <em>trigger keys</em> you can have spaces, comma's and any other character in your tags!
	</div>

	<ul id="demo3"></ul>
	<div class="buttons">
		<button id="demo3GetTags" value="Get Tags">Get Tags</button>
	</div>
</div>

<h3>Callback</h3>

<div class="box">
	<div class="note">
		By passing a function in for <em>tagsChanged</em> you can preform your own events too!
	</div>

	<ul id="demo4"></ul>
	<div class="buttons">
		<button id="demo4GetTags" value="Get Tags">Get Tags</button>
	</div>
	<p>Action:

	<div id="demo4Out">none</div>
	<p>
</div>

<h3>Limits</h3>

<div class="box">
	<div class="note">
		You can limit both the maximum and minimum amount of, and characters per tag!
	</div>

	<ul id="demo5"></ul>
	<div class="buttons">
		<button id="demo5GetTags" value="Get Tags">Get Tags</button>
	</div>
	<p>Maximum of 5 tags and 5 characters per tag.</p>
</div>

<h3>Sortable : true</h3>

<div class="box">
	<div class="note">
		You can allow the tags to be sortable by dragging the entire tag!
	</div>

	<ul id="demo6" name="demo6">
		<li>here</li>
		<li>are</li>
		<li>some</li>
		<li>initial</li>
		<li>tags</li>
	</ul>
	<div class="buttons">
		<button id="demo6GetTags" value="Get Tags">Get Tags</button>
	</div>
</div>

<h3>Sortable : handle</h3>

<div class="box">
	<div class="note">
		Or only draggable by a handle!
	</div>

	<ul id="demo7" name="demo7">
		<li>here</li>
		<li>are</li>
		<li>some</li>
		<li>initial</li>
		<li>tags</li>
	</ul>
	<div class="buttons">
		<button id="demo7GetTags" value="Get Tags">Get Tags</button>
	</div>
</div>


<h2></h2>

<div class="box">
	&copy; Content and Design Matthew Hailwood <?php date_default_timezone_set('UTC'); echo Date('Y'); ?><br/>
</div>

</div>
</body>
</html>
