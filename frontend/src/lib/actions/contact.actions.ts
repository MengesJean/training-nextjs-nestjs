"use server";

import {redirect} from "next/navigation";
import {revalidateTag} from "next/cache";

export const createContact = async (contact, client) => {
    contact.client = client;
    const response = await fetch(`${process.env.API_URL}/contacts`, {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
            "Content-Type": "application/json"
        },
    })
    const json = await response.json();
    if(json.statusCode !== 400) {
        revalidateTag("clients");
        redirect(`/clients/${client.id}`);
    } else {
        return {
            error: json.message,
            success: false
        }
    }
}

export const deleteContact = async (contact) => {
    const response = await fetch(`${process.env.API_URL}/contacts/${contact.id}`, {
        method: "DELETE"
    })
    const json = response.json();

    if(json) {
        revalidateTag("clients");
    }
}