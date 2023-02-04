import _ from 'lodash';
import voucherSchema from '../schema/index.js';
import nanoId from '../../../config/nanoid.js';
import ODM from '../../../config/ODM.js'



class VoucherModel extends ODM {
    constructor() {
        super()
        this.COLLECTION = voucherSchema;
    }
}
export default VoucherModel;