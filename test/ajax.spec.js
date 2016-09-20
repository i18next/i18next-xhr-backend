import ajax from '../src/ajax';

describe('ajax', () => {
  it('it should call callback with xhr', (done) => {
    ajax('url', {}, (response, xhr) => {
      expect(xhr).to.be.an.instanceOf(XMLHttpRequest);
      expect(response).to.be.a('string');
      done();
    });
  });
});
