"use server";

import {revalidateTag} from "next/cache";

export const createContact = async (contact) => {
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
        return {
            success: true,
        }
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