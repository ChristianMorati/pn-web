import { Bounce, toast } from 'react-toastify';

const formatToCurrencyBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

function formatToDateBRL(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(dateObj);
}

export type ToastProps = {
    header?: string;
    text: string;
}

function showToast(type: 'success' | 'error', toastBody: ToastProps | string) {
    const defaultHeader = type === 'error' ? 'Ops...' : 'Sucesso!';

    let header: string = defaultHeader;
    let text: string = '';

    if (typeof toastBody === "object") {
        header = toastBody.header || defaultHeader;
        text = toastBody.text;
    } else {
        text = toastBody;
    }

    toast[type](`${header}\n${text}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
}


function toCapipitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export {
    formatToCurrencyBRL,
    formatToDateBRL,
    showToast,
    toCapipitalize,
}