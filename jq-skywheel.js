(function ($) {
    'use strict';
    jQuery.fn.skywheel =  function (options) {
        var opt = $.extend({}, $.fn.skywheel.defaults, options);
        var sheet = (function() {
            var style = document.createElement("style");
            document.head.appendChild(style);
            return style.sheet;
        })();
        sheet.insertRule(".jq_skywheel li{height:"+opt.sizey+";width:"+opt.sizex+";line-height:"+opt.sizey+";}",sheet.cssRules.length);
        this.addClass("jq_skywheel");
        this.children().each(function (index, el) {
            $(el).contents().wrap("<span class='inner'></span>");
        });
        var lilist = this.children(),
            lilen = lilist.length,
            i,
            that = this,
            adjust = function adjust(index) {
                var i = 0,
                    k = 0,
                    j = 1;
                for (i = 0; i < lilen; i += 1) {
                    $(lilist[i]).removeClass();
                }
                $(lilist[index]).addClass("center");
                for (i = index + 1; i < 3 + index; i += 1) {
                    k = i >= lilen ? i - lilen : i;
                    $(lilist[k]).removeClass();
                    $(lilist[k]).addClass("close" + j);
                    j += 1;
                }
                j = 1;
                for (i = index - 1; i > index - 3; i -= 1) {
                    k = i < 0 ? i + lilen : i;
                    $(lilist[k]).removeClass();
                    $(lilist[k]).addClass("nclose" + j);
                    j += 1;
                }
            },
            keyhandler = function keyhandler(event) {
                var keyCode = event.keyCode,
                    tomove = that.chosen;
                if (keyCode === 38) {
                    tomove = tomove <= 0 ? lilen - 1 : tomove - 1;
                    adjust(tomove);
                    that.chosen = tomove;
                } else if (keyCode === 40) {
                    tomove = tomove >= (lilen - 1) ? 0 : tomove + 1;
                    adjust(tomove);
                    that.chosen = tomove;
                }
            };
        $(document).keypress(keyhandler);
        this.chosen = lilen - 1;
        lilist.each(function (index, el) {
            var helperin = function () {
                },
                helperout = function () {
                },
                helperclick = function () {
                    this.chosen = index;
                    if ($(el).hasClass("center")) {
                        for (i = 0; i < lilen; i += 1) {
                            $(lilist[i]).removeClass();
                        }
                        $(el).addClass("chosen");
                        return;
                    }
                    adjust(index);
                };
            $(el).on("click", helperclick);
            $(el).on("mouseenter", helperin);
            $(el).on("mouseleave", helperout);
        });
    };
    jQuery.fn.skywheel.defaults = {
        type: "normal",
        sizex: "100px",
        sizey: "40px",
    };
}(jQuery));
