import ajax from '../src/ajax';

describe('ajax', () => {
  it('should call callback with xhr', (done) => {
    ajax('url', {}, (response, xhr) => {
      expect(xhr).to.be.an.instanceOf(XMLHttpRequest);
      expect(response).to.be.a('string');
      done();
    });
  });

  it('should not set withCredentials flag on xhr by default', (done) => {
    ajax('url', {}, (response, xhr) => {
      expect(xhr.withCredentials).to.be.false;
      done();
    });
  });

  describe('with option', () => {
    describe('withCredentials', () => {
      it('should set withCredentials flag on xhr', (done) => {
        ajax('url', { withCredentials: true }, (response, xhr) => {
          expect(xhr.withCredentials).to.be.true;
          done();
        });
      });
    });
  });
});
