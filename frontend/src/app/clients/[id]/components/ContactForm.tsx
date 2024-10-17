"use client";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createContact} from "@/lib/actions/contact.actions";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import React, {useState} from "react";
import {toast} from "sonner";

const contactSchema = z.object({
    firstName: z.string().min(3, {
        message: "First name is too short (3 min)",
    }).max(255, {
        message: "First name is too long (255 max)",
    }),
    lastName: z.string().min(3, {
        message: "Last name is too short (3 min)",
    }).max(255, {
        message: "Last name is too long (255 max)",
    }),
    email: z.string().email({
        message: "Email is not valid",
    }),
    phone: z.string().min(3, {
        message: "Phone is too short (3 min)",
    }).max(255, {
        message: "Phone is too long (255 max)",
    }),
})

const ContactForm = ({client}) => {
    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        }
    });

    const [isOpen, setIsOpen] = useState(false);

    const onSubmit = async (values: z.infer<typeof contactSchema>)=> {

        const contact = await createContact(values, client);
        if(contact) {
            toast("Error while sending the form", {
                description: contact.error
            });
        } else {
            setIsOpen(false);
            form.reset();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild={true}>
                <DialogTrigger>
                    Add contact
                </DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add a new contact</DialogTitle>
                    <DialogDescription>Enter these informations to create a new contact
                        to {client.name}</DialogDescription>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    name={"firstName"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Firstname</FormLabel>
                                            <FormControl>
                                                <Input placeholder={"Firstname"} {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    name={"lastName"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Lastname</FormLabel>
                                            <FormControl>
                                                <Input placeholder={"Lastname"} {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField
                                    name={"email"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder={"Email"} type={"email"} {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                                <FormField
                                    name={"phone"}
                                    control={form.control}
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Phone</FormLabel>
                                            <FormControl>
                                                <Input placeholder={"Phone"} {...field}/>
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}/>
                            </div>
                            <Button type={"submit"}>Submit</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ContactForm;