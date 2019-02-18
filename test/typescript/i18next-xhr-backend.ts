import XHR, { I18NextXhrBackend } from "i18next-xhr-backend";

const options: I18NextXhrBackend.BackendOptions = {
  loadPath: "/locales/{{lng}}/{{ns}}.json",
  addPath: "locales/add/{{lng}}/{{ns}}",
  allowMultiLoading: false,
  parse: (data: string) => data.replace(/a/g, ""),
  crossDomain: false,
  withCredentials: false,
  ajax: (url: string, options: I18NextXhrBackend.BackendOptions, callback: I18NextXhrBackend.AjaxRequestCallback, data: {}) => { },
  queryStringParams: { v: "1.3.5" }
};

const xhr = new XHR();
xhr.init(options);
const xhr2 = new XHR(null, options);
const type: string = xhr.type;
const newOptions: I18NextXhrBackend.BackendOptions = xhr.options;
xhr.create("en", "ns", "key", "value");
xhr.create(["en", "us"], "ns", "key", "value");
xhr.read("en", "ns", (error: any, result: string | false) => { });
xhr.readMulti(["en"], ["ns"], (error: any, result: string | false) => { });
xhr.loadUrl("someurl", (error: any, result: string | false) => { });
