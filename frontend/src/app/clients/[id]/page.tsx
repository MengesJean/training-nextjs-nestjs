import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {dateFormater} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Contact} from "@/lib/types/contact.type";
import {Client} from "@/lib/types/client.type";
import {deleteClient} from "@/lib/actions/client.actions";
import React from "react";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import DeleteButton from "@/app/clients/[id]/components/DeleteButton";

const Page = async ({params}: { params: { id: string } }) => {
    const client = await fetch(`${process.env.API_URL}/clients/${params.id}`);
    const data: Client = await client.json();

    const handleDelete = async () => {
        "use server";
        await deleteClient(data.id);
    }

    return (
        <div>
            <h1 className="text-4xl font-bold">{data.name}</h1>
            <div className="my-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations</CardTitle>
                            <CardDescription>Global information about the client</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li><span className="font-semibold">Name: </span>{data.name}</li>
                                <li><span
                                    className="font-semibold">Created at: </span>{dateFormater({dateString: data.createdAt.toString()})}
                                </li>
                                <li><span
                                    className="font-semibold">Updated at: </span>{dateFormater({dateString: data.updatedAt.toString()})}
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter className="space-x-2">
                            <Button>Edit</Button>
                            <Drawer>
                                <Button variant="destructive" asChild={true}>
                                    <DrawerTrigger>
                                        Delete
                                    </DrawerTrigger>
                                </Button>
                                <DrawerContent>
                                    <div className={"max-w-md mx-auto"}>
                                        <DrawerHeader>
                                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                            <DrawerDescription>You cannot come back after this.</DrawerDescription>
                                        </DrawerHeader>
                                        <DrawerFooter>
                                            <DeleteButton id={data.id}/>
                                            <Button variant="outline" asChild={true}>
                                                <DrawerClose>
                                                    Cancel
                                                </DrawerClose>
                                            </Button>
                                        </DrawerFooter>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </CardFooter>
                    </Card>
                    {!!data.contacts.length && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Contacts</CardTitle>
                                <CardDescription>Address information</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {data.contacts.map((contact: Contact) => (
                                        <Card key={contact.id}>
                                            <CardHeader>
                                                <CardTitle
                                                    className={"text-xl"}>{contact.firstName} {contact.lastName}</CardTitle>
                                                <CardDescription>{contact.email}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <ul className="space-y-2">
                                                    <li><span className="font-semibold">Email: </span>{contact.email}
                                                    </li>
                                                    <li><span className="font-semibold">Phone: </span>{contact.phone}
                                                    </li>
                                                </ul>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;