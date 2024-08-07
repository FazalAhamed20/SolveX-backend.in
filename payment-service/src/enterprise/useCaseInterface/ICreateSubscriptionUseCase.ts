import { SubscriptionEntity } from "../entities";

export interface ICreateSubscriptionUseCase{
    execute(data:SubscriptionEntity):Promise<SubscriptionEntity | null>
}