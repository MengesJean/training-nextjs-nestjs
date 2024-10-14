import {Contact} from "@/lib/types/contact.type";

export type Client = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    contacts: Contact[];
}