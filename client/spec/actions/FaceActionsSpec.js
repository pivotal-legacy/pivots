import FaceActions from '../../src/js/actions/FaceActions';
import FakePromise from '../support/FakePromise';
import Api from '../../src/js/utils/Api';
import {createStore} from 'reflux';

describe('FaceAction', () => {
  describe('#fetchAll', () => {
    beforeEach(() => {
      FaceActions.fetchAll.sync = true;
      FaceActions.fetchAll.completed.sync = true;
    });

    afterEach(() => {
      FaceActions.fetchAll.sync = false;
      FaceActions.fetchAll.completed.sync = false;
    });

    it('makes an api request', () => {
      let fetchAllCompletedSpy = jasmine.createSpy('fetchAllCompleted');
      createStore({
        listenables: [FaceActions],
        fetchAllCompleted: fetchAllCompletedSpy
      });

      let pivots = ['list of pivots'];

      let fakePromise = new FakePromise();
      spyOn(Api, 'get').and.returnValue(fakePromise);

      FaceActions.fetchAll();
      fakePromise.resolve({data: pivots});

      expect(Api.get).toHaveBeenCalledWith('/employees');
      expect(fetchAllCompletedSpy).toHaveBeenCalledWith(pivots);
    });
  });
});
