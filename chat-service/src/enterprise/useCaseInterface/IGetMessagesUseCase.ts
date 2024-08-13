import { MessageEntity } from "../entities"

export interface IGetMessagesUseCase{
    execute(id:string):Promise<MessageEntity | string | null>
}