import {createActions} from 'reflux';
import Api from '../utils/Api';

var FaceActions = createActions({
  'fetchAll': {children: ['completed', 'failed']},
  'search': {}
});

FaceActions.fetchAll.listen(function() {
  Api.get('/employees')
    .then(function (response) {
      this.completed(response.data);
    }.bind(this));
});

export default FaceActions;
