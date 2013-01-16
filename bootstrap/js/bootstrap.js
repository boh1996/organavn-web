/* ===================================================
 * bootstrap-transition.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-alert.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);
/* ============================================================
 * bootstrap-button.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-carousel.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.item.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle()
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      })

      if ($next.hasClass('active')) return

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
    $target.carousel(options)
    e.preventDefault()
  })

}(window.jQuery);
/* =============================================================
 * bootstrap-collapse.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);
/* ============================================================
 * bootstrap-dropdown.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) return $this.click()

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)
    $parent.length || ($parent = $this.parent())

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api touchstart.dropdown.data-api', clearMenus)
    .on('click.dropdown touchstart.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('touchstart.dropdown.data-api', '.dropdown-menu', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api touchstart.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api touchstart.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);
/* =========================================================
 * bootstrap-modal.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element
            .show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function (that) {
        this.$element
          .hide()
          .trigger('hidden')

        this.backdrop()
      }

    , removeBackdrop: function () {
        this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, $.proxy(this.removeBackdrop, this)) :
            this.removeBackdrop()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);

/* ===========================================================
 * bootstrap-tooltip.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (this.options.trigger != 'manual') {
        eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })
          .insertAfter(this.$element)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .offset(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)
      self[self.tip().hasClass('in') ? 'hide' : 'show']()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  , html: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);
/* =============================================================
 * bootstrap-scrollspy.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + self.$scrollElement.scrollTop(), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);
/* ========================================================
 * bootstrap-tab.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);
/* =============================================================
 * bootstrap-typeahead.js v2.0.0
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function( $ ){

  "use strict"

  var Typeahead = function ( element, options ) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.$menu = $(this.options.menu).appendTo('body')
    this.source = this.options.source
    this.onselect = this.options.onselect
    this.strings = true
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = JSON.parse(this.$menu.find('.active').attr('data-value'))
        , text

      if (!this.strings) text = val[this.options.property]
      else text = val

      this.$element.val(text)

      if (typeof this.onselect == "function")
          this.onselect(val)

      return this.hide()
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var that = this
        , items
        , q
        , value

      this.query = this.$element.val()

      if (typeof this.source == "function") {
        value = this.source(this, this.query)
        if (value) this.process(value)
      } else {
        this.process(this.source)
      }
    }

  , process: function (results) {
      var that = this
        , items
        , q

      if (results.length && typeof results[0] != "string")
          this.strings = false

      this.query = this.$element.val()

      if (!this.query) {
        return this.shown ? this.hide() : this
      }

      items = $.grep(results, function (item) {
        if (!that.strings)
          item = item[that.options.property]
        if (that.matcher(item)) return item
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item
        , sortby

      while (item = items.shift()) {
        if (this.strings) sortby = item
        else sortby = item[this.options.property]

        if ((typeof sortby != "undefined" && !sortby.toLowerCase().indexOf(this.query.toLowerCase())) || typeof sortby == "undefined") beginswith.push(item)
        else if (~sortby.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      return item.replace(new RegExp('(' + this.query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this
      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', JSON.stringify(item));
        if (!that.strings)
            item = item[that.options.property];
        if (typeof item != "undefined") 
          i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keypress, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , keyup: function (e) {
      e.stopPropagation()
      e.preventDefault()

      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          this.hide()
          break

        default:
          this.lookup()
      }

  }

  , keypress: function (e) {
      e.stopPropagation()
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }
    }

  , blur: function (e) {
      var that = this
      e.stopPropagation()
      e.preventDefault()
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , onselect: null
  , property: 'value'
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}( window.jQuery );
/* ==========================================================
 * bootstrap-affix.js v2.2.2
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,v=e.reduce,h=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,_=Object.keys,j=i.bind,w=function(n){return n instanceof w?n:this instanceof w?(this._wrapped=n,void 0):new w(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=w),exports._=w):n._=w,w.VERSION="1.4.3";var A=w.each=w.forEach=function(n,t,e){if(null!=n)if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a in n)if(w.has(n,a)&&t.call(e,n[a],a,n)===r)return};w.map=w.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e[e.length]=t.call(r,n,u,i)}),e)};var O="Reduce of empty array with no initial value";w.reduce=w.foldl=w.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduce===v)return e&&(t=w.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},w.reduceRight=w.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduceRight===h)return e&&(t=w.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=w.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},w.find=w.detect=function(n,t,r){var e;return E(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},w.filter=w.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&(e[e.length]=n)}),e)},w.reject=function(n,t,r){return w.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},w.every=w.all=function(n,t,e){t||(t=w.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var E=w.some=w.any=function(n,t,e){t||(t=w.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};w.contains=w.include=function(n,t){return null==n?!1:y&&n.indexOf===y?-1!=n.indexOf(t):E(n,function(n){return n===t})},w.invoke=function(n,t){var r=o.call(arguments,2);return w.map(n,function(n){return(w.isFunction(t)?t:n[t]).apply(n,r)})},w.pluck=function(n,t){return w.map(n,function(n){return n[t]})},w.where=function(n,t){return w.isEmpty(t)?[]:w.filter(n,function(n){for(var r in t)if(t[r]!==n[r])return!1;return!0})},w.max=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.max.apply(Math,n);if(!t&&w.isEmpty(n))return-1/0;var e={computed:-1/0,value:-1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;a>=e.computed&&(e={value:n,computed:a})}),e.value},w.min=function(n,t,r){if(!t&&w.isArray(n)&&n[0]===+n[0]&&65535>n.length)return Math.min.apply(Math,n);if(!t&&w.isEmpty(n))return 1/0;var e={computed:1/0,value:1/0};return A(n,function(n,u,i){var a=t?t.call(r,n,u,i):n;e.computed>a&&(e={value:n,computed:a})}),e.value},w.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=w.random(r++),e[r-1]=e[t],e[t]=n}),e};var F=function(n){return w.isFunction(n)?n:function(t){return t[n]}};w.sortBy=function(n,t,r){var e=F(t);return w.pluck(w.map(n,function(n,t,u){return{value:n,index:t,criteria:e.call(r,n,t,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||void 0===r)return 1;if(e>r||void 0===e)return-1}return n.index<t.index?-1:1}),"value")};var k=function(n,t,r,e){var u={},i=F(t||w.identity);return A(n,function(t,a){var o=i.call(r,t,a,n);e(u,o,t)}),u};w.groupBy=function(n,t,r){return k(n,t,r,function(n,t,r){(w.has(n,t)?n[t]:n[t]=[]).push(r)})},w.countBy=function(n,t,r){return k(n,t,r,function(n,t){w.has(n,t)||(n[t]=0),n[t]++})},w.sortedIndex=function(n,t,r,e){r=null==r?w.identity:F(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;u>r.call(e,n[o])?i=o+1:a=o}return i},w.toArray=function(n){return n?w.isArray(n)?o.call(n):n.length===+n.length?w.map(n,w.identity):w.values(n):[]},w.size=function(n){return null==n?0:n.length===+n.length?n.length:w.keys(n).length},w.first=w.head=w.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:o.call(n,0,t)},w.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},w.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},w.rest=w.tail=w.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},w.compact=function(n){return w.filter(n,w.identity)};var R=function(n,t,r){return A(n,function(n){w.isArray(n)?t?a.apply(r,n):R(n,t,r):r.push(n)}),r};w.flatten=function(n,t){return R(n,t,[])},w.without=function(n){return w.difference(n,o.call(arguments,1))},w.uniq=w.unique=function(n,t,r,e){w.isFunction(t)&&(e=r,r=t,t=!1);var u=r?w.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:w.contains(a,r))||(a.push(r),i.push(n[e]))}),i},w.union=function(){return w.uniq(c.apply(e,arguments))},w.intersection=function(n){var t=o.call(arguments,1);return w.filter(w.uniq(n),function(n){return w.every(t,function(t){return w.indexOf(t,n)>=0})})},w.difference=function(n){var t=c.apply(e,o.call(arguments,1));return w.filter(n,function(n){return!w.contains(t,n)})},w.zip=function(){for(var n=o.call(arguments),t=w.max(w.pluck(n,"length")),r=Array(t),e=0;t>e;e++)r[e]=w.pluck(n,""+e);return r},w.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},w.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=w.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},w.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},w.range=function(n,t,r){1>=arguments.length&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=Array(e);e>u;)i[u++]=n,n+=r;return i};var I=function(){};w.bind=function(n,t){var r,e;if(n.bind===j&&j)return j.apply(n,o.call(arguments,1));if(!w.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));I.prototype=n.prototype;var u=new I;I.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},w.bindAll=function(n){var t=o.call(arguments,1);return 0==t.length&&(t=w.functions(n)),A(t,function(t){n[t]=w.bind(n[t],n)}),n},w.memoize=function(n,t){var r={};return t||(t=w.identity),function(){var e=t.apply(this,arguments);return w.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},w.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},w.defer=function(n){return w.delay.apply(w,[n,1].concat(o.call(arguments,1)))},w.throttle=function(n,t){var r,e,u,i,a=0,o=function(){a=new Date,u=null,i=n.apply(r,e)};return function(){var c=new Date,l=t-(c-a);return r=this,e=arguments,0>=l?(clearTimeout(u),u=null,a=c,i=n.apply(r,e)):u||(u=setTimeout(o,l)),i}},w.debounce=function(n,t,r){var e,u;return function(){var i=this,a=arguments,o=function(){e=null,r||(u=n.apply(i,a))},c=r&&!e;return clearTimeout(e),e=setTimeout(o,t),c&&(u=n.apply(i,a)),u}},w.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},w.wrap=function(n,t){return function(){var r=[n];return a.apply(r,arguments),t.apply(this,r)}},w.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},w.after=function(n,t){return 0>=n?t():function(){return 1>--n?t.apply(this,arguments):void 0}},w.keys=_||function(n){if(n!==Object(n))throw new TypeError("Invalid object");var t=[];for(var r in n)w.has(n,r)&&(t[t.length]=r);return t},w.values=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push(n[r]);return t},w.pairs=function(n){var t=[];for(var r in n)w.has(n,r)&&t.push([r,n[r]]);return t},w.invert=function(n){var t={};for(var r in n)w.has(n,r)&&(t[n[r]]=r);return t},w.functions=w.methods=function(n){var t=[];for(var r in n)w.isFunction(n[r])&&t.push(r);return t.sort()},w.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},w.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},w.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)w.contains(r,u)||(t[u]=n[u]);return t},w.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)null==n[r]&&(n[r]=t[r])}),n},w.clone=function(n){return w.isObject(n)?w.isArray(n)?n.slice():w.extend({},n):n},w.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof w&&(n=n._wrapped),t instanceof w&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==t+"";case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;r.push(n),e.push(t);var a=0,o=!0;if("[object Array]"==u){if(a=n.length,o=a==t.length)for(;a--&&(o=S(n[a],t[a],r,e)););}else{var c=n.constructor,f=t.constructor;if(c!==f&&!(w.isFunction(c)&&c instanceof c&&w.isFunction(f)&&f instanceof f))return!1;for(var s in n)if(w.has(n,s)&&(a++,!(o=w.has(t,s)&&S(n[s],t[s],r,e))))break;if(o){for(s in t)if(w.has(t,s)&&!a--)break;o=!a}}return r.pop(),e.pop(),o};w.isEqual=function(n,t){return S(n,t,[],[])},w.isEmpty=function(n){if(null==n)return!0;if(w.isArray(n)||w.isString(n))return 0===n.length;for(var t in n)if(w.has(n,t))return!1;return!0},w.isElement=function(n){return!(!n||1!==n.nodeType)},w.isArray=x||function(n){return"[object Array]"==l.call(n)},w.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){w["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),w.isArguments(arguments)||(w.isArguments=function(n){return!(!n||!w.has(n,"callee"))}),w.isFunction=function(n){return"function"==typeof n},w.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},w.isNaN=function(n){return w.isNumber(n)&&n!=+n},w.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},w.isNull=function(n){return null===n},w.isUndefined=function(n){return void 0===n},w.has=function(n,t){return f.call(n,t)},w.noConflict=function(){return n._=t,this},w.identity=function(n){return n},w.times=function(n,t,r){for(var e=Array(n),u=0;n>u;u++)e[u]=t.call(r,u);return e},w.random=function(n,t){return null==t&&(t=n,n=0),n+(0|Math.random()*(t-n+1))};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"}};T.unescape=w.invert(T.escape);var M={escape:RegExp("["+w.keys(T.escape).join("")+"]","g"),unescape:RegExp("("+w.keys(T.unescape).join("|")+")","g")};w.each(["escape","unescape"],function(n){w[n]=function(t){return null==t?"":(""+t).replace(M[n],function(t){return T[n][t]})}}),w.result=function(n,t){if(null==n)return null;var r=n[t];return w.isFunction(r)?r.call(n):r},w.mixin=function(n){A(w.functions(n),function(t){var r=w[t]=n[t];w.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(w,n))}})};var N=0;w.uniqueId=function(n){var t=""+ ++N;return n?n+t:t},w.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;w.template=function(n,t,r){r=w.defaults({},r,w.templateSettings);var e=RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(D,function(n){return"\\"+B[n]}),r&&(i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(i+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),a&&(i+="';\n"+a+"\n__p+='"),u=o+t.length,t}),i+="';\n",r.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=Function(r.variable||"obj","_",i)}catch(o){throw o.source=i,o}if(t)return a(t,w);var c=function(n){return a.call(this,n,w)};return c.source="function("+(r.variable||"obj")+"){\n"+i+"}",c},w.chain=function(n){return w(n).chain()};var z=function(n){return this._chain?w(n).chain():n};w.mixin(w),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];w.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];w.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),w.extend(w.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}})}).call(this);
/* =========================================================
 * bootstrap-colorpicker.js 
 * http://www.eyecon.ro/bootstrap-colorpicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
 
!function( $ ) {
	
	// Color object
	
	var Color = function(val) {
		this.value = {
			h: 1,
			s: 1,
			b: 1,
			a: 1
		};
		this.setColor(val);
	};
	
	Color.prototype = {
		constructor: Color,
		
		//parse a string to HSB
		setColor: function(val){
			val = val.toLowerCase();
			var that = this;
			$.each( CPGlobal.stringParsers, function( i, parser ) {
				var match = parser.re.exec( val ),
					values = match && parser.parse( match ),
					space = parser.space||'rgba';
				if ( values ) {
					if (space == 'hsla') {
						that.value = CPGlobal.RGBtoHSB.apply(null, CPGlobal.HSLtoRGB.apply(null, values));
					} else {
						that.value = CPGlobal.RGBtoHSB.apply(null, values);
					}
					return false;
				}
			});
		},
		
		setHue: function(h) {
			this.value.h = 1- h;
		},
		
		setSaturation: function(s) {
			this.value.s = s;
		},
		
		setLightness: function(b) {
			this.value.b = 1- b;
		},
		
		setAlpha: function(a) {
			this.value.a = parseInt((1 - a)*100, 10)/100;
		},
		
		// HSBtoRGB from RaphaelJS
		// https://github.com/DmitryBaranovskiy/raphael/
		toRGB: function(h, s, b, a) {
			if (!h) {
				h = this.value.h;
				s = this.value.s;
				b = this.value.b;
			}
			h *= 360;
			var R, G, B, X, C;
			h = (h % 360) / 60;
			C = b * s;
			X = C * (1 - Math.abs(h % 2 - 1));
			R = G = B = b - C;

			h = ~~h;
			R += [C, X, 0, 0, X, C][h];
			G += [X, C, C, X, 0, 0][h];
			B += [0, 0, X, C, C, X][h];
			return {
				r: Math.round(R*255),
				g: Math.round(G*255),
				b: Math.round(B*255),
				a: a||this.value.a
			};
		},
		
		toHex: function(h, s, b, a){
			var rgb = this.toRGB(h, s, b, a);
			return '#'+((1 << 24) | (parseInt(rgb.r) << 16) | (parseInt(rgb.g) << 8) | parseInt(rgb.b)).toString(16).substr(1);
		},
		
		toHSL: function(h, s, b, a){
			if (!h) {
				h = this.value.h;
				s = this.value.s;
				b = this.value.b;
			}
			var H = h,
				L = (2 - s) * b,
				S = s * b;
			if (L > 0 && L <= 1) {
				S /= L;
			} else {
				S /= 2 - L;
			}
			L /= 2;
			if (S > 1) {
				S = 1;
			}
			return {
				h: H,
				s: S,
				l: L,
				a: a||this.value.a
			};
		}
	};
	
	// Picker object
	
	var Colorpicker = function(element, options){
		this.element = $(element);
		var format = options.format||this.element.data('color-format')||'hex';
		this.format = CPGlobal.translateFormats[format];
		this.isInput = this.element.is('input');
		this.component = this.element.is('.color') ? this.element.find('.add-on') : false;
		
		this.picker = $(CPGlobal.template)
							.appendTo('body')
							.on('mousedown', $.proxy(this.mousedown, this));
		
		if (this.isInput) {
			this.element.on({
				'focus': $.proxy(this.show, this),
				'keyup': $.proxy(this.update, this)
			});
		} else if (this.component){
			this.component.on({
				'click': $.proxy(this.show, this)
			});
		} else {
			this.element.on({
				'click': $.proxy(this.show, this)
			});
		}
		if (format == 'rgba' || format == 'hsla') {
			this.picker.addClass('alpha');
			this.alpha = this.picker.find('.colorpicker-alpha')[0].style;
		}
		
		if (this.component){
			this.picker.find('.colorpicker-color').hide();
			this.preview = this.element.find('i')[0].style;
		} else {
			this.preview = this.picker.find('div:last')[0].style;
		}
		
		this.base = this.picker.find('div:first')[0].style;
		this.update();
	};
	
	Colorpicker.prototype = {
		constructor: Colorpicker,
		
		show: function(e) {
			this.picker.show();
			this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
			this.place();
			$(window).on('resize', $.proxy(this.place, this));
			if (!this.isInput) {
				if (e) {
					e.stopPropagation();
					e.preventDefault();
				}
			}
			$(document).on({
				'mousedown': $.proxy(this.hide, this)
			});
			this.element.trigger({
				type: 'show',
				color: this.color
			});
		},
		
		update: function(){
			this.color = new Color(this.isInput ? this.element.prop('value') : this.element.data('color'));
			this.picker.find('i')
				.eq(0).css({left: this.color.value.s*100, top: 100 - this.color.value.b*100}).end()
				.eq(1).css('top', 100 * (1 - this.color.value.h)).end()
				.eq(2).css('top', 100 * (1 - this.color.value.a));
			this.previewColor();
		},
		
		hide: function(){
			this.picker.hide();
			$(window).off('resize', this.place);
			if (!this.isInput) {
				$(document).off({
					'mousedown': this.hide
				});
				if (this.component){
					this.element.find('input').prop('value', this.format.call(this));
				}
				this.element.data('color', this.format.call(this));
			} else {
				this.element.prop('value', this.format.call(this));
			}
			this.element.trigger({
				type: 'hide',
				color: this.color
			});
		},
		
		place: function(){
			var offset = this.component ? this.component.offset() : this.element.offset();
			this.picker.css({
				top: offset.top + this.height,
				left: offset.left
			});
		},
		
		//preview color change
		previewColor: function(){
			this.preview.backgroundColor = this.format.call(this);
			//set the color for brightness/saturation slider
			this.base.backgroundColor = this.color.toHex(this.color.value.h, 1, 1, 1);
			//set te color for alpha slider
			if (this.alpha) {
				this.alpha.backgroundColor = this.color.toHex();
			}
		},
		
		pointer: null,
		
		slider: null,
		
		mousedown: function(e){
			e.stopPropagation();
			e.preventDefault();
			
			var target = $(e.target);
			
			//detect the slider and set the limits and callbacks
			var zone = target.closest('div');
			if (!zone.is('.colorpicker')) {
				if (zone.is('.colorpicker-saturation')) {
					this.slider = $.extend({}, CPGlobal.sliders['saturation']);
				} 
				else if (zone.is('.colorpicker-hue')) {
					this.slider = $.extend({}, CPGlobal.sliders['hue']);
				}
				else if (zone.is('.colorpicker-alpha')) {
					this.slider = $.extend({}, CPGlobal.sliders['alpha']);
				}
				var offset = zone.offset();
				//reference to knob's style
				this.slider.knob = zone.find('i')[0].style;
				this.slider.left = e.pageX - offset.left;
				this.slider.top = e.pageY - offset.top;
				this.pointer = {
					left: e.pageX,
					top: e.pageY
				};
				//trigger mousemove to move the knob to the current position
				$(document).on({
					mousemove: $.proxy(this.mousemove, this),
					mouseup: $.proxy(this.mouseup, this)
				}).trigger('mousemove');
			}
			return false;
		},
		
		mousemove: function(e){
			e.stopPropagation();
			e.preventDefault();
			var left = Math.max(
				0,
				Math.min(
					this.slider.maxLeft,
					this.slider.left + ((e.pageX||this.pointer.left) - this.pointer.left)
				)
			);
			var top = Math.max(
				0,
				Math.min(
					this.slider.maxTop,
					this.slider.top + ((e.pageY||this.pointer.top) - this.pointer.top)
				)
			);
			this.slider.knob.left = left + 'px';
			this.slider.knob.top = top + 'px';
			if (this.slider.callLeft) {
				this.color[this.slider.callLeft].call(this.color, left/100);
			}
			if (this.slider.callTop) {
				this.color[this.slider.callTop].call(this.color, top/100);
			}
			this.previewColor();
			this.element.trigger({
				type: 'changeColor',
				color: this.color
			});
			return false;
		},
		
		mouseup: function(e){
			e.stopPropagation();
			e.preventDefault();
			$(document).off({
				mousemove: this.mousemove,
				mouseup: this.mouseup
			});
			return false;
		}
	}

	$.fn.colorpicker = function ( option ) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('colorpicker'),
				options = typeof option == 'object' && option;
			if (!data) {
				$this.data('colorpicker', (data = new Colorpicker(this, $.extend({}, $.fn.colorpicker.defaults,options))));
			}
			if (typeof option == 'string') data[option]();
		});
	};

	$.fn.colorpicker.defaults = {
	};
	
	$.fn.colorpicker.Constructor = Colorpicker;
	
	var CPGlobal = {
	
		// translate a format from Color object to a string
		translateFormats: {
			'rgb': function(){
				var rgb = this.color.toRGB();
				return 'rgb('+rgb.r+','+rgb.g+','+rgb.b+')';
			},
			
			'rgba': function(){
				var rgb = this.color.toRGB();
				return 'rgba('+rgb.r+','+rgb.g+','+rgb.b+','+rgb.a+')';
			},
			
			'hsl': function(){
				var hsl = this.color.toHSL();
				return 'hsl('+Math.round(hsl.h*360)+','+Math.round(hsl.s*100)+'%,'+Math.round(hsl.l*100)+'%)';
			},
			
			'hsla': function(){
				var hsl = this.color.toHSL();
				return 'hsla('+Math.round(hsl.h*360)+','+Math.round(hsl.s*100)+'%,'+Math.round(hsl.l*100)+'%,'+hsl.a+')';
			},
			
			'hex': function(){
				return  this.color.toHex();
			}
		},
		
		sliders: {
			saturation: {
				maxLeft: 100,
				maxTop: 100,
				callLeft: 'setSaturation',
				callTop: 'setLightness'
			},
			
			hue: {
				maxLeft: 0,
				maxTop: 100,
				callLeft: false,
				callTop: 'setHue'
			},
			
			alpha: {
				maxLeft: 0,
				maxTop: 100,
				callLeft: false,
				callTop: 'setAlpha'
			}
		},
		
		// HSBtoRGB from RaphaelJS
		// https://github.com/DmitryBaranovskiy/raphael/
		RGBtoHSB: function (r, g, b, a){
			r /= 255;
			g /= 255;
			b /= 255;

			var H, S, V, C;
			V = Math.max(r, g, b);
			C = V - Math.min(r, g, b);
			H = (C == 0 ? null :
				 V == r ? (g - b) / C :
				 V == g ? (b - r) / C + 2 :
						  (r - g) / C + 4
				);
			H = ((H + 360) % 6) * 60 / 360;
			S = C == 0 ? 0 : C / V;
			return {h: H||1, s: S, b: V, a: a||1};
		},
		
		HueToRGB: function (p, q, h) {
			if (h < 0)
				h += 1;
			else if (h > 1)
				h -= 1;

			if ((h * 6) < 1)
				return p + (q - p) * h * 6;
			else if ((h * 2) < 1)
				return q;
			else if ((h * 3) < 2)
				return p + (q - p) * ((2 / 3) - h) * 6;
			else
				return p;
		},
	
		HSLtoRGB: function (h, s, l, a)
		{

			if (s < 0)
				s = 0;

			if (l <= 0.5)
				var q = l * (1 + s);
			else
				var q = l + s - (l * s);

			var p = 2 * l - q;

			var tr = h + (1 / 3);
			var tg = h;
			var tb = h - (1 / 3);

			var r = Math.round(CPGlobal.HueToRGB(p, q, tr) * 255);
			var g = Math.round(CPGlobal.HueToRGB(p, q, tg) * 255);
			var b = Math.round(CPGlobal.HueToRGB(p, q, tb) * 255);
			return [r, g, b, a||1];
		},
		
		// a set of RE's that can match strings and generate color tuples.
		// from John Resig color plugin
		// https://github.com/jquery/jquery-color/
		stringParsers: [
			{
				re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
				parse: function( execResult ) {
					return [
						execResult[ 1 ],
						execResult[ 2 ],
						execResult[ 3 ],
						execResult[ 4 ]
					];
				}
			}, {
				re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
				parse: function( execResult ) {
					return [
						2.55 * execResult[1],
						2.55 * execResult[2],
						2.55 * execResult[3],
						execResult[ 4 ]
					];
				}
			}, {
				re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
				parse: function( execResult ) {
					return [
						parseInt( execResult[ 1 ], 16 ),
						parseInt( execResult[ 2 ], 16 ),
						parseInt( execResult[ 3 ], 16 )
					];
				}
			}, {
				re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
				parse: function( execResult ) {
					return [
						parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
						parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
						parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )
					];
				}
			}, {
				re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
				space: 'hsla',
				parse: function( execResult ) {
					return [
						execResult[1]/360,
						execResult[2] / 100,
						execResult[3] / 100,
						execResult[4]
					];
				}
			}
		],
		template: '<div class="colorpicker dropdown-menu">'+
							'<div class="colorpicker-saturation"><i><b></b></i></div>'+
							'<div class="colorpicker-hue"><i></i></div>'+
							'<div class="colorpicker-alpha"><i></i></div>'+
							'<div class="colorpicker-color"><div /></div>'+
						'</div>'
	};

}( window.jQuery )
/* ============================================================
 * bootstrap-contextmenu.js
 * http://
 * ============================================================
 * Copyright 2012 Nikolai Fedotov
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function ($) {

  "use strict"; // jshint ;_;


 /* CONTEXTMENU CLASS DEFINITION
  * ========================= */

  var ContextMenu = function (element) {
        $(element).on('contextmenu.context-menu.data-api', this.show)
	$('html').on('click.context-menu.data-api', clearMenus)
      }

  ContextMenu.prototype = {

    constructor: ContextMenu

  , show: function (e) {
      var $this = $(this);

      if ($this.is('.disabled, :disabled')) return
      
      clearMenus()
      $($this.data('context-menu'))
	.data('e',e)
	.css('position','fixed')
	.css('left',e.clientX)
	.css('top',e.clientY)
	.css('display','block')      

      return false
    }

  }

  function clearMenus() {
    $('.context-menu')
      .css('display','none')
      .data('e',undefined)
  }


  /* CONTEXTMENU PLUGIN DEFINITION
   * ========================== */

  $.fn.contextmenu = function (option) {
    return this.each(function () {
      var $this = $(this)
      if (!$this.data('context-menu-obj')) $this.data('context-menu-obj', new ContextMenu(this))
    })
  }

  $.fn.contextmenu.Constructor = ContextMenu

}(window.jQuery);
/* =========================================================
 * bootstrap-datepicker.js 
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */
 
!function( $ ) {
	
	// Picker object
	
	var Datepicker = function(element, options){
		this.element = $(element);
		this.format = DPGlobal.parseFormat(options.format||this.element.data('date-format')||'mm/dd/yyyy');
		this.picker = $(DPGlobal.template)
							.appendTo('body')
							.on({
								click: $.proxy(this.click, this),
								mousedown: $.proxy(this.mousedown, this)
							});
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on') : false;
		
		if (this.isInput) {
			this.element.on({
				focus: $.proxy(this.show, this),
				blur: $.proxy(this.hide, this),
				keyup: $.proxy(this.update, this)
			});
		} else {
			if (this.component){
				this.component.on('click', $.proxy(this.show, this));
			} else {
				this.element.on('click', $.proxy(this.show, this));
			}
		}
		this.minViewMode = options.minViewMode||this.element.data('date-minviewmode')||0;
		if (typeof this.minViewMode === 'string') {
			switch (this.minViewMode) {
				case 'months':
					this.minViewMode = 1;
					break;
				case 'years':
					this.minViewMode = 2;
					break;
				default:
					this.minViewMode = 0;
					break;
			}
		}
		this.viewMode = options.viewMode||this.element.data('date-viewmode')||0;
		if (typeof this.viewMode === 'string') {
			switch (this.viewMode) {
				case 'months':
					this.viewMode = 1;
					break;
				case 'years':
					this.viewMode = 2;
					break;
				default:
					this.viewMode = 0;
					break;
			}
		}
		this.startViewMode = this.viewMode;
		this.weekStart = options.weekStart||this.element.data('date-weekstart')||0;
		this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
		this.fillDow();
		this.fillMonths();
		this.update();
		this.showMode();
	};
	
	Datepicker.prototype = {
		constructor: Datepicker,
		
		show: function(e) {
			this.picker.show();
			this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
			this.place();
			$(window).on('resize', $.proxy(this.place, this));
			if (e ) {
				e.stopPropagation();
				e.preventDefault();
			}
			if (!this.isInput) {
				$(document).on('mousedown', $.proxy(this.hide, this));
			}
			this.element.trigger({
				type: 'show',
				date: this.date
			});
		},
		
		hide: function(){
			this.picker.hide();
			$(window).off('resize', this.place);
			this.viewMode = this.startViewMode;
			this.showMode();
			if (!this.isInput) {
				$(document).off('mousedown', this.hide);
			}
			this.set();
			this.element.trigger({
				type: 'hide',
				date: this.date
			});
		},
		
		set: function() {
			var formated = DPGlobal.formatDate(this.date, this.format);
			if (!this.isInput) {
				if (this.component){
					this.element.find('input').prop('value', formated);
				}
				this.element.data('date', formated);
			} else {
				this.element.prop('value', formated);
			}
		},
		
		setValue: function(newDate) {
			if (typeof newDate === 'string') {
				this.date = DPGlobal.parseDate(newDate, this.format);
			} else {
				this.date = new Date(newDate);
			}
			this.set();
			this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
			this.fill();
		},
		
		place: function(){
			var offset = this.component ? this.component.offset() : this.element.offset();
			this.picker.css({
				top: offset.top + this.height,
				left: offset.left
			});
		},
		
		update: function(newDate){
			this.date = DPGlobal.parseDate(
				typeof newDate === 'string' ? newDate : (this.isInput ? this.element.prop('value') : this.element.data('date')),
				this.format
			);
			this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
			this.fill();
		},
		
		fillDow: function(){
			var dowCnt = this.weekStart;
			var html = '<tr>';
			while (dowCnt < this.weekStart + 7) {
				html += '<th class="dow">'+DPGlobal.dates.daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},
		
		fillMonths: function(){
			var html = '';
			var i = 0
			while (i < 12) {
				html += '<span class="month">'+DPGlobal.dates.monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').append(html);
		},
		
		fill: function() {
			var d = new Date(this.viewDate),
				year = d.getFullYear(),
				month = d.getMonth(),
				currentDate = this.date.valueOf();
			this.picker.find('.datepicker-days th:eq(1)')
						.text(DPGlobal.dates.months[month]+' '+year);
			var prevMonth = new Date(year, month-1, 28,0,0,0,0),
				day = DPGlobal.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
			prevMonth.setDate(day);
			prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setDate(nextMonth.getDate() + 42);
			nextMonth = nextMonth.valueOf();
			html = [];
			var clsName;
			while(prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getDay() === this.weekStart) {
					html.push('<tr>');
				}
				clsName = '';
				if (prevMonth.getMonth() < month) {
					clsName += ' old';
				} else if (prevMonth.getMonth() > month) {
					clsName += ' new';
				}
				if (prevMonth.valueOf() === currentDate) {
					clsName += ' active';
				}
				html.push('<td class="day'+clsName+'">'+prevMonth.getDate() + '</td>');
				if (prevMonth.getDay() === this.weekEnd) {
					html.push('</tr>');
				}
				prevMonth.setDate(prevMonth.getDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
			var currentYear = this.date.getFullYear();
			
			var months = this.picker.find('.datepicker-months')
						.find('th:eq(1)')
							.text(year)
							.end()
						.find('span').removeClass('active');
			if (currentYear === year) {
				months.eq(this.date.getMonth()).addClass('active');
			}
			
			html = '';
			year = parseInt(year/10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
								.find('th:eq(1)')
									.text(year + '-' + (year + 9))
									.end()
								.find('td');
			year -= 1;
			for (var i = -1; i < 11; i++) {
				html += '<span class="year'+(i === -1 || i === 10 ? ' old' : '')+(currentYear === year ? ' active' : '')+'">'+year+'</span>';
				year += 1;
			}
			yearCont.html(html);
		},
		
		click: function(e) {
			e.stopPropagation();
			e.preventDefault();
			var target = $(e.target).closest('span, td, th');
			if (target.length === 1) {
				switch(target[0].nodeName.toLowerCase()) {
					case 'th':
						switch(target[0].className) {
							case 'switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								this.viewDate['set'+DPGlobal.modes[this.viewMode].navFnc].call(
									this.viewDate,
									this.viewDate['get'+DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate) + 
									DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1)
								);
								this.fill();
								this.set();
								break;
						}
						break;
					case 'span':
						if (target.is('.month')) {
							var month = target.parent().find('span').index(target);
							this.viewDate.setMonth(month);
						} else {
							var year = parseInt(target.text(), 10)||0;
							this.viewDate.setFullYear(year);
						}
						if (this.viewMode !== 0) {
							this.date = new Date(this.viewDate);
							this.element.trigger({
								type: 'changeDate',
								date: this.date,
								viewMode: DPGlobal.modes[this.viewMode].clsName
							});
						}
						this.showMode(-1);
						this.fill();
						this.set();
						break;
					case 'td':
						if (target.is('.day')){
							var day = parseInt(target.text(), 10)||1;
							var month = this.viewDate.getMonth();
							if (target.is('.old')) {
								month -= 1;
							} else if (target.is('.new')) {
								month += 1;
							}
							var year = this.viewDate.getFullYear();
							this.date = new Date(year, month, day,0,0,0,0);
							this.viewDate = new Date(year, month, Math.min(28, day),0,0,0,0);
							this.fill();
							this.set();
							this.element.trigger({
								type: 'changeDate',
								date: this.date,
								viewMode: DPGlobal.modes[this.viewMode].clsName
							});
						}
						break;
				}
			}
		},
		
		mousedown: function(e){
			e.stopPropagation();
			e.preventDefault();
		},
		
		showMode: function(dir) {
			if (dir) {
				this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
			}
			this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
		}
	};
	
	$.fn.datepicker = function ( option, val ) {
		return this.each(function () {
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option === 'object' && option;
			if (!data) {
				$this.data('datepicker', (data = new Datepicker(this, $.extend({}, $.fn.datepicker.defaults,options))));
			}
			if (typeof option === 'string') data[option](val);
		});
	};

	$.fn.datepicker.defaults = {
	};
	$.fn.datepicker.Constructor = Datepicker;
	
	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
		}],
		dates:{
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		},
		isLeapYear: function (year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0))
		},
		getDaysInMonth: function (year, month) {
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
		},
		parseFormat: function(format){
			var separator = format.match(/[.\/\-\s].*?/),
				parts = format.split(/\W+/);
			if (!separator || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separator: separator, parts: parts};
		},
		parseDate: function(date, format) {
			var parts = date.split(format.separator),
				date = new Date(),
				val;
			date.setHours(0);
			date.setMinutes(0);
			date.setSeconds(0);
			date.setMilliseconds(0);
			if (parts.length === format.parts.length) {
				for (var i=0, cnt = format.parts.length; i < cnt; i++) {
					val = parseInt(parts[i], 10)||1;
					switch(format.parts[i]) {
						case 'dd':
						case 'd':
							date.setDate(val);
							break;
						case 'mm':
						case 'm':
							date.setMonth(val - 1);
							break;
						case 'yy':
							date.setFullYear(2000 + val);
							break;
						case 'yyyy':
							date.setFullYear(val);
							break;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format){
			var val = {
				d: date.getDate(),
				m: date.getMonth() + 1,
				yy: date.getFullYear().toString().substring(2),
				yyyy: date.getFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			var date = [];
			for (var i=0, cnt = format.parts.length; i < cnt; i++) {
				date.push(val[format.parts[i]]);
			}
			return date.join(format.separator);
		},
		headTemplate: '<thead>'+
							'<tr>'+
								'<th class="prev">&lsaquo;</th>'+
								'<th colspan="5" class="switch"></th>'+
								'<th class="next">&rsaquo;</th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
	};
	DPGlobal.template = '<div class="datepicker dropdown-menu">'+
							'<div class="datepicker-days">'+
								'<table class=" table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
								'</table>'+
							'</div>'+
						'</div>';

}( window.jQuery );
/* ===========================================================
 * bootstrap-fileupload.js j1a
 * http://jasny.github.com/bootstrap/javascript.html#fileupload
 * ===========================================================
 * Copyright 2012 Jasny BV, Netherlands.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function ($) {

  "use strict"; // jshint ;_

 /* INPUTMASK PUBLIC CLASS DEFINITION
  * ================================= */

  var Fileupload = function (element, options) {
    this.$element = $(element)
    this.type = this.$element.data('uploadtype') || (this.$element.find('.thumbnail').length > 0 ? "image" : "file")
      
    this.$input = this.$element.find(':file')
    if (this.$input.length === 0) return

    this.name = this.$input.attr('name') || options.name

    this.$hidden = this.$element.find(':hidden[name="'+this.name+'"]')
    if (this.$hidden.length === 0) {
      this.$hidden = $('<input type="hidden" />')
      this.$element.prepend(this.$hidden)
    }

    this.$preview = this.$element.find('.fileupload-preview')
    var height = this.$preview.css('height')
    if (this.$preview.css('display') != 'inline' && height != '0px' && height != 'none') this.$preview.css('line-height', height)

    this.$remove = this.$element.find('[data-dismiss="fileupload"]')
    
    this.listen()
  }
  
  Fileupload.prototype = {
    
    listen: function() {
      this.$input.on('change.fileupload', $.proxy(this.change, this))
      if (this.$remove) this.$remove.on('click.fileupload', $.proxy(this.clear, this))
    },
    
    change: function(e, invoked) {
      var file = e.target.files !== undefined ? e.target.files[0] : { name: e.target.value.replace(/^.+\\/, '') }
      if (!file || invoked === 'clear') return
      
      this.$hidden.val('')
      this.$hidden.attr('name', '')
      this.$input.attr('name', this.name)

      if (this.type === "image" && this.$preview.length > 0 && (typeof file.type !== "undefined" ? file.type.match('image.*') : file.name.match('\\.(gif|png|jpe?g)$')) && typeof FileReader !== "undefined") {
        var reader = new FileReader()
        var preview = this.$preview
        var element = this.$element

        reader.onload = function(e) {
          preview.html('<img src="' + e.target.result + '" ' + (preview.css('max-height') != 'none' ? 'style="max-height: ' + preview.css('max-height') + ';"' : '') + ' />')
          element.addClass('fileupload-exists').removeClass('fileupload-new')
        }

        reader.readAsDataURL(file)
      } else {
        this.$preview.text(file.name)
        this.$element.addClass('fileupload-exists').removeClass('fileupload-new')
      }
    },

    clear: function(e) {
      this.$hidden.val('')
      this.$hidden.attr('name', this.name)
      this.$input.attr('name', '')

      this.$preview.html('')
      this.$element.addClass('fileupload-new').removeClass('fileupload-exists')

      this.$input.trigger('change', [ 'clear' ])

      e.preventDefault()
      return false
    }
  }

  
 /* INPUTMASK PLUGIN DEFINITION
  * =========================== */

  $.fn.fileupload = function (options) {
    return this.each(function () {
      var $this = $(this)
      , data = $this.data('fileupload')
      if (!data) $this.data('fileupload', (data = new Fileupload(this, options)))
    })
  }

  $.fn.fileupload.Constructor = Fileupload


 /* INPUTMASK DATA-API
  * ================== */

  $(function () {
    $('body').on('click.fileupload.data-api', '[data-provides="fileupload"]', function (e) {
      var $this = $(this)
      if ($this.data('fileupload')) return
      $this.fileupload($this.data())
      
      if ($(e.target).data('dismiss') == 'fileupload') $(e.target).trigger('click.fileupload')
    })
  })

}(window.jQuery);

/* https://github.com/ifightcrime/bootstrap-growl */

(function($) {

  $.bootstrapGrowl = function(message, options) {

    var options = $.extend({}, $.bootstrapGrowl.default_options, options);

    var $alert = $('<div>');

    $alert.attr('class', 'bootstrap-growl alert');

    if (options.type) {
        $alert.addClass('alert-' + options.type);
    }

    if (options.allow_dismiss) {
      $alert.append('<a class="close" data-dismiss="alert" href="#">&times;</a>');
    }

    $alert.append(message);

    var top_offset = options.top_offset;
    var current = $('.bootstrap-growl', 'body');

    // calculate any 'stack-up'
    $.each(current, function() {
      top_offset = top_offset + $(this).outerHeight() + options.stackup_spacing;
    });

    $alert.css({
      'position': 'absolute',
      'top': top_offset + 'px',
      'border': '1px solid ' + $alert.css('color'),
      'margin': 0,
      'z-index': '9999',
      'display': 'none'
    });

    if (options.width !== 'auto') {
      $alert.css('width', options.width + 'px');
    }

    // have to append before we can use outerWidth()
    $('body').append($alert);

    switch(options.align) {
      case 'center':
        $alert.css({
          'left': '50%',
          'margin-left': '-' + ($alert.outerWidth() / 2) + 'px'
        });
        break;
      case 'left':
        $alert.css('left', '20px');
        break;
      default:
        $alert.css('right', '20px');
    }

    $alert.fadeIn().delay(options.delay).fadeOut('slow', function() {
      $(this).remove();
    });

  };

  $.bootstrapGrowl.default_options = {
    type: null,
    top_offset: 20,
    align: 'right', // (left, right, or center)
    width: 250,
    delay: 4000,
    allow_dismiss: true,
    stackup_spacing: 10
  };

})(jQuery);

/* ===========================================================
 * bootstrap-inputmask.js j1
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Based on Masked Input plugin by Josh Bush (digitalbush.com)
 * ===========================================================
 * Copyright 2012 Jasny BV, Netherlands.
 *
 * Licensed under the Apache License, Version 2.0 (the "License")
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

!function ($) {

  "use strict"; // jshint ;_;

  var isIphone = (window.orientation !== undefined),
      isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1

  $.mask = {
    //Predefined character definitions
    definitions: {
      '9': "[0-9]",
      'a': "[A-Za-z]",
      '?': "[A-Za-z0-9]",
      '*': "."
    },
    dataName:"rawMaskFn"
  }


 /* INPUTMASK PUBLIC CLASS DEFINITION
  * ================================= */

  var Inputmask = function (element, options) {
    if (isAndroid) return // No support because caret positioning doesn't work on Android
    
    this.$element = $(element)
    this.mask = options.mask
    this.options = $.extend({}, $.fn.inputmask.defaults, options)
    
    this.init()
    this.listen()
        
    this.checkVal() //Perform initial check for existing values
  }

  Inputmask.prototype = {
    
    init: function() {
      var defs = $.mask.definitions
      var len = this.mask.length

      this.tests = [] 
      this.partialPosition = this.mask.length
      this.firstNonMaskPos = null

      $.each(this.mask.split(""), $.proxy(function(i, c) {
        if (c == '?') {
          len--
          this.partialPosition = i
        } else if (defs[c]) {
          this.tests.push(new RegExp(defs[c]))
          if(this.firstNonMaskPos === null)
            this.firstNonMaskPos =  this.tests.length - 1
        } else {
          this.tests.push(null)
        }
      }, this))

      this.buffer = $.map(this.mask.split(""), $.proxy(function(c, i) {
        if (c != '?') return defs[c] ? this.options.placeholder : c
      }, this))
      
      this.focusText = this.$element.val()

      this.$element.data($.mask.dataName, $.proxy(function() {
        return $.map(this.buffer, function(c, i) {
          return this.tests[i] && c != this.options.placeholder ? c : null
        }).join('')
      }, this))
    },
    
    listen: function() {
      if (this.$element.attr("readonly")) return

      var pasteEventName = ($.browser.msie ? 'paste' : 'input') + ".mask"

      this.$element
        .on("unmask", $.proxy(this.unmask, this))
        
        .on("focus.mask", $.proxy(this.focusEvent, this))
        .on("blur.mask", $.proxy(this.blurEvent, this))
        
        .on("keydown.mask", $.proxy(this.keydownEvent, this))
        .on("keypress.mask", $.proxy(this.keypressEvent, this))

        .on(pasteEventName, $.proxy(this.pasteEvent, this))
    },

    //Helper Function for Caret positioning
    caret: function(begin, end) {
      if (this.$element.length === 0) return
      if (typeof begin == 'number') {
        end = (typeof end == 'number') ? end : begin
        return this.$element.each(function() {
          if (this.setSelectionRange) {
            this.setSelectionRange(begin, end)
          } else if (this.createTextRange) {
            var range = this.createTextRange()
            range.collapse(true)
            range.moveEnd('character', end)
            range.moveStart('character', begin)
            range.select()
          }
        })
      } else {
        if (this.$element[0].setSelectionRange) {
          begin = this.$element[0].selectionStart
          end = this.$element[0].selectionEnd
        } else if (document.selection && document.selection.createRange) {
          var range = document.selection.createRange()
          begin = 0 - range.duplicate().moveStart('character', -100000)
          end = begin + range.text.length
        }
        return {
          begin: begin, 
          end: end
        }
      }
    },
    
    seekNext: function(pos) {
      var len = this.mask.length
      while (++pos <= len && !this.tests[pos]);
      
      return pos
    },
    
    seekPrev: function(pos) {
      while (--pos >= 0 && !this.tests[pos]);
      
      return pos
    },

    shiftL: function(begin,end) {
      var len = this.mask.length
      
      if(begin<0) return
      
      for (var i = begin,j = this.seekNext(end); i < len; i++) {
        if (this.tests[i]) {
          if (j < len && this.tests[i].test(this.buffer[j])) {
            this.buffer[i] = this.buffer[j]
            this.buffer[j] = this.options.placeholder
          } else
            break
          j = this.seekNext(j)
        }
      }
      this.writeBuffer()
      this.caret(Math.max(this.firstNonMaskPos, begin))
    },

    shiftR: function(pos) {
      var len = this.mask.length
      
      for (var i = pos, c = this.options.placeholder; i < len; i++) {
        if (this.tests[i]) {
          var j = this.seekNext(i)
          var t = this.buffer[i]
          this.buffer[i] = c
          if (j < len && this.tests[j].test(t))
            c = t
          else
            break
        }
      }
    },

    unmask: function() {
      this.$element
        .unbind(".mask")
        .removeData("inputmask")
    },
    
    focusEvent: function() {
      this.focusText = this.$element.val()
      var len = this.mask.length 
      var pos = this.checkVal()
      this.writeBuffer()

      var that = this
      var moveCaret = function() {
        if (pos == len)
          that.caret(0, pos)
        else
          that.caret(pos)
      }

      if ($.browser.msie)
        moveCaret()
      else
        setTimeout(moveCaret, 0)
    },
    
    blurEvent: function() {
      this.checkVal()
      if (this.$element.val() != this.focusText)
        this.$element.trigger('change')
    },
        
    keydownEvent: function(e) {
      var k=e.which

      //backspace, delete, and escape get special treatment
      if (k == 8 || k == 46 || (isIphone && k == 127)) {
        var pos = this.caret(),
        begin = pos.begin,
        end = pos.end
						
        if (end-begin === 0) {
          begin = k!=46 ? this.seekPrev(begin) : (end=this.seekNext(begin-1))
          end = k==46 ? this.seekNext(end) : end
        }
        this.clearBuffer(begin, end)
        this.shiftL(begin,end-1)

        return false
      } else if (k == 27) {//escape
        this.$element.val(this.focusText)
        this.caret(0, this.checkVal())
        return false
      }
    },

    keypressEvent: function(e) {
      var len = this.mask.length
      
      var k = e.which,
      pos = this.caret()

      if (e.ctrlKey || e.altKey || e.metaKey || k<32)  {//Ignore
        return true
      } else if (k) {
        if (pos.end - pos.begin !== 0) {
          this.clearBuffer(pos.begin, pos.end)
          this.shiftL(pos.begin, pos.end-1)
        }

        var p = this.seekNext(pos.begin - 1)
        if (p < len) {
          var c = String.fromCharCode(k)
          if (this.tests[p].test(c)) {
            this.shiftR(p)
            this.buffer[p] = c
            this.writeBuffer()
            var next = this.seekNext(p)
            this.caret(next)
          }
        }
        return false
      }
    },

    pasteEvent: function() {
      var that = this
      
      setTimeout(function() {
        that.caret(that.checkVal(true))
      }, 0)
    },
    
    clearBuffer: function(start, end) {
      var len = this.mask.length
      
      for (var i = start; i < end && i < len; i++) {
        if (this.tests[i])
          this.buffer[i] = this.options.placeholder
      }
    },

    writeBuffer: function() {
      return this.$element.val(this.buffer.join('')).val()
    },

    checkVal: function(allow) {
      var len = this.mask.length
      //try to place characters where they belong
      var test = this.$element.val()
      var lastMatch = -1
      
      for (var i = 0, pos = 0; i < len; i++) {
        if (this.tests[i]) {
          this.buffer[i] = this.options.placeholder
          while (pos++ < test.length) {
            var c = test.charAt(pos - 1)
            if (this.tests[i].test(c)) {
              this.buffer[i] = c
              lastMatch = i
              break
            }
          }
          if (pos > test.length)
            break
        } else if (this.buffer[i] == test.charAt(pos) && i != this.partialPosition) {
          pos++
          lastMatch = i
        }
      }
      if (!allow && lastMatch + 1 < this.partialPosition) {
        this.$element.val("")
        this.clearBuffer(0, len)
      } else if (allow || lastMatch + 1 >= this.partialPosition) {
        this.writeBuffer()
        if (!allow) this.$element.val(this.$element.val().substring(0, lastMatch + 1))
      }
      return (this.partialPosition ? i : this.firstNonMaskPos)
    }
  }

  
 /* INPUTMASK PLUGIN DEFINITION
  * =========================== */

  $.fn.inputmask = function (options) {
    return this.each(function () {
      var $this = $(this)
      , data = $this.data('inputmask')
      if (!data) $this.data('inputmask', (data = new Inputmask(this, options)))
    })
  }

  $.fn.inputmask.defaults = {
    placeholder: "_"
  }

  $.fn.inputmask.Constructor = Inputmask


 /* INPUTMASK DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.inputmask.data-api', '[data-mask]', function (e) {
      var $this = $(this)
      if ($this.data('inputmask')) return
      e.preventDefault()
      $this.inputmask($this.data())
    })
  })

}(window.jQuery)
/**
 * bootstrap-multiselect.js 1.0.0
 * https://github.com/davidstutz/bootstrap-multiselect
 * 
 * Copyright 2012 David Stutz 
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
!function ($) {

	"use strict"; // jshint ;_;

	function Multiselect(select, options) {
		
		this.options = this.getOptions(options);
		this.select = $(select);
		this.container = $(this.options.container)
				.append('<button style="width:' + this.options.width + '" class="dropdown-toggle ' + this.options.button + '" data-toggle="dropdown">' + this.options.text($('option:selected', select)) + ' <b class="caret"></b></button>')
				.append('<ul class="dropdown-menu"></ul>');
		
		// Manually add the multiple attribute, if its not already set.
		if (!this.select.attr('multiple')) {
			this.select.attr('multiple', true);
		}
		
		// Build the dropdown.
		$('option', this.select).each($.proxy(function(index, element) {
			if ($(element).is(':selected')) {
				$(element).attr('selected', true);
			}
			
			$('ul', this.container).append('<li><a href="#" style="padding:0;"><label style="margin:0;padding: 3px 20px 3px 20px;width:100%;height:100%;cursor:pointer;"><input style="margin-bottom:5px;" type="checkbox" value="' + $(element).val() + '" /> ' + $(element).text() + '</label</a></li>');
			
			var selected = $(element).attr('selected') || false;
			var checkbox = $('ul li input[value="' + $(element).val() + '"]', this.container);
				
			checkbox.attr('checked', selected);
			
			if (selected) {
				checkbox.parents('li').addClass('active');
			}
		}, this));
		
		this.select.hide()
			.after(this.container);
		
		// Bind the change event on the dropdown elements.
		$('ul li input[type="checkbox"]', this.container).on('change', $.proxy(function(event) {
			var checked = $(event.target).attr('checked') || false;
			
			if (checked) {
				$(event.target).parents('li').addClass('active');
			}
			else {
				$(event.target).parents('li').removeClass('active');
			}
			
			$('option[value="' + $(event.target).val() + '"]', this.select).attr('selected', checked);
			
			$('button', this.container).html(this.options.text($('option:selected', this.select)) + ' <b class="caret"></b>');
		}, this));
		
		$('ul li a', this.container).on('click', function(event) {
			event.stopPropagation();
		});
	};

	Multiselect.prototype = {
		
		defaults: {
			button: 'btn',
			width: 'auto',
			// Default text function will either print 'None selected' in case no option is selected,
			// or a list of the selected options up to a length of 3 selected options.
			// If more than 3 options are selected, the number of selected options is printed.
			text: function(options) {
				if (options.length == 0) {
					return 'None selected';
				}
				else if (options.length > 3) {
					return options.length + ' selected';
				}
				else {
					var selected = '';
					options.each(function() {
						selected += $(this).text() + ', ';
					});
					return selected.substr(0, selected.length -2);
				}
			},
			container: '<div class="btn-group" />',
		},

		constructor: Multiselect,
	
		reset: function() {
			
		},
		
		// Destroy - unbind - the plugin.
		destroy: function() {
			this.container.remove();
			this.select.show();
		},
		
		// Get options by merging defaults and given options.
		getOptions: function(options) {
			return $.extend({}, this.defaults, options);
		}
	};
	
	$.fn.multiselect = function (option) {
		return this.each(function () {
			var data = $(this).data('multiselect'),
				options = typeof option == 'object' && option;
		
			if (!data) {
				$(this).data('multiselect', (data = new Multiselect(this, options)));
			}
			
			if (typeof option == 'string') {
				data[option]();
			}
		});
	}
}(window.jQuery);
/* ============================================================
 * bootstrap-rowlink.js j1
 * http://jasny.github.com/bootstrap/javascript.html#rowlink
 * ============================================================
 * Copyright 2012 Jasny BV, Netherlands.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!function ($) {
  
  "use strict"; // jshint ;_;

  var Rowlink = function (element, options) {
    options = $.extend({}, $.fn.rowlink.defaults, options)
    var tr = element.nodeName == 'tr' ? $(element) : $(element).find('tr:has(td)')
    
    tr.each(function() {
      var link = $(this).find(options.target).first()
      if (!link.length) return
      
      var href = link.attr('href')

      $(this).find('td').not('.nolink').click(function() {
        window.location = href;
      })

      $(this).addClass('rowlink')
      link.replaceWith(link.html())
    })
  }

  
 /* ROWLINK PLUGIN DEFINITION
  * =========================== */

  $.fn.rowlink = function (options) {
    return this.each(function () {
      var $this = $(this)
      , data = $this.data('rowlink')
      if (!data) $this.data('rowlink', (data = new Rowlink(this, options)))
    })
  }

  $.fn.rowlink.defaults = {
    target: "a"
  }

  $.fn.rowlink.Constructor = Rowlink


 /* ROWLINK DATA-API
  * ================== */

  $(function () {
    $('[data-provides="rowlink"]').each(function () {
      $(this).rowlink($(this).data())
    })
  })
  
}(window.jQuery);

!function ($) {

    "use strict";

    var template = _.template( '<ul class="bootstrap-select"><li class="dropdown"><i class="icon-chevron-down"></i><a class="dropdown-toggle" data-toggle="dropdown" href="#"><%= $(options).first().text() %></a><ul class="dropdown-menu"><% _.each(options, function(option){ %><li><a href="#" data-value="<%= $(option).val() %>"><%= $(option).text() %></a></li><% }); %></ul></li></ul>' );

    $.fn.bootstrapSelect = function() {
        return this.each(function () {
            var $this = $(this).hide();
            $(template({ "options": $(this).find("option") })).insertAfter( $(this) );
        });
    };

    $(document).on("click", ".bootstrap-select .dropdown-menu a", function(e){
        e && e.preventDefault();
       var $bootstrapSelect = $(this).closest(".bootstrap-select"),
           $select = $bootstrapSelect.prev("select");

        $bootstrapSelect
            .find(".dropdown-toggle")
            .text( $(this).text() );
        $select
            .find("option")
            .removeAttr("selected")
            .filter("[value=%s]".replace("%s", $(this).data("value") ))
            .attr("selected", "selected")
        $select.trigger("change");
    });

    $(document).ready(function(){
        $("[data-toggle=selects]").bootstrapSelect();
    });

}(window.jQuery);
(function($){$.sticky=function(d,t,o){return $.fn.sticky(d,t,o)};$.fn.sticky=function(d,t,o){var s={'sp':'fast','x':5000,'p':'ptc'};if(o){$.extend(s,o)}if(!d){d=this.html()}var e=true;var f='no';var g=Math.floor(Math.random()*99999);$('.sticky-note').each(function(){if($(this).html()==d&&$(this).is(':visible')){f='yes'}if($(this).attr('id')==g){g=Math.floor(Math.random()*9999999)}});if(!$('body').find('.queue.'+s.p).html()){$('body').append('<div class="queue '+s.p+'"></div>')}if(e){$('.queue.'+s.p).prepend('<div class="'+t+' sticky" id="'+g+'"></div>');$('#'+g).append('<a class="close" rel="'+g+'">&times;</a>');$('#'+g).append('<p class="sticky-note" rel="'+g+'">'+d+'</p>');$('#'+g).slideDown(s.sp);e=true}$('.sticky').ready(function(){if(s.x){$('#'+g).delay(s.x).fadeOut(s.sp)}});$('.sticky .close').click(function(){$('#'+$(this).attr('rel')).dequeue().fadeOut(s.sp)})}})(jQuery);

/* =========================================================
 * bootstrap-timepicker.js
 * http://www.github.com/jdewit/bootstrap-timepicker
 * =========================================================
 * Copyright 2012
 *
 * Created By:
 * Joris de Wit @joris_dewit
 *
 * Contributions By:
 * Gilbert @mindeavor
 * Koen Punt info@koenpunt.nl
 * Nek
 * Chris Martin
 * Dominic Barnes contact@dominicbarnes.us
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

!function($) {

    "use strict"; // jshint ;_;

    /* TIMEPICKER PUBLIC CLASS DEFINITION
     * ================================== */
    var Timepicker = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.timepicker.defaults, options, this.$element.data());
        this.minuteStep = this.options.minuteStep || this.minuteStep;
        this.secondStep = this.options.secondStep || this.secondStep;
        this.showMeridian = this.options.showMeridian || this.showMeridian;
        this.showSeconds = this.options.showSeconds || this.showSeconds;
        this.showInputs = this.options.showInputs || this.showInputs;
        this.disableFocus = this.options.disableFocus || this.disableFocus;
        this.template = this.options.template || this.template;
        this.modalBackdrop = this.options.modalBackdrop || this.modalBackdrop;
        this.defaultTime = this.options.defaultTime || this.defaultTime;
        this.open = false;
        this.init();
    };

    Timepicker.prototype = {

        constructor: Timepicker

        , init: function () {
            if (this.$element.parent().hasClass('input-append')) {
                this.$element.parent('.input-append').find('.add-on').on('click', $.proxy(this.showWidget, this));
                this.$element.on({
                    focus: $.proxy(this.highlightUnit, this),
                    click: $.proxy(this.highlightUnit, this),
                    keypress: $.proxy(this.elementKeypress, this),
                    blur: $.proxy(this.blurElement, this)
                });

            } else {
                if (this.template) {
                    this.$element.on({
                        focus: $.proxy(this.showWidget, this),
                        click: $.proxy(this.showWidget, this),
                        blur: $.proxy(this.blurElement, this)
                    });
                } else {
                    this.$element.on({
                        focus: $.proxy(this.highlightUnit, this),
                        click: $.proxy(this.highlightUnit, this),
                        keypress: $.proxy(this.elementKeypress, this),
                        blur: $.proxy(this.blurElement, this)
                    });
                }
            }
            

            this.$widget = $(this.getTemplate()).appendTo('body');
            
            this.$widget.on('click', $.proxy(this.widgetClick, this));

            if (this.showInputs) {
                this.$widget.find('input').on({
                    click: function() { this.select(); },
                    keypress: $.proxy(this.widgetKeypress, this),
                    change: $.proxy(this.updateFromWidgetInputs, this)
                });
            } 

            this.setDefaultTime(this.defaultTime);
        }

        , showWidget: function(e) {
            e.stopPropagation();
            e.preventDefault();

            if (this.open) {
                return;
            }

            this.$element.trigger('show');

            if (this.disableFocus) {
                this.$element.blur();
            }

            var pos = $.extend({}, this.$element.offset(), {
                height: this.$element[0].offsetHeight
            });

            this.updateFromElementVal();

            $('html')
                .trigger('click.timepicker.data-api')
                .one('click.timepicker.data-api', $.proxy(this.hideWidget, this));

            if (this.template === 'modal') {
                this.$widget.modal('show').on('hidden', $.proxy(this.hideWidget, this));
            } else {
                this.$widget.css({
                    top: pos.top + pos.height
                    , left: pos.left
                })

                if (!this.open) {
                    this.$widget.addClass('open');
                }
            }

            this.open = true;
            this.$element.trigger('shown');
        }

        , hideWidget: function(){
            this.$element.trigger('hide');
            
            if (this.template === 'modal') {
                this.$widget.modal('hide');
            } else {
                this.$widget.removeClass('open');
            }
            this.open = false;
            this.$element.trigger('hidden');
        }

        , widgetClick: function(e) {
            e.stopPropagation();
            e.preventDefault();

            var action = $(e.target).closest('a').data('action');
            if (action) {
                this[action]();
                this.update();
            }
        }

        , widgetKeypress: function(e) {
            var input = $(e.target).closest('input').attr('name');

            switch (e.keyCode) {
                case 9: //tab
                    if (this.showMeridian) {
                        if (input == 'meridian') { 
                            this.hideWidget();
                        }
                    } else {
                        if (this.showSeconds) { 
                            if (input == 'second') {
                                this.hideWidget();
                            }
                        } else {
                            if (input == 'minute') {
                                this.hideWidget();
                            }
                        }
                    }
                break;
                case 27: // escape
                    this.hideWidget();
                break;
                case 38: // up arrow
                    switch (input) {
                        case 'hour':
                            this.incrementHour();
                        break;
                        case 'minute':
                            this.incrementMinute();
                        break;
                        case 'second':
                            this.incrementSecond();
                        break;
                        case 'meridian':
                            this.toggleMeridian();
                        break;
                    }
                    this.update();
                break;
                case 40: // down arrow
                    switch (input) {
                        case 'hour':
                            this.decrementHour();
                        break;
                        case 'minute':
                            this.decrementMinute();
                        break;
                        case 'second':
                            this.decrementSecond();
                        break;
                        case 'meridian':
                            this.toggleMeridian();
                        break;
                    }
                    this.update();
                break;
            }
        }

        , elementKeypress: function(e) {
            var input = this.$element.get(0);
            switch (e.keyCode) {
                case 0: //input
                break;
                case 9: //tab
                    this.updateFromElementVal();
                    if (this.showMeridian) {
                        if (this.highlightedUnit != 'meridian') {
                            e.preventDefault();
                            this.highlightNextUnit();
                        }
                    } else {
                        if (this.showSeconds) { 
                            if (this.highlightedUnit != 'second') {
                                e.preventDefault();
                                this.highlightNextUnit();
                            }
                        } else {
                            if (this.highlightedUnit != 'minute') {
                                e.preventDefault();
                                this.highlightNextUnit();
                            }
                        }
                    }
                break;
                case 27: // escape
                    this.updateFromElementVal();
                break;
                case 37: // left arrow
                    this.updateFromElementVal();
                    this.highlightPrevUnit();
                break;
                case 38: // up arrow
                    switch (this.highlightedUnit) {
                        case 'hour':
                            this.incrementHour();
                        break;
                        case 'minute':
                            this.incrementMinute();
                        break;
                        case 'second':
                            this.incrementSecond();
                        break;
                        case 'meridian':
                            this.toggleMeridian();
                        break;
                    }
                    this.updateElement();
                break;
                case 39: // right arrow
                    this.updateFromElementVal();
                    this.highlightNextUnit();
                break;
                case 40: // down arrow
                    switch (this.highlightedUnit) {
                        case 'hour':
                            this.decrementHour();
                        break;
                        case 'minute':
                            this.decrementMinute();
                        break;
                        case 'second':
                            this.decrementSecond();
                        break;
                        case 'meridian':
                            this.toggleMeridian();
                        break;
                    }
                    this.updateElement();
                break;
            }
            
            if (e.keyCode !== 0 && e.keyCode !== 8 && e.keyCode !== 9 && e.keyCode !== 46) {
                e.preventDefault();
            }
        }

        , setValues: function(time) {
            if (this.showMeridian) {
                var arr = time.split(' ');
                var timeArray = arr[0].split(':');
                this.meridian = arr[1];
            } else {
                var timeArray = time.split(':');
            }

            this.hour = parseInt(timeArray[0], 10);
            this.minute = parseInt(timeArray[1], 10);
            this.second = parseInt(timeArray[2], 10);

            if (isNaN(this.hour)) {
                this.hour = 0;
            } 
            if (isNaN(this.minute)) {
                this.minute = 0;
            }

            if (this.showMeridian) {
                if (this.hour > 12) {
                    this.hour = 12;
                } else if (this.hour < 1) {
                    this.hour = 1;
                }

                if (this.meridian == 'am' || this.meridian == 'a') {
                    this.meridian = 'AM';
                } else if (this.meridian == 'pm' || this.meridian == 'p') {
                    this.meridian = 'PM';
                } 

                if (this.meridian != 'AM' && this.meridian != 'PM') {
                    this.meridian = 'AM';
                }
            } else {
                 if (this.hour >= 24) {
                    this.hour = 23;
                } else if (this.hour < 0) {
                    this.hour = 0;
                }
            }

            if (this.minute < 0) {
                this.minute = 0;
            } else if (this.minute >= 60) {
                this.minute = 59;
            }

            if (this.showSeconds) {
                if (isNaN(this.second)) {
                    this.second = 0;
                } else if (this.second < 0) {
                    this.second = 0;
                } else if (this.second >= 60) {
                    this.second = 59;
                }
            }

            this.updateElement();
            this.updateWidget();
        }

        , setMeridian: function(meridian) {
            if (meridian == 'a' || meridian == 'am' || meridian == 'AM' ) {
                this.meridian = 'AM';
            } else if (meridian == 'p' || meridian == 'pm' || meridian == 'PM' ) {
                this.meridian = 'PM';
            } else {
                this.updateWidget();
            }

            this.updateElement();
        }

        , setDefaultTime: function(defaultTime){
            if (defaultTime) {
                if (defaultTime === 'current') {
                    var dTime = new Date();
                    var hours = dTime.getHours();
                    var minutes = Math.floor(dTime.getMinutes() / this.minuteStep) * this.minuteStep;
                    var seconds = Math.floor(dTime.getSeconds() / this.secondStep) * this.secondStep;
                    var meridian = "AM";
                    if (this.showMeridian) {
                        if (hours === 0) {
                            hours = 12;
                        } else if (hours >= 12) {
                            if (hours > 12) {
                                hours = hours - 12;
                            }
                            meridian = "PM";
                        } else {
                           meridian = "AM";
                        }
                    }
                    this.hour = hours;
                    this.minute = minutes;
                    this.second = seconds;
                    this.meridian = meridian;
                } else if (defaultTime === 'value') {
                    this.setValues(this.$element.val());
                } else {
                    this.setValues(defaultTime);
                }
                this.update();
            } else {
                this.hour = 0;
                this.minute = 0;
                this.second = 0;
            }
        }

        , formatTime: function(hour, minute, second, meridian) {
            hour = hour < 10 ? '0' + hour : hour;
            minute = minute < 10 ? '0' + minute : minute;
            second = second < 10 ? '0' + second : second;

            return hour + ':' + minute + (this.showSeconds ? ':' + second : '') + (this.showMeridian ? ' ' + meridian : '');
        }

        , getTime: function() {
            return this.formatTime(this.hour, this.minute, this.second, this.meridian);
        }

        , setTime: function(time) {
            this.setValues(time);
            this.update();
        }

        , update: function() {
            this.updateElement();
            this.updateWidget();
        }

        , blurElement: function() {
          this.highlightedUnit = undefined;
          this.updateFromElementVal();
        }

        , updateElement: function() {
            var time = this.getTime();

            this.$element.val(time).change();

            switch (this.highlightedUnit) {
                case 'hour':
                    this.highlightHour();
                break;
                case 'minute':
                    this.highlightMinute();
                break;
                case 'second':
                    this.highlightSecond();
                break;
                case 'meridian':
                    this.highlightMeridian();
                break;
            }
        }

        , updateWidget: function() {
            if (this.showInputs) {
                this.$widget.find('input.bootstrap-timepicker-hour').val(this.hour < 10 ? '0' + this.hour : this.hour);
                this.$widget.find('input.bootstrap-timepicker-minute').val(this.minute < 10 ? '0' + this.minute : this.minute);
                if (this.showSeconds) {
                    this.$widget.find('input.bootstrap-timepicker-second').val(this.second < 10 ? '0' + this.second : this.second);
                }
                if (this.showMeridian) {
                    this.$widget.find('input.bootstrap-timepicker-meridian').val(this.meridian);
                }
            } else {
                this.$widget.find('span.bootstrap-timepicker-hour').text(this.hour);
                this.$widget.find('span.bootstrap-timepicker-minute').text(this.minute < 10 ? '0' + this.minute : this.minute);
                if (this.showSeconds) {
                    this.$widget.find('span.bootstrap-timepicker-second').text(this.second < 10 ? '0' + this.second : this.second);
                }
                if (this.showMeridian) {
                    this.$widget.find('span.bootstrap-timepicker-meridian').text(this.meridian);
                }
            }
        }

        , updateFromElementVal: function (e) {
            var time = this.$element.val();
            if (time) {
                this.setValues(time);
                this.updateWidget();
            }
        }

        , updateFromWidgetInputs: function () {
            var time = $('input.bootstrap-timepicker-hour', this.$widget).val() + ':' + 
                       $('input.bootstrap-timepicker-minute', this.$widget).val() +
                       (this.showSeconds ? 
                           ':' + $('input.bootstrap-timepicker-second', this.$widget).val() 
                        : '') +
                       (this.showMeridian ? 
                           ' ' + $('input.bootstrap-timepicker-meridian', this.$widget).val() 
                        : '');

            this.setValues(time);
        }

        , getCursorPosition: function() {
            var input = this.$element.get(0);

            if ('selectionStart' in input) {
                // Standard-compliant browsers
                return input.selectionStart;
            } else if (document.selection) {
                // IE fix
                input.focus();
                var sel = document.selection.createRange();
                var selLen = document.selection.createRange().text.length;
                sel.moveStart('character', - input.value.length);

                return sel.text.length - selLen;
            }
        }

        , highlightUnit: function () {
            var input = this.$element.get(0);

            this.position = this.getCursorPosition();
            if (this.position >= 0 && this.position <= 2) {
                this.highlightHour();
            } else if (this.position >= 3 && this.position <= 5) {
                this.highlightMinute();
            } else if (this.position >= 6 && this.position <= 8) {
                if (this.showSeconds) {
                    this.highlightSecond();
                } else {
                    this.highlightMeridian();
                }
            } else if (this.position >= 9 && this.position <= 11) {
                this.highlightMeridian();
            }
        }

        , highlightNextUnit: function() {
            switch (this.highlightedUnit) {
                case 'hour':
                    this.highlightMinute();
                break;
                case 'minute':
                    if (this.showSeconds) {
                        this.highlightSecond();
                    } else {
                        this.highlightMeridian();
                    }
                break;
                case 'second':
                    this.highlightMeridian();
                break;
                case 'meridian':
                    this.highlightHour();
                break;
            }
        }

        , highlightPrevUnit: function() {
            switch (this.highlightedUnit) {
                case 'hour':
                    this.highlightMeridian();
                break;
                case 'minute':
                    this.highlightHour();
                break;
                case 'second':
                    this.highlightMinute();
                break;
                case 'meridian':
                    if (this.showSeconds) {
                        this.highlightSecond();
                    } else {
                        this.highlightMinute();
                    }
                break;
            }
        }

        , highlightHour: function() {
            this.highlightedUnit = 'hour';
            this.$element.get(0).setSelectionRange(0,2); 
        }

        , highlightMinute: function() {
            this.highlightedUnit = 'minute';
            this.$element.get(0).setSelectionRange(3,5); 
        }

        , highlightSecond: function() {
            this.highlightedUnit = 'second';
            this.$element.get(0).setSelectionRange(6,8); 
        }

        , highlightMeridian: function() {
            this.highlightedUnit = 'meridian';
            if (this.showSeconds) {
                this.$element.get(0).setSelectionRange(9,11); 
            } else {
                this.$element.get(0).setSelectionRange(6,8); 
            }
        }

        , incrementHour: function() {
            if (this.showMeridian) {
                if (this.hour === 11) {
                    this.toggleMeridian();
                } else if (this.hour === 12) {
                    return this.hour = 1;
                }
            }
            if (this.hour === 23) {
                return this.hour = 0;
            }
            this.hour = this.hour + 1;
        }

        , decrementHour: function() {
            if (this.showMeridian) {
                if (this.hour === 1) {
                    return this.hour = 12;
                } 
                else if (this.hour === 12) {
                    this.toggleMeridian();
                }
            }
            if (this.hour === 0) {
                return this.hour = 23;
            }
            this.hour = this.hour - 1;
        }

        , incrementMinute: function() {
            var newVal = this.minute + this.minuteStep - (this.minute % this.minuteStep);
            if (newVal > 59) {
                this.incrementHour();
                this.minute = newVal - 60;
            } else {
                this.minute = newVal;
            }
        }

        , decrementMinute: function() {
            var newVal = this.minute - this.minuteStep;
            if (newVal < 0) {
                this.decrementHour();
                this.minute = newVal + 60;
            } else {
                this.minute = newVal;
            }
        }

        , incrementSecond: function() {
            var newVal = this.second + this.secondStep - (this.second % this.secondStep);
            if (newVal > 59) {
                this.incrementMinute();
                this.second = newVal - 60;
            } else {
                this.second = newVal;
            }
        }

        , decrementSecond: function() {
            var newVal = this.second - this.secondStep;
            if (newVal < 0) {
                this.decrementMinute();
                this.second = newVal + 60;
            } else {
                this.second = newVal;
            }
        }

        , toggleMeridian: function() {
            this.meridian = this.meridian === 'AM' ? 'PM' : 'AM';

            this.update();
        }

        , getTemplate: function() {
            if (this.options.templates[this.options.template]) {
                return this.options.templates[this.options.template];
            }
            if (this.showInputs) {
                var hourTemplate = '<input type="text" name="hour" class="bootstrap-timepicker-hour" maxlength="2"/>';
                var minuteTemplate = '<input type="text" name="minute" class="bootstrap-timepicker-minute" maxlength="2"/>';
                var secondTemplate = '<input type="text" name="second" class="bootstrap-timepicker-second" maxlength="2"/>';
                var meridianTemplate = '<input type="text" name="meridian" class="bootstrap-timepicker-meridian" maxlength="2"/>';
            } else {
                var hourTemplate = '<span class="bootstrap-timepicker-hour"></span>';
                var minuteTemplate = '<span class="bootstrap-timepicker-minute"></span>';
                var secondTemplate = '<span class="bootstrap-timepicker-second"></span>';
                var meridianTemplate = '<span class="bootstrap-timepicker-meridian"></span>';
            }
            var templateContent = '<table class="'+ (this.showSeconds ? 'show-seconds' : '') +' '+ (this.showMeridian ? 'show-meridian' : '') +'">'+
                                       '<tr>'+
                                           '<td><a href="#" data-action="incrementHour"><i class="icon-chevron-up"></i></a></td>'+
                                           '<td class="separator">&nbsp;</td>'+
                                           '<td><a href="#" data-action="incrementMinute"><i class="icon-chevron-up"></i></a></td>'+
                                           (this.showSeconds ? 
                                               '<td class="separator">&nbsp;</td>'+
                                               '<td><a href="#" data-action="incrementSecond"><i class="icon-chevron-up"></i></a></td>'
                                           : '') +
                                           (this.showMeridian ? 
                                               '<td class="separator">&nbsp;</td>'+
                                               '<td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="icon-chevron-up"></i></a></td>'
                                           : '') +
                                       '</tr>'+
                                       '<tr>'+
                                           '<td>'+ hourTemplate +'</td> '+
                                           '<td class="separator">:</td>'+
                                           '<td>'+ minuteTemplate +'</td> '+
                                           (this.showSeconds ? 
                                                '<td class="separator">:</td>'+
                                                '<td>'+ secondTemplate +'</td>'
                                           : '') +
                                           (this.showMeridian ? 
                                                '<td class="separator">&nbsp;</td>'+
                                                '<td>'+ meridianTemplate +'</td>'
                                           : '') +
                                       '</tr>'+
                                       '<tr>'+
                                           '<td><a href="#" data-action="decrementHour"><i class="icon-chevron-down"></i></a></td>'+
                                           '<td class="separator"></td>'+
                                           '<td><a href="#" data-action="decrementMinute"><i class="icon-chevron-down"></i></a></td>'+
                                           (this.showSeconds ? 
                                                '<td class="separator">&nbsp;</td>'+
                                                '<td><a href="#" data-action="decrementSecond"><i class="icon-chevron-down"></i></a></td>' 
                                           : '') +
                                           (this.showMeridian ? 
                                                '<td class="separator">&nbsp;</td>'+
                                                '<td><a href="#" data-action="toggleMeridian"><i class="icon-chevron-down"></i></a></td>'
                                           : '') +
                                       '</tr>'+
                                   '</table>';

            var template;
            switch(this.options.template) {
                case 'modal':
                    template = '<div class="bootstrap-timepicker modal hide fade in" style="top: 30%; margin-top: 0; width: 200px; margin-left: -100px;" data-backdrop="'+ (this.modalBackdrop ? 'true' : 'false') +'">'+
                                   '<div class="modal-header">'+
                                       '<a href="#" class="close" data-dismiss="modal">×</a>'+
                                       '<h3>Pick a Time</h3>'+
                                   '</div>'+
                                   '<div class="modal-content">'+
                                        templateContent +
                                   '</div>'+
                                   '<div class="modal-footer">'+
                                       '<a href="#" class="btn btn-primary" data-dismiss="modal">Ok</a>'+
                                   '</div>'+
                               '</div>';
                    
                break;
                case 'dropdown':
                    template = '<div class="bootstrap-timepicker dropdown-menu">'+
                                    templateContent +
                               '</div>';
                break;
                
            }
            return template;
        }
    };


    /* TIMEPICKER PLUGIN DEFINITION
     * =========================== */

    $.fn.timepicker = function (option) {
        return this.each(function () {
            var $this = $(this)
            , data = $this.data('timepicker')
            , options = typeof option == 'object' && option;
            if (!data) {
                $this.data('timepicker', (data = new Timepicker(this, options)));
            }
            if (typeof option == 'string') {
                data[option]();
            }
        })
    }

    $.fn.timepicker.defaults = {
      minuteStep: 15
    , secondStep: 15
    , disableFocus: false
    , defaultTime: 'current'
    , showSeconds: false
    , showInputs: true
    , showMeridian: true
    , template: 'dropdown'
    , modalBackdrop: false
    , templates: {} // set custom templates
    }

    $.fn.timepicker.Constructor = Timepicker
}(window.jQuery);

!function ($) {
  "use strict";
  // version: 2.7
  // by Mattia Larentis - follow me on twitter! @SpiritualGuru

  var addToAttribute = function (obj, array, value) {
    var i = 0
      , length = array.length;

    for (; i < length; i++) {
      obj = obj[array[i]] = obj[array[i]] || i == ( length - 1) ? value : {}
    }
  };

  $.fn.toggleButtons = function (method) {
    var $element
      , $div
      , transitionSpeed = 0.05
      , methods = {
        init: function (opt) {
          this.each(function () {
              var $spanLeft
                , $spanRight
                , options
                , moving
                , dataAttribute = {};

              $element = $(this);
              $element.addClass('toggle-button');

              $.each($element.data(), function (i, el) {
                var key
                  , tmp = {};

                if (i.indexOf("togglebutton") === 0) {
                  key = i.match(/[A-Z][a-z]+/g);
                  key = $.map(key, function (n) {
                    return (n.toLowerCase());
                  });

                  addToAttribute(tmp, key, el);
                  dataAttribute = $.extend(true, dataAttribute, tmp);
                }
              });

              options = $.extend(true, {}, $.fn.toggleButtons.defaults, opt, dataAttribute);

              $(this).data('options', options);

              $spanLeft = $('<span></span>').addClass("labelLeft").text(options.label.enabled === undefined ? "ON" : options.label.enabled);
              $spanRight = $('<span></span>').addClass("labelRight").text(options.label.disabled === undefined ? "OFF " : options.label.disabled);

              // html layout
              $div = $element.find('input:checkbox').wrap($('<div></div>')).parent();
              $div.append($spanLeft);
              $div.append($('<label></label>').attr('for', $element.find('input').attr('id')));
              $div.append($spanRight);

              if ($element.find('input').is(':checked'))
                $element.find('>div').css('left', "0");
              else $element.find('>div').css('left', "-50%");

              if (options.animated) {
                if (options.transitionspeed !== undefined)
                  if (/^(\d*%$)/.test(options.transitionspeed))  // is a percent value?
                    transitionSpeed = 0.05 * parseInt(options.transitionspeed) / 100;
                  else
                    transitionSpeed = options.transitionspeed;
              }
              else transitionSpeed = 0;

              $(this).data('transitionSpeed', transitionSpeed * 1000);


              options["width"] /= 2;

              // width of the bootstrap-toggle-button
              $element
                .css('width', options.width * 2)
                .find('>div').css('width', options.width * 3)
                .find('>span, >label').css('width', options.width);

              // height of the bootstrap-toggle-button
              $element
                .css('height', options.height)
                .find('span, label')
                .css('height', options.height)
                .filter('span')
                .css('line-height', options.height + "px");

              if ($element.find('input').is(':disabled'))
                $(this).addClass('deactivate');

              $element.find('span').css(options.font);


              // enabled custom color
              if (options.style.enabled === undefined) {
                if (options.style.custom !== undefined && options.style.custom.enabled !== undefined && options.style.custom.enabled.background !== undefined) {
                  $spanLeft.css('color', options.style.custom.enabled.color);
                  if (options.style.custom.enabled.gradient === undefined)
                    $spanLeft.css('background', options.style.custom.enabled.background);
                  else $.each(["-webkit-", "-moz-", "-o-", ""], function (i, el) {
                    $spanLeft.css('background-image', el + 'linear-gradient(top, ' + options.style.custom.enabled.background + ',' + options.style.custom.enabled.gradient + ')');
                  });
                }
              }
              else $spanLeft.addClass(options.style.enabled);

              // disabled custom color
              if (options.style.disabled === undefined) {
                if (options.style.custom !== undefined && options.style.custom.disabled !== undefined && options.style.custom.disabled.background !== undefined) {
                  $spanRight.css('color', options.style.custom.disabled.color);
                  if (options.style.custom.disabled.gradient === undefined)
                    $spanRight.css('background', options.style.custom.disabled.background);
                  else $.each(["-webkit-", "-moz-", "-o-", ""], function (i, el) {
                    $spanRight.css('background-image', el + 'linear-gradient(top, ' + options.style.custom.disabled.background + ',' + options.style.custom.disabled.gradient + ')');
                  });
                }
              }
              else $spanRight.addClass(options.style.disabled);

              var changeStatus = function ($this) {
                $this.siblings('label')
                  .trigger('mousedown')
                  .trigger('mouseup')
                  .trigger('click');
              };

              $spanLeft.on('click', function (e) {
                changeStatus($(this));
              });
              $spanRight.on('click', function (e) {
                changeStatus($(this));
              });

              $('.toggle-button').find('input').on('change', function (e, skipOnChange) {
                var $element = $(this).parent()
                  , active = $(this).is(':checked')
                  , $toggleButton = $(this).closest('.toggle-button');

                e.preventDefault();
                e.stopImmediatePropagation();

                $element.stop().animate({'left': active ? '0' : '-50%'}, $toggleButton.data('transitionSpeed'));

                options = $toggleButton.data('options');

                if (!skipOnChange)
                  options.onChange($element, active, e);
              });

              $('.toggle-button').find('label').on('mousedown touchstart', function (e) {
                moving = false;
                e.preventDefault();
                e.stopImmediatePropagation();

                if ($(this).closest('.toggle-button').is('.deactivate'))
                  $(this).off('click');
                else {
                  $(this).on('mousemove touchmove', function (e) {
                    var $element = $(this).closest('.toggle-button')
                      , relativeX = (e.pageX || e.originalEvent.targetTouches[0].pageX) - $element.offset().left
                      , percent = ((relativeX / (options.width * 2)) * 100);
                    moving = true;

                    e.stopImmediatePropagation();
                    e.preventDefault();

                    if (percent < 25)
                      percent = 25;
                    else if (percent > 75)
                      percent = 75;

                    $element.find('>div').css('left', (percent - 75) + "%");
                  });

                  $(this).on('click touchend', function (e) {
                    var $target = $(e.target)
                      , $myCheckBox = $target.siblings('input');

                    e.stopImmediatePropagation();
                    e.preventDefault();
                    $(this).off('mouseleave');

                    if (moving)
                      if (parseInt($(this).parent().css('left')) < -25)
                        $myCheckBox.attr('checked', false);
                      else $myCheckBox.attr('checked', true);
                    else $myCheckBox.attr("checked", !$myCheckBox.is(":checked"));

                    $myCheckBox.trigger('change');
                  });

                  $(this).on('mouseleave', function (e) {
                    var $myCheckBox = $(this).siblings('input');

                    e.preventDefault();
                    e.stopImmediatePropagation();

                    $(this).off('mouseleave');
                    $(this).trigger('mouseup');

                    if (parseInt($(this).parent().css('left')) < -25)
                      $myCheckBox.attr('checked', false);
                    else $myCheckBox.attr('checked', true);

                    $myCheckBox.trigger('change');
                  });

                  $(this).on('mouseup', function (e) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    $(this).off('mousemove');
                  });
                }
              });
            }
          );
          return this;
        },
        toggleActivation: function () {
          $(this).toggleClass('deactivate');
        },
        toggleState: function (skipOnChange) {
          var $input = $(this).find('input');
          $input.attr('checked', !$input.is(':checked')).trigger('change', skipOnChange);
        },
        setState: function(value, skipOnChange) {
          $(this).find('input').attr('checked', value).trigger('change', skipOnChange);
        },
        status: function () {
          return $(this).find('input:checkbox').is(':checked');
        }
      };

    if (methods[method])
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    else if (typeof method === 'object' || !method)
      return methods.init.apply(this, arguments);
    else
      $.error('Method ' + method + ' does not exist!');
  };

  $.fn.toggleButtons.defaults = {
    onChange: function () {
    },
    width: 100,
    height: 25,
    font: {},
    animated: true,
    transitionspeed: undefined,
    label: {
      enabled: undefined,
      disabled: undefined
    },
    style: {
      enabled: undefined,
      disabled: undefined,
      custom: {
        enabled: {
          background: undefined,
          gradient: undefined,
          color: "#FFFFFF"
        },
        disabled: {
          background: undefined,
          gradient: undefined,
          color: "#FFFFFF"
        }
      }
    }
  };
}($);

/**
 * Bootstrap WYSIWYG
 * bootstrap-wysihtml5.js
 */
!function($, wysi) {
    "use strict";

    var templates = function(key, locale) {

        var tpl = {
            "font-styles": "<li class='dropdown'>" +
                               "<a class='btn dropdown-toggle' data-toggle='dropdown' href='#'>" +
                                   "<i class='icon-font'></i>&nbsp;<span class='current-font'>" + locale.font_styles.normal + "</span>&nbsp;<b class='caret'></b>" +
                               "</a>" +
                               "<ul class='dropdown-menu'>" +
                                   "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='div'>" + locale.font_styles.normal + "</a></li>" +
                                   "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h1'>" + locale.font_styles.h1 + "</a></li>" +
                                   "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h2'>" + locale.font_styles.h2 + "</a></li>" +
                                   "<li><a data-wysihtml5-command='formatBlock' data-wysihtml5-command-value='h3'>" + locale.font_styles.h3 + "</a></li>" +
                               "</ul>" +
                           "</li>",
            "emphasis":    "<li>" +
                               "<div class='btn-group'>" +
                                   "<a class='btn' data-wysihtml5-command='bold' title='CTRL+B'>" + locale.emphasis.bold + "</a>" +
                                   "<a class='btn' data-wysihtml5-command='italic' title='CTRL+I'>" + locale.emphasis.italic + "</a>" +
                                   "<a class='btn' data-wysihtml5-command='underline' title='CTRL+U'>" + locale.emphasis.underline + "</a>" +
                               "</div>" +
                           "</li>",
            "lists":       "<li>" +
                               "<div class='btn-group'>" +
                                   "<a class='btn' data-wysihtml5-command='insertUnorderedList' title='" + locale.lists.unordered + "'><i class='icon-list'></i></a>" +
                                   "<a class='btn' data-wysihtml5-command='insertOrderedList' title='" + locale.lists.ordered + "'><i class='icon-th-list'></i></a>" +
                                   "<a class='btn' data-wysihtml5-command='Outdent' title='" + locale.lists.outdent + "'><i class='icon-indent-right'></i></a>" +
                                   "<a class='btn' data-wysihtml5-command='Indent' title='" + locale.lists.indered + "'><i class='icon-indent-left'></i></a>" +
                               "</div>" +
                           "</li>",
            "link":        "<li>" +
                               "<div class='bootstrap-wysihtml5-insert-link-modal modal hide fade'>" +
                                   "<div class='modal-header'>" +
                                       "<a class='close' data-dismiss='modal'>&times;</a>" +
                                       "<h3>" + locale.link.insert + "</h3>" +
                                   "</div>" +
                                   "<div class='modal-body'>" +
                                       "<input value='http://' class='bootstrap-wysihtml5-insert-link-url input-xlarge'>" +
                                   "</div>" +
                                   "<div class='modal-footer'>" +
                                       "<a href='#' class='btn' data-dismiss='modal'>" + locale.link.cancel + "</a>" +
                                       "<a href='#' class='btn btn-primary' data-dismiss='modal'>" + locale.link.insert + "</a>" +
                                   "</div>" +
                               "</div>" +
                               "<a class='btn' data-wysihtml5-command='createLink' title='" + locale.link.insert + "'><i class='icon-share'></i></a>" +
                           "</li>",
            "image":       "<li>" +
                               "<div class='bootstrap-wysihtml5-insert-image-modal modal hide fade'>" +
                                   "<div class='modal-header'>" +
                                       "<a class='close' data-dismiss='modal'>&times;</a>" +
                                       "<h3>" + locale.image.insert + "</h3>" +
                                   "</div>" +
                                   "<div class='modal-body'>" +
                                       "<input value='http://' class='bootstrap-wysihtml5-insert-image-url input-xlarge'>" +
                                   "</div>" +
                                   "<div class='modal-footer'>" +
                                       "<a href='#' class='btn' data-dismiss='modal'>" + locale.image.cancel + "</a>" +
                                       "<a href='#' class='btn btn-primary' data-dismiss='modal'>" + locale.image.insert + "</a>" +
                                   "</div>" +
                               "</div>" +
                               "<a class='btn' data-wysihtml5-command='insertImage' title='" + locale.image.insert + "'><i class='icon-picture'></i></a>" +
                           "</li>",

            "html":
                           "<li>" +
                               "<div class='btn-group'>" +
                                   "<a class='btn' data-wysihtml5-action='change_view' title='" + locale.html.edit + "'><i class='icon-pencil'></i></a>" +
                               "</div>" +
                           "</li>",

            "color":       "<li class='dropdown'>" +
                               "<a class='btn dropdown-toggle' data-toggle='dropdown' href='#'>" +
                                   "<span class='current-color'>" + locale.colours.black + "</span>&nbsp;<b class='caret'></b>" +
                               "</a>" +
                               "<ul class='dropdown-menu'>" +
                                   "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='black'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='black'>" + locale.colours.black + "</a></li>" +
                                   "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='silver'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='silver'>" + locale.colours.silver + "</a></li>" +
                                   "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='gray'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='gray'>" + locale.colours.gray + "</a></li>" +
                                   "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='maroon'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='maroon'>" + locale.colours.maroon + "</a></li>" +
                                   "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='red'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='red'>" + locale.colours.red + "</a></li>" +
                                   "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='purple'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='purple'>" + locale.colours.purple + "</a></li>" +
                                   "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='green'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='green'>" + locale.colours.green + "</a></li>" +
                                   "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='olive'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='olive'>" + locale.colours.olive + "</a></li>" +
                                   "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='navy'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='navy'>" + locale.colours.navy + "</a></li>" +
                                   "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='blue'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='blue'>" + locale.colours.blue + "</a></li>" +
                                   "<li><div class='wysihtml5-colors' data-wysihtml5-command-value='orange'></div><a class='wysihtml5-colors-title' data-wysihtml5-command='foreColor' data-wysihtml5-command-value='orange'>" + locale.colours.orange + "</a></li>" +
                               "</ul>" +
                           "</li>"
        };
        return tpl[key];
    };

    var defaultOptions = {
        "font-styles": true,
        "color": false,
        "emphasis": true,
        "lists": true,
        "html": false,
        "link": true,
        "image": true,
        events: {},
        parserRules: {
            classes: {
              // (path_to_project/lib/css/wysiwyg-color.css)
              "wysiwyg-color-silver" : 1,
              "wysiwyg-color-gray" : 1,
              "wysiwyg-color-white" : 1,
              "wysiwyg-color-maroon" : 1,
              "wysiwyg-color-red" : 1,
              "wysiwyg-color-purple" : 1,
              "wysiwyg-color-fuchsia" : 1,
              "wysiwyg-color-green" : 1,
              "wysiwyg-color-lime" : 1,
              "wysiwyg-color-olive" : 1,
              "wysiwyg-color-yellow" : 1,
              "wysiwyg-color-navy" : 1,
              "wysiwyg-color-blue" : 1,
              "wysiwyg-color-teal" : 1,
              "wysiwyg-color-aqua" : 1,
              "wysiwyg-color-orange" : 1,
            },
            tags: {
                "b":  {},
                "i":  {},
                "br": {},
                "ol": {},
                "ul": {},
                "li": {},
                "h1": {},
                "h2": {},
                "h3": {},
                "blockquote": {},
                "u": 1,
                "img": {
                    "check_attributes": {
                        "width": "numbers",
                        "alt": "alt",
                        "src": "url",
                        "height": "numbers"
                    }
                },
                "a":  {
                    set_attributes: {
                        target: "_blank",
                        rel:    "nofollow"
                    },
                    check_attributes: {
                        href:   "url" // important to avoid XSS
                    }
                },
                "span": 1,
                "div": 1
            }
        },
        stylesheets: ["./lib/css/wysiwyg-color.css"], // (path_to_project/lib/css/wysiwyg-color.css)
        locale: "en"
    };

    var Wysihtml5 = function(el, options) {
        this.el = el;
        this.toolbar = this.createToolbar(el, options || defaultOptions);
        this.editor =  this.createEditor(options);

        window.editor = this.editor;

        $('iframe.wysihtml5-sandbox').each(function(i, el){
            $(el.contentWindow).off('focus.wysihtml5').on({
              'focus.wysihtml5' : function(){
                 $('li.dropdown').removeClass('open');
               }
            });
        });
    };

    Wysihtml5.prototype = {

        constructor: Wysihtml5,

        createEditor: function(options) {
            options = $.extend(defaultOptions, options || {});
		    options.toolbar = this.toolbar[0];

		    var editor = new wysi.Editor(this.el[0], options);

            if(options && options.events) {
                for(var eventName in options.events) {
                    editor.on(eventName, options.events[eventName]);
                }
            }

            return editor;
        },

        createToolbar: function(el, options) {
            var self = this;
            var toolbar = $("<ul/>", {
                'class' : "wysihtml5-toolbar",
                'style': "display:none"
            });
	          var culture = options.locale || defaultOptions.locale || "en";
            for(var key in defaultOptions) {
                var value = false;

                if(options[key] !== undefined) {
                    if(options[key] === true) {
                        value = true;
                    }
                } else {
                    value = defaultOptions[key];
                }

                if(value === true) {
                    toolbar.append(templates(key, locale[culture]));

                    if(key === "html") {
                        this.initHtml(toolbar);
                    }

                    if(key === "link") {
                        this.initInsertLink(toolbar);
                    }

                    if(key === "image") {
                        this.initInsertImage(toolbar);
                    }
                }
            }

            if(options.toolbar) {
                for(key in options.toolbar) {
                   toolbar.append(options.toolbar[key]);
                }
            }

            toolbar.find("a[data-wysihtml5-command='formatBlock']").click(function(e) {
                var target = e.target || e.srcElement;
                var el = $(target);
                self.toolbar.find('.current-font').text(el.html());
            });

            toolbar.find("a[data-wysihtml5-command='foreColor']").click(function(e) {
                var target = e.target || e.srcElement;
                var el = $(target);
                self.toolbar.find('.current-color').text(el.html());
            });

            this.el.before(toolbar);

            return toolbar;
        },

        initHtml: function(toolbar) {
            var changeViewSelector = "a[data-wysihtml5-action='change_view']";
            toolbar.find(changeViewSelector).click(function(e) {
                toolbar.find('a.btn').not(changeViewSelector).toggleClass('disabled');
            });
        },

        initInsertImage: function(toolbar) {
            var self = this;
            var insertImageModal = toolbar.find('.bootstrap-wysihtml5-insert-image-modal');
            var urlInput = insertImageModal.find('.bootstrap-wysihtml5-insert-image-url');
            var insertButton = insertImageModal.find('a.btn-primary');
            var initialValue = urlInput.val();

            var insertImage = function() {
                var url = urlInput.val();
                urlInput.val(initialValue);
                self.editor.composer.commands.exec("insertImage", url);
            };

            urlInput.keypress(function(e) {
                if(e.which == 13) {
                    insertImage();
                    insertImageModal.modal('hide');
                }
            });

            insertButton.click(insertImage);

            insertImageModal.on('shown', function() {
                urlInput.focus();
            });

            insertImageModal.on('hide', function() {
                self.editor.currentView.element.focus();
            });

            toolbar.find('a[data-wysihtml5-command=insertImage]').click(function() {
                insertImageModal.modal('show');
                insertImageModal.on('click.dismiss.modal', '[data-dismiss="modal"]', function(e) {
					       e.stopPropagation();
				        });
                return false;
            });
        },

        initInsertLink: function(toolbar) {
            var self = this;
            var insertLinkModal = toolbar.find('.bootstrap-wysihtml5-insert-link-modal');
            var urlInput = insertLinkModal.find('.bootstrap-wysihtml5-insert-link-url');
            var insertButton = insertLinkModal.find('a.btn-primary');
            var initialValue = urlInput.val();

            var insertLink = function() {
                var url = urlInput.val();
                urlInput.val(initialValue);
                self.editor.composer.commands.exec("createLink", {
                    href: url,
                    target: "_blank",
                    rel: "nofollow"
                });
            };
            var pressedEnter = false;

            urlInput.keypress(function(e) {
                if(e.which == 13) {
                    insertLink();
                    insertLinkModal.modal('hide');
                }
            });

            insertButton.click(insertLink);

            insertLinkModal.on('shown', function() {
                urlInput.focus();
            });

            insertLinkModal.on('hide', function() {
                self.editor.currentView.element.focus();
            });

            toolbar.find('a[data-wysihtml5-command=createLink]').click(function() {
                insertLinkModal.modal('show');
                insertLinkModal.on('click.dismiss.modal', '[data-dismiss="modal"]', function(e) {
        					e.stopPropagation();
        				});
                return false;
            });
        }
    };

    $.fn.wysihtml5 = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.data('wysihtml5', new Wysihtml5($this, options));
        });
    };

    $.fn.wysihtml5.Constructor = Wysihtml5;

    var locale = $.fn.wysihtml5.locale = {
        en: {
            font_styles: {
                normal: "Normal text",
                h1: "Heading 1",
                h2: "Heading 2",
                h3: "Heading 3"
            },
            emphasis: {
                bold: "Bold",
                italic: "Italic",
                underline: "Underline"
            },
            lists: {
                unordered: "Unordered list",
                ordered: "Ordered list",
                outdent: "Outdent",
                indent: "Indent"
            },
            link: {
                insert: "Insert link",
                cancel: "Cancel"
            },
            image: {
                insert: "Insert image",
                cancel: "Cancel"
            },
            html: {
                edit: "Edit HTML"
            },
            colours: {
                black: "Black",
                silver: "Silver",
                gray: "Grey",
                maroon: "Maroon",
                red: "Red",
                purple: "Purple",
                green: "Green",
                olive: "Olive",
                navy: "Navy",
                blue: "Blue",
                orange: "Orange"
            }
        }
    };

}(window.jQuery, window.wysihtml5);

/*
 * Fuel UX Combobox
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

// COMBOBOX CONSTRUCTOR AND PROTOTYPE

var Combobox = function (element, options) {
	this.$element = $(element);
	this.options = $.extend({}, $.fn.combobox.defaults, options);
	this.$element.on('click', 'a', $.proxy(this.itemclicked, this));
	this.$input = this.$element.find('input');
};

Combobox.prototype = {

	constructor: Combobox,

	select: function (val) {
		this.$input.val(val).change();
		return this;
	},

	itemclicked: function (e) {
		this.select($(e.target).text());
		$('body').click();
		e.preventDefault();
	}

};


// COMBOBOX PLUGIN DEFINITION

$.fn.combobox = function (option) {
	return this.each(function () {
		var $this = $(this);
		var data = $this.data('combobox');
		var options = typeof option === 'object' && option;

		if (!data) $this.data('combobox', (data = new Combobox(this, options)));
		if (typeof option === 'string') data[option]();
	});
};

$.fn.combobox.defaults = {};

$.fn.combobox.Constructor = Combobox;


// COMBOBOX DATA-API

$(function () {
	$('body').on('mousedown.combobox.data-api', '.combobox', function (e) {
		var $this = $(this);
		if ($this.data('combobox')) return;
		$this.combobox($this.data());
	});
});
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
/*
 * Fuel UX Pillbox
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

// PILLBOX CONSTRUCTOR AND PROTOTYPE

var Pillbox = function (element, options) {
	this.$element = $(element);
	this.options = $.extend({}, $.fn.pillbox.defaults, options);
	this.$element.on('click', 'li', $.proxy(this.itemclicked, this));
};

Pillbox.prototype = {
	constructor: Pillbox,

	items: function() {
		return this.$element.find('li').map(function() {
			var $this = $(this);
			return $.extend({ text: $this.text() }, $this.data());
		}).get();
	},

	itemclicked: function (e) {
		$(e.currentTarget).remove();
		e.preventDefault();
	}
};


// PILLBOX PLUGIN DEFINITION

$.fn.pillbox = function (option) {
	var methodReturn;

	var $set = this.each(function () {
		var $this = $(this);
		var data = $this.data('pillbox');
		var options = typeof option === 'object' && option;

		if (!data) $this.data('pillbox', (data = new Pillbox(this, options)));
		if (typeof option === 'string') methodReturn = data[option]();
	});

	return (methodReturn === undefined) ? $set : methodReturn;
};

$.fn.pillbox.defaults = {};

$.fn.pillbox.Constructor = Pillbox;


// PILLBOX DATA-API

$(function () {
	$('body').on('mousedown.pillbox.data-api', '.pillbox', function (e) {
		var $this = $(this);
		if ($this.data('pillbox')) return;
		$this.pillbox($this.data());
	});
});
/*
 * Fuel UX Search
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

// SEARCH CONSTRUCTOR AND PROTOTYPE

var Search = function (element, options) {
	this.$element = $(element);
	this.options = $.extend({}, $.fn.search.defaults, options);
	this.$element.find('button').on('click', $.proxy(this.buttonclicked, this));
	this.$input = this.$element.find('input').on('keydown', $.proxy(this.keypress, this));
	this.$input = this.$element.find('input').on('keyup', $.proxy(this.keypressed, this));
	this.$icon = this.$element.find('i');
	this.activeSearch = '';
};

Search.prototype = {

	constructor: Search,

	search: function (searchText) {
		this.$icon.attr('class', 'icon-remove');
		this.activeSearch = searchText;
		this.$element.trigger('searched', searchText);
	},

	clear: function () {
		this.$icon.attr('class', 'icon-search');
		this.activeSearch = '';
		this.$input.val('');
		this.$element.trigger('cleared');
	},

	action: function () {
		var val = this.$input.val();
		var inputEmptyOrUnchanged = val === '' || val === this.activeSearch;

		if (this.activeSearch && inputEmptyOrUnchanged) {
			this.clear();
		} else if (val) {
			this.search(val);
		}
	},

	buttonclicked: function (e) {
		e.preventDefault();
		if ($(e.currentTarget).is('.disabled, :disabled')) return;
		this.action();
	},

	keypress: function (e) {
		if (e.which === 13) {
			e.preventDefault();
		}
	},

	keypressed: function (e) {
		var val, inputPresentAndUnchanged;

		if (e.which === 13) {
			e.preventDefault();
			this.action();
		} else {
			val = this.$input.val();
			inputPresentAndUnchanged = val && (val === this.activeSearch);
			this.$icon.attr('class', inputPresentAndUnchanged ? 'icon-remove' : 'icon-search');
		}
	}

};


// SEARCH PLUGIN DEFINITION

$.fn.search = function (option) {
	return this.each(function () {
		var $this = $(this);
		var data = $this.data('search');
		var options = typeof option === 'object' && option;

		if (!data) $this.data('search', (data = new Search(this, options)));
		if (typeof option === 'string') data[option]();
	});
};

$.fn.search.defaults = {};

$.fn.search.Constructor = Search;


// SEARCH DATA-API

$(function () {
	$('body').on('mousedown.search.data-api', '.search', function () {
		var $this = $(this);
		if ($this.data('search')) return;
		$this.search($this.data());
	});
});
/*
 * Fuel UX Spinner
 * https://github.com/ExactTarget/fuelux
 *
 * Copyright (c) 2012 ExactTarget
 * Licensed under the MIT license.
 */

// SPINNER CONSTRUCTOR AND PROTOTYPE

var Spinner = function (element, options) {
	this.$element = $(element);
	this.options = $.extend({}, $.fn.spinner.defaults, options);
	this.$input = this.$element.find('.spinner-input');
	this.$element.on('keyup', this.$input, $.proxy(this.change, this));

	if (this.options.hold) {
		this.$element.on('mousedown', '.spinner-up', $.proxy(function() { this.startSpin(true); } , this));
		this.$element.on('mouseup', '.spinner-up, .spinner-down', $.proxy(this.stopSpin, this));
		this.$element.on('mouseout', '.spinner-up, .spinner-down', $.proxy(this.stopSpin, this));
		this.$element.on('mousedown', '.spinner-down', $.proxy(function() {this.startSpin(false);} , this));
	} else {
		this.$element.on('click', '.spinner-up', $.proxy(function() { this.step(true); } , this));
		this.$element.on('click', '.spinner-down', $.proxy(function() { this.step(false); }, this));
	}

	this.switches = {
		count: 1,
		enabled: true
	};

	if (this.options.speed === 'medium') {
		this.switches.speed = 300;
	} else if (this.options.speed === 'fast') {
		this.switches.speed = 100;
	} else {
		this.switches.speed = 500;
	}

	this.render();

	if (this.options.disabled) {
		this.disable();
	}
};

Spinner.prototype = {
	constructor: Spinner,

	render: function () {
		this.$input.val(this.options.value);
		this.$input.attr('maxlength',(this.options.max + '').split('').length);
	},

	change: function () {
		var newVal = this.$input.val();

		if(newVal/1){
			this.options.value = newVal/1;
		}else{
			newVal = newVal.replace(/[^0-9]/g,'');
			this.$input.val(newVal);
			this.options.value = newVal/1;
		}

		this.$element.trigger('change');
	},

	stopSpin: function () {
		clearTimeout(this.switches.timeout);
		this.switches.count = 1;
		this.$element.trigger('change');
	},

	startSpin: function (type) {

		if (!this.options.disabled) {
			var divisor = this.switches.count;

			if (divisor === 1) {
				this.step(type);
				divisor = 1;
			} else if (divisor < 3){
				divisor = 1.5;
			} else if (divisor < 8){
				divisor = 2.5;
			} else {
				divisor = 4;
			}

			this.switches.timeout = setTimeout($.proxy(function() {this.iterator(type);} ,this),this.switches.speed/divisor);
			this.switches.count++;
		}
	},

	iterator: function (type) {
		this.step(type);
		this.startSpin(type);
	},

	step: function (dir) {
		var curValue = this.options.value;
		var limValue = dir ? this.options.max : this.options.min;

		if ((dir ? curValue < limValue : curValue > limValue)) {
			var newVal = curValue + (dir ? 1 : -1) * this.options.step;

			if (dir ? newVal > limValue : newVal < limValue) {
				this.value(limValue);
			} else {
				this.value(newVal);
			}
		}
	},

	value: function (value) {
		if (typeof value !== 'undefined') {
			this.options.value = value;
			this.$input.val(value);
			return this;
		} else {
			return this.options.value;
		}
	},

	disable: function () {
		this.options.disabled = true;
		this.$input.attr('disabled','');
		this.$element.find('button').addClass('disabled');
	},

	enable: function () {
		this.options.disabled = false;
		this.$input.removeAttr("disabled");
		this.$element.find('button').removeClass('disabled');
	}
};


// SPINNER PLUGIN DEFINITION

$.fn.spinner = function (option,value) {
	var methodReturn;

	var $set = this.each(function () {
		var $this = $(this);
		var data = $this.data('spinner');
		var options = typeof option === 'object' && option;

		if (!data) $this.data('spinner', (data = new Spinner(this, options)));
		if (typeof option === 'string') methodReturn = data[option](value);
	});

	return (methodReturn === undefined) ? $set : methodReturn;
};

$.fn.spinner.defaults = {
	value: 1,
	min: 1,
	max: 999,
	step: 1,
	hold: true,
	speed: 'medium',
	disabled: false
};

$.fn.spinner.Constructor = Spinner;


// SPINNER DATA-API

$(function () {
	$('body').on('mousedown.spinner.data-api', '.spinner', function (e) {
		var $this = $(this);
		if ($this.data('.spinner')) return;
		$this.spinner($this.data());
	});
});