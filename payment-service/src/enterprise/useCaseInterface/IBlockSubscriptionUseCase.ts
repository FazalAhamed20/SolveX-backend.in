import { SubscriptionEntity } from "../entities";

export interface IBlockSubscriptionUseCase{
    execute(data:SubscriptionEntity):Promise<SubscriptionEntity | null>
}