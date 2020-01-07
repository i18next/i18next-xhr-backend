function addQueryString(url, params) {
  if (params && typeof params === 'object') {
    let queryString = '',
      e = encodeURIComponent;

    // Must encode data
    for (let paramName in params) {
      queryString += '&' + e(paramName) + '=' + e(params[paramName]);
    }

    if(!queryString) {
      return url;
    }

    url = url + (url.indexOf('?') !== -1 ? '&' : '?') + queryString.slice(1);
  }

  return url
}


// https://gist.github.com/Xeoncross/7663273
function ajax(url, options, callback, data, cache) {

  if (data && typeof data === 'object') {
    if (!cache) {
      data['_t'] = new Date();
    }
    // URL encoded form data must be in querystring format
    data = addQueryString('', data).slice(1);
  }

  if (options.queryStringParams) {
    url = addQueryString(url, options.queryStringParams);
  }

  if (typeof fetch !== "undefined") {
    // use fetch (newer api)
    var opts = {
      'headers': {},
    };
    if (data) {
      opts.method = 'POST';
      opts.body = data;
    }
    if (!options.crossDomain) {
      opts.mode = 'cors';
    }
    if (!!options.withCredentials) {
      opts.credentials = 'include';
    }
    if (data) {
      opts.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    var h = options.customHeaders;
    h = typeof h === 'function' ? h() : h;
    if (h) {
      for (var i in h) {
        var p = h.indexOf(':');
	if (p > 0) opts.headers[p.substr(0, p)] = p.substr(p+1).trim();
      }
    }

    fetch(url, opts).then(function(res) {
      if (callback) {
        res.text().then(function(txt) { callback(txt, res); });
      }
    });
    return;
  }

  try {
    var x
    if (XMLHttpRequest) {
      x = new XMLHttpRequest();
    } else {
      x = new ActiveXObject('MSXML2.XMLHTTP.3.0');
    }
    x.open(data ? 'POST' : 'GET', url, 1);
    if (!options.crossDomain) {
      x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
    x.withCredentials = !!options.withCredentials;
    if (data) {
      x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    if (x.overrideMimeType) {
      x.overrideMimeType("application/json");
    }
    var h = options.customHeaders;
    h = typeof h === 'function' ? h() : h;
    if (h) {
      for (var i in h) {
        x.setRequestHeader(i, h[i]);
      }
    }
    x.onreadystatechange = function() {
      x.readyState > 3 && callback && callback(x.responseText, x);
    };
    x.send(data);
  } catch (e) {
    console && console.log(e);
  }
}

export default ajax;
