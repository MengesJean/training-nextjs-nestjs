import {Client} from "@/lib/types/client.type";

export type Project = {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    client: Client;
    status: number;
}