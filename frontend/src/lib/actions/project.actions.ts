"use server";

import {revalidateTag} from "next/cache";
import {redirect} from "next/navigation";

export const createProject = async (project) => {
    project.client = project.clientId;
    const response = await fetch(`${process.env.API_URL}/projects`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: {
            "Content-Type": "application/json"
        },
    })
    const json = await response.json();
    if(json.statusCode !== 400) {
        revalidateTag("projects");
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

export const updateProject = async (project) => {
    project.client = parseInt(project.clientId);
    project.status = parseInt(project.status);
    const response = await fetch(`${process.env.API_URL}/projects/${project.id}`, {
        method: "PATCH",
        body: JSON.stringify(project),
        headers: {
            "Content-Type": "application/json"
        },
    })
    const json = await response.json();
    if (json.statusCode !== 400) {
        revalidateTag("projects");
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

export const deleteProject = async (project) => {
    const response = await fetch(`${process.env.API_URL}/projects/${project.id}`, {
        method: "DELETE"
    })
    const json = response.json();
    if(json) {
        revalidateTag("projects");
        redirect("/projects/");
        return {
            success: true
        }
    }
    return {
        success: false,
        error: "An error occurred. Please try again."
    }
}