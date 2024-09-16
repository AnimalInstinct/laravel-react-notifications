import { showNotificationCounterUp } from "@/api/notifications";
import { Notification } from "@/types";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
    notifications: Notification[];
    children: React.ReactNode;
    showAll?: boolean;
};

const NotificationsProvider = ({children, notifications: propsNotifications, showAll = false}: Props) => {
    const [toastIndex, setToastIndex] = useState(0);

    const [notifications, setNotifications] = useState<Notification[]>(
        (propsNotifications as Notification[]) ?? []
    );

    const showToast = (notification: Notification) => {
        if (notification) {
            const newToast = () =>
                toast(notification.message, {
                    type: "success",
                    autoClose: 3000,
                    position: "bottom-right",
                });
            newToast();
            showNotificationCounterUp(notification.id);
        }
    };

    const notificationHandler = ({notification}:{notification: Notification}) => {
        notification && showToast(notification);
    }

    useEffect(() => {
        if (!window) return;
        document.onreadystatechange = function () {
            if (document.readyState === "complete") {
                window.Echo.private("notification.public").listen(
                    "NotificationCreated",
                    notificationHandler
                );
            }
        };
    }, []);

    useEffect(() => {
        if (!showAll) return;

        if (toastIndex < notifications.length) {
            const notification = notifications[toastIndex];

            if (notification) {
               showToast(notification);

                const timeoutId = setTimeout(() => {
                    setToastIndex((prevIndex) => prevIndex + 1);
                }, 3000);

                return () => clearTimeout(timeoutId);
            }
        }
    }, [toastIndex]);

    return (
        <div>
            <ToastContainer />
            {children}
        </div>
    );
};

export default NotificationsProvider;
