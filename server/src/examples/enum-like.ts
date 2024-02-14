
// A plain javascript object like EVENT_TYPE can be used in place of a typescript enum, as long as you add 'as const'.
// This alternative provides a few advantages over typescript enums.

const EVENT_TYPE = {
    LMB_DOWN: 'lmb-down',
    LMB_UP: 'lmb-up',
    RMB_DOWN: 'rmb-down',
    RMB_UP: 'rmb-up',
    POINTER_MOVE: 'pointer-move'
} as const;

type EventType = keyof typeof EVENT_TYPE;

type ValueOf<T> = T[keyof T];
type EventTypeValue = ValueOf<typeof EVENT_TYPE>;

function example(eventType: EventType) {
    const var1 = EVENT_TYPE[eventType];                                 // use EVENT_TYPE indexed by EventType,
    const var2 = EVENT_TYPE['LMB_DOWN'];                                // use EVENT_TYPE indexed by any of the keys in EVENT_TYPE,
    const var3: EventType = 'LMB_UP';                                   // EventType only accepts any of the keys in EVENT_TYPE,
    const var4: EventTypeValue = 'lmb-down';                            // EventTypeValue only accepts any of the values in EVENT_TYPE
}
