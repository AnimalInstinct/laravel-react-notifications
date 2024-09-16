import React from "react";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "@inertiajs/react";
import { Notification, NotificationFormFields } from "@/types";

type Props = {
    notification: Notification;
    onCancel: () => void;
    onSuccess: () => void;
};

export default function EditNotificationForm(props: Props) {
    const { data, setData, patch, processing, reset, errors, clearErrors } =
        useForm<NotificationFormFields>({
            title: props.notification.title,
            message: props.notification.message,
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route("notifications.update", props.notification.id), {
            onSuccess: props.onSuccess,
        });
    };
    const cancelHandler = () => {
        reset();
        clearErrors();
        props.onCancel();
    };

    return (
        <form onSubmit={submit}>
            <input
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                value={data.title}
                placeholder="Название уведомления"
                onChange={(e) => setData("title", e.target.value)}
            />
            <InputError message={errors.title} className="mt-2" />
            <textarea
                value={data.message}
                onChange={(e) => setData("message", e.target.value)}
                className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            ></textarea>
            <InputError message={errors.message} className="mt-2" />
            <div className="space-x-2">
                <PrimaryButton disabled={processing} className="mt-4">
                    Сохранить
                </PrimaryButton>
                <button className="mt-4" onClick={cancelHandler}>
                    Отмена
                </button>
            </div>
        </form>
    );
}
