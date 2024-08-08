import { Types } from "mongoose";

export interface PaymentEntity{
    _id?: Types.ObjectId;
    id:string,
    amount:number,
    paymentMethodId:string,
    interval?:string
    startDate:Date,
    endDate:Date,
    userId:string,
    subscriptionTile?: string | null;
    subscriptionTier?: string | null;
    subscriptionAmount?: number | null;
    subscriptionInterval?: string | null;
}