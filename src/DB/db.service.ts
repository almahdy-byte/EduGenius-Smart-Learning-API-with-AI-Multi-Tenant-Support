import { FilterQuery, Model, ProjectionType, QueryOptions } from "mongoose";

export abstract class DBService<T> {

    constructor(private readonly model:Model<T>){}

    create(data:Partial<T>):Promise<T>{

        return this.model.create(data)
    }

    findById(id:string):Promise<T | null>{

        return this.model.findById(id)
    }

    findAll():Promise<T[] | []>{

        return this.model.find()
    }

    findOne(
        filter?:FilterQuery<T>,
        projection? : ProjectionType<T>,
        options? : QueryOptions
    ):Promise<T | null>{
        return this.model.findOne(filter , projection , options)
    }

    findMany(
        filter?:FilterQuery<T>,
        projection? : ProjectionType<T>,
        options? : QueryOptions
    ):Promise<T[] | []>{

        return this.model.find(filter || {} , projection , options)
    }

    update(
        data:Partial<T>,
        filter?:FilterQuery<T>,
    ){

        return this.model.updateOne(filter || {} , data  )
    }

    updateMany(
        data:Partial<T>,
        filter?:FilterQuery<T>,
    ){
        return this.model.updateMany(filter || {} , data  )
    }

    deleteOne(
        filter?:FilterQuery<T>,
    ){
        return this.model.deleteOne(filter || {})
    }

    deleteMany(
        filter?:FilterQuery<T>,
    ){
        return this.model.deleteMany(filter || {})
    }


}
