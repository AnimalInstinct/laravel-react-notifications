import { post } from "@/utils/axios";

export const showNotificationCounterUp = async (id: number) =>
{
    try {
        return post(`/notifications/counter-up/${id}`);
    } catch (error) {
        console.log('Ошибка при увеличении счетчика уведомлений: ', error);
    }
}

