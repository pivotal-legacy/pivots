describe('FaceStore', function () {
  var FaceStore = require('../../src/js/stores/FaceStore');
  var SpecHelper = require('../specHelper');
  var Api = require('../../src/js/utils/Api');
  var whitney, danny, markM, markD;

  describe('#fetchAll', function () {
    it('makes a request to Api', function () {
      var fakePromise = SpecHelper.buildFakePromise();
      spyOn(Api, 'get').and.returnValue(fakePromise);
      spyOn(FaceStore, 'trigger');

      FaceStore.fetchAll();

      expect(Api.get).toHaveBeenCalledWith('/employees');

      var faces = [{name: 'Danny'}];
      fakePromise.resolve({data: faces});

      expect(FaceStore.faces).toEqual(faces);
      expect(FaceStore.trigger).toHaveBeenCalledWith(faces);
    });
  });

  describe('#search', function () {
    beforeEach(function () {
      whitney = {firstName: 'Whitney', lastName: 'Schaefer'};
      danny = {firstName: 'Danny', lastName: 'Burkes'};
      markM = {firstName: 'Mark', lastName: 'Macdonals'};
      markD = {firstName: 'Mark', lastName: 'Dellilo'};

      FaceStore.faces = [danny, whitney, markM, markD];
    });

    it('filters faces by first name', function () {
      spyOn(FaceStore, 'trigger');

      FaceStore.search('Danny');

      expect(FaceStore.trigger).toHaveBeenCalledWith([danny]);
    });

    it('filters faces by first name', function () {
      spyOn(FaceStore, 'trigger');

      FaceStore.search('Dan');

      expect(FaceStore.trigger).toHaveBeenCalledWith([danny]);
    });

    it('filters by last name', function () {
      spyOn(FaceStore, 'trigger');

      FaceStore.search('Schaefer');

      expect(FaceStore.trigger).toHaveBeenCalledWith([whitney]);
    });

    it('is case insensitive', function () {
      spyOn(FaceStore, 'trigger');

      FaceStore.search('danny');

      expect(FaceStore.trigger).toHaveBeenCalledWith([danny]);
    });

    it('returns everyone if search is a empty string', function () {
      spyOn(FaceStore, 'trigger');

      FaceStore.search('');

      expect(FaceStore.trigger).toHaveBeenCalledWith([danny, whitney, markM, markD]);
    });

    it('returns everyone if search is undefined', function () {
      spyOn(FaceStore, 'trigger');

      FaceStore.search(undefined);

      expect(FaceStore.trigger).toHaveBeenCalledWith([danny, whitney, markM, markD]);
    });

    it('returns multiple pivots if search matches multiple names', function () {
      spyOn(FaceStore, 'trigger');

      FaceStore.search('Mark');

      expect(FaceStore.trigger).toHaveBeenCalledWith([markM, markD]);
    });
  });
});
