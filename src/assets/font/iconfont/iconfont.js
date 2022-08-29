!(function (e) {
  var t,
    n,
    o,
    i,
    c,
    d =
      '<svg><symbol id="icon-shouji" viewBox="0 0 1024 1024"><path d="M798.723234 174.782745c0-60.576657-49.106418-109.683075-109.683075-109.683075l-354.708628 0c-60.576657 0-109.683075 49.106418-109.683075 109.683075l0 673.980161c0 60.576657 49.106418 109.683075 109.683075 109.683075l354.708628 0c60.576657 0 109.683075-49.106418 109.683075-109.683075L798.723234 174.782745zM264.557398 237.015112l494.256894 0 0 529.049305-494.256894 0L264.557398 237.015112zM334.356091 105.008612 689.016623 105.008612c38.548968 0 69.798692 31.249725 69.798692 69.798692l0 22.298865-494.256894 0 0-22.298865C264.557398 136.25936 295.807123 105.008612 334.356091 105.008612zM689.016623 918.53704 334.356091 918.53704c-38.548968 0-69.798692-31.249725-69.798692-69.798692l0-43.788296 494.256894 0 0 43.788296C758.814292 887.287315 727.564567 918.53704 689.016623 918.53704z"  ></path><path d="M513.173732 829.943282c-16.70752 0-30.30112 13.5936-30.30112 30.30112 0 16.70752 13.5936 30.30112 30.30112 30.30112s30.299073-13.5936 30.299073-30.30112C543.472805 843.536882 529.881253 829.943282 513.173732 829.943282z"  ></path></symbol><symbol id="icon-zhanghao" viewBox="0 0 1024 1024"><path d="M391.136179 588.720987C191.832264 588.720987 42.993669 717.867879 42.993669 905.407919v20.203177C42.993669 1023.643389 202.487948 1023.643389 404.434473 1023.643389h214.477609c193.93345 0 361.440804 0 361.440805-98.032293v-20.203177c0-187.54004-148.838595-316.686931-348.142511-316.686932H391.136179z m109.796169-49.357128c157.874615 0 286.339543-120.87808 286.339543-269.546185 0-148.582859-128.464927-269.460939-286.339543-269.460939-157.78937 0-286.254297 120.87808-286.254297 269.460939 0 148.668104 128.464927 269.546185 286.254297 269.546185z"  ></path></symbol></svg>',
    l = (l = document.getElementsByTagName('script'))[
      l.length - 1
    ].getAttribute('data-injectcss'),
    a = function (e, t) {
      t.parentNode.insertBefore(e, t)
    }
  if (l && !e.__iconfont__svg__cssinject__) {
    e.__iconfont__svg__cssinject__ = !0
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      )
    } catch (e) {
      console && console.log(e)
    }
  }
  function s() {
    c || ((c = !0), o())
  }
  function r() {
    try {
      i.documentElement.doScroll('left')
    } catch (e) {
      return void setTimeout(r, 50)
    }
    s()
  }
  ;(t = function () {
    var e,
      t = document.createElement('div')
    ;(t.innerHTML = d),
      (d = null),
      (t = t.getElementsByTagName('svg')[0]) &&
        (t.setAttribute('aria-hidden', 'true'),
        (t.style.position = 'absolute'),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = 'hidden'),
        (t = t),
        (e = document.body).firstChild ? a(t, e.firstChild) : e.appendChild(t))
  }),
    document.addEventListener
      ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
        ? setTimeout(t, 0)
        : ((n = function () {
            document.removeEventListener('DOMContentLoaded', n, !1), t()
          }),
          document.addEventListener('DOMContentLoaded', n, !1))
      : document.attachEvent &&
        ((o = t),
        (i = e.document),
        (c = !1),
        r(),
        (i.onreadystatechange = function () {
          'complete' == i.readyState && ((i.onreadystatechange = null), s())
        }))
})(window)
