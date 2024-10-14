"use client";
import React from 'react';
import {Button} from "@/components/ui/button";
import {deleteClient} from "@/lib/actions/client.actions";

const DeleteButton = ({id}) => {
    const handleDelete = async () => {
        await deleteClient(id);
    }
    return (
            <Button
                className={"w-full"}
                variant="destructive"
                type={"submit"}
                onClick={handleDelete}
            >
                Delete
            </Button>
    );
};

export default DeleteButton;