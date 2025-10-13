export interface UserAddress {
    street: string;
    city: string;
    postalCode: string;
    county: string;
}

export interface User {
    id: number;
    username: string;
    email: string;
    address?: UserAddress;
}