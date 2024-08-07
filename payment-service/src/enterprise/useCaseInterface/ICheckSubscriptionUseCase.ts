import { PaymentEntity } from "../entities";

export interface ICheckSubscriptionUseCase{
    execute(userId:any):Promise<PaymentEntity | null>
}