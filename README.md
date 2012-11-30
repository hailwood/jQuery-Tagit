## Note for contributors/pull requesters
We welcome all bug fixes and additions to tagit, it is a community project after all, however we have one rule for commits:   
* All edits must be applied to **both tagit.js and tagit-themeroller.js** no pull requests will be accepted unless this is done to ensure the scripts function equally.

<hr />
It depends on [jQuery 1.7.2](http://jquery.com). and [jQuery-ui 1.8](http://jqueryui.com) The _jQuery Tagit Plugin_ transforms an html unordered list into a unique tagging plugin.

Why unique? Because jQuery Tagit uses jQuery UI's auto-complete plugin to supply suggestions to users as they type and has some awesome features like sortable tags.

> Quicklinks
> * [Demo](http://webspirited.com/tagit)
> * [Features](#features)
> * [Options](#options)
> * [Methods](#methods)

## <a id="features" href="#features">Features</a>
* Convenient way for users to enter a list of items
* Fully integrated with jQuery ui auto complete
* Automatically adds current input as tag if input loses focus
* Easy to use public methods
* Easy to theme (single css file)
* Customizable trigger keys
* Backspace on empty input deletes previous tag
* Ability to provide _initial tags_ on creation though options
* Ability to provide _initial tags_ on creation via list items
* Option to toggle usage of a hidden select so the tags can be sent using a normal form!
* Ability to re-arrange tags by drag and drop!
* Optional ThemeRoller compatibility!
* Fully HTML5 Data-attributes compliant!

## <a id="options" href="#options">Options</a>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th>Default</th>
      <th>Note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tagSource</td>
      <td>String, Array, Callback</td>
      <td>[]</td>
      <td>This option maps directly to the <a href="http://jqueryui.com/demos/autocomplete/">jQuery
          UI Autocomplete source option</a>
      </td>
    </tr>

    <tr>
      <td>triggerKeys</td>
      <td>Array</td>
      <td>['enter', 'space', 'comma', 'tab']</td>
      <td>An array containing all or any of the default options.<br/>
          These are the keys that will trigger a tag completion
      </td>
    </tr>

    <tr>
      <td>allowNewTags</td>
      <td>Bool</td>
      <td>true</td>
      <td>Allow tags that do not exist in tagSource to be entered?</td>
    </tr>

    <tr>
      <td>initialTags</td>
      <td>Array</td>
      <td>[]</td>
      <td>An array containing tags to pre-populate the field with</td>
    </tr>

    <tr>
      <td>minLength</td>
      <td>Int</td>
      <td>1</td>
      <td>The minimum length before a triggerKey will create a tag</td>
    </tr>

    <tr>
      <td>maxLength</td>
      <td>Int</td>
      <td>1</td>
      <td>The maximum length a tag is allowed to be</td>
    </tr>

    <tr>
      <td>select</td>
      <td>Bool</td>
      <td>false</td>
      <td>Maintain a hidden select in place for form submissions<br/>
          To name the select simply give your UL a name attribute!
          ***
          Don't forget
          to include &#91; and &#93; if your language (e.g. PHP) requires them!
      </td>
    </tr>

    <tr>
      <td>tagsChanged</td>
      <td>Callback</td>
      <td>function(tagValue, action, element)</td>
      <td>Callback on changed tags:
          **tagValue:** string
          **action:** string - either 'added', 'popped', 'moved' or 'reset'
          **element:** object - reference to the added LI element
      </td>
    </tr>

    <tr>
      <td>caseSensitive</td>
      <td>Bool</td>
      <td>false</td>
      <td>The check for existing tags is case sensitive.
          If false the words "Foo" and "foo" considered the same
      </td>
    </tr>

    <tr>
      <td>highlightOnExistColor</td>
      <td>String</td>
      <td>#0F0</td>
      <td>If the user tries to add a tag that already exists the existing
          tag will run a highlight effect using the defined background color.
          If null, the highlight effect is turned off.
      </td>
    </tr>

    <tr>
      <td>maxTags</td>
      <td>Int</td>
      <td>unlimited</td>
      <td>The maximum number of tags that the user can enter.
          If omitted, an unlimited number of tags are allowed.
      </td>
    </tr>

    <tr>
      <td>sortable</td>
      <td>Bool, String</td>
      <td>false</td>
      <td>Allows the user to re-order the tags using drag and drop.
          If true the whole tag is dragable.
          If 'handle' a handle is rendered and the tag is only dragable using the handle.
      </td>
    </tr>
  </tbody>
</table>

## <a id="methods" href="#methods">Methods</a>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Return</th>
      <th>Note</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>.tagit("destroy")</code></td>
      <td>null</td>
      <td>Returns the ul to its original state</td>
    </tr>

    <tr>
      <td><code>.tagit("tags")<code></td>
      <td>Array</td>
      <td>Returns an array of objects about all the tags.</td>
    </tr>

    <tr>
      <td><code>.tagit("reset")</code></td>
      <td>null</td>
      <td>Resets the tags list to the initial value</td>
    </tr>

    <tr>
      <td><code>.tagit("fill", [{label: 'tag', value: 12}, {label: 'stuff', value: 13}])</code></td>
      <td>null</td>
      <td>Empties the tags and fills the plugin with the provided tags.</td>
    </tr>

    <tr>
      <td><code>.tagit("add", {label: 'tag', value: 12})</code></td>
      <td>Bool</td>
      <td>Adds a tag to the plugin.</td>
    </tr>

    <tr>
      <td><code>.tagit("remove", 'tag', 12)</code></td>
      <td>Bool</td>
      <td>Removes a tag by its label or value.</td>
    </tr>

  </tbody>
</table>
***

[![Creative Commons License](http://i.creativecommons.org/l/by-sa/3.0/88x31.png)](http://creativecommons.org/licenses/by-sa/3.0/)
This work is licensed under a [Creative Commons Attribution-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-sa/3.0/) with original attribution remaining with Matthew Hailwood and [http://jquery.webspirited.com](jquery.webspirited.com).
