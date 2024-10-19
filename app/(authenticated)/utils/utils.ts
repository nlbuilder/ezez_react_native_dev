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

export function convertToLocalTime(time: string, timeZoneName: string): string {
    const date = new Date(time); // Create a Date object from the input time

    // Use Intl.DateTimeFormat to format the time in the given time zone
    const formatter = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: timeZoneName,
    });

    return formatter.format(date);
}

// def a function to convert a time to 12-hour format
// this one is used to handle the time in AppointmentDetails component only
// the future me might remove the use of this function
export function convertTo12HourFormat(time: string): string {
    // Extract the time part, e.g., "10:05:00" from "10:05:00 GMT-0230"
    const [hours, minutes] = time.split(" ")[0].split(":").map(Number);

    // Determine AM/PM
    const period = hours >= 12 ? " PM" : " AM";

    // Convert to 12-hour format
    const adjustedHours = hours % 12 || 12; // Handle "0" as "12"

    // Return formatted time
    return `${adjustedHours}:${minutes.toString().padStart(2, "0")}${period}`;
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

// this is a helper function for the generateTimeList function
const normalizeTimeString = (time: string): string => {
    // Replace any non-breaking space (U+202F) or multiple spaces with a single space
    return time
        .replace(/\s+/g, " ")
        .replace(/\u202F/g, " ")
        .trim();
};

// def a function to generate a timeList for using to define
// the number of AppointmentCards per hour
// basically, each hour will have an AppointmentCard
export function generateTimeList(
    timeStart: string,
    timeFinish: string
): string[] {
    const convertTo24HourFormat = (time: string): Date => {
        const normalizedTime = normalizeTimeString(time); // Normalize the time string
        const [timeString, modifier] = normalizedTime.split(" ");
        let [hours, minutes] = timeString.split(":").map(Number);

        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    };

    const format12Hour = (date: Date): string => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12; // Convert to 12-hour format

        return `${hours}:${minutes}${ampm}`;
    };

    const start = convertTo24HourFormat(timeStart);
    const end = convertTo24HourFormat(timeFinish);
    const timeList: string[] = [];

    let current = new Date(start);

    while (current <= end) {
        timeList.push(format12Hour(current));
        current.setHours(current.getHours() + 1);
    }

    return timeList;
}

// def a function to parse a time string to a Date object
export function parseTimeToDate(time: string, timeZoneName: string): Date {
    // Normalize the input to replace non-breaking spaces and trim
    const normalizedTime = time.replace(/\u202F/g, " ").trim();

    // Split the normalized time into components (e.g., "12:00 PM")
    const [timeString, modifier] = normalizedTime.split(" ");
    let [hours, minutes] = timeString.split(":").map(Number);

    // Convert to 24-hour format
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    // Create a Date object for the current day
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Set time in local time zone

    // Adjust the time based on the specified time zone
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: timeZoneName,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
    });

    // Format the time to get the correct time in the target time zone
    const parts = formatter.formatToParts(date);

    // Extract hours and minutes from the formatted parts
    const parsedHours = Number(parts.find((p) => p.type === "hour")?.value);
    const parsedMinutes = Number(parts.find((p) => p.type === "minute")?.value);

    // Set the time in the Date object
    date.setHours(parsedHours, parsedMinutes, 0, 0);

    return date;
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

// def a function to parse a time string to a Date object
// this is super helpful to pass the current appointment time to the time picker
//  in the edit appointment form in the EditAppointmentScreen
export const parseTimeStringToDate = (timeString: string): Date => {
    const [timePart, timezone] = timeString.split(" ");
    const [hours, minutes, seconds] = timePart.split(":").map(Number);

    // Create a new Date object for today
    const date = new Date();
    date.setUTCHours(hours, minutes, seconds, 0); // Set the time to the UTC equivalent

    // Handle timezone offset dynamically
    const match = timezone.match(/GMT([+-])(\d{2})(\d{2})/);
    if (match) {
        const sign = match[1] === "+" ? 1 : -1;
        const offsetHours = parseInt(match[2], 10);
        const offsetMinutes = parseInt(match[3], 10);

        // Calculate the total offset in minutes
        const totalOffsetMinutes = sign * (offsetHours * 60 + offsetMinutes);

        // Adjust the date by the offset
        date.setMinutes(date.getMinutes() - totalOffsetMinutes);
    }

    return date;
};
