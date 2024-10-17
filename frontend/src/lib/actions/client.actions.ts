"use server";

import {redirect} from "next/navigation";
import {revalidateTag} from "next/cache";

export const createClient = async (client) => {
    const response = await fetch(`${process.env.API_URL}/clients`, {
        method: "POST",
        body: JSON.stringify(client),
        headers: {
            "Content-Type": "application/json"
        },
    })
    const json = response.json();
    if(json) {
        revalidateTag("clients");
        return {
            success: true
        }
    }
    return {
        success: false,
        error: "An error occurred. Please try again."
    }
}

export const updateClient = async (client) => {
    const response = await fetch(`${process.env.API_URL}/clients/${client.id}`, {
        method: "PATCH",
        body: JSON.stringify(client),
        headers: {
            "Content-Type": "application/json"
        },
    })
    const json = response.json();
    if(json) {
        revalidateTag("clients");
        return {
            success: true
        }
    }
    return {
        success: false,
        error: "An error occurred. Please try again."
    }
}

export const deleteClient = async (client) => {
    const response = await fetch(`${process.env.API_URL}/clients/${client.id}`, {
        method: "DELETE"
    })
    const json = response.json();
    if(json) {
        revalidateTag("clients");
        redirect("/clients/");
        return {
            success: true
        }
    }
    return {
        success: false,
        error: "An error occurred. Please try again."
    }
}