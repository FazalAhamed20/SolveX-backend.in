import { Types } from "mongoose";

export interface SubscriptionEntity{
    _id: Types.ObjectId;
    title:string | '';
    monthlyPrice?: number;
    yearlyPrice:number;
    features:string[],
    tier:string
}