/*
 * INFORMATION
 * ---------------------------
 * Owner:     jquery.webspirited.com
 * Developer: Matthew Hailwood
 * ---------------------------
 *
 * CHANGELOG:
 * ---------------------------
 * 1.1
 * Fixed bug 01
 * 1.2
 * Added select option
 * * hidden select so tags may be submitted via normal form.
 * 1.3
 * Fixed bug 02
 * 1.4
 * Fixed bug 03
 * Fixed bug 04
 *
 * ---------------------------
 * Bug Fix Credits:
 * --
 * * Number: 01
 * * Bug:  Clicking autocomplete option does not add it to the array
 * * Name: Ed <tastypopsicle.com>
 * --
 * * Number: 02
 * * Bug: Unable to give select a name
 * * Name: Ed <tastypopsicle.com>
 * --
 * * Number 03
 * * Bug: reference to incorrect variable (tagArray vs tagsArray)
 * * Name: claudio <unknown>
 * --
 * * Number 04
 * * Bug: console.log() left in code
 * * Name: claudio <unknown>
 * --
 * * Number 06
 * * Feature: added fill method
 * * Name: Shawn Wildermuth <wildermuth.com>
 */

(function($) {
    $.widget("ui.tagit", {

        // default options
        options: {
            tagSource:    [],
            triggerKeys:  ['enter', 'space', 'comma', 'tab'],
            initialTags:  [],
            minLength:    1,
            select:       false,
            allowNewTags: true,
            emptySearch: true // empty search on focus

        },

        _keys: {
            backspace: [8],
            enter:     [13],
            space:     [32],
            comma:     [44,188],
            tab:       [9]
        },

        //initialization function
        _create: function() {

            var self = this;
            this.tagsArray = [];
            this.timer = null;

            //add class "tagit" for theming
            this.element.addClass("tagit");

            //add any initial tags added through html to the array
            this.element.children('li').each(function() {
            	var tagValue = $(this).attr('tagValue');
                self.options.initialTags.push(
                	tagValue ? {label: $(this).text(), value: tagValue} : $(this).text()
                );
            });

            //add the html input
            this.element.html('<li class="tagit-new"><input class="tagit-input" type="text" /></li>');

            this.input = this.element.find(".tagit-input");

            //setup click handler
            $(this.element).click(function(e) {
                if ($(e.target).hasClass('tagit-close')) {
                    // Removes a tag when the little 'x' is clicked.
                	var parent = $(e.target).parent();
                    parent.remove();
                    var tagValue = parent.attr('tagValue');
                    if (tagValue) {
                    	self._popTag(null, tagValue);
                    } else {
	                    var text = parent.text();
	                    self._popTag(text.substr(0, text.length - 1));
                    }
                }
                else {
                    self.input.focus();
                    if(self.options.emptySearch && $(e.target).hasClass('tagit-input') && self.input.val() == '' &&  self.input.autocomplete != undefined) {
                    	self.input.autocomplete('search');
                    }
                }
            });

            //setup autocomplete handler
            var os = this.options.select;
            this.options.appendTo = this.element;
            this.options.source = this.options.tagSource;
            this.options.select = function(event, ui) {
                clearTimeout(self.timer);
                if (ui.item.label === undefined)
                	self._addTag(ui.item.value);
                else
                	self._addTag(ui.item.label, ui.item.value);
                return false;
            }
            var inputBox = this.input;
            this.options.focus = function(event, ui) {
            	if (ui.item.label !== undefined && /^key/.test(event.originalEvent.originalEvent.type)) {
            		inputBox.val(ui.item.label);
            		inputBox.attr('tagValue', ui.item.value);
            		return false;
            	}
            }
            this.input.autocomplete(this.options);
            this.options.select = os;

            //setup keydown handler
            this.input.keydown(function(e) {
                var lastLi = self.element.children(".tagit-choice:last");
                if (e.which == self._keys.backspace)
                    return self._backspace(lastLi);

                if (self._isInitKey(e.which)) {
                    e.preventDefault();
                    if (self.options.allowNewTags && $(this).val().length >= self.options.minLength) {
                        self._addTag($(this).val());
                   	} 
                   	else if (!self.options.allowNewTags){
                   	    self.input.val("");
                   	}
                }

                if (lastLi.hasClass('selected'))
                    lastLi.removeClass('selected');

                self.lastKey = e.which;
            });

            //setup blur handler
            this.input.blur(function(e) {
                self.currentLabel = $(this).val();
                self.currentValue = $(this).attr('tagValue');
                if(self.options.allowNewTags) {
                    self.timer = setTimeout(function(){
                        self._addTag(self.currentLabel, self.currentValue);
                        self.currentValue = '';
                        self.currentLabel = '';
                    }, 400);
                }
                $(this).val('').removeAttr('tagValue');
                return false;
            });

            //define missing trim function for strings
            String.prototype.trim = function() {
                return this.replace(/^\s+|\s+$/g, "");
            };

            if (this.options.select) {
                this.element.after('<select class="tagit-hiddenSelect" name="'+this.element.attr('name')+'" multiple="multiple"></select>');
                this.select = this.element.next('.tagit-hiddenSelect');
            }
            this._initialTags();

        },

        _popSelect: function(label, value) {
        	this.select.children('option[value="' + (value === undefined ? label : value) + '"]').remove();
            this.select.change();
        }
        ,

        _addSelect: function(label, value) {
        	var opt = $('<option>').attr({
        		'selected':'selected',
        		'value':(value === undefined ? label : value)
        	}).text(label);
        	this.select.append(opt);
            this.select.change();
        }
        ,

        _popTag: function(label, value) {
            if (label === undefined) {
                label = this.tagsArray.pop();
                if (typeof (label) == 'object') {
                	value = label.value;
                	label = label.label;
                }
            } else {
            	var index;
            	if (value === undefined) {
            		index = $.inArray(label, this.tagsArray);
            		index = (index == -1 ? this.tagsArray.length - 1 : index);
            	} else {
            		index = this.tagsArray.length - 1;
            		for (var i in this.tagsArray) {
            			if (this.tagsArray[i].value == value) {
            				index = i;
            				break;
            			}
            		}
            	}
                this.tagsArray.splice(index, 1);
            }
            if (this.options.select)
                this._popSelect(label, value);
        }
        ,

        _addTag: function(label, value) {
            this.input.val("");
            label = label.replace(/,+$/, "");
            label = label.trim();
            if (label == "" || this._exists(label, value))
                return false;

            var tag = "";
            tag = '<li class="tagit-choice"'
            	+ (value !== undefined ? ' tagValue="' + value + '"' : '')
            	+ '>' + label + '<a class="tagit-close">x</a></li>';
            $(tag).insertBefore(this.input.parent());
            this.input.val("");
            this.tagsArray.push(value === undefined ? label : {label: label, value: value});
            if (this.options.select)
                this._addSelect(label, value);
            return true;
        }
        ,

        _exists: function(label, value) {
        	if (this.tagsArray.length == 0) {
        		return false;
        	}
    		
        	if (value === undefined) {
        		for(var ind in this.tagsArray) {
    				if (label == this.tagsArray[ind] || label == this.tagsArray[ind].label)
    					return true;
    			}
        	} else {
    			for(var ind in this.tagsArray) {
    				if (value == this.tagsArray[ind].value)
    					return true;
    			}
    		}
            return false;
        }
        ,

        _isInitKey : function(keyCode) {
            var keyName = "";
            for (var key in this._keys)
        		if ($.inArray(keyCode, this._keys[key]) != -1)
        			keyName = key;
        			
            if ($.inArray(keyName, this.options.triggerKeys) != -1)
                return true;
            return false;
        }
        ,

        _removeTag: function() {
            this._popTag();
            this.element.children(".tagit-choice:last").remove();
        }
        ,

        _backspace: function(li) {
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
        }
        ,

        _initialTags: function() {
            var input = this;
            if (this.options.initialTags.length != 0) {
                $(this.options.initialTags).each(function(i, element){
                	if (typeof (element) == "object")
                		input._addTag(element.label, element.value);
                	else
                		input._addTag(element);
                });
            }
        }
        ,

        tags: function() {
            return this.tagsArray;
        }
        ,

        destroy: function() {
            $.Widget.prototype.destroy.apply(this, arguments); // default destroy
            this.tagsArray = [];
        }
        ,
        
        reset: function() {
        	this.element.find(".tagit-choice").remove();
        	this.tagsArray = [];
        	if (this.options.select) {
        		this.select.children().remove();
        		this.select.change();
        	}
        	this._initialTags();
        }
        ,
        
        fill: function (tags) {
          this.element.find(".tagit-choice").remove();
          this.tagsArray = [];
          if (tags !== undefined) {
            this.options.initialTags = tags;
          }
          if (this.options.select) {
            this.select.children().remove();
            this.select.change();
          }
          this._initialTags();
        }
        ,
        
        add: function(label, value) {
            label = label.replace(/,+$/, "");
            label = label.trim();
            if (label == "" || this._exists(label, value))
                return false;

            var tag = "";
            tag = '<li class="tagit-choice"'
            	+ (value !== undefined ? ' tagValue="' + value + '"' : '')
            	+ '>' + label + '<a class="tagit-close">x</a></li>';
            $(tag).insertBefore(this.input.parent());
            this.tagsArray.push(value === undefined ? label : {label: label, value: value});
            if (this.options.select)
                this._addSelect(label, value);
            return true;
        }

    });
})(jQuery);
