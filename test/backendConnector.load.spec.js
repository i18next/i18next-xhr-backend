import i18next from 'i18next';
import XHR from '../src/';

describe('BackendConnector basic load', () => {
  let connector;

  before(() => {
    connector = new i18next.services.backendConnector(
      new XHR(),
      i18next.services.resourceStore,
      {
        interpolator: i18next.services.interpolator,
      },
      {
        backend: {
          loadPath: 'http://localhost:9876/locales/{{lng}}/{{ns}}.json',
        },
      },
    );
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
