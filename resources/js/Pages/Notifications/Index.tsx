import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import { Notification, PageProps } from "@/types";
import NotificationCard from "@/Components/NotificationCard";
import NotificationForm from "@/Components/CreateNotificationForm";

export default function Index({
    notifications,
}: PageProps<{ notifications: Notification[] }>) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout>
            <Head title="Уведомления" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <NotificationForm />
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {notifications.map((notification) => (
                        <NotificationCard
                            key={notification.id}
                            notification={notification}
                        />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
