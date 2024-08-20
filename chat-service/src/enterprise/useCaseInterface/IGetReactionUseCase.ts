import { MessageEntity } from "../entities"

export interface IGetReactionUseCase{
    execute(messageId:string):Promise<MessageEntity | string | null>
}