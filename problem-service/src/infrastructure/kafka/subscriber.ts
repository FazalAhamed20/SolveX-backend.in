import userCreatedConsumer from "@/infrastructure/kafka/consumer/userCreatedConsumer";



export const createSubscriber = () => {
    return {
        userCreated: userCreatedConsumer,
       
        
    }
}