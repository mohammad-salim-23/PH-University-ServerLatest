import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T>{
    public modelQuery:Query<T[],T>;
    public query:Record<string,unknown>;
    constructor(modelQuery:Query<T[],T>,query:Record<string,unknown>){
        this.modelQuery = modelQuery;
        this.query = query;
    }
    search(searchableFields:string[]){
        const searchTerm = this?.query?.searchTerm;
        if(searchTerm){
            this.modelQuery = this.modelQuery.find({
                $or:searchableFields.map((field)=>({
                    [field]:{$regex:searchTerm, $options:'i'},
                })) as FilterQuery<T[]>,
            });
        }
        return this;
    }
    filter(){
        const queryObj = {...this.query};//copy

        //Filtering
        /* 
        What is excludeFields?

It's a list of fields (sort, limit, page, etc.) that should not be used for filtering but are still part of the query string in the URL.
Why are the fields removed?

To ensure that only valid filter fields (like category, role, price, etc.) are used to query the database.
If you don't remove them, your database will try to filter by fields that don't exist (like sort, page, and limit), which will either return incorrect results or throw an error.
What happens if you remove this logic?

Irrelevant fields like sort, limit, and page will be passed as part of the filter, which could confuse the database.
Why does .find(queryObj) still work?

After the irrelevant fields are removed, only actual filter conditions remain (like category: 'electronics'), and this is passed to find(), which works as expected.
        */
        const excludeFields=['searchTerm', 'sort', 'limit', 'page', 'fields'];
        excludeFields.forEach((el)=> delete queryObj[el]);
        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        return this;
    }
    sort(){
        const sort = (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
        this.modelQuery = this.modelQuery.sort(sort as string);
        return this;
    }
    paginate(){
        const page = Number(this?.query?.page) || 1;
        const limit = Number(this?.query?.limit) || 10;
        const skip = (page-1) * limit;
        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }
    fields(){
        const fields = (this?.query?.fields as string)?.split(',')?.join(' ')|| '-__v';
        this.modelQuery = this.modelQuery.select(fields);
        return this;
    }
}
export default QueryBuilder;