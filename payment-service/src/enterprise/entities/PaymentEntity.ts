import { Types } from "mongoose";

export interface PaymentEntity{
    _id?: Types.ObjectId;
    id:string,
    amount:number,
    paymentMethodId:string,
    interval?:string
    startDate:Date,
    endDate:Date,
    userId:string
}