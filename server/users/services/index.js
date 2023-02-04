import Users from '../models/usersModel.js'
import _ from 'lodash';
import contact from '../../../lib/email/mandrill.js';
class usersService {
  async getUsers(filter, projection = []) {
    return Users.findIn(filter, projection);
  }

  async mailUserList(userList, mailObject) {
    let mails = Object.keys(userList);
    await contact({
      to: mails,
      subject: mailObject.title,
      HTML: `<H1>
      ${mailObject.title}
      </H1>
      <p>
      ${mailObject.content}
      </p>
      `
    })
    return true;
  }

  async getUserByFilter(filter, projection) {
    const data = await Users.findOne(filter, projection);
    if (_.isEmpty(data)) {
      return { status: 404, data: { data: {}, message: 'user not Found!', success: false } };
    }
    return { status: 200, data: { data, success: true } };
  }

  async getAllUsers(options) {
    const users = await Users.findIn({ isFullyCreated: true }, options);
    return users;
  }

}

export default new usersService();