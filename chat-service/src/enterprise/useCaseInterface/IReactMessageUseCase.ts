import { MessageEntity } from "../entities"

export interface IReactMessageUseCase{
    execute(data:MessageEntity):Promise<MessageEntity | string | null>
}