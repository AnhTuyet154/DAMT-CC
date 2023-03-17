﻿(function (c) {
    function g(b, a) {
        this.element = b; this.options = c.extend({}, h, a); c(this.element).data("max-height", this.options.maxHeight); c(this.element).data("height-margin", this.options.heightMargin); delete this.options.maxHeight; if (this.options.embedCSS && !k) {
            var d = ".readmore-js-toggle, .readmore-js-section { " + this.options.sectionCSS + " } .readmore-js-section { overflow: hidden; }", e = document.createElement("style"); e.type = "text/css"; e.styleSheet ? e.styleSheet.cssText = d : e.appendChild(document.createTextNode(d));
            document.getElementsByTagName("head")[0].appendChild(e); k = !0
        } this._defaults = h; this._name = f; this.init()
    } var f = "readmore", h = { speed: 100, maxHeight: 200, heightMargin: 16, moreLink: '<a href="#">Read More</a>', lessLink: '<a href="#">Close</a>', embedCSS: !0, sectionCSS: "display: block; width: 100%;", startOpen: !1, expandedClass: "readmore-js-expanded", collapsedClass: "readmore-js-collapsed", beforeToggle: function () { }, afterToggle: function () { } }, k = !1; g.prototype = {
        init: function () {
            var b = this; c(this.element).each(function () {
                var a =
                    c(this), d = a.css("max-height").replace(/[^-\d\.]/g, "") > a.data("max-height") ? a.css("max-height").replace(/[^-\d\.]/g, "") : a.data("max-height"), e = a.data("height-margin"); "none" != a.css("max-height") && a.css("max-height", "none"); b.setBoxHeight(a); if (a.outerHeight(!0) <= d + e) return !0; a.addClass("readmore-js-section " + b.options.collapsedClass).data("collapsedHeight", d); a.after(c(b.options.startOpen ? b.options.lessLink : b.options.moreLink).on("click", function (c) { b.toggleSlider(this, a, c) }).addClass("readmore-js-toggle"));
                b.options.startOpen || a.css({ height: d })
            }); c(window).on("resize", function (a) { b.resizeBoxes() })
        }, toggleSlider: function (b, a, d) {
            d.preventDefault(); var e = this; d = newLink = sectionClass = ""; var f = !1; d = c(a).data("collapsedHeight"); c(a).height() <= d ? (d = c(a).data("expandedHeight") + "px", newLink = "lessLink", f = !0, sectionClass = e.options.expandedClass) : (newLink = "moreLink", sectionClass = e.options.collapsedClass); e.options.beforeToggle(b, a, f); c(a).animate({ height: d }, {
                duration: e.options.speed, complete: function () {
                    e.options.afterToggle(b,
                        a, f); c(b).replaceWith(c(e.options[newLink]).on("click", function (b) { e.toggleSlider(this, a, b) }).addClass("readmore-js-toggle")); c(this).removeClass(e.options.collapsedClass + " " + e.options.expandedClass).addClass(sectionClass)
                }
            })
        }, setBoxHeight: function (b) { var a = b.clone().css({ height: "auto", width: b.width(), overflow: "hidden" }).insertAfter(b), c = a.outerHeight(!0); a.remove(); b.data("expandedHeight", c) }, resizeBoxes: function () {
            var b = this; c(".readmore-js-section").each(function () {
                var a = c(this); b.setBoxHeight(a);
                (a.height() > a.data("expandedHeight") || a.hasClass(b.options.expandedClass) && a.height() < a.data("expandedHeight")) && a.css("height", a.data("expandedHeight"))
            })
        }, destroy: function () { var b = this; c(this.element).each(function () { var a = c(this); a.removeClass("readmore-js-section " + b.options.collapsedClass + " " + b.options.expandedClass).css({ "max-height": "", height: "auto" }).next(".readmore-js-toggle").remove(); a.removeData() }) }
    }; c.fn[f] = function (b) {
        var a = arguments; if (void 0 === b || "object" === typeof b) return this.each(function () {
            if (c.data(this,
                "plugin_" + f)) { var a = c.data(this, "plugin_" + f); a.destroy.apply(a) } c.data(this, "plugin_" + f, new g(this, b))
        }); if ("string" === typeof b && "_" !== b[0] && "init" !== b) return this.each(function () { var d = c.data(this, "plugin_" + f); d instanceof g && "function" === typeof d[b] && d[b].apply(d, Array.prototype.slice.call(a, 1)) })
    }
})(jQuery);