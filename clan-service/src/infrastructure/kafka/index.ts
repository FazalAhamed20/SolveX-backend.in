import { Kafka,Producer,Consumer,Partitioners } from "kafkajs";


export const kafka=new Kafka({
    clientId:"clan-service",
    brokers:["localhost:29092"]
})


export const producer:Producer=kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
}
)
export const consumer:Consumer=kafka.consumer({
      groupId: "clan-kafka-group"

})
export const Topicconsumer: Consumer = kafka.consumer({
    groupId: "Topicclan-kafka-group"
})