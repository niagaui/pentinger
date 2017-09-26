$.fn.extend({
	selectmonster: function() {
    return this.each(function() {
		// Cache the number of options
		var $this = $(this),
		    numberOfOptions = $(this).children('option').length;
		// Hides the select element
		$this.addClass('s-hidden');
		// Wrap the select element in a div
		$this.wrap('<div class="select"></div>');
		// Insert a styled div to sit over the top of the hidden select element
		$this.after('<div class="styledSelect"></div>');
		// Cache the styled div
		var $styledSelect = $this.next('div.styledSelect');
		if($this.children('option:selected').text().length==0)
			var selected = $this.children('option:selected').eq(0).text();
		else
			var selected = $this.children('option:selected').text();
		var selected=selected.replace(/a@/i, "<strike>");//custom for open strike tag
		var selected=selected.replace(/@a/i, "</strike>");//custom for close strike tag
		// Show the first select option in the styled div
		$styledSelect.html(selected);
		// Insert an unordered list after the styled div and also cache the list
		var $list = $('<ul />', {
		    'class': 'options'
		}).insertAfter($styledSelect);
		// Insert a list item into the unordered list for each select option
		for (var i = 0; i < numberOfOptions; i++) {
			var txt = $this.children('option').eq(i).text().replace(/a@/i, "<strike>");
			var txt = txt.replace(/@a/i, "</strike>");
		    $('<li />', {
		        html: txt,
		        rel: $this.children('option').eq(i).val()
		    }).appendTo($list);
		}
		// Cache the list items
		var $listItems = $list.children('li');
		// Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
		$styledSelect.click(function (e) {
		    e.stopPropagation();
		    $('div.styledSelect.active').each(function () {
		        $(this).removeClass('active').next('ul.options').hide();
		    });
		    $(this).toggleClass('active').next('ul.options').toggle();
		});
		// Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
		// Updates the select element to have the value of the equivalent option
		$listItems.click(function (e) {
		    e.stopPropagation();
		    $styledSelect.html($(this).html()).removeClass('active');
		    $this.val($(this).attr('rel'));
		    $list.hide();
			var choosen = $this.val();
			$this.val(choosen).trigger('change');
		    /* alert($this.val()); /*Uncomment this for demonstration! */
		});
		// Hides the unordered list when clicking outside of it
		$(document).click(function () {
		    $styledSelect.removeClass('active');
		    $list.hide();
		});
    });
	}
});

/*show select data*/
$(function(){
		$('select[name="period"]').find('option[value="1Y"]').attr('selected',true);
		$("select[name='period']").selectmonster();
	});
