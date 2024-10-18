"use client";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import React from "react";
import {Project} from "@/lib/types/project.type";
import {cn, status} from "@/lib/utils";

export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: 'id',
        cell: ({cell}) => {
          return <span className={"px-4 font-semibold"}>{cell.row.original.id}</span>
        },
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
    },
    {
        accessorKey: 'name',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
    },
    {
        accessorKey: 'client',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Client
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({cell}) => {
            return <span className={"px-4 font-semibold"}>{cell.row.original.client.name}</span>
        },
    },
    {
        accessorKey: 'status',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Client
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({cell}) => {
            const currentStatus = status.find((stat) => stat.value === cell.row.original.status);
            console.log(currentStatus)
            if(currentStatus) {
                return <span className={"px-4 font-semibold flex items-center"}>
                    <span className={"rounded-full w-4 h-4 inline-block mr-2"} style={{backgroundColor: `hsl(var(--${currentStatus.variant}))`}}></span>
                    {currentStatus.name}
                </span>
            }
            return <></>
        },
    },
    {
        accessorKey: 'createdAt',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
    },
    {
        accessorKey: 'updatedAt',
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Updated At
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        }
    },
    {
        accessorKey: "actions",
        header: 'Actions',
    }
];