import {
    AppointmentDetailsProps,
    ServiceSummary,
    TimeSummary,
} from "../components/appointment/types/types";

// this trick is used to handle the scenario
// where the user makes no changes to the business info
// and still tries to submit the form
// so the toast message shows "No changes detected in the business information."
// if no data has changed, show a toast and return
export function compareObjects(obj1: any, obj2: any) {
    const differences: string[] = [];

    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            // check if the values are different
            if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
                differences.push(
                    `Difference found in key: "${key}". Value in obj1: ${obj1[key]}, Value in obj2: ${obj2[key]}`
                );
            }
        }
    }

    return differences.length > 0 ? differences : "No differences found";
}

// def a function to round a time to the previous hour
// export function roundToPreviousHour(date: Date): Date {
//     // Create a new date object rounded down to the previous hour
//     const roundedDate = new Date(date);
//     roundedDate.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to 0
//     return roundedDate;
// }

// // def a function to generate a list of times between timeStart and timeFinish
// function generateTimeList(start: Date, end: Date): string[] {
//     const timeList: string[] = [];
//     let current = new Date(start);

//     // Generate times from start to end, incrementing by one hour
//     while (current <= end) {
//         const options: Intl.DateTimeFormatOptions = {
//             hour: "numeric",
//             minute: "numeric",
//             hour12: true,
//         };
//         timeList.push(current.toLocaleTimeString([], options));
//         current.setHours(current.getHours() + 1); // Increment by one hour
//     }

//     return timeList;
// }

// // def a function to calculate the open hours
// export function calculateOpenHours(
//     timeStart: string,
//     timeFinish: string
// ): {
//     lengthOfHoursBetween: number;
//     timeStartFormatted: string;
//     timeFinishFormatted: string;
//     timeList: string[];
// } {
//     // Convert ISO time strings to Date objects
//     const dateStart = new Date(timeStart);
//     const dateFinish = new Date(timeFinish);

//     // Round both dates to the previous hour
//     const roundedStart = roundToPreviousHour(dateStart);
//     const roundedFinish = roundToPreviousHour(dateFinish);

//     // Calculate the difference in milliseconds and convert to hours
//     const lengthOfHoursBetween =
//         (roundedFinish.getTime() - roundedStart.getTime()) / (1000 * 60 * 60);

//     // Format the rounded times in "HH:MM AM/PM" format
//     const options: Intl.DateTimeFormatOptions = {
//         hour: "numeric",
//         minute: "numeric",
//         hour12: true,
//     };
//     const timeStartFormatted = roundedStart.toLocaleTimeString([], options);
//     const timeFinishFormatted = roundedFinish.toLocaleTimeString([], options);

//     // Generate list of times between timeStart and timeFinish
//     const timeList = generateTimeList(roundedStart, roundedFinish);

//     return {
//         lengthOfHoursBetween: Math.floor(lengthOfHoursBetween),
//         timeStartFormatted,
//         timeFinishFormatted,
//         timeList,
//     };
// }

// // def a function to group customers by rounded time return object
// export function groupCustomersByRoundedTime(
//     appointments: AppointmentDetailsProps[]
// ): Record<string, number> {
//     return appointments.reduce((acc: Record<string, number>, appointment) => {
//         const { roundedTime, numberOfCustomers } = appointment;

//         // If the roundedTime already exists in the accumulator, sum the number of customers
//         if (acc[roundedTime]) {
//             acc[roundedTime] += numberOfCustomers;
//         } else {
//             acc[roundedTime] = numberOfCustomers;
//         }

//         return acc;
//     }, {});
// }

// def a function to round a time to the previous hour and format it as "10:00AM"
export function roundToPreviousHour(date: Date): string {
    // Create a new date object rounded down to the previous hour
    const roundedDate = new Date(date);
    roundedDate.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to 0

    // Extract hours and adjust for 12-hour format
    let hours = roundedDate.getHours();
    const minutes = "00"; // Always "00" since we're rounding to the hour
    const period = hours >= 12 ? "PM" : "AM"; // Determine AM/PM

    // Convert 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; // Adjust "0" to "12" for 12 AM/PM

    // Return formatted string as "10:00AM"
    return `${hours}:${minutes}${period}`;
}

// def a function to generate a list of formatted times
function generateTimeList(start: Date, end: Date): string[] {
    const timeList: string[] = [];
    let current = new Date(start);

    // Generate times from start to end, incrementing by one hour
    while (current <= end) {
        timeList.push(roundToPreviousHour(current)); // Use the new roundToPreviousHour function
        current.setHours(current.getHours() + 1); // Increment by one hour
    }

    return timeList;
}

// def a function to calculate the open hours
export function calculateOpenHours(
    timeStart: string,
    timeFinish: string
): {
    lengthOfHoursBetween: number;
    timeStartFormatted: string;
    timeFinishFormatted: string;
    timeList: string[];
} {
    // Convert ISO time strings to Date objects
    const dateStart = new Date(timeStart);
    const dateFinish = new Date(timeFinish);

    // Round both dates to the previous hour and get formatted strings
    const timeStartFormatted = roundToPreviousHour(dateStart);
    const timeFinishFormatted = roundToPreviousHour(dateFinish);

    // Calculate the difference in hours
    const lengthOfHoursBetween =
        (dateFinish.getTime() - dateStart.getTime()) / (1000 * 60 * 60);

    // Generate list of formatted times between start and finish
    const timeList = generateTimeList(dateStart, dateFinish);

    return {
        lengthOfHoursBetween: Math.floor(lengthOfHoursBetween),
        timeStartFormatted,
        timeFinishFormatted,
        timeList,
    };
}

// def a function to get the time zone name
// this trick is used to get the time zone name of the device
// so that the appointment time can be displayed in the user's time zone
export const getTimeZoneName = () => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return timeZone;
};

// def a function to format a date to string
export function formatDateToString(dateString: string): string {
    const date = new Date(dateString);

    const weekday = date.toLocaleString("en-US", { weekday: "short" }); // "Tue"
    const month = date.toLocaleString("en-US", { month: "short" }); // "Oct"
    const day = date.getDate(); // "15"
    const year = date.getFullYear(); // "2024"

    // Construct the desired format
    return `${weekday} ${month} ${day} ${year}`;
}

// def a function to filter appointments by date
export function filterAppointmentsByDate(
    appointments: any[],
    targetDate: string
): any[] {
    return appointments.filter(
        (appointment) => appointment.date === targetDate
    );
}

// // def a function to group customers by rounded time and compute totals return list of objects
// export function groupCustomersByRoundedTime(
//     appointments: AppointmentDetailsProps[]
// ): { roundedTime: string; totalCustomers: number }[] {
//     // Use a Map to accumulate customers by rounded time
//     const customerMap = appointments.reduce(
//         (acc: Map<string, number>, appointment) => {
//             const { roundedTime, numberOfCustomers } = appointment;

//             // If the roundedTime exists in the map, sum the number of customers
//             if (acc.has(roundedTime)) {
//                 acc.set(roundedTime, acc.get(roundedTime)! + numberOfCustomers);
//             } else {
//                 acc.set(roundedTime, numberOfCustomers);
//             }

//             return acc;
//         },
//         new Map<string, number>()
//     );

//     // Convert the Map to an array of objects
//     return Array.from(customerMap, ([roundedTime, totalCustomers]) => ({
//         roundedTime,
//         totalCustomers,
//     }));
// }

// def a function to group customers by rounded time and ensure alignment with the timeList
export function groupCustomersByTime(
    timeList: string[],
    appointments: AppointmentDetailsProps[]
): { roundedTime: string; totalCustomers: number }[] {
    // Create a Map with all times from timeList, initialized with 0 customers
    const customerMap = new Map<string, number>(
        timeList.map((time) => [time, 0]) // Initialize all times with 0 customers
    );

    // Accumulate customers from filteredAppointmentsByDate
    appointments.forEach(({ roundedTime, numberOfCustomers }) => {
        if (customerMap.has(roundedTime)) {
            customerMap.set(
                roundedTime,
                customerMap.get(roundedTime)! + numberOfCustomers
            );
        }
    });

    // Convert the Map to an array of objects, ensuring the order matches timeList
    return timeList.map((time) => ({
        roundedTime: time,
        totalCustomers: customerMap.get(time) || 0,
    }));
}

// interface ServiceSummary {
//     service: string;
//     customers: number;
// }

// // PERHAPS, A PROBLEM IS HERE - I NEED TO CHECK IT OUT CAREFULLY
// // def a function to group by rounded time and service
// export function groupByRoundedTimeAndService(
//     appointments: any[]
// ): ServiceSummary[][] {
//     // Create a map to group data by roundedTime
//     const groupedData: Record<string, Record<string, number>> = {};

//     appointments.forEach((appointment) => {
//         const { roundedTime, serviceName, numberOfCustomers } = appointment;

//         // If this roundedTime doesn't exist in the groupedData, initialize it
//         if (!groupedData[roundedTime]) {
//             groupedData[roundedTime] = {};
//         }

//         // If this service doesn't exist under this roundedTime, initialize it
//         if (!groupedData[roundedTime][serviceName]) {
//             groupedData[roundedTime][serviceName] = 0;
//         }

//         // Sum the number of customers for each service under each roundedTime
//         groupedData[roundedTime][serviceName] += numberOfCustomers;
//     });

//     // Convert the grouped data into the list of ServiceSummary objects
//     const result: ServiceSummary[][] = Object.keys(groupedData).map(
//         (roundedTime) => {
//             return Object.keys(groupedData[roundedTime]).map((serviceName) => ({
//                 service: serviceName,
//                 customers: groupedData[roundedTime][serviceName],
//             }));
//         }
//     );

//     return result;
// }

interface GroupedAppointment {
    roundedTime: string;
    appointments: AppointmentDetailsProps[];
}

function groupAppointmentsByRoundedTime(
    appointments: AppointmentDetailsProps[]
): GroupedAppointment[] {
    const groupedData: Record<string, AppointmentDetailsProps[]> = {};

    // Group appointments by roundedTime
    appointments.forEach((appointment) => {
        const { roundedTime } = appointment;
        if (!groupedData[roundedTime]) {
            groupedData[roundedTime] = [];
        }
        groupedData[roundedTime].push(appointment);
    });

    // Convert the grouped data into the desired format (list of objects)
    const result: GroupedAppointment[] = Object.keys(groupedData).map(
        (roundedTime) => ({
            roundedTime,
            appointments: groupedData[roundedTime],
        })
    );

    return result;
}

// /////

// interface ServiceSummary {
//     serviceName: string;
//     customers: number;
// }

/**
 * Function to generate time and service-based summaries.
 */
export function groupCustomersByTimeAndService(
    data: AppointmentDetailsProps[],
    timeList: string[],
    serviceList: string[]
): TimeSummary[] {
    // Create a map to store the total customers for each time and service
    const customerMap = new Map<string, Map<string, number>>();

    // Initialize the map with all time and service combinations set to 0
    timeList.forEach((time) => {
        const serviceMap = new Map<string, number>();
        serviceList.forEach((service) => serviceMap.set(service, 0));
        customerMap.set(time, serviceMap);
    });

    // Populate the map with actual data from the appointments
    data.forEach(({ roundedTime, serviceName, numberOfCustomers }) => {
        if (customerMap.has(roundedTime)) {
            const serviceMap = customerMap.get(roundedTime)!;
            serviceMap.set(
                serviceName,
                (serviceMap.get(serviceName) || 0) + numberOfCustomers
            );
        }
    });

    // Convert the map to the desired output format
    const result: TimeSummary[] = [];
    timeList.forEach((time) => {
        const serviceMap = customerMap.get(time)!;
        const summary: ServiceSummary[] = Array.from(
            serviceMap,
            ([serviceName, customers]) => ({
                serviceName,
                customers,
            })
        );
        result.push({ roundedTime: time, summary });
    });

    return result;
}

// def a function to correctly transform input data into the required output format
export function transformData(input: TimeSummary[]): ServiceSummary[][] {
    return input.map((item) => item.summary);
}
