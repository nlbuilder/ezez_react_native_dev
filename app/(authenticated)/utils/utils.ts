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

// def a function to generate a list of open hours
// this function is the engine of the function calculateOpenHours below
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

// def a function to group customers by rounded time and ensure alignment with the timeList
// this function is to compute the total number of customers for each hour
// regardless of the service
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

// def a function to compute the total number of customers for each service per hour
// this function is a further extension of the previous function
// the previous function only computes the total number of customers per hour
// whereas this function computes the total number of customers per service per hour
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

// def a function to correctly transform sumOfCustomerByTimeAndService to a list of objects
// making it possible to pass it to the <AppointmentCard> component
// for display in the FlatList
export function transformData(input: TimeSummary[]): ServiceSummary[][] {
    return input.map((item) => item.summary);
}
