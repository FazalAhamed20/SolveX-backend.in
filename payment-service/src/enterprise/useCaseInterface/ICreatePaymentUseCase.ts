import { PaymentEntity } from "../entities";

export interface ICreatePaymentUseCase{
    execute(amount: number, interval: string, subscriptionId: string, paymentMethodId: string,userId:any):Promise<PaymentEntity | null>
}