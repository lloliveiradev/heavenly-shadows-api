"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firestore = void 0;
const firestore_1 = require("firebase-admin/firestore");
const CustomError_1 = require("../../utils/CustomError");
const dateNow_1 = require("../../utils/dateNow");
class Firestore {
    constructor(db, collection, sub) {
        this.db = db;
        this.collection = collection;
        this.sub = sub;
    }
    async add(data, user) {
        data.created_at = (0, dateNow_1.default)();
        data.created_by = user;
        const { id } = await this.db.collection(this.collection).add(data);
        this.db
            .collection(this.collection)
            .doc(id)
            .set({ rowid: id }, { merge: true });
        return id;
    }
    async set(id, data, user, merge = true) {
        try {
            data.updated_at = (0, dateNow_1.default)();
            data.updated_by = user;
            await this.db
                .collection(this.collection)
                .doc(String(id))
                .set(data, { merge });
        }
        catch (error) {
            throw error;
        }
    }
    async get(id) {
        try {
            const result = await this.db
                .collection(this.collection)
                .doc(String(id))
                .get();
            if (result.exists) {
                const obj = result.data();
                obj.id = result.id;
                return obj;
            }
            else {
                throw new CustomError_1.default({ message: 'Record not found', status: 204 });
            }
        }
        catch (error) {
            throw error;
        }
    }
    async getWhere(options = {}) {
        const { limit, offset, orderBy, filters, startAfter, startAt } = options;
        try {
            let query = this.db.collection(this.collection);
            if (filters?.length) {
                for (const filter of filters) {
                    if (filter.or) {
                        filter.key =
                            typeof filter.key == 'string'
                                ? filter.key.split(',')
                                : Array.isArray(filter.key)
                                    ? filter.key
                                    : '';
                        filter.op =
                            typeof filter.op == 'string'
                                ? filter.op.split(',')
                                : Array.isArray(filter.op)
                                    ? filter.op
                                    : '';
                        filter.val =
                            typeof filter.val == 'string'
                                ? filter.val.split(',')
                                : Array.isArray(filter.val)
                                    ? filter.val
                                    : '';
                        if (!filter.key ||
                            !filter.op ||
                            !filter.val ||
                            filter.key.length != filter.op.length ||
                            filter.key.length != filter.val.length)
                            throw new Error('Invalid query.');
                        const queries = [];
                        await Promise.all((Array.isArray(filter.key) ? filter.key : [filter.key]).map((key, i) => {
                            if (typeof key === 'string') {
                                queries.push(firestore_1.Filter.where(key, filter.op[i], filter.val[i]));
                            }
                        }));
                        query = query.where(firestore_1.Filter.or(...queries));
                    }
                    else {
                        const key = Array.isArray(filter.key)
                            ? filter.key.join('.')
                            : filter.key;
                        query = query.where(key, filter.op, filter.val);
                    }
                }
            }
            if (orderBy) {
                orderBy.forEach((e) => {
                    if (typeof e == 'string') {
                        query = query.orderBy(e);
                    }
                    else if (Array.isArray(e)) {
                        query = query.orderBy(e[0], e[1]);
                    }
                });
            }
            if (startAt) {
                if (typeof startAt == 'string') {
                    query = query.startAt(startAt);
                }
                else if (startAt?.length) {
                    startAt.forEach((e) => {
                        if (e)
                            query = query.startAt(e);
                    });
                }
            }
            if (startAfter) {
                if (typeof startAfter == 'string') {
                    query = query.startAfter(startAfter);
                }
                else if (startAfter?.length) {
                    startAfter.forEach((e) => {
                        if (e)
                            query = query.startAfter(e);
                    });
                }
            }
            if (limit)
                query = query.limit(limit);
            if (offset)
                query = query.offset(offset);
            const result = await query.get();
            if (result.docs.length > 0) {
                const array = [];
                for (const item of result.docs) {
                    const obj = item.data();
                    obj.id = item.id;
                    array.push(obj);
                }
                return array;
            }
            else {
                return [];
            }
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id, user, real = false) {
        try {
            if (real) {
                await this.db.collection(this.collection).doc(String(id)).delete();
            }
            else {
                const obj = {
                    deleted: true,
                    deleted_at: (0, dateNow_1.default)(),
                    deleted_by: user,
                };
                await this.db
                    .collection(this.collection)
                    .doc(String(id))
                    .set(obj, { merge: true });
            }
        }
        catch (error) {
            throw error;
        }
    }
    async aggregate(type, filters, fields) {
        try {
            if (!type?.length)
                throw new CustomError_1.default({
                    message: 'Inform an aggregation type.',
                    status: 400,
                });
            const types = Array.isArray(type) ? type : [type];
            if (types?.filter((t) => ![`average`, `count`, `sum`].includes(t))?.length)
                throw new CustomError_1.default({
                    message: 'Invalid aggregation type.',
                    status: 400,
                });
            if (!Array.isArray(filters))
                throw new CustomError_1.default({
                    message: 'Params most be an array of objects',
                    status: 400,
                });
            let query = this.db.collection(this.collection);
            if (filters?.length) {
                for (const filter of filters) {
                    if (filter.or) {
                        filter.key =
                            typeof filter.key == 'string'
                                ? filter.key.split(',')
                                : Array.isArray(filter.key)
                                    ? filter.key
                                    : '';
                        filter.op =
                            typeof filter.op == 'string'
                                ? filter.op.split(',')
                                : Array.isArray(filter.op)
                                    ? filter.op
                                    : '';
                        filter.val =
                            typeof filter.val == 'string'
                                ? filter.val.split(',')
                                : Array.isArray(filter.val)
                                    ? filter.val
                                    : '';
                        if (!filter.key ||
                            !filter.op ||
                            !filter.val ||
                            filter.key.length != filter.op.length ||
                            filter.key.length != filter.val.length)
                            throw new Error('Invalid query.');
                        const queries = [];
                        await Promise.all((Array.isArray(filter.key) ? filter.key : [filter.key]).map((key, i) => {
                            queries.push(firestore_1.Filter.where(key, filter.op[i], filter.val[i]));
                        }));
                        query = query.where(firestore_1.Filter.or(...queries));
                    }
                    else {
                        const key = Array.isArray(filter.key)
                            ? filter.key.join('.')
                            : filter.key;
                        query = query.where(key, filter.op, filter.val);
                    }
                }
            }
            const result = {};
            fields.map((f) => (result[f] = {}));
            for (const field of fields) {
                const agg = {};
                types.map((t) => {
                    agg[t] = firestore_1.AggregateField[t](field);
                });
                const res = await query.aggregate(agg).get();
                result[field] = res.data();
            }
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async ref(id) {
        try {
            return await this.db.collection(this.collection).doc(id);
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
}
exports.Firestore = Firestore;
//# sourceMappingURL=firestore.js.map