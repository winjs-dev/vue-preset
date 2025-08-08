(function (window) {
  var svgSprite =
    '<svg>' +
    '' +
    '<symbol id="icon-clock" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M821.76 875.712l33.344 33.28c18.688 18.56 37.568 37.056 56 55.936a33.792 33.792 0 0 1-15.36 57.088 33.984 33.984 0 0 1-34.112-10.24l-89.984-89.92c-1.792-1.792-2.88-4.288-3.52-5.312-171.584 97.152-340.864 97.088-511.04 0.768-1.152 1.088-3.072 2.816-4.864 4.672-30.4 30.272-60.544 60.672-91.136 90.752a33.92 33.92 0 0 1-56.96-13.568c-4.096-13.632-0.32-25.408 9.728-35.456l82.56-82.304c1.856-1.792 4.224-3.072 6.4-4.672C88.576 774.144 30.08 648.192 34.944 496c4.224-133.376 57.6-245.888 155.904-336.32C380.608-14.848 678.72-3.84 857.984 183.68a476.8 476.8 0 0 1-36.224 692.032zM102.4 512.32c0 225.024 183.232 408.64 407.872 408.768 227.648 0.128 410.688-181.632 411.072-408.192 0.384-225.856-183.424-409.472-409.472-409.216C285.696 103.936 102.4 286.848 102.4 512.32zM199.872 0.768c5.888 1.152 12.16 1.472 17.728 3.584 14.72 5.44 23.552 21.248 21.12 36.096a33.472 33.472 0 0 1-32.448 29.056c-30.592 0.576-58.624 8.832-83.008 27.52-35.968 27.456-53.888 64.256-55.04 109.312a32.448 32.448 0 0 1-19.52 30.272 32.192 32.192 0 0 1-34.688-3.392 32.512 32.512 0 0 1-13.824-28.608C2.304 132.48 32.896 75.84 92.672 35.2 124.8 13.44 160.832 3.008 199.872 0.768zM1023.744 202.496a34.368 34.368 0 0 1-44.16 36.096 33.984 33.984 0 0 1-24.064-33.024 131.84 131.84 0 0 0-20.416-70.848c-26.88-41.984-65.664-63.36-115.456-65.024-24.576-0.832-40.64-22.912-32.768-45.312a33.536 33.536 0 0 1 33.28-22.592c76.288 2.048 134.72 35.648 174.976 100.288 18.24 29.312 27.072 61.76 28.608 100.416z"  ></path>' +
    '' +
    '<path d="M477.952 409.984c0-33.92-0.128-67.84 0-101.696a33.472 33.472 0 0 1 22.848-32.384 34.176 34.176 0 0 1 37.632 10.88c5.76 7.04 7.744 15.36 7.744 24.32 0 60.032 0 120-0.128 180.032 0 5.12 1.344 8.704 5.056 12.288 40.128 39.808 80.128 79.744 120.064 119.808 15.36 15.36 14.976 38.016-0.448 51.2a33.856 33.856 0 0 1-45.76-1.216c-9.408-8.896-18.368-18.24-27.52-27.392-35.2-35.072-70.272-70.4-105.664-105.216a43.648 43.648 0 0 1-14.016-33.92c0.512-32.256 0.192-64.448 0.192-96.704z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>';
  var script = (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
  var shouldInjectCss = script.getAttribute('data-injectcss');
  var ready = function (fn) {
    if (document.addEventListener) {
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) {
        setTimeout(fn, 0);
      } else {
        var loadFn = function () {
          document.removeEventListener('DOMContentLoaded', loadFn, false);
          fn();
        };
        document.addEventListener('DOMContentLoaded', loadFn, false);
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn);
    }
    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        init = function () {
          if (!done) {
            done = true;
            fn();
          }
        };
      var polling = function () {
        try {
          d.documentElement.doScroll('left');
        } catch (e) {
          setTimeout(polling, 50);
          return;
        }
        init();
      };
      polling();
      d.onreadystatechange = function () {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null;
          init();
        }
      };
    }
  };
  var before = function (el, target) {
    target.parentNode.insertBefore(el, target);
  };
  var prepend = function (el, target) {
    if (target.firstChild) {
      before(el, target.firstChild);
    } else {
      target.appendChild(el);
    }
  };
  function appendSvg() {
    var div, svg;
    div = document.createElement('div');
    div.innerHTML = svgSprite;
    svgSprite = null;
    svg = div.getElementsByTagName('svg')[0];
    if (svg) {
      svg.setAttribute('aria-hidden', 'true');
      svg.style.position = 'absolute';
      svg.style.width = 0;
      svg.style.height = 0;
      svg.style.overflow = 'hidden';
      prepend(svg, document.body);
    }
  }
  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  ready(appendSvg);
})(window);
