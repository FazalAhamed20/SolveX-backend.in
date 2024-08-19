import { MessageEntity } from "../entities";

export interface IDeleteMessageUseCase{
    execute(messageId:any):Promise<MessageEntity | string | null>
}