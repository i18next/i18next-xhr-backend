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
  
  if (!cache) {
    if (data && typeof data === 'object') {
      data['_t'] = new Date();
    } else {
      url = addQueryString(url, { '_t': new Date() });
    }
  }

  if (options.queryStringParams) {
    url = addQueryString(url, options.queryStringParams);
  }

  try {
    var x = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
    x.open(data ? 'POST' : 'GET', url, 1);
    if (!options.crossDomain) {
      x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }
    x.withCredentials = !!options.withCredentials;
    if (data) {
      x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    var h = options.customHeaders;
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
