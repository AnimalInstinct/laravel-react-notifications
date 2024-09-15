import React from "react";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "@inertiajs/react";
import { NotificationFormFields } from "@/types";

export default function NotificationForm() {
    const { data, setData, post, processing, reset, errors } =
        useForm<NotificationFormFields>({
            title: "",
            message: "",
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("notifications.store"), {
            onSuccess: () => reset(),
            onError: (e) => console.error(e),
        });
    };

    return (
        <form onSubmit={submit}>
            <input
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                value={data.title}
                placeholder="Название уведомления"
                onChange={(e) => setData("title", e.target.value)}
            />
            <textarea
                value={data.message}
                placeholder="Напишите текст уведомления"
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                onChange={(e) => setData("message", e.target.value)}
            ></textarea>
            <InputError message={errors.message} className="mt-2" />
            <PrimaryButton className="mt-4" disabled={processing}>
                Добавить уведомление
            </PrimaryButton>
        </form>
    );
}
