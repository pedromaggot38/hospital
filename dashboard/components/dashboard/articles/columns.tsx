'use client'

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react";
import { articleSchema } from "@/lib/schemas/all";
import { CellContext } from '@tanstack/react-table';

export type Articles = z.infer<typeof articleSchema>;

export const columns: ColumnDef<Articles>[] = [
    {
        accessorKey: "title",
        header: "Título",
        cell: info => {
            const value = info.getValue<string>();
            return <div className="line-clamp-2">{value}</div>;
        },
    },
    {
        accessorKey: "author",
        header: "Autor",
    },
    {
        accessorKey: "user.name",
        header: "Criado por",
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Criado em
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <div className="flex justify-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Publicado
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: (info: CellContext<Articles, unknown>) => {
            const status = info.getValue() as 'published' | 'draft';
            const isPublished = status === 'published';

            return (
                <div className="text-center">
                    {isPublished ? (
                        <div className="flex items-center justify-center text-green-500">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-red-500">
                            <XCircle className="w-5 h-5" />
                        </div>
                    )}
                </div>
            );
        }
    },
];