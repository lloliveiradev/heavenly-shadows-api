import { fsFilters } from './fsFilters';

export interface fsGetWhereOpt {
    limit?: number;
    offset?: number;
    orderBy?: Array<string | [string, string]>;
    filters?: fsFilters[];
    startAfter?: string | string[];
    startAt?: string | string[];
}