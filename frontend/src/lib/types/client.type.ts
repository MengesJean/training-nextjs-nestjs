import {Contact} from "@/lib/types/contact.type";
import {Project} from "@/lib/types/project.type";

export type Client = {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    contacts: Contact[];
    projects: Project[];
}