(function (w) {
    var init = function ($) {
        $.fn.scrollIntoView = function () {
            console.warn('$.fn.scrollIntoView must be called after document is ready');
            return this;
        };

        $(function () {
            var $window = $(w);
            var $animateEl = $('html, body');
            var defaults = {
                padding: 0,
                offsetTop: 0
            };

            /**
             * @external "jQuery.fn"
             * @see {@link http://learn.jquery.com/plugins/|jQuery Plugins}
             */

            /**
             * Scroll element into view
             * @see {@link https://github.com/jomaxx/jquery-scrollintoview}
             * @function external:"jQuery.fn".scrollIntoView
             * @author Josef Blake <jo.maxx.blake@gmail.com>
             * @version 0.0.1
             * @license MIT
             * @copyright Copyright (c) 2015 Josef Maxx Blake
             * @param {Object} options defaults: { padding: 0, offsetTop: 0 }
             * @param {Object} animateOptions   {@link http://api.jquery.com/animate/#animate-properties-options}
             * @example
             * $('.test').scrollIntoView({
             *     padding: 8
             * });
             */
            $.fn.scrollIntoView = function (_options, animateOptions) {
                var options = $.extend({}, defaults, _options);
                var offset = this.offset();
                var animate = {};

                var height = this.outerHeight();
                var width = this.outerWidth();
                var top = offset.top;
                var left = offset.left;
                var bottom = top + height;
                var right = left + width;

                var winHeight = $window.outerHeight() - options.offsetTop;
                var winWidth = $window.outerWidth();
                var winTop = $window.scrollTop() + options.offsetTop;
                var winLeft = $window.scrollLeft();
                var winBottom = winTop + winHeight;
                var winRight = winLeft + winWidth;

                if (height < winHeight && bottom > winBottom) {
                    animate.scrollTop = winTop - options.offsetTop - winBottom + bottom + options.padding;
                } else if (top < winTop || top > winBottom || bottom > winBottom) {
                    animate.scrollTop = top - options.padding - options.offsetTop;
                }

                if (width < winWidth && right > winRight) {
                    animate.scrollLeft = winLeft - winRight + right + options.padding;
                } else if (left < winLeft || left > winRight || right > winRight) {
                    animate.scrollLeft = left - options.padding;
                }

                $animateEl.animate(animate, animateOptions);

                return this;
            };
        });
    };

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], init);
    } else {
        init(w.jQuery);
    }
})(typeof window !== 'undefined' ? window : this);
