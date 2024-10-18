"use client";

import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import React, {useState} from "react";
import {toast} from "sonner";

const FormDialog = ({data, callback, label, form}) => {
    const [isOpen, setIsOpen] = useState(false);
    const FormComponent = form;

    const handleCallback = async (values) => {
        const response = await callback(values);
        if(response.success) {
            toast.success("Saved !");
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
                        <DialogTitle>Create new</DialogTitle>
                    )}
                </DialogHeader>
                <DialogContent>
                    <FormComponent data={data} callback={handleCallback}/>
                </DialogContent>
            </DialogContent>
        </Dialog>
    );
};

export default FormDialog;