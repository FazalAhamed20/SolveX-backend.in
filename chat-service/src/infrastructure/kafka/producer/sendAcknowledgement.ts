import { producer } from "..";


export const sendAcknowledgement = async (topic: string, key: string, value: any) => {
    const ackTopic = `${topic}-ack`;
    const ackMessage = {
        topic: ackTopic,
        messages: [{
            key: `${key}-ack`,
            value: JSON.stringify({
                originalKey: key,
                originalValue: value,
                status: 'received',
                timestamp: new Date().toISOString()
            })
        }]
    };

    try {
        await producer.connect();
        await producer.send(ackMessage);
        console.log(`Acknowledgement sent to ${ackTopic}`);
    } catch (error) {
        console.error('Error sending acknowledgement:', error);
    } finally {
        await producer.disconnect();
    }
};