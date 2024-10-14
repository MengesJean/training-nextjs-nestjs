"use client";
import React from 'react';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {createClient} from "@/lib/actions/client.actions";



const clientSchema = z.object({
    name: z.string().min(3, {
        message: "Name is too short (3 min)",
    }).max(255, {
        message: "Name is too long (255 max)",
    }),
});



const CreateForm = () => {
    const form = useForm<z.infer<typeof clientSchema>>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            name: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof clientSchema>) => {
        console.log(values);
        const response = await createClient(values);
        console.log(response);

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    name={"name"}
                    control={form.control}
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input placeholder={"Name"} {...field}/>
                        </FormControl>
                        <FormDescription>
                            This is the client name.
                        </FormDescription>
                        <FormMessage/>
                    </FormItem>
                )}/>
                <Button type={"submit"}>Submit</Button>
            </form>
        </Form>
    );
};

export default CreateForm;