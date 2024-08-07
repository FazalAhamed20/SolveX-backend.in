
import userCreatedConsumer from "@/infrastructure/kafka/consumers/userCreatedConsumer";



export const createSubscriber = () => {
    return {
        userCreated: userCreatedConsumer,
       
        
    }
}