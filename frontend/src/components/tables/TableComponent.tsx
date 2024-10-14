"use client";

import {
    ColumnDef, ColumnFiltersState,
    flexRender,
    getCoreRowModel, getFilteredRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable
} from "@tanstack/react-table"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";


interface TableComponentProps {
    columns: [];
    clients: [];
    filterId: string;
    filterName: string;
    slug: string;
}


const TableComponent = ({columns, clients, filterId, filterName, slug }: TableComponentProps) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const table = useReactTable({
        data: clients,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        }
    });
    return (
        <>
            <div className="flex items-center py-4">
                <Input
                    placeholder={`Filter ${filterName}`}
                    value={(table.getColumn(filterId)?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn(filterId)?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
            </div>
            <div className="rounded border my-2">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead className={"px-6 py-4 text-foreground font-semibold"} key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                >
                                    {row.getVisibleCells().map(cell => {
                                        if(cell.column.id === 'actions') {
                                            return (
                                                <TableCell className={"p-6"} key={cell.id}>
                                                    <Button asChild={true}>
                                                        <Link href={`${slug}${row.original.id}`}>
                                                            View
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            )
                                        }
                                        return (
                                            <TableCell className={"p-6"} key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className={"p-6 text-center"}>
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default TableComponent;