export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export type Notification = {
    id: number,
    title: string,
    message: string,
    created_at: DateTime
}

export type NotificationFormFields = {
    title: string,
    message: string
}
