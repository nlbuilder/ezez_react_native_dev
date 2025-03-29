// def a function to validate sign in form
export const validateSignInForm = (
    email: string,
    password: string
): { isValid: boolean; message: string } => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;

    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: "Invalid Email. Please check your input.",
        };
    }

    if (password.length < 8) {
        return {
            isValid: false,
            message: "Invalid Password. Please check your input.",
        };
    }

    return { isValid: true, message: "Sign in form is valid." };
};

// def a function to validate sign up form
export const validateSignUpForm = (
    email: string,
    password: string,
    confirmPassword: string
): { isValid: boolean; message: string } => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;

    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: "Invalid Email. Please check your input.",
        };
    }

    // Password validation
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasNoSpaces = !/\s/.test(password);

    if (password.length < minLength) {
        return {
            isValid: false,
            message:
                "Password must be at least 8 characters long. Please check your input.",
        };
    }
    if (!hasUppercase) {
        return {
            isValid: false,
            message:
                "Password must contain at least one uppercase letter. Please check your input.",
        };
    }
    if (!hasLowercase) {
        return {
            isValid: false,
            message:
                "Password must contain at least one lowercase letter. Please check your input.",
        };
    }
    if (!hasNumber) {
        return {
            isValid: false,
            message:
                "Password must contain at least one numeric digit. Please check your input.",
        };
    }
    if (!hasSpecialChar) {
        return {
            isValid: false,
            message:
                "Password must contain at least one special character. Please check your input.",
        };
    }
    if (!hasNoSpaces) {
        return {
            isValid: false,
            message:
                "Password must not contain spaces. Please check your input.",
        };
    }

    // confirm password validation
    if (password !== confirmPassword) {
        return {
            isValid: false,
            message: "Passwords do not match. Please check your input.",
        };
    }

    return { isValid: true, message: "Password is valid." };
};

// def a function to validate reset password form
export const validateEmailFormat = (
    email: string
): { isValid: boolean; message: string } => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;

    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: "Invalid Email. Please check your input.",
        };
    }

    return { isValid: true, message: "Reset form is valid." };
};

// function isTimeWithinRange(
//     timeString: string,
//     startTime: string,
//     endTime: string,
//     timeNow: string
// ): boolean {
//     // Convert times to Date objects on the same day for comparison
//     const [today] = new Date().toISOString().split("T"); // Get today's date in "YYYY-MM-DD" format

//     const timeStart = new Date(`${today} ${startTime}`);
//     const timeFinish = new Date(`${today} ${endTime}`);
//     const appointmentTime = new Date(`${today} ${timeString}`);
//     const timeNowIs = new Date(`${today} ${timeNow}`);

//     console.log("timeString", timeString);

//     console.log(timeStart);
//     console.log(timeFinish);
//     console.log(appointmentTime);
//     console.log(timeNowIs);

//     // Compare times
//     return appointmentTime >= timeStart && appointmentTime <= timeFinish;
// }

// function isTimeWithinRange(
//     timeString: string,
//     startTime: string,
//     endTime: string,
//     timeNow: string
// ): boolean {
//     // Helper function to convert "h:mm AM/PM" to "HH:mm"
//     const convertTo24HourFormat = (time: string): string => {
//         const [timePart, modifier] = time.split(" ");
//         let [hours, minutes] = timePart.split(":").map(Number);

//         if (modifier === "PM" && hours < 12) {
//             hours += 12;
//         } else if (modifier === "AM" && hours === 12) {
//             hours = 0;
//         }

//         return `${hours.toString().padStart(2, "0")}:${minutes
//             .toString()
//             .padStart(2, "0")}`;
//     };

//     // Convert times to Date objects on the same day for comparison
//     const [today] = new Date().toISOString().split("T"); // Get today's date in "YYYY-MM-DD" format

//     const timeStart = new Date(`${today} ${convertTo24HourFormat(startTime)}`);
//     const timeFinish = new Date(`${today} ${convertTo24HourFormat(endTime)}`);
//     const appointmentTime = new Date(
//         `${today} ${convertTo24HourFormat(timeString)}`
//     );
//     const timeNowIs = new Date(`${today} ${convertTo24HourFormat(timeNow)}`);

//     console.log("timeStart: ", timeStart);
//     console.log("timeFinish: ", timeFinish);
//     console.log("appointmentTime: ", appointmentTime);
//     console.log("timeNowIs: ", timeNowIs);

//     console.log("startTime: ", startTime);
//     console.log("endTime: ", endTime);
//     console.log("timeString: ", timeString);
//     console.log("timeNow: ", timeNow);

//     // Compare times
//     return (
//         appointmentTime >= timeStart &&
//         appointmentTime <= timeFinish &&
//         appointmentTime >= timeNowIs
//     );
// }

// I definitely need to have a look at this function again
// the issue is that the time comparison is not working as expected
function isTimeWithinRange(
    timeString: string,
    startTime: string,
    endTime: string,
    timeNow: string
): boolean {
    // Helper function to convert "h:mm AM/PM" to minutes since midnight
    const convertToMinutes = (time: string): number => {
        const [timePart, modifier] = time.split(" ");
        let [hours, minutes] = timePart.split(":").map(Number);

        if (modifier === "PM" && hours < 12) {
            hours += 12;
        } else if (modifier === "AM" && hours === 12) {
            hours = 0;
        }

        return hours * 60 + minutes;
    };

    // Convert times to minutes since midnight
    const startMinutes = convertToMinutes(startTime);
    const endMinutes = convertToMinutes(endTime);
    const appointmentMinutes = convertToMinutes(timeString);
    const nowMinutes = convertToMinutes(timeNow);

    // Log for debugging
    console.log("startMinutes: ", startMinutes);
    console.log("endMinutes: ", endMinutes);
    console.log("appointmentMinutes: ", appointmentMinutes);
    console.log("nowMinutes: ", nowMinutes);

    // Check if the time is within the range
    return (
        appointmentMinutes >= startMinutes &&
        appointmentMinutes <= endMinutes &&
        appointmentMinutes >= nowMinutes
    );
}

// def a function to validate appointment creation
export const validateAppointmentDetails = (
    appointmentDate: Date,
    timeString: string,
    startTime: string,
    finishTime: string,
    timeNow: string,
    phoneNumber: string,
    numberOfPeople: string,
    note: string,
    chosenService: string
): { isValid: boolean; message: string } => {
    // check if the date is in the past
    const today = new Date();

    appointmentDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (appointmentDate < today) {
        return {
            isValid: false,
            message:
                "Invalid Date. Date must not be in the past. Please check your input.",
        };
    }

    const result = isTimeWithinRange(
        timeString,
        startTime,
        finishTime,
        timeNow
    );

    if (!result) {
        return {
            isValid: false,
            message:
                "Invalid Time. Time must be within the business hours and must not be in the past. Please check your input.",
        };
    }

    const phoneNumberRegex = /^\d{6,15}$/;
    // const nameRegex = /^[a-zA-Z\s]{2,50}$/;

    if (!phoneNumberRegex.test(phoneNumber)) {
        return {
            isValid: false,
            message: "Invalid Phone Number. Please check your input.",
        };
    }

    const peopleCount = parseInt(numberOfPeople, 10);
    console.log(peopleCount);

    if (isNaN(peopleCount) || peopleCount < 1 || peopleCount > 50) {
        return {
            isValid: false,
            message: "Invalid Number of People. Please check your input.",
        };
    }

    if (note.length > 100) {
        return {
            isValid: false,
            message:
                "Invalid Note. Note must be under 100 characters. Please check your input.",
        };
    }

    return { isValid: true, message: "Appointment details are valid." };
};

// def a function to validate service info creation
export const validateServiceInfo = (
    serviceName: string,
    price: string,
    note: string
): { isValid: boolean; message: string } => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;

    if (!nameRegex.test(serviceName)) {
        return {
            isValid: false,
            message:
                "Service name must be 2-50 alphabetic characters. Please check your input.",
        };
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
        return {
            isValid: false,
            message:
                "Price must be a positive number. Please check your input.",
        };
    }

    if (note.length > 100) {
        return {
            isValid: false,
            message:
                "Note must be under 100 characters. Please check your input.",
        };
    }

    return { isValid: true, message: "Service info is valid." };
};

// def a function to validate staff info creation
export const validateStaffInfo = (
    firstName: string,
    phoneNumber: string,
    email: string,
    role: string
): { isValid: boolean; message: string } => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^\d{6,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(firstName)) {
        return {
            isValid: false,
            message:
                "First name must be alphabetic and 2-50 characters long. Please check your input.",
        };
    }

    if (!phoneRegex.test(phoneNumber)) {
        return {
            isValid: false,
            message: "Invalid Phone Number. Please check your input.",
        };
    }

    if (!emailRegex.test(email)) {
        return {
            isValid: false,
            message: "Invalid email format. Please check your input.",
        };
    }

    if (!role) {
        return {
            isValid: false,
            message: "Role is required. Please check your input.",
        };
    }

    return { isValid: true, message: "Staff info is valid." };
};
