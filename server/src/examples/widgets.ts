
// We have two types of widgets
const WIDGET_TYPE = {
    'LIST': 'widget-list',
    'CALCULATOR': 'widget-calculator'
} as const;
type WidgetType = keyof typeof WIDGET_TYPE;

// We have a widget which presents a list of selectable options
type WidgetList_Item = {
    key: string;
    label: string;
}

type WidgetList_SelectItemEvent = {
    selected: WidgetList_Item['key'];
}

// We have another widget which can make calculations between 2 operands
type WidgetCalculator_Parameters = {
    operand1: number;
    operand2: number;
    operator: 'add' | 'subtract' | 'multiply' | 'divide';
}

type WidgetCalculator_OperateEvent = {
    result: number;
}


// We also have a way to define a list of configurations for widgets dynamically
type WidgetConfig_List = {
    widgetType: typeof WIDGET_TYPE['LIST'],
    items: WidgetList_Item[];
    event_selectItem: WidgetList_SelectItemEvent;
};

type WidgetConfig_Calculator = {
    widgetType: typeof WIDGET_TYPE['CALCULATOR'],
    parameters: WidgetCalculator_Parameters;
    event_operate: WidgetCalculator_OperateEvent
};

type WidgetConfig = 
    | WidgetConfig_List
    | WidgetConfig_Calculator;


// Usage example:
const configs: WidgetConfig[] = [
    {
        widgetType: 'widget-list',
        items: [
            { key: 'one', label: 'One' },
            { key: 'two', label: 'Two' }
        ],
        event_selectItem: {
            selected: 'one'
        }
    },
    {
        widgetType: 'widget-calculator',
        parameters: {
            operand1: 1,
            operand2: 2,
            operator: 'add'
        },
        event_operate: {
            result: 3
        }
    }
];

const createWidget = (config: WidgetConfig) => {
    switch (config.widgetType) {
        case 'widget-list':
            createWidget_List(config);
            break;
        case 'widget-calculator':
            createWidget_Calculator(config);
            break;
    }
}

const createWidget_List = (config: WidgetConfig_List) => {
    config.items
    config.event_selectItem
};

const createWidget_Calculator = (config: WidgetConfig_Calculator) => {
    config.parameters
    config.event_operate
};

configs.forEach(
    config => createWidget(config)
);