import React, { useState } from "react";
import Dropdown from "@/Components/Dropdown";
import { Notification } from "@/types";
import EditNotificationForm from "./EditNotificationForm";

type Props = {
    notification: Notification;
}

export default function NotificationCard({
    notification,
}: Props) {
    const [editing, setEditing] = useState(false);

    const cancelHandler = () => {
        setEditing(false);
    };

    const successHandler = () => {
        setEditing(false);
    };

    return (
        <div className="p-6 flex space-x-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600 -scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
            </svg>
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-gray-800">
                            {notification.title}
                        </span>
                        <small className="ml-2 text-sm text-gray-600">
                            {new Date(notification.created_at).toLocaleString()}
                        </small>
                    </div>
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <button
                                className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out"
                                onClick={() => setEditing(true)}
                            >
                                Редактировать
                            </button>
                            <Dropdown.Link as="button" href={route('notifications.destroy', notification.id)} method="delete">
                                    Удалить
                                </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                </div>
                {editing ? (
                    <EditNotificationForm
                        notification={notification}
                        onSuccess={successHandler}
                        onCancel={cancelHandler}
                    />
                ) : (
                    <p className="mt-4 text-lg text-gray-900">
                        {notification.message}
                    </p>
                )}
            </div>
        </div>
    );
}
