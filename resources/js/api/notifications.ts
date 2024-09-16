export const showNotificationCounterUp = async (id: number) =>
{
    try {
        return window.axios.post(`/api/notifications/counter-up/${id}`);
    } catch (error) {
        console.error('Ошибка при увеличении счетчика уведомлений: ', error);
    }
}

