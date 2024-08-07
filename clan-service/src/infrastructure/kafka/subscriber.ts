
import userCreatedConsumer from "@/infrastructure/kafka/consumers/userCreatedConsumer";
import submissionConsumer from '@/infrastructure/kafka/consumers/submissionConsumer'



export const createSubscriber = () => {
    return {
        userCreated: userCreatedConsumer,
        submissionCreated:submissionConsumer
       
        
    }
}