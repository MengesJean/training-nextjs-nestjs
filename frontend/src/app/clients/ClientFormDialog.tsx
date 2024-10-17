"use client";

import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import ClientForm from "@/app/clients/ClientForm";
import React, {useState} from "react";
import {toast} from "sonner";

const ClientFormDialog = ({client, callback, label}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleCallback = async (values) => {
        const response = await callback(values);
        if(response.success) {
            toast.success("Client saved");
            setIsOpen(false);
        } else {
            toast.error(response.error);
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild={true}>
                <DialogTrigger>
                    {label}
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    {client ? (
                        <DialogTitle>Edit {client.name}</DialogTitle>
                    ) : (
                        <DialogTitle>Create new client</DialogTitle>
                    )}
                </DialogHeader>
                <DialogBody>
                    <ClientForm client={client} callback={handleCallback}/>
                </DialogBody>
            </DialogContent>
        </Dialog>
    );
};

export default ClientFormDialog;