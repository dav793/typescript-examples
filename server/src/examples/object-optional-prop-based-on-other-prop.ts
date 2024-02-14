
type Event = 
    | {
        type: 'SIGN_IN';
        payload: {
            userId: string;
        };
    }
    | {
        type: 'SIGN_OUT';
    };

// const sendEvent = (eventType: Event['type'], payload?: any) => {};
const sendEvent = <Type extends Event['type']>(
    ...args: Extract<Event, { type: Type }> extends { payload: infer TPayload }
    ? [type: Type, payload: TPayload]
    : [type: Type]
) => {};

// These should be correct
sendEvent('SIGN_OUT');
sendEvent('SIGN_IN', { userId: '001' });

// These should error
sendEvent('SIGN_OUT', {});
sendEvent('SIGN_IN', {
    userId: 123
});
sendEvent('SIGN_IN', {});
sendEvent('SIGN_IN');