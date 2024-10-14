"use client";
import {ColumnDef} from "@tanstack/react-table";
import {Client} from "@/lib/types/client.type";
import {Button} from "@/components/ui/button";
import {ArrowUpDown} from "lucide-react";
import React from "react";

export const columns: ColumnDef<Client>[] = [
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
        accessorKey: 'createdAt',
        header: 'Created At'
    },
    {
        accessorKey: 'updatedAt',
        header: 'Updated At'
    },
    {
        accessorKey: "actions",
        header: 'Actions',
    }
];