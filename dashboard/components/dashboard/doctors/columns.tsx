"use client"

import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react";
import { doctorSchema } from '@/lib/schemas/all'

export type Doctors = z.infer<typeof doctorSchema>;

export const columns: ColumnDef<Doctors>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <div className="flex justify-center items-center">
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: info => (
            <div className="flex justify-center items-center">
                {info.getValue<string>()}
            </div>
        )
    },
    {
        accessorKey: "specialty",
        header: ({ column }) => (
            <div className="flex justify-center items-center">
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Especialidade
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: info => (
            <div className="flex justify-center items-center">
                {info.getValue<string>()}
            </div>
        )
    },
    {
        accessorKey: "state",
        header: ({ column }) => (
            <div className="flex justify-center items-center">
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Estado
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: info => (
            <div className="flex justify-center items-center">
                {info.getValue<string>()}
            </div>
        )
    },
    {
        accessorKey: "crm",
        header: ({ column }) => (
            <div className="flex justify-center items-center">
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    CRM
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: info => (
            <div className="flex justify-center items-center">
                {info.getValue<string>()}
            </div>
        )
    },
    {
        accessorKey: "phone",
        header: ({ column }) => (
            <div className="flex justify-center items-center">
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Telefone
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: info => {
            const value = info.getValue<string>();
            return (
                <div className="flex justify-center items-center">
                    <span className={value ? "" : "text-gray-500"}>
                        {value || "Não informado"}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <div className="flex justify-center items-center">
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    E-mail
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: info => {
            const value = info.getValue<string>();
            return (
                <div className="flex justify-center items-center">
                    <span className={value ? "" : "text-gray-500"}>
                        {value || "Não informado"}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "visibility",
        header: ({ column }) => (
            <div className="flex justify-center items-center">
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Visibilidade
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        ),
        cell: info => {
            const visibility = info.getValue<boolean>();
            return (
                <div className="flex justify-center items-center">
                    {visibility ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                    )}
                </div>
            );
        },
    },
];
