import XHR, { AjaxRequestCallback, BackendOptions } from 'i18next-xhr-backend';
import i18n, { ResourceKey } from 'i18next';

const options: BackendOptions = {
  loadPath: '/locales/{{lng}}/{{ns}}.json',
  addPath: 'locales/add/{{lng}}/{{ns}}',
  allowMultiLoading: false,
  parse: (data: string) => data.replace(/a/g, ''),
  crossDomain: false,
  withCredentials: false,
  ajax: (url: string, options: BackendOptions, callback: AjaxRequestCallback, data: {}) => {},
  queryStringParams: { v: '1.3.5' },
};

const xhr = new XHR();
xhr.init(options);
const xhr2 = new XHR(null, options);
const type: string = xhr.type;
const newOptions: BackendOptions = xhr.options;
xhr.create('en', 'ns', 'key', 'value');
xhr.create(['en', 'us'], 'ns', 'key', 'value');
xhr.read('en', 'ns', (err: Error | null | undefined, data: ResourceKey) => {});
xhr.readMulti(['en'], ['ns'], (err: Error | null | undefined, data: ResourceKey) => {});
xhr.loadUrl('someurl', (err: Error | null | undefined, data: ResourceKey) => {});

// instance
i18n.use(xhr);

// class
i18n.use(XHR);
