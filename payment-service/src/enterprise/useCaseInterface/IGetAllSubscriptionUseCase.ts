import { SubscriptionEntity } from '../entities';

export interface IGetAllSubscriptionUseCase {
  execute(): Promise<SubscriptionEntity[] | null>;
}