"use client";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Project} from "@/lib/types/project.type";
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import useSWR from "swr";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {status} from "@/lib/utils";

const projectSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(3, {
        message: "Name must be at least 3 characters"
    }).max(255),
    description: z.string().min(3, {
        message: "Description must be at least 3 characters"
    }).max(500),
    status: z.string().optional(),
    clientId: z.string()
})

type ProjectFormProps = {
    data: Project | null;
    callback: (values: z.infer<typeof projectSchema>) => void;
}


const ProjectForm = ({data = null, callback}: ProjectFormProps) => {
    const [clients, setClients] = useState([]);

    const fetcher = (url) => {
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setClients(data);
            });
    }

    const formConfig = {
        resolver: zodResolver(projectSchema),
    }

    if(data) {
        formConfig.defaultValues = {
            id: data.id,
            name: data.name,
            description: data.description,
            clientId: data.client.id.toString(),
            status: data.status?.toString()
        }
    }
    const {error} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/clients/`, fetcher);

    const form = useForm<z.infer<typeof projectSchema>>(formConfig);

    const onSubmit = async (values: z.infer<typeof projectSchema>) => {
        await callback(values);
    }
    if(error) {
        return <div>Error</div>
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
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <FormField
                    name={"description"}
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder={"Description"} {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <FormField
                    name={"clientId"}
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a client" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {clients.map((client) => (
                                        <SelectItem key={client.id} value={client.id.toString()}>
                                            {client.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <FormField
                    name={"status"}
                    control={form.control}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {status.map((state) => (
                                        <SelectItem key={state.value} value={state.value.toString()}>
                                            {state.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default ProjectForm;