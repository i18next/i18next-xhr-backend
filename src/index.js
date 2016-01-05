import * as utils from './utils';

// https://gist.github.com/Xeoncross/7663273
function ajax(url, options, callback, data, cache) {
  // Must encode data
  if(data && typeof data === 'object') {
    var y = '', e = encodeURIComponent;
    for (var m in data) {
      y += '&' + e(m) + '=' + e(data[m]);
    }
    data = y.slice(1) + (!cache ? '&_t=' + new Date : '');
  }

  try {
    var x = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
    x.open(data ? 'POST' : 'GET', url, 1);
    if (!options.crossDomain) {
      x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
    x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    x.onreadystatechange = function() {
      x.readyState > 3 && callback && callback(x.responseText, x);
    };
    x.send(data);
  } catch (e) {
    window.console && console.log(e);
  }
};

// ajax.uriEncode = function(o) {
//     var x, y = '', e = encodeURIComponent;
//     for (x in o) y += '&' + e(x) + '=' + e(o[x]);
//     return y.slice(1);
// };
//
// ajax.collect = (a, f) {
//     var n = [];
//     for (var i = 0; i < a.length; i++) {
//         var v = f(a[i]);
//         if (v != null) n.push(v);
//     }
//     return n;
// };
//
// ajax.serialize = function (f) {
//     function g(n) {
//         return f.getElementsByTagName(n);
//     };
//     var nv = function (e) {
//         if (e.name) return encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value);
//     };
//     var i = collect(g('input'), function (i) {
//         if ((i.type != 'radio' && i.type != 'checkbox') || i.checked) return nv(i);
//     });
//     var s = collect(g('select'), nv);
//     var t = collect(g('textarea'), nv);
//     return i.concat(s).concat(t).join('&');
// };
//

function getDefaults() {
  return {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    addPath: 'locales/add/{{lng}}/{{ns}}',
    allowMultiLoading: false,
    parse: JSON.parse,
    crossDomain: false
  };
}

class Backend {
  constructor(services, options = {}) {
    this.init(services, options);

    this.type = 'backend';
  }

  init(services, options = {}) {
    this.services = services;
    this.options = utils.defaults(options, this.options || {}, getDefaults());
  }

  readMulti(languages, namespaces, callback) {
    let url = this.services.interpolator.interpolate(this.options.loadPath, { lng: languages.join('+'), ns: namespaces.join('+') });

    this.loadUrl(url, callback);
  }

  read(language, namespace, callback) {
    let url = this.services.interpolator.interpolate(this.options.loadPath, { lng: language, ns: namespace });

    this.loadUrl(url, callback);
  }

  loadUrl(url, callback) {
    ajax(url, this.options, (data, xhr) => {
      const statusCode = xhr.status.toString();
      if (statusCode.indexOf('5') === 0) return callback('failed loading ' + url, true /* retry */);
      if (statusCode.indexOf('4') === 0) return callback('failed loading ' + url, false /* no retry */);

      let ret, err;
      try {
        ret = this.options.parse(data);
      } catch (e) {
        err = 'failed parsing ' + url + ' to json';
      }
      if (err) return callback(err, false);
      callback(null, ret);
    });
  }

  create(languages, namespace, key, fallbackValue) {
    if (typeof languages === 'string') languages = [languages];

    let payload = {};
    payload[key] = fallbackValue || '';

    languages.forEach(lng => {
      let url = this.services.interpolator.interpolate(this.options.addPath, { lng: lng, ns: namespace });

      ajax(url, this.options, function(data, xhr) {
        //const statusCode = xhr.status.toString();
        // TODO: if statusCode === 4xx do log
      }, payload);
    });
  }
}

Backend.type = 'backend';


export default Backend;
