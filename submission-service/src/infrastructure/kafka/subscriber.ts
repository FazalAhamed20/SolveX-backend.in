
import userCreatedConsumer from "@/infrastructure/kafka/consumers/userCreatedConsumer";
import problemCreatedConsumer from "./consumers/problemCreatedConsumer";
import practicalCreatedConsumer from "./consumers/practicalCreatedConsumer";


export const createSubscriber = () => {
    return {
        userCreated: userCreatedConsumer,
        problemCreated:problemCreatedConsumer,
        practicalCreated:practicalCreatedConsumer
        
    }
}
