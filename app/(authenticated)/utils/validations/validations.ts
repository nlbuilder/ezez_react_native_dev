import { Alert } from "react-native";

// Validation function for appointment creation
export const validateAppointmentDetails = (
    phoneNumber: string,
    numberOfPeople: string,
    note: string,
    chosenService: string
): boolean => {
    const phoneNumberRegex = /^\d{10,15}$/;
    // const nameRegex = /^[a-zA-Z\s]{2,50}$/;

    if (!phoneNumberRegex.test(phoneNumber)) {
        Alert.alert(
            "Invalid Phone Number",
            "Phone number must be 10-15 digits with no spaces or special characters. Please check your input."
        );
        return false;
    }

    const peopleCount = parseInt(numberOfPeople, 10);
    if (isNaN(peopleCount) || peopleCount < 1 || peopleCount > 100) {
        Alert.alert("Invalid Number of People", "Please check your input.");
        return false;
    }

    if (note.length > 100) {
        Alert.alert(
            "Note Too Long",
            "Note must be under 100 characters. Please check your input."
        );
        return false;
    }

    if (!chosenService) {
        Alert.alert("Invalid Service", "Please select a valid service.");
        return false;
    }

    return true;
};

export const validatePassword = (
    password: string
): { isValid: boolean; message: string } => {
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

    return { isValid: true, message: "Password is valid." };
};

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

export const validateStaffInfo = (
    firstName: string,
    phoneNumber: string,
    email: string,
    role: string
): { isValid: boolean; message: string } => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    const phoneRegex = /^\d{10,15}$/;
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
            message:
                "Phone number must contain 10-15 digits. Please check your input.",
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
