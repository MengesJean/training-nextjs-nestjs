import {Client} from "@/lib/types/client.type";

export type Contact = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    clientId: number;
    client: Client;
}