import _ from 'lodash';
import VoucherSchema from '../schema/index.js';
import ODM from '../../../config/ODM.js'

class VoucherModel extends ODM {
    constructor() {
        super()
        this.COLLECTION = VoucherSchema;
    }
}
export default new VoucherModel();