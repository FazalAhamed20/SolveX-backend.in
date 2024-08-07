import { Kafka,Producer,Consumer,Partitioners } from "kafkajs";


export const kafka=new Kafka({
    clientId:"submission-service",
    brokers:["localhost:29092"]
})


export const producer:Producer=kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
}
)
export const consumer:Consumer=kafka.consumer({
      groupId: "submission-kafka-group"

})
export const Topicconsumer: Consumer = kafka.consumer({
    groupId: "TopicSubmission-kafka-group"
})