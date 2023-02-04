import _ from 'lodash';
import ODM from '../../../config/ODM.js'
import UsersDb from '../schema/index.js'

class UserModel extends ODM {
  constructor() {
    super()
    this.COLLECTION = UsersDb;
  }
}
export default new UserModel();