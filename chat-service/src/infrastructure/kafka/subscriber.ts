
import userCreatedConsumer from "@/infrastructure/kafka/consumers/userCreatedConsumer";
import clanCreatedConsumer from "./consumers/clanCreatedConsumer";
import clanUpdateConsumer from "./consumers/clanUpdateConsumer";




export const createSubscriber = () => {
    return {
        userCreated: userCreatedConsumer,
        clanCreated: clanCreatedConsumer,
        clanUpdated:clanUpdateConsumer,
       
        
    }
}