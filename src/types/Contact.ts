export type Contact = {
    firstName: string;
    lastName: string;
    age: number;
    photo: string;
};

export type ContactResponse = {
    message: string;
    data: Contact[];
}