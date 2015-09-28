import Authentication from '../../src/js/utils/Authentication';
import LocalStorage from '../../src/js/utils/LocalStorage';

describe('Authentication', () => {
  let noOp = () => {
  };

  it('queries local storage for a token', () => {
    spyOn(LocalStorage, 'get');

    Authentication.requireAuth({location: {pathname: 'some-pathname'}}, noOp);

    expect(LocalStorage.get).toHaveBeenCalledWith('savedJwt');
  });

  it('redirects to login if there is no saved auth token', () => {
    spyOn(LocalStorage, 'get').and.returnValue(null);

    let fakeRedirect = jasmine.createSpy('fake redirect function');

    Authentication.requireAuth({location: {pathname: 'some-pathname'}}, fakeRedirect);

    expect(fakeRedirect).toHaveBeenCalledWith(null, '/login', {nextPathname: 'some-pathname'});
  });
});
