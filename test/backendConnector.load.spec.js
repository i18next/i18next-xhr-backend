import 'babel-polyfill';
import i18next from 'i18next';
import XHR from '../src/';

i18next.init();

describe('BackendConnector basic load', () => {
  let connector;

  before(() => {
    connector = i18next.services.backendConnector;
    connector.backend = new XHR(i18next.services, {
      loadPath: 'http://localhost:9876/locales/{{lng}}/{{ns}}.json',
    });
  });

  describe('#load', () => {
    it('should load data', done => {
      connector.load(['en'], ['test'], function(err) {
        expect(err).to.be.not.ok;
        expect(connector.store.getResourceBundle('en', 'test')).to.eql({
          key: 'passing',
        });
        done();
      });
    });
  });
});
