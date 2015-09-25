import FaceStore from '../../src/js/stores/FaceStore';
import FakePromise from '../support/FakePromise';
import Api from '../../src/js/utils/Api';

describe('FaceStore', () => {
  let whitney, danny, markM, markD;

  describe('#fetchAll', () => {
    it('makes a request to Api', () => {
      let fakePromise = new FakePromise();
      spyOn(Api, 'get').and.returnValue(fakePromise);
      spyOn(FaceStore, 'trigger');

      FaceStore.fetchAll();

      expect(Api.get).toHaveBeenCalledWith('/employees');

      let faces = [{name: 'Danny'}];
      fakePromise.resolve({data: faces});

      expect(FaceStore.faces).toEqual(faces);
      expect(FaceStore.trigger).toHaveBeenCalledWith(faces);
    });
  });

  describe('#search', () => {
    beforeEach(() => {
      whitney = {firstName: 'Whitney', lastName: 'Schaefer'};
      danny = {firstName: 'Danny', lastName: 'Burkes'};
      markM = {firstName: 'Mark', lastName: 'Macdonals'};
      markD = {firstName: 'Mark', lastName: 'Dellilo'};

      FaceStore.faces = [danny, whitney, markM, markD];
    });

    it('filters faces by first name', () => {
      spyOn(FaceStore, 'trigger');

      FaceStore.search('Danny');

      expect(FaceStore.trigger).toHaveBeenCalledWith([danny]);
    });

    it('filters faces by first name', () => {
      spyOn(FaceStore, 'trigger');

      FaceStore.search('Dan');

      expect(FaceStore.trigger).toHaveBeenCalledWith([danny]);
    });

    it('filters by last name', () => {
      spyOn(FaceStore, 'trigger');

      FaceStore.search('Schaefer');

      expect(FaceStore.trigger).toHaveBeenCalledWith([whitney]);
    });

    it('is case insensitive', () => {
      spyOn(FaceStore, 'trigger');

      FaceStore.search('danny');

      expect(FaceStore.trigger).toHaveBeenCalledWith([danny]);
    });

    it('returns everyone if search is a empty string', () => {
      spyOn(FaceStore, 'trigger');

      FaceStore.search('');

      expect(FaceStore.trigger).toHaveBeenCalledWith([danny, whitney, markM, markD]);
    });

    it('returns everyone if search is undefined', () => {
      spyOn(FaceStore, 'trigger');

      FaceStore.search(undefined);

      expect(FaceStore.trigger).toHaveBeenCalledWith([danny, whitney, markM, markD]);
    });

    it('returns multiple pivots if search matches multiple names', () => {
      spyOn(FaceStore, 'trigger');

      FaceStore.search('Mark');

      expect(FaceStore.trigger).toHaveBeenCalledWith([markM, markD]);
    });
  });
});
