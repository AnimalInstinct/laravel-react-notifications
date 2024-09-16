import { showNotificationCounterUp } from "@/api/notifications";
import { Notification } from "@/types";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
    notifications: Notification[];
    children: React.ReactNode;
};

const NotificationsProvider = (props: Props) => {
    const [toastIndex, setToastIndex] = useState(0);

    const [notifications, setNotifications] = useState<Notification[]>(
        (props.notifications as Notification[]) ?? []
    );

    const showToast = (notification: Notification) => {
        if (notification) {
            const newToast = () =>
                toast(notification.message, {
                    type: "success",
                    autoClose: 3000,
                });
            newToast();
            setNotifications((prev: Notification[]) => [
                notification,
                ...prev,
            ]);
        }
    };

    const showCounterIncrease = async (id: number) => {
        const res = await showNotificationCounterUp(id);
        console.log("showCounterIncrease::res: ", res);
    };

    const notificationHandler = (e: { notification: Notification }) => {
        showToast(e.notification);
        showCounterIncrease(1);
    };

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
        if (toastIndex < notifications.length) {
            const notification = notifications[toastIndex];

            if (notification) {
                toast(notification.message, {
                    type: "success",
                    autoClose: 3000,
                });

                const timeoutId = setTimeout(() => {
                    setToastIndex((prevIndex) => prevIndex + 1);
                }, 3000);

                return () => clearTimeout(timeoutId);
            }
        }
    }, [toastIndex, notifications]);
    return (
        <div>
            <ToastContainer />
            {props.children}
        </div>
    );
};

export default NotificationsProvider;
