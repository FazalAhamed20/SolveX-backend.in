import { MessageEntity } from "../entities"

export interface ISendMessageUseCase{
    execute(data:MessageEntity):Promise<MessageEntity | string | null>
}