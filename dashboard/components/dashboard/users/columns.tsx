"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { userSchema } from "@/lib/schemas/all";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, CheckCircle, XCircle } from "lucide-react";
import { z } from "zod";

export type User = z.infer<typeof userSchema>;

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "image",
        header: () => (
            <div className="flex justify-center items-center">
                Avatar
            </div>
        ),
        cell: ({ row }) => {
            const user = row.original

            return (
                <div className="flex justify-center items-center">
                    <Avatar>
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                    </Avatar>
                </div>
            );
        }
    },
    {
        accessorKey: "name",
        header: () => (
            <div className="flex justify-center items-center">
                Nome
            </div>
        ),
        cell: ({ row }) => {
            const user = row.original

            return (
                <div className="flex justify-center items-center">
                    <span className={user.name ? "" : "text-gray-500"}>
                        {user.name || "Não informado"}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: "username",
        header: () => (
            <div className="flex justify-center items-center">
                Username
            </div>
        ),
        cell: ({ row }) => {
            const user = row.original
            return (
                <div className="flex justify-center items-center">
                    <span>{user.username}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const user = row.original;

            return (
                <div className="flex justify-center items-center">
                    <span className={`${user.email ? "" : "text-gray-500"} select-none`}>
                        {user.email || "Não informado"}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Telefone
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const user = row.original

            return (
                <div className="flex justify-center items-center">
                    <span className={user.phone ? "" : "text-gray-500"}>
                        {user.phone || "Não informado"}
                    </span>
                </div>
            );
        }
    },
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Cargo
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
            const user = row.original

            return (
                <div className="flex justify-center items-center">
                    <Badge
                        className="flex items-center justify-center select-none"
                        variant={
                            user?.role === "root"
                                ? "destructive"
                                : user?.role === "admin"
                                    ? "default"
                                    : "secondary"
                        }
                    >
                        {user?.role}
                    </Badge>
                </div>
            );
        }
    },
    {
        accessorKey: "active",
        header: ({ column }) => {
            return (
                <div className="flex justify-center items-center">
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Ativo
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>

            )
        },
        cell: ({ row }) => {
            const user = row.original

            return (
                <div className="flex justify-center items-center text-center">
                    {user.active ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                    )}
                </div>
            );
        }
    },
]
