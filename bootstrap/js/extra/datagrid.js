/*
 * Fuel UX Datagrid
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

// DATAGRID CONSTRUCTOR AND PROTOTYPE

var Datagrid = function (element, options) {
	this.$element = $(element);
	this.$thead = this.$element.find('thead');
	this.$footer = this.$element.find('tfoot th');
	this.$footerchildren = this.$footer.children();
	this.$topheader = this.$element.find('thead th');
	this.$searchcontrol = this.$element.find('.search');
	this.$pagesize = this.$element.find('.grid-pagesize');
	this.$pageinput = this.$element.find('.grid-pager input');
	this.$pagedropdown = this.$element.find('.grid-pager .dropdown-menu');
	this.$prevpagebtn = this.$element.find('.grid-prevpage');
	this.$nextpagebtn = this.$element.find('.grid-nextpage');
	this.$pageslabel = this.$element.find('.grid-pages');
	this.$countlabel = this.$element.find('.grid-count');
	this.$startlabel = this.$element.find('.grid-start');
	this.$endlabel = this.$element.find('.grid-end');

	this.$tbody = $('<tbody>').insertAfter(this.$thead);
	this.$colheader = $('<tr>').appendTo(this.$thead);

	this.options = $.extend({}, $.fn.datagrid.defaults, options);
	this.options.dataOptions.pageSize = parseInt(this.$pagesize.val(), 10);
	this.columns = this.options.dataSource.columns();

	this.$nextpagebtn.on('click', $.proxy(this.next, this));
	this.$prevpagebtn.on('click', $.proxy(this.previous, this));
	this.$searchcontrol.on('searched cleared', $.proxy(this.searchChanged, this));
	this.$colheader.on('click', 'th', $.proxy(this.headerClicked, this));
	this.$pagesize.on('change', $.proxy(this.pagesizeChanged, this));
	this.$pageinput.on('change', $.proxy(this.pageChanged, this));

	this.renderColumns();
	this.renderData();
};

Datagrid.prototype = {

	constructor: Datagrid,

	renderColumns: function () {
		var self = this;

		this.$footer.attr('colspan', this.columns.length);
		this.$topheader.attr('colspan', this.columns.length);

		var colHTML = '';

		$.each(this.columns, function (index, column) {
			colHTML += '<th data-property="' + column.property + '"';
			if (column.sortable) colHTML += ' class="sortable"';
			colHTML += '>' + column.label + '</th>';
		});

		self.$colheader.append(colHTML);
	},

	updateColumns: function ($target, direction) {
		var className = (direction === 'asc') ? 'icon-chevron-up' : 'icon-chevron-down';
		this.$colheader.find('i').remove();
		this.$colheader.find('th').removeClass('sorted');
		$('<i>').addClass(className).appendTo($target);
		$target.addClass('sorted');
	},

	updatePageDropdown: function (data) {
		var pageHTML = '';

		for (var i = 1; i <= data.pages; i++) {
			pageHTML += '<li><a>' + i + '</a></li>';
		}

		this.$pagedropdown.html(pageHTML);
	},

	updatePageButtons: function (data) {
		if (data.page === 1) {
			this.$prevpagebtn.attr('disabled', 'disabled');
		} else {
			this.$prevpagebtn.removeAttr('disabled');
		}

		if (data.page === data.pages) {
			this.$nextpagebtn.attr('disabled', 'disabled');
		} else {
			this.$nextpagebtn.removeAttr('disabled');
		}
	},

	renderData: function () {
		var self = this;

		this.$tbody.html(this.placeholderRowHTML(this.options.loadingHTML));
		this.$footerchildren.hide();

		this.options.dataSource.data(this.options.dataOptions, function (data) {
			var itemdesc = (data.count === 1) ? self.options.itemText : self.options.itemsText;
			var rowHTML = '';

			self.$footerchildren.toggle(data.count > 0);

			self.$pageinput.val(data.page);
			self.$pageslabel.text(data.pages);
			self.$countlabel.text(data.count + ' ' + itemdesc);
			self.$startlabel.text(data.start);
			self.$endlabel.text(data.end);

			self.updatePageDropdown(data);
			self.updatePageButtons(data);

			$.each(data.data, function (index, row) {
				rowHTML += '<tr>';
				$.each(self.columns, function (index, column) {
					rowHTML += '<td>' + row[column.property] + '</td>';
				});
				rowHTML += '</tr>';
			});

			if (!rowHTML) rowHTML = self.placeholderRowHTML('0 ' + self.options.itemsText);

			self.$tbody.html(rowHTML);
			self.$element.trigger('loaded');
		});

	},

	placeholderRowHTML: function (content) {
		return '<tr><td style="text-align:center;padding:20px;" colspan="' +
			this.columns.length + '">' + content + '</td></tr>';
	},

	headerClicked: function (e) {
		var $target = $(e.target);
		if (!$target.hasClass('sortable')) return;

		var direction = this.options.dataOptions.sortDirection;
		var sort = this.options.dataOptions.sortProperty;
		var property = $target.data('property');

		if (sort === property) {
			this.options.dataOptions.sortDirection = (direction === 'asc') ? 'desc' : 'asc';
		} else {
			this.options.dataOptions.sortDirection = 'asc';
			this.options.dataOptions.sortProperty = property;
		}

		this.options.dataOptions.pageIndex = 0;
		this.updateColumns($target, this.options.dataOptions.sortDirection);
		this.renderData();
	},

	pagesizeChanged: function (e) {
		this.options.dataOptions.pageSize = parseInt($(e.target).val(), 10);
		this.options.dataOptions.pageIndex = 0;
		this.renderData();
	},

	pageChanged: function (e) {
		this.options.dataOptions.pageIndex = parseInt($(e.target).val(), 10) - 1;
		this.renderData();
	},

	searchChanged: function (e, search) {
		this.options.dataOptions.search = search;
		this.options.dataOptions.pageIndex = 0;
		this.renderData();
	},

	previous: function () {
		this.options.dataOptions.pageIndex--;
		this.renderData();
	},

	next: function () {
		this.options.dataOptions.pageIndex++;
		this.renderData();
	}

};


// DATAGRID PLUGIN DEFINITION

$.fn.datagrid = function (option) {
	return this.each(function () {
		var $this = $(this);
		var data = $this.data('datagrid');
		var options = typeof option === 'object' && option;

		if (!data) $this.data('datagrid', (data = new Datagrid(this, options)));
		if (typeof option === 'string') data[option]();
	});
};

$.fn.datagrid.defaults = {
	dataOptions: { pageIndex: 0, pageSize: 10 },
	loadingHTML: '<div class="progress progress-striped active" style="width:50%;margin:auto;"><div class="bar" style="width:100%;"></div></div>',
	itemsText: 'items',
	itemText: 'item'
};

$.fn.datagrid.Constructor = Datagrid;