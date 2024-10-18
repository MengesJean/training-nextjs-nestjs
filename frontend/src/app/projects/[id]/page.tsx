import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {cn, dateFormater, status} from "@/lib/utils";
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
import {buttonVariants} from "@/components/ui/button";
import {Project} from "@/lib/types/project.type";
import Link from "next/link";
import {deleteProject, updateProject} from "@/lib/actions/project.actions";
import FormDialog from "@/components/FormDialog";
import ProjectForm from "@/app/projects/[id]/components/ProjectForm";
import {Badge} from "@/components/ui/badge";

const Page = async ({params}: { params: { id: string } }) => {
    const project = await fetch(`${process.env.API_URL}/projects/${params.id}`, {
        next: {
            tags: ['projects']
        }
    });
    const data: Project = await project.json();
    const currentStatus = status.find((stat) => {
        return stat.value === data.status
    });
    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold">{data.name}</h1>
                {currentStatus && (
                    <Badge variant={currentStatus.variant} className={"px-3 py-2 text-base"}>{currentStatus.name}</Badge>
                )}
            </div>
            <div className="my-4">
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Informations</CardTitle>
                            <CardDescription>{data.description}</CardDescription>
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
                                <li>
                                    <span className="font-semibold">Client: </span>
                                    <Link href={`/clients/${data.client.id}`}>{data.client.name}</Link>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter className="space-x-2">
                            <FormDialog data={data} callback={updateProject} label={"Edit"} FormComponent={ProjectForm}/>
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
                                            <DeleteButton item={data} callback={deleteProject}>
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
                </div>
            </div>
        </div>
    );
};

export default Page;