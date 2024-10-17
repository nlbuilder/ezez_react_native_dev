const dummy = [
    {
        roundedTime: "10:00AM",
        summary: [
            { serviceName: "Service1", customers: 0 },
            { serviceName: "Service2", customers: 0 },
            { serviceName: "Service3", customers: 0 },
            { serviceName: "Service4", customers: 9 },
            { serviceName: "Service5", customers: 0 },
        ],
    },
    {
        roundedTime: "3:00PAM",
        summary: [
            { serviceName: "Service1", customers: 0 },
            { serviceName: "Service2", customers: 0 },
            { serviceName: "Service3", customers: 0 },
            { serviceName: "Service4", customers: 0 },
            { serviceName: "Service5", customers: 2 },
        ],
    },

    {
        roundedTime: "5:00PM",
        summary: [
            { serviceName: "Service1", customers: 6 },
            { serviceName: "Service2", customers: 0 },
            { serviceName: "Service3", customers: 0 },
            { serviceName: "Service4", customers: 0 },
            { serviceName: "Service5", customers: 0 },
        ],
    },
];

const dummyTransformed = [
    [
        { serviceName: "Service1", customers: 0 },
        { serviceName: "Service2", customers: 0 },
        { serviceName: "Service3", customers: 0 },
        { serviceName: "Service4", customers: 9 },
        { serviceName: "Service5", customers: 0 },
    ],
    [
        { serviceName: "Service1", customers: 0 },
        { serviceName: "Service2", customers: 0 },
        { serviceName: "Service3", customers: 0 },
        { serviceName: "Service4", customers: 0 },
        { serviceName: "Service5", customers: 2 },
    ],
    [
        { serviceName: "Service1", customers: 6 },
        { serviceName: "Service2", customers: 0 },
        { serviceName: "Service3", customers: 0 },
        { serviceName: "Service4", customers: 0 },
        { serviceName: "Service5", customers: 0 },
    ],
];

// console.log(JSON.stringify(dummy, null, 2));
// console.log(JSON.stringify(dummyTransformed, null, 2));
