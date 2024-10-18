import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {cn, dateFormater} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {Contact} from "@/lib/types/contact.type";
import {Client} from "@/lib/types/client.type";
import {deleteClient, updateClient} from "@/lib/actions/client.actions";
import React, {Fragment} from "react";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription, DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import DeleteButton from "@/components/clients/DeleteButton";
import ContactForm from "@/app/clients/[id]/components/ContactForm";
import {createContact, deleteContact} from "@/lib/actions/contact.actions";
import {buttonVariants} from "@/components/ui/button";
import {X} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {DialogBody} from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import Projects from "@/app/clients/[id]/components/Projects";
import FormDialog from "@/components/FormDialog";
import ClientForm from "@/app/clients/ClientForm";

const Page = async ({params}: { params: { id: string } }) => {
    const client = await fetch(`${process.env.API_URL}/clients/${params.id}`, {
        next: {
            tags: ['clients']
        }
    });
    const data: Client = await client.json();

    return (
        <div>
            <h1 className="text-4xl font-bold">{data.name}</h1>
            <div className="my-4">
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations</CardTitle>
                            <CardDescription>Global information about the client</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                <li><span className="font-semibold">Name: </span>{data.name}</li>
                                <li><span
                                    className="font-semibold">Created at: </span>{dateFormater({
                                    dateString: data.createdAt.toString(),
                                    formatString: "dd/MM/yyyy HH:mm"
                                })}
                                </li>
                                <li><span
                                    className="font-semibold">Updated at: </span>{dateFormater({
                                    dateString: data.updatedAt.toString(),
                                    formatString: "dd/MM/yyyy HH:mm"
                                })}
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter className="space-x-2">
                            <FormDialog data={data} callback={updateClient} label={"Edit"} FormComponent={ClientForm}/>
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
                                            <DeleteButton item={data} callback={deleteClient}>
                                                <span
                                                    className={cn(buttonVariants({variant: "destructive"}), "w-full")}>
                                                    Delete
                                                </span>
                                            </DeleteButton>
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
                    <Card>
                        <CardHeader>
                            <CardTitle>Contacts</CardTitle>
                            <CardDescription>Contacts you have in <span
                                className="font-semibold">{data.name}</span>.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {!!data.contacts.length ? (
                                <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {data.contacts.map((contact: Contact) => (
                                        <Fragment key={contact.id}>
                                            <Card className={"relative"}>
                                                <Dialog>
                                                    <DialogTrigger className={"text-left"}>
                                                        <CardHeader>
                                                            <CardTitle
                                                                className={"text-xl"}>{contact.firstName} {contact.lastName}</CardTitle>
                                                            <CardDescription>{contact.email}</CardDescription>

                                                        </CardHeader>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>{contact.firstName} {contact.lastName}</DialogTitle>
                                                        </DialogHeader>
                                                        <DialogBody>
                                                            <ul>
                                                                <li>
                                                                    <span
                                                                        className={"font-bold"}>Email : </span> {contact.email}
                                                                </li>
                                                                <li>
                                                                    <span
                                                                        className={"font-bold"}>Phone : </span> {contact.phone}
                                                                </li>
                                                            </ul>
                                                        </DialogBody>
                                                    </DialogContent>
                                                </Dialog>
                                                <Drawer>
                                                    <span className={"absolute right-2 top-2"}>
                                                        <DrawerTrigger>
                                                            <X/>
                                                        </DrawerTrigger>
                                                    </span>
                                                    <DrawerContent>
                                                        <div className={"max-w-md mx-auto"}>
                                                            <DrawerHeader>
                                                                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                                                                <DrawerDescription>You cannot come back after
                                                                    this.</DrawerDescription>
                                                            </DrawerHeader>
                                                            <DrawerFooter>
                                                                <DeleteButton item={contact} callback={deleteContact}>
                                                                                <span
                                                                                    className={cn(buttonVariants({variant: "destructive"}), "w-full")}>
                                                                                    Delete
                                                                                </span>
                                                                </DeleteButton>
                                                                <Button variant="outline" asChild={true}>
                                                                    <DrawerClose>
                                                                        Cancel
                                                                    </DrawerClose>
                                                                </Button>
                                                            </DrawerFooter>
                                                        </div>
                                                    </DrawerContent>
                                                </Drawer>
                                            </Card>
                                        </Fragment>
                                    ))}
                                </div>
                            ) : (
                                <p className="font-semibold">No contacts found.</p>
                            )}
                        </CardContent>
                        <CardFooter>
                            <FormDialog data={{client: data}} callback={createContact} FormComponent={ContactForm} label={"Add new contact"}/>
                        </CardFooter>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Projects</CardTitle>
                            <CardDescription>Projects you have with <span
                                className="font-semibold">{data.name}</span>.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div>
                                {data.projects ? (
                                    <Projects projects={data.projects}/>
                                ) : (
                                    <p className="font-semibold">No projects found.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Page;