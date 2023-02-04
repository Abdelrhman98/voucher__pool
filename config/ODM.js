import _ from 'lodash';
class ODM {
    async findOne( selector = {}, options = {}) {
        const { fields } = options;
        return this.COLLECTION.findOne(selector).select(fields).lean();
    }

    async find(user = {}, selector = {}, options = {}) {
        const {
            fields, skip, limit, sort,
        } = options;
        return this.COLLECTION.find(selector)
            .select(fields)
            .skip(skip)
            .limit(limit)
            .sort(sort)
            .lean();
    }

    async count(selector = {}) {
        return this.COLLECTION.countDocuments(selector);
    }

    async updateByQuery(query, newParams, options = {}) {
        return this.COLLECTION.updateMany(query, newParams, {
            ...options,
        });
    }

    async create(params) {
        return this.COLLECTION.create(params);
    }

    async update(_id, newParams, options = {}) {
        return this.COLLECTION.findByIdAndUpdate(_id, newParams, {
            ...options,
            new: true,
        });
    }

    async deleteById(_id) {
        return this.COLLECTION.deleteOne({ _id });
    }

    async deleteByQuery(query) {
        return this.COLLECTION.deleteMany(query);
    }

    async aggregate(pipeline, options = {}) {
        return this.COLLECTION.aggregate(pipeline, (err, result) => { });
    }
}

export default ODM;
