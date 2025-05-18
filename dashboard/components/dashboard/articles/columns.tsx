'use client'

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react";
import { articleSchema } from "@/lib/schemas/all";
import { CellContext } from '@tanstack/react-table';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import AvatarDashboard from "../avatar-dashboard";


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
    }, {
        accessorKey: "createdBy",
        header: "Criado por",
        cell: ({ getValue }) => {
            const user = getValue<Articles["createdBy"]>()

            if (!user) return null

            return (
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <span className="cursor-pointer font-semibold">
                            {user.name || `@${user.username}`}
                        </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72 p-4">
                        <div className="flex items-center space-x-4">
                            <AvatarDashboard user={user} />
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-semibold leading-none">{user.name}</p>
                                    <span
                                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold text-white
              ${user.role === "root"
                                                ? "bg-red-600"
                                                : user.role === "admin"
                                                    ? "bg-yellow-600"
                                                    : user.role === "journalist"
                                                        ? "bg-blue-600"
                                                        : "bg-gray-500"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">@{user.username}</p>
                                {user.email && (
                                    <p className="text-sm text-muted-foreground break-all">{user.email}</p>
                                )}
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>

            )
        },
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