// Sources:
import * as firebaseAdmin from 'firebase-admin';
import { Filter, AggregateField } from 'firebase-admin/firestore';
// Utils:
import CustomError from '../../utils/CustomError';
import dateNow from '../../utils/dateNow';
// Types:
import { apiUser, fsGetWhereOpt, fsFilters } from 'types';

export class Firestore {
  private readonly db: firebaseAdmin.firestore.Firestore;
  private readonly collection: string;
  private readonly sub: boolean;

  constructor(
    db: firebaseAdmin.firestore.Firestore,
    collection: string,
    sub: boolean,
  ) {
    this.db = db;
    this.collection = collection;
    this.sub = sub;
  }

  /**
   * Creates a new record and returns its id
   */
  async add(data: { [key: string]: any }, user: object): Promise<string> {
    data.created_at = dateNow();
    data.created_by = user;

    const { id } = await this.db.collection(this.collection).add(data);
    this.db
      .collection(this.collection)
      .doc(id)
      .set({ rowid: id }, { merge: true });
    return id;
  }

  /**
   * Updates a record
   */
  async set(
    id: string,
    data: { [key: string]: any },
    user: object,
    merge: boolean = true,
  ) {
    try {
      data.updated_at = dateNow();
      data.updated_by = user;
      await this.db
        .collection(this.collection)
        .doc(String(id))
        .set(data, { merge });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Queries an especific record and returns the data
   */
  async get(id: string): Promise<any> {
    try {
      const result = await this.db
        .collection(this.collection)
        .doc(String(id))
        .get();
      if (result.exists) {
        const obj: any = result.data();
        obj.id = result.id;
        return obj;
      } else {
        throw new CustomError({ message: 'Record not found', status: 204 });
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Queries the database using the options and returns a recordset
   */
  async getWhere(options: fsGetWhereOpt = {}): Promise<Array<any>> {
    const { limit, offset, orderBy, filters, startAfter, startAt } = options;
    try {
      let query: firebaseAdmin.firestore.Query = this.db.collection(
        this.collection,
      );
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

            if (
              !filter.key ||
              !filter.op ||
              !filter.val ||
              filter.key.length != filter.op.length ||
              filter.key.length != filter.val.length
            )
              throw new Error('Invalid query.');

            const queries: Array<any> = [];
            await Promise.all(
              (Array.isArray(filter.key) ? filter.key : [filter.key]).map(
                (key: string | string[], i: number) => {
                  if (typeof key === 'string') {
                    queries.push(
                      Filter.where(
                        key,
                        filter.op[i] as firebaseAdmin.firestore.WhereFilterOp,
                        filter.val[i] as string,
                      ),
                    );
                  }
                },
              ),
            );
            query = query.where(Filter.or(...queries));
          } else {
            const key = Array.isArray(filter.key)
              ? filter.key.join('.')
              : filter.key;
            query = query.where(
              key,
              filter.op as firebaseAdmin.firestore.WhereFilterOp,
              filter.val,
            );
          }
        }
      }

      if (orderBy) {
        orderBy.forEach((e) => {
          if (typeof e == 'string') {
            query = query.orderBy(e);
          } else if (Array.isArray(e)) {
            query = query.orderBy(
              e[0],
              e[1] as firebaseAdmin.firestore.OrderByDirection,
            );
          }
        });
      }

      if (startAt) {
        if (typeof startAt == 'string') {
          query = query.startAt(startAt);
        } else if (startAt?.length) {
          startAt.forEach((e) => {
            if (e) query = query.startAt(e);
          });
        }
      }

      if (startAfter) {
        if (typeof startAfter == 'string') {
          query = query.startAfter(startAfter);
        } else if (startAfter?.length) {
          startAfter.forEach((e) => {
            if (e) query = query.startAfter(e);
          });
        }
      }

      if (limit) query = query.limit(limit);

      if (offset) query = query.offset(offset);

      const result = await query.get();
      if (result.docs.length > 0) {
        const array: any[] = [];
        for (const item of result.docs) {
          const obj = item.data();
          obj.id = item.id;
          array.push(obj);
        }
        return array;
      } else {
        return [];
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Removes a record from the database or logically deletes it
   */
  async delete(id: string, user: apiUser, real: boolean = false) {
    try {
      if (real) {
        await this.db.collection(this.collection).doc(String(id)).delete();
      } else {
        const obj = {
          deleted: true,
          deleted_at: dateNow(),
          deleted_by: user,
        };
        await this.db
          .collection(this.collection)
          .doc(String(id))
          .set(obj, { merge: true });
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Group the records according with the where params
   */
  async aggregate(
    type: 'avg' | 'count' | 'sum' | Array<string>,
    filters: fsFilters,
    fields: Array<string>,
  ): Promise<any> {
    try {
      if (!type?.length)
        throw new CustomError({
          message: 'Inform an aggregation type.',
          status: 400,
        });
      const types = Array.isArray(type) ? type : [type];
      if (
        types?.filter((t) => ![`average`, `count`, `sum`].includes(t))?.length
      )
        throw new CustomError({
          message: 'Invalid aggregation type.',
          status: 400,
        });
      if (!Array.isArray(filters))
        throw new CustomError({
          message: 'Params most be an array of objects',
          status: 400,
        });

      let query: firebaseAdmin.firestore.Query = this.db.collection(
        this.collection,
      );

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

            if (
              !filter.key ||
              !filter.op ||
              !filter.val ||
              filter.key.length != filter.op.length ||
              filter.key.length != filter.val.length
            )
              throw new Error('Invalid query.');

            const queries: Array<any> = [];
            await Promise.all(
              (Array.isArray(filter.key) ? filter.key : [filter.key]).map(
                (key: string, i: number) => {
                  queries.push(
                    Filter.where(
                      key,
                      filter.op[i] as firebaseAdmin.firestore.WhereFilterOp,
                      filter.val[i] as string,
                    ),
                  );
                },
              ),
            );
            query = query.where(Filter.or(...queries));
          } else {
            const key = Array.isArray(filter.key)
              ? filter.key.join('.')
              : filter.key;
            query = query.where(
              key,
              filter.op as firebaseAdmin.firestore.WhereFilterOp,
              filter.val,
            );
          }
        }
      }

      const result = {};
      fields.map((f) => (result[f] = {}));
      for (const field of fields) {
        const agg = {};
        types.map((t) => {
          agg[t] = AggregateField[t](field);
        });
        const res = await query.aggregate(agg).get();
        result[field] = res.data();
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Creates e returns a document reference
   */
  async ref(
    id: string,
  ): Promise<firebaseAdmin.firestore.DocumentReference | null> {
    try {
      return await this.db.collection(this.collection).doc(id);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
