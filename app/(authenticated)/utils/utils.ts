import { AppointmentDetailsProps } from "../components/appointment/types/types";

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
export function roundToPreviousHour(date: Date): Date {
    // Create a new date object rounded down to the previous hour
    const roundedDate = new Date(date);
    roundedDate.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to 0
    return roundedDate;
}

function generateTimeList(start: Date, end: Date): string[] {
    const timeList: string[] = [];
    let current = new Date(start);

    // Generate times from start to end, incrementing by one hour
    while (current <= end) {
        const options: Intl.DateTimeFormatOptions = {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        timeList.push(current.toLocaleTimeString([], options));
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

    // Round both dates to the previous hour
    const roundedStart = roundToPreviousHour(dateStart);
    const roundedFinish = roundToPreviousHour(dateFinish);

    // Calculate the difference in milliseconds and convert to hours
    const lengthOfHoursBetween =
        (roundedFinish.getTime() - roundedStart.getTime()) / (1000 * 60 * 60);

    // Format the rounded times in "HH:MM AM/PM" format
    const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };
    const timeStartFormatted = roundedStart.toLocaleTimeString([], options);
    const timeFinishFormatted = roundedFinish.toLocaleTimeString([], options);

    // Generate list of times between timeStart and timeFinish
    const timeList = generateTimeList(roundedStart, roundedFinish);

    return {
        lengthOfHoursBetween: Math.floor(lengthOfHoursBetween),
        timeStartFormatted,
        timeFinishFormatted,
        timeList,
    };
}

// def a function to get the time zone name
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

// def a function to group customers by rounded time
export function groupCustomersByRoundedTime(
    appointments: any[]
): Record<string, number> {
    return appointments.reduce((acc: Record<string, number>, appointment) => {
        const { roundedTime, numberOfCustomers } = appointment;

        // If the roundedTime already exists in the accumulator, sum the number of customers
        if (acc[roundedTime]) {
            acc[roundedTime] += numberOfCustomers;
        } else {
            acc[roundedTime] = numberOfCustomers;
        }

        return acc;
    }, {});
}

interface ServiceSummary {
    service: string;
    customers: number;
}

// PERHAPS, A PROBLEM IS HERE - I NEED TO CHECK IT OUT CAREFULLY
// def a function to group by rounded time and service
export function groupByRoundedTimeAndService(
    appointments: any[]
): ServiceSummary[][] {
    // Create a map to group data by roundedTime
    const groupedData: Record<string, Record<string, number>> = {};

    appointments.forEach((appointment) => {
        const { roundedTime, serviceName, numberOfCustomers } = appointment;

        // If this roundedTime doesn't exist in the groupedData, initialize it
        if (!groupedData[roundedTime]) {
            groupedData[roundedTime] = {};
        }

        // If this service doesn't exist under this roundedTime, initialize it
        if (!groupedData[roundedTime][serviceName]) {
            groupedData[roundedTime][serviceName] = 0;
        }

        // Sum the number of customers for each service under each roundedTime
        groupedData[roundedTime][serviceName] += numberOfCustomers;
    });

    // Convert the grouped data into the list of ServiceSummary objects
    const result: ServiceSummary[][] = Object.keys(groupedData).map(
        (roundedTime) => {
            return Object.keys(groupedData[roundedTime]).map((serviceName) => ({
                service: serviceName,
                customers: groupedData[roundedTime][serviceName],
            }));
        }
    );

    return result;
}

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

// def a function to filter by roundedTime
export function filterAppointmentsByRoundedTime(
    groupedAppointments: GroupedAppointment[],
    targetRoundedTime: string
): AppointmentDetailsProps[] {
    const foundGroup = groupedAppointments.find(
        (group) => group.roundedTime === targetRoundedTime
    );
    return foundGroup ? foundGroup.appointments : [];
}
