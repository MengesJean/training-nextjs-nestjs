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
        redirect("/clients/");
    }
}

export const deleteClient = async (id) => {
    const response = await fetch(`${process.env.API_URL}/clients/${id}`, {
        method: "DELETE"
    })
    const json = response.json();
    if(json) {
        revalidateTag("clients");
        redirect("/clients/");
    }
}