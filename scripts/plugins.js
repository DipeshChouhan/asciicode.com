(function (n) {
  var e = ["scrollToPlugin", "responsiveTablePlugin", "filterDataPlugin"];
  function t(n) {
    (this.plugins = n || e), (this.customPlugins = {});
  }
  t.prototype.use = {};
  var a = t.prototype.use;
  (t.prototype.addPlugin = function (n, e) {
    (this.customPlugins[n] = e), this.plugins.push("c-" + n);
  }),
    (t.prototype.deletePlugin = function (n) {
      a.hasOwnProperty(n)
        ? delete a[n]
        : this.customPlugins.hasOwnProperty(n)
        ? delete this.customPlugins[n]
        : console.log(n + " is not a plugin.");
    });
  var l = {
    scrollToPlugin: function () {
      n.document
        .querySelector(".page-contents")
        .addEventListener("click", function (e) {
          if ("a" === e.target.tagName.toLowerCase()) {
            var t = n.document.getElementById("id_" + e.target.className);
            setTimeout(function () {
              n.scrollTo(0, t.offsetTop - 90);
            }, 100);
          }
        });
    },
    responsiveTablePlugin: function (n, e, t) {
      var a,
        l = document.querySelectorAll("tbody"),
        s = function (t, a) {
          for (
            var l,
              s,
              i,
              r = t.children,
              o = '<td colspan=8 class="align-left">',
              c = 0;
            c < a.length;
            c++
          )
            for (var u = Object.keys(e).length + 1; u < r.length; u++)
              "" != r[u].className &&
                null != e[a[c]].match(r[u].className) &&
                "" != r[u].textContent &&
                (console.log(e[a[c]].match(r[u].className)),
                (o +=
                  ((l = n[r[u].className]),
                  (s = r[u].textContent),
                  (i = void 0),
                  (i = "<p>"),
                  s.match("&") && (s = "&amp" + s.substring(1)),
                  (i += `<span style="font-weight:bold">${l}</span>:${s}</p>`))));
          return console.log(o), o + "</td>";
        },
        i = [];
      l.forEach(function (n, e) {
        n.addEventListener("click", function (n) {
          !(function (n, e) {
            n.preventDefault();
            var r = n.target.classList,
              o = n.target.parentElement.parentElement.parentElement;
            if (
              (r.contains("fas") &&
                (o =
                  n.target.parentElement.parentElement.parentElement
                    .parentElement),
              r.contains("fas") || r.contains("svg-inline--fa"))
            ) {
              a = o.firstElementChild;
              var c = document.createElement("tr");
              r.contains("fa-plus-square")
                ? ((a.innerHTML =
                    '\n      <a href="javascript:void(0);" class="text-primary"><svg class="svg-inline--fa fa-minus-square fa-w-14 text-danger" aria-hidden="true" data-prefix="fa" data-icon="minus-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path class = "fas fa-minus-square" fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM92 296c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h264c6.6 0 12 5.4 12 12v56c0 6.6-5.4 12-12 12H92z"></path></svg>\x3c!-- <i class="fa fa-plus-square"></i> --\x3e</a>\n      '),
                  (c.innerHTML = s(o, t())),
                  l[e].insertBefore(c, o.nextElementSibling),
                  i.push(o))
                : ((a.innerHTML =
                    '<a href="#" class="text-primary">\n      <svg\n        class="svg-inline--fa fa-plus-square fa-w-14"\n        aria-hidden="true"\n        data-prefix="fa"\n        data-icon="plus-square"\n        role="img"\n        xmlns="http://www.w3.org/2000/svg"\n        viewBox="0 0 448 512"\n        data-fa-i2svg=""\n      >\n        <path\n        class="fas fa-plus-square"\n          fill="currentColor"\n          d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"\n        ></path>\n      </svg>\n    </a>'),
                  o.nextElementSibling.remove(),
                  i.splice(i.indexOf(o), 1));
            }
          })(n, e);
        });
      });
      return function (n) {
        if (n) {
          for (var e = 0; e < i.length; e++)
            i[e].nextElementSibling.remove(),
              i[e].children[0].children[0].children[0],
              (a.innerHTML =
                '<a href="#" class="text-primary">\n          <svg\n            class="svg-inline--fa fa-plus-square fa-w-14"\n            aria-hidden="true"\n            data-prefix="fa"\n            data-icon="plus-square"\n            role="img"\n            xmlns="http://www.w3.org/2000/svg"\n            viewBox="0 0 448 512"\n            data-fa-i2svg=""\n          >\n            <path\n            class="fas"\n              fill="currentColor"\n              d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"\n            ></path>\n          </svg>\n        </a>');
          return (i = []), void (a = "");
        }
        for (e = 0; e < i.length; e++)
          i[e].nextElementSibling.innerHTML = s(i[e], t());
      };
    },
    filterDataPlugin: function (n) {
      var e = document.getElementById("filter-input"),
        t = document.getElementById("filter-continent"),
        a = document.getElementById("filter-reset-btn");
      n(t.value, e.value, !1),
        e.addEventListener("keyup", function (e) {
          n(t.value, e.target.value, !1);
        }),
        (t.onchange = function (t) {
          n(t.target.value, e.value, !1);
        }),
        a.addEventListener("click", function (a) {
          n(t, e, !0);
        });
    },
  };
  t.prototype.addSupportForPlugin = function (n) {
    a.hasOwnProperty(n)
      ? console.log(n + " has already available for use")
      : e.indexOf(n) > 0
      ? ((a[n] = l[n]), this.plugins.push(n))
      : console.log(n + " is not available. But you can create custom one");
  };
  n.PluginFactory = function (n) {
    for (var e = 0; e < n.length; e++) {
      var s = n[e];
      l.hasOwnProperty(s) ? (a[s] = l[s]) : console.log(s + " not available");
    }
    return new t(n);
  };
})(window);
