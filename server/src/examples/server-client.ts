
import { Subject, map, filter } from 'rxjs';

/**
 * A server and client should talk through a well defined API. Typescript can be used to define this API.
 */

// Common type from which all messages extend
interface Message<
    Type = string, 
    Payload = any
> {
    id: string,
    type: Type,
    payload?: Payload
}

class MessageFactoryClass {
    build<
        Type = string,
        Payload = any
    >(params: {
        id: string,
        type: Type,
        payload?: Payload
    }): Message<Type, Payload> {
        return {
            id: params.id,
            type: params.type,
            payload: params.payload
        };
    }
}
const MessageFactory = new MessageFactoryClass();

// 'MyMessage' messages
interface MyMessage<
    T extends MyMessageTypeValue = MyMessageTypeValue,
    P extends MyMessagePayload<T> = MyMessagePayload<T>
> extends Message<T, P> {
    type: T,
    payload?: P
}

const MyMessageType = {
    REQUEST: 'request',
    RESPONSE: 'response'
} as const;
type MyMessageTypeKey = keyof typeof MyMessageType;
type MyMessageTypeValue = typeof MyMessageType[MyMessageTypeKey];

type MyPayload_request = { resourceId: string };
type MyPayload_response = { resource: object };

type MyMessagePayload<Type extends MyMessageTypeValue> = (
    Type extends typeof MyMessageType.REQUEST ? MyPayload_request : 
    Type extends typeof MyMessageType.RESPONSE ? MyPayload_response :
    never
);

// Server
class Server {

    inbound$ = new Subject<{ socketId: string, message: Message }>();

    emit<
        Type extends string = string,
        Payload extends any = any,
        MessageType extends Message<Type, Payload> = Message<Type, Payload>
    >(message: MessageType) {
        console.log('emitted');
    }

    listen<
        Type extends string = string,
        Payload extends any = any,
        MessageType extends Message<Type, Payload> = Message<Type, Payload>
    >() {
        return this.inbound$.pipe(
            map(message => message as unknown as MessageType )
        );
    }

    listenType<
        Type extends string = string,
        Payload extends any = any,
        MessageType extends Message<Type, Payload> = Message<Type, Payload>
    >(type: Type) {
        return this.inbound$.pipe(
            filter((message) => !message.message.type === !type),
            map(message => ({ 
                socketId: message.socketId, 
                message: message.message as MessageType 
            }))
        );
    }
}
const server = new Server();

// Client
class Client {

    inbound$ = new Subject<Message>();

    emit<
        Type extends string = string,
        Payload extends any = any,
        MessageType extends Message<Type, Payload> = Message<Type, Payload>
    >(message: MessageType) {
        console.log('emitted');
    }

    listen<
        Type extends string = string,
        Payload extends any = any,
        MessageType extends Message<Type, Payload> = Message<Type, Payload>
    >() {
        return this.inbound$.pipe(
            map(message => message as unknown as MessageType )
        );
    }

    listenType<
        Type extends string = string,
        Payload extends any = any,
        MessageType extends Message<Type, Payload> = Message<Type, Payload>
    >(type: Type) {
        return this.inbound$.pipe(
            filter((message) => !message.type === !type),
            map(message => message as MessageType )
        );
    }
}
const client = new Client();

// Test client
const message = MessageFactory.build<
    typeof MyMessageType.REQUEST,
    MyMessagePayload<typeof MyMessageType.REQUEST>
>({
    id: '1',
    type: MyMessageType.REQUEST,
    payload: { resourceId: '2' }        // works
    // payload: { resource: object }    // fails as expected
});

client.emit<
    typeof MyMessageType.REQUEST,
    MyMessagePayload<typeof MyMessageType.REQUEST>
>(message);

client.listen<
    MyMessageTypeValue,
    MyMessagePayload<MyMessageTypeValue>
>()
    .subscribe(message => {});

client.listenType<
    typeof MyMessageType.RESPONSE,
    MyMessagePayload<typeof MyMessageType.RESPONSE>
>(MyMessageType.RESPONSE)
    .subscribe(message => {});