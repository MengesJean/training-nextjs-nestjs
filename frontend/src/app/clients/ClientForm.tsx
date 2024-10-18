"use client";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Client} from "@/lib/types/client.type";



export const clientSchema = z.object({
    name: z.string().min(3, {
        message: "Name is too short (3 min)",
    }).max(255, {
        message: "Name is too long (255 max)",
    }),
    id: z.number().optional(),
});

type ClientFormProps = {
    data: Client | null;
    callback: (values: z.infer<typeof clientSchema>) => void;
}

const ClientForm = ({data = null, callback}: ClientFormProps) => {
    const client = data;
    const form = useForm<z.infer<typeof clientSchema>>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            name: client?.name ?? "",
        },
    })

    const onSubmit = async (values: z.infer<typeof clientSchema>) => {
        if(client?.id) {
            values.id = client.id;
        }
        await callback(values);

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

export default ClientForm;