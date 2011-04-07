<?php $color = isset($_GET['theme']) ? $_GET['theme'] : 'simple-blue'; ?>

<!doctype html>
<html>
<head>
    <title>jQuery Tagit Demo Page</title>
    <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
    <link href="css/demo.css" rel="stylesheet" type="text/css"/>
    <link href="css/tagit-<?php echo $color; ?>.css" rel="stylesheet" type="text/css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js"></script>
    <script src="js/tagit.js"></script>
    <script>
        $(function() {

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

            $('#demo1').tagit({tagSource: availableTags, select: true});
            $('#demo2').tagit({tagSource: availableTags});
            $('#demo3').tagit({tagSource: availableTags, triggerKeys: ['enter', 'comma', 'tab']});


            $('#demo1GetTags').click(function(){showTags($('#demo1').tagit('tags'))});
            $('#demo2GetTags').click(function(){showTags($('#demo2').tagit('tags'))});
            $('#demo3GetTags').click(function(){showTags($('#demo3').tagit('tags'))});

            function showTags(tags){
                var string = "Tags\r\n";
                    string +="--------\r\n";
                for(var i in tags)
                string += tags[i]+"\r\n";
                alert(string);
            }

            $('.browser').hover(
                function(){$(this).children('a').children('div').show('fast');},
                function(){$(this).children('a').children('div').hide('fast');
            });
        });
    </script>
</head>
<body>
<div id="wrap">
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
            <a id="chrome" href="http://www.google.com/chrome"><div>Works in Google Chrome!</div></a>
        </div>
        <div class="browser">
            <a id="firefox" href="http://www.mozilla.com"><div>Works in Firefox!</div></a>
        </div>
        <div class="browser">
            <a id="ie" href="http://www.microsoft.com/windows/internet-explorer"><div>Works in IE7+!</div></a>
        </div>
        <div class="browser">
            <a id="opera" href="http://www.opera.com"><div>Works in Opera!</div></a>
        </div>
        <div class="browser" style="margin-right: 0">
            <a id="safari" href="http://www.apple.com/safari"><div>Works in Safari!</div></a>
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
            <li>Easy to theme e.g.(<a href="?theme=simple-green#demos">Simple Green</a> <a href="?theme=simple-blue#demos">Simple Blue</a> <a href="?theme=simple-grey#demos">Simple Grey</a>)</li>
            <li>Customizable <em>accept</em> keys</li>
            <li>Backspace on empty input deletes previous tag</li>
            <li>Ability to provide <em>initial tags</em> on creation though options</li>
            <li>Ability to provide <em>initial tags</em> on creation via list items</li>
            <li>Option to toggle usage of a hidden select so the tags can be sent using a normal form!</li>
        </ul>
    </div>

    <h2><a name="code">The Minimum Code Required</a></h2>

    <div class="box">
        <div class="code">
            <div class="wrap">
    &lt;<span class="blue">script</span>&gt;
    $(<span class="blue">function</span>(){
        $(<span class="green">'#tags'</span>).tagit();
    });
    &lt;/<span class="blue">script</span>&gt;

    &lt;<span class="blue">ul id=</span><span class="green">&quot;tags&quot;</span>&gt;&lt;/<span class="blue">ul</span>&gt;
            </div>
        </div>
        <div class="note">Seriously, Can you beat that?</div>
    </div>

    <h2><a name="options">Options</a></h2>

    <div class="box">
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
                <td>initialTags</td>
                <td>Array</td>
                <td>[]</td>
                <td class="left">An array containing tags to pre-populate the field with</td>
            </tr>

            <tr class="even">
                <td>minLength</td>
                <td>int</td>
                <td>1</td>
                <td class="left">The minimum length before a triggerKey will create a tag</td>
            </tr>

            <tr class="even">
                <td>select</td>
                <td>bool</td>
                <td>false</td>
                <td class="left">Maintain a hidden select in place for form submissions<br />
                    To name the select simply give your UL a name attribute!</td>
            </tr>
            </tbody>
        </table>
    </div>

    <h2><a name="methods">Methods</a></h2>

    <div class="box">
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
                <td class="left">Returns an array of all tags</td>
            </tr>

            </tbody>
        </table>
    </div>

    <h2><a name="demos">Demos</a></h2>
    <div class="box"><strong>Theme: </strong>
        <a href="?theme=simple-green#demos">Simple Green</a> |
        <a href="?theme=simple-blue#demos">Simple Blue</a> |
        <a href="?theme=simple-grey#demos">Simple Grey</a> |
        <a href="?theme=gradient-black#demos">Gradient Black</a> |
        <a href="?theme=gradient-blue#demos">Gradient Blue</a> |
        <a href="?theme=gradient-green#demos">Gradient Green</a> | 
    </div>

    <div class="box">
        <h3>Hidden Select</h3>

        <div class="box">
            <div class="note">Normally the select is hidden!</div>
            <ul id="demo1" name="nameOfSelect"></ul>
            <div class="buttons">
                <button id="demo1GetTags" value="Get Tags">Get Tags</button>
            </div>
        </div>

        <h3>Initial Tags</h3>

        <div class="box">
            <ul id="demo2" name="demo2">
                <li>here</li>
                <li>are</li>
                <li>some</li>
                <li>initial</li>
                <li>tags</li>
            </ul>
            <div class="buttons">
                <button id="demo2GetTags" value="Get Tags">Get Tags</button>
            </div>
        </div>

        <h3>Allowing Spaces</h3>

        <div class="box">
            <ul id="demo3"></ul>
            <div class="buttons">
                <button id="demo13GetTags" value="Get Tags">Get Tags</button>
            </div>
        </div>
    </div>

    <h2> </h2>
    <div class="box">
        &copy; Content and Design Matthew Hailwood <?php echo Date('Y'); ?><br />
        &copy; Background Image <a href="http://johnnyblack.org/">johnnyblack.org</a> <?php echo Date('Y'); ?>
    </div>

</div>
</body>
</html>