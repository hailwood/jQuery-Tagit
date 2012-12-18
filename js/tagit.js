/*
 * INFORMATION
 * ---------------------------
 * Owner:     jquery.webspirited.com
 * Developer: Matthew Hailwood
 * ---------------------------
 */

(function($){

    $.fn.autoGrowInput = function(o) {
       
        o = $.extend({
            maxWidth: 1000,
            minWidth: 0,
            comfortZone: 70
        }, o);

        this.filter('input:text').each(function(){
            var minWidth = o.minWidth || $(this).width(),
                val = '',
                input = $(this),
                testSubject = $('<tester/>').css({
                    position: 'absolute',
                    top: -9999,
                    left: -9999,
                    width: 'auto',
                    fontSize: input.css('fontSize'),
                    fontFamily: input.css('fontFamily'),
                    fontWeight: input.css('fontWeight'),
                    letterSpacing: input.css('letterSpacing'),
                    whiteSpace: 'nowrap'
                }),
                check = function() {

                    if (val === (val = input.val())) {return;}

                    // Enter new content into testSubject
                    var escaped = val.replace(/&/g, '&amp;').replace(/\s/g,'&nbsp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    testSubject.html(escaped);

                    // Calculate new width + whether to change
                    var testerWidth = testSubject.width(),
                        newWidth = (testerWidth + o.comfortZone) >= minWidth ? testerWidth + o.comfortZone : minWidth,
                        currentWidth = input.width(),
                        isValidWidthChange = (newWidth < currentWidth && newWidth >= minWidth)
                                             || (newWidth > minWidth && newWidth < o.maxWidth);

                    // Animate width
                    if (isValidWidthChange) {
                        //input.width(newWidth);
                        input.css('cssText', "width: " + newWidth + "px !important");
                    }

                };

            testSubject.insertAfter(input);

            $(this).bind('keyup keydown blur update', check);

        });

        return this;

    };

})(jQuery);
(function ($) {
    $.widget("ui.tagit", {

        // default options
        options:{
            //Maps directly to the jQuery-ui Autocomplete option
            tagSource:[],
            //What keys should trigger the completion of a tag
            triggerKeys:['enter', 'space', 'comma', 'tab','semicolon'],
            //custom regex for splitting data
            seperatorKeys: ['comma','semicolon'],
            //array method for setting initial tags
            initialTags:[],
            //minimum length of tags
            minLength:1,
            //should an html select be rendered to allow for normal form submission
            select:false,
            //if false only tags from `tagSource` are able to be entered
            allowNewTags:true,
            //should tag and Tag be treated as identical
            caseSensitive:false,
            //should tags be drag-and-drop sortable?
            //true: entire tag is draggable
            //'handle': a handle is rendered which is draggable
            sortable:false,
            editable:false,
            //color to highlight text when a duplicate tag is entered
            highlightOnExistColor:'#0F0',
            //empty search on focus
            emptySearch:true,
            //callback function for when tags are changed
            //tagValue: value of tag that was changed
            //action e.g. removed, added, sorted
            tagsChanged:function (tagValue, action, element) {
                ;
            },
            maxTags:undefined,
            //should 'paste' event trigger 'blur', thus potentially adding a new tag
            // (true for backwards compatibility)
            blurOnPaste:true
        },

        _splitAt:/\ |,/g,
        _existingAtIndex:0,
        _keys:{
            backspace:[8],
            enter:[13],
            space:[32],
            comma:[44, 188],
            tab:[9],
            semicolon:[59,186]
        },

        _sortable:{
            sorting:-1
        },

        _idEditing: false,

        //initialization function
        _create:function () {

            var self = this;
            this.tagsArray = [];
            this.timer = null;
            this.lastKey = 0;
            self.options.initialTags=[];
            //add class "tagit" for theming
            this.element.addClass("tagit");

            //add any initial tags added through html to the array
            this.element.children('li').each(function () {
                var tag = $(this);
                var tagValue = tag.attr('tagValue') || tag.data('value');
                self.options.initialTags.push({label:tag.text(), value:(tagValue ? tagValue : tag.text())});
            });

            pushRegex = function(list, key,regex){
                if ($.inArray(key, self.options.seperatorKeys) != -1){
                    regexes.push(regex);
                }
            };
            //setup split according to the trigger keys
            self._splitAt = null;
            var regexes = [];
            
            pushRegex(regexes, 'space', /\ /);
            pushRegex(regexes, 'semicolon', /;/);
            pushRegex(regexes, 'comma', /,/);
            
            var regexString = $.map(regexes,function(x){
                return x.source;
            }).join('|');
            
            self._splitAt = new RegExp(regexString,"g");
            
            //alert(self._splitAt);

            //add the html input
            this.element.html('<li class="tagit-new"><input class="tagit-input" type="text" /></li>');

            this.input = this.element.find(".tagit-input");
            this.input.autoGrowInput();
            //setup click handler
            $(this.element).click(function (e) {
                if ($(e.target).hasClass('tagit-close')) {
                    // Removes a tag when the little 'x' is clicked.
                    var parent = $(e.target).parent();

                    var tag = self.tagsArray[parent.index()];

                    tag.element.remove();
                    self._popTag(tag);
                }
                else {
                    if (!self._isEditing) { //focus default input if we're not editing existing tag at the moment
                        self.input.focus();
                    }
                    if (self.options.emptySearch && $(e.target).hasClass('tagit-input') && self.input.val() == '' && self.input.autocomplete != undefined) {
                        self.input.autocomplete('search');
                    }
                    if (self.options.editable && $(e.target).hasClass('tagit-label')) {
                        self._edit(e.target);
                    }
                }
            });

            //setup autocomplete handler
            var os = this.options.select;
            this.options.appendTo = this.element;
            this.options.source = this.options.tagSource;
            this.options.select = function (event, ui) {
                self.input.data('autoCompleteTag', true);
            clearTimeout(self.timer);
            if (self.options.maxTags !== undefined && self.tagsArray.length == self.options.maxTags) {
                self.input.val("");
            }
            else {
                if (ui.item.label === undefined)
                    self._addTag(ui.item.value);
                else
                    self._addTag(ui.item.label, ui.item.value);
            }

            return false;
        },

            this.options.focus = function (event, ui) {
                if (ui.item.label !== undefined && /^key/.test(event.originalEvent.type)) {
                    self.input.val(ui.item.label);
                    self.input.data('value', ui.item.value);
                    return false;
                }
            };
            this.options.autoFocus = !this.options.allowNewTags;
            this.input.autocomplete(this.options);
            this.options.select = os;

            self.isKeyEventProcessed = false;
            this.input.keyup(function(e) {
                self.isKeyEventProcessed = false;
            });

            this.input.keydown(function (e) {
                self._processKeyEvent(e);
            });
            //setup keydown handler
            this.input.keypress(function (e) {
                self._processKeyEvent(e);
            });

            this.input.bind("paste", function (e) {
                if (self.options.blurOnPaste) {
                    var input = $(this);
                    self.timer = setTimeout(function () { input.blur(); }, 0);
                }
            });

            //setup blur handler
            this.input.blur(function (e) {
                self.currentLabel = $(this).val();
                self.currentValue = $(this).data('value');
                if (self.options.allowNewTags) {
                    self.timer = setTimeout(function () {
                        self._addTag(self.currentLabel, self.currentValue);
                        self.currentValue = '';
                        self.currentLabel = '';
                    }, 400);
                }
                $(this).val('').removeData('value');
                return false;
            });

            //define missing trim function for strings
            if (!String.prototype.trim) {
                String.prototype.trim = function () {
                    return this.replace(/^\s+|\s+$/g, '');
                };
            }

            if (this.options.select) {
                this.select = $('<select class="tagit-hiddenSelect" name="' +
                    (this.element.attr('name') || this.element.data('name')) +
                    '" multiple="multiple"></select>');
                this.element.after(this.select);
            }
            this._initialTags();

            //setup sortable handler
            if (self.options.sortable !== false) {

                var soptions = {
                    items:'.tagit-choice',
                    containment:'parent',
                    opacity: 0.6,
                    tolerance: 'pointer',
                    start:function (event, ui) {
                        self._sortable.tag = $(ui.item);
                        self._sortable.origIndex = self._sortable.tag.index();
                    },
                    update:function (event, ui) {
                        self._sortable.newIndex = self._sortable.tag.index();
                        self._moveTag(self._sortable.origIndex, self._sortable.newIndex);
                        if(self.options.tagsChanged){
                            var tag = self.tagsArray[self._sortable.newIndex];
                            self.options.tagsChanged(tag.value, 'moved', tag.element);
                        }
                    }
                };

                if (self.options.sortable == 'handle') {
                    soptions.handle = 'a.ui-icon';
                    soptions.cursor = 'move';
                }

                self.element.sortable(soptions);
            }

        },

        _processKeyEvent: function(e) {
            if (this.isKeyEventProcessed) {
                return; //don't process key events twice
            }

            var pressedKey = e.which || e.keyCode || e.charCode;
            console.log("processKeyEvent:" + pressedKey);
            var lastLi = this.element.children(".tagit-choice:last");

            this.isKeyEventProcessed = true;

            if (pressedKey == this._keys.backspace) {
                return this._backspace(lastLi);
            }

            if (this._isInitKey(pressedKey) && !(this._isTabKey(pressedKey) && this.value == '' && !this.input.data('autoCompleteTag'))) {
                e.preventDefault();

                this.input.data('autoCompleteTag', false);

                if (!this.options.allowNewTags || (this.options.maxTags !== undefined && this.tagsArray.length == this.options.maxTags)) {
                    this.input.val("");
                }
                else if (this.options.allowNewTags && this.input.val().length >= this.options.minLength) {
                    this._addTag(this.input.val());
                }
            }

            if (this.options.maxLength !== undefined && this.input.val().length > this.options.maxLength) {
                e.preventDefault();
                this.input.val(this.input.val().substring(0, this.options.maxLength));
            }

            if (lastLi.hasClass('selected'))
                lastLi.removeClass('selected');

            this.lastKey = pressedKey;
        },

		_postEdit: function(element, editInput, initialValue) {
            var finishEditing = $.proxy(function() {
                editInput.remove();
                $(element).removeClass('hidden');
                $(element).parent().removeClass('edited');
                this._isEditing = false;
            }, this);

            return function() {
                var initialTagIndex = $(element).parent().index();
                var initialTag = this.tagsArray[initialTagIndex];
                //try to add new and if success - remove old
                var newValue = editInput.val();
                if (this._splitAt && newValue.search(this._splitAt) > 0) {
                    newValue = newValue.split(this._splitAt)[0]; //use only first value part - no splitters in edit
                }
                if (newValue == initialValue) {
                    finishEditing();
                } else if (this._addTag(newValue)) {
                    //else attempt to add new tag and if succeeded - remove old element and edit box
                    initialTag.element.remove();
                    this._popTag(initialTag);
                    var lastTagIndex = this.tagsArray.length - 1;
                    if (lastTagIndex != initialTagIndex) {
                        var lastTag = this.tagsArray[lastTagIndex];
                        //visually move tag to the old place
                        lastTag.element.insertBefore(this.tagsArray[initialTagIndex].element);
                        this._moveTag(this.tagsArray.length - 1, initialTagIndex); //move element from last to old place
                        if(this.options.tagsChanged) { //fire an update
                            var tag = this.tagsArray[initialTagIndex];
                            this.options.tagsChanged(tag.value, 'moved', tag.element);
                        }
                    }
                    finishEditing();
                }
            }
        },

        _edit: function(element) {
            this._isEditing = true;
            var initialValue = $(element).text();
            var editInput = $('<input>');
            editInput.val(initialValue);
            $(element).parent().addClass('edited');
            editInput.addClass('tagit-edit');
            editInput.css('width', $(element).outerWidth());
            $(element).addClass('hidden');
            editInput.blur($.proxy(this._postEdit(element, editInput, initialValue), this));
            editInput.keypress($.proxy(function(e) {
                var pressedKey = e.which || e.keyCode || e.charCode;
                if (this._isInitKey(pressedKey)) {
                    editInput.blur();
                }
            }, this));
            $(element).before(editInput);
            editInput[0].select();
        },

        _popSelect:function (tag) {
            $('option:eq(' + tag.index + ')', this.select).remove();
            this.select.change();
        },

        _addSelect:function (tag) {
            this.select.append('<option selected="selected" value="' + tag.value + '">' + tag.label + '</option>');
            this.select.change();
        },

        _popTag:function (tag) {

            //are we removing the last tag or a specific tag?
            if (tag === undefined)
                tag = this.tagsArray.pop();
            else
                this.tagsArray.splice(tag.index, 1);


            //maintain the indexes
            for (var ind in this.tagsArray)
                this.tagsArray[ind].index = ind;

            if (this.options.select)
                this._popSelect(tag);
            if (this.options.tagsChanged)
                this.options.tagsChanged(tag? (tag.value || tag.label) : null, 'popped', tag);
            return;
        },

        _addTag:function (label, value) {
            
            this.input.autocomplete('close').val("");

            //are we trying to add a tag that should be split?
            if (this._splitAt && label.search(this._splitAt) > 0) {
                var result = label.split(this._splitAt);
                for (var i = 0; i < result.length; i++)
                    this._addTag(result[i], value);
                return;
            }

            label = label.replace(/,+$/, "").trim();

            if (label == "")
                return false;
            
            //escape < > and &
            label = label.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            
            var tagExists = this._exists(label, value);
            if (tagExists !== false) {
                this._highlightExisting(tagExists);
                return false;
            }

            var tag = this.tag(label, value);
            tag.element = $('<li class="tagit-choice"'
                + (value !== undefined ? ' tagValue="' + value + '"' : '') + '>'
                + (this.options.sortable == 'handle' ? '<a class="ui-icon ui-icon-grip-dotted-vertical" style="float:left"></a>' : '')
                + '<div class="tagit-label">' + label + '</div>' + '<a class="tagit-close">x</a></li>');
            tag.element.insertBefore(this.input.parent());
            this.tagsArray.push(tag);

            this.input.val("");

            if (this.options.select)
                this._addSelect(tag);
            if (this.options.tagsChanged)
                this.options.tagsChanged(tag.label, 'added', tag.element);
            return true;
        },

        _exists:function (label, value) {
            if (this.tagsArray.length == 0)
                return false;

            label = this._lowerIfCaseInsensitive(label);
            value = this._lowerIfCaseInsensitive(value);

            for (var ind in this.tagsArray) {
                if (this._lowerIfCaseInsensitive(this.tagsArray[ind].label) == label) {
                    if (value !== undefined) {
                        if (this._lowerIfCaseInsensitive(this.tagsArray[ind].value) == value)
                            return ind;
                    } else {
                        return ind;
                    }
                }
            }

            return false;
        },

        _highlightExisting:function (index) {
            if (this.options.highlightOnExistColor === undefined)
                return;
            var tag = this.tagsArray[index];
            tag.element.stop();

            var initialColor = tag.element.css('color');
            tag.element.animate({color:this.options.highlightOnExistColor}, 100).animate({'color':initialColor}, 800, null, function() {
                //reset style to initial
                tag.element.attr('style', '');
            });
        },

        _isInitKey:function (keyCode) {

            var keyName = "";
            for (var key in this._keys)
                if ($.inArray(keyCode, this._keys[key]) != -1)
                    keyName = key;

            if ($.inArray(keyName, this.options.triggerKeys) != -1)
                return true;
            return false;
        },

        _isTabKey:function (keyCode) {
            var tabKeys = this._keys['tab'];
            return $.inArray(keyCode, tabKeys) > -1;
        },

        _removeTag:function () {
            this._popTag();
            this.element.children(".tagit-choice:last").remove();
        },

        _backspace:function (li) {
            if (this.input.val() == "") {
                // When backspace is pressed, the last tag is deleted.
                if (this.lastKey == this._keys.backspace) {
                    this._popTag();
                    li.remove();
                    this.lastKey = null;
                } else {
                    li.addClass('selected');
                    this.lastKey = this._keys.backspace;
                }
            }
            return true;
        },

        _initialTags:function () {
            var input = this;
            var _temp;
            if (this.options.tagsChanged)
                _temp = this.options.tagsChanged;
            this.options.tagsChanged = null;

            if (this.options.initialTags.length != 0) {
                $(this.options.initialTags).each(function (i, element) {
                    if (typeof (element) == "object")
                        input._addTag(element.label, element.value);
                    else
                        input._addTag(element);
                });
            }
            this.options.tagsChanged = _temp;
        },

        _lowerIfCaseInsensitive:function (inp) {

            if (inp === undefined || typeof(inp) != typeof("a"))
                return inp;

            if (this.options.caseSensitive)
                return inp;

            return inp.toLowerCase();

        },

        _moveTag: function (old_index, new_index) {
            this.tagsArray.splice(new_index, 0, this.tagsArray.splice(old_index, 1)[0]);
            for (var ind in this.tagsArray)
                this.tagsArray[ind].index = ind;

            if(this.options.select){
                $('option:eq(' + old_index + ')', this.select).insertBefore($('option:eq(' + new_index + ')', this.select));
            }
        },
        tags:function () {
            return this.tagsArray;
        },

        destroy:function () {
            $.Widget.prototype.destroy.apply(this, arguments); // default destroy
            clearTimeout(this.timer);
            this.tagsArray = [];
        },

        reset:function () {
            this.element.find(".tagit-choice").remove();
            this.tagsArray = [];
            if (this.options.select) {
                this.select.children().remove();
                this.select.change();
            }
            this._initialTags();
            if (this.options.tagsChanged)
                this.options.tagsChanged(null, 'reset', null);
        },

        fill:function (tags) {

            if (tags !== undefined)
                this.options.initialTags = tags;
            this.reset();
        },

        add:function (label, value) {
            if(typeof(label) == "object")
                return this._addTag(label.label, label.value);
            else
                return this._addTag(label, value);
        },

        autocomplete: function(){
            return this.input.data("autocomplete");
        },

        tag:function (label, value, element) {
            var self = this;
            return {
                label:label,
                value:(value === undefined ? label : value),
                element:element,
                index:self.tagsArray.length
            };
        },

        remove:function (label, value) {
            if (this.tagsArray.length == 0)
                return false;

            label = this._lowerIfCaseInsensitive(label);
            value = this._lowerIfCaseInsensitive(value);

            for (var i = 0; i < this.tagsArray.length; i++) {
                if (this._lowerIfCaseInsensitive(this.tagsArray[i].value) == value || this._lowerIfCaseInsensitive(this.tagsArray[i].label) == label) {
                    break;
                }
            }

            if (i >= 0 && i < this.tagsArray.length) {
                var tag = this.tagsArray[i];
                tag.element.remove();
                this._popTag(tag);
                return true;
            }
            return false;
        }


    });
})(jQuery);
