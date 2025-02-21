export interface fsFilters {
    key: string | string[] | Array<string | string[]>;
    op: string | string[] | Array<string | string[]>;
    val: string | string[] | Array<string | string[]>;
    or?: boolean;
}