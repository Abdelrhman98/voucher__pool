import _ from 'lodash';
import db from '../../../config/firebase.js';
import nanoId from '../../../config/nanoid.js';
import ODM from '../../../config/ODM.js'

const usersDb = db.collection('users');

class UserModel {
    static async create(payload) {
        const generatedId = await nanoId();
        payload._id = generatedId;
        let newUser = await usersDb.doc(generatedId).set(payload);
        return newUser;
    }

    static async findOne(filter, projection = []) {
        let snapshot = usersDb;
        for (let field of Object.keys(filter)) {
            snapshot = snapshot.where(field, '==', filter[field])//.where('')
        }
        if (!_.isEmpty(projection))
            snapshot = snapshot.select(...projection);
        snapshot = await snapshot.get()
        return snapshot.docs.map(doc => doc.data())[0]
    }

    static async update(_id, $newParams) {
        let snapshot = usersDb;
        return snapshot.doc(_id).update($newParams);
    }
}
export default UserModel;