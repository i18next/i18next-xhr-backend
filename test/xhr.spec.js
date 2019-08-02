import XHR from '../src/';
import i18next from 'i18next';
import JSON5 from 'json5';

describe('XHR backend', () => {
  describe('#read', () => {
    let backend;

    before(() => {
      backend = new XHR(
        {
          interpolator: i18next.services.interpolator,
        },
        {
          loadPath: 'http://localhost:9876/locales/{{lng}}/{{ns}}.json',
        },
      );
    });

    it('should load data', done => {
      backend.read('en', 'test', function(err, data) {
        expect(err).to.be.not.ok;
        expect(data).to.eql({ key: 'passing' });
        done();
      });
    });

    it('should throw error on not existing file', done => {
      backend.read('en', 'notexisting', function(err, data) {
        expect(err).to.equal('failed loading http://localhost:9876/locales/en/notexisting.json');
        done();
      });
    });

    it('should throw error on non json file', done => {
      backend.read('en', 'nonjson', function(err, data) {
        expect(err).to.equal(
          'failed parsing http://localhost:9876/locales/en/nonjson.json to json',
        );
        done();
      });
    });

    it('should load json5 data', done => {
      backend = new XHR(
        {
          interpolator: i18next.services.interpolator,
        },
        {
          loadPath: 'http://localhost:9876/locales/{{lng}}/{{ns}}.json5',
          parse: JSON5.parse,
        },
      );
      backend.read('en', 'test', function(err, data) {
        expect(err).to.be.not.ok;
        expect(data).to.eql({ key: 'passing' });
        done();
      });
    });
  });

  describe('with loadPath function', () => {
    let backend;
    let loadPathSpy = sinon.spy(function(languages, namespaces) {
      return 'http://localhost:9876/locales/' + languages[0] + '/' + namespaces[0] + '.json';
    });

    before(() => {
      backend = new XHR(
        {
          interpolator: i18next.services.interpolator,
        },
        {
          loadPath: loadPathSpy,
        },
      );
    });

    describe('#read', () => {
      it('should load data', done => {
        backend.read('en', 'test', function(err, data) {
          expect(err).to.be.not.ok;
          expect(loadPathSpy.calledWith(['en'], ['test'])).to.be.ok;
          expect(data).to.eql({ key: 'passing' });
          done();
        });
      });
    });
  });
});
