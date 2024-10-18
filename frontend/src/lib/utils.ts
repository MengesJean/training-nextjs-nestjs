import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { parseISO, format } from 'date-fns';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


interface DateFormaterProps {
    dateString: string;
    formatString: string;
}
export const dateFormater = ({dateString, formatString = "dd/MM/yyyy"}: DateFormaterProps ) => {
  const date = parseISO(dateString);
  return format(date, formatString);
}

export const status = [
    {
        value: 1,
        name: 'In discution',
        variant: 'primary',
    },
    {
        value: 2,
        name: 'In progress',
        variant: 'warning',
    },
    {
        value: 3,
        name: 'Done',
        variant: 'success',
    },
    {
        value: 4,
        name: 'Canceled',
        variant: 'destructive',
    },
];