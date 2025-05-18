import db from "@/lib/db";
import { DataTable } from "./data-table"
import { User } from "@/lib/types/all";
import { columns } from "./columns";

async function getData(): Promise<User[]> {
    const users = await db.user.findMany({
        select: {
            id: true,
            name: true,
            role: true,
            email: true,
            image: true,
            phone: true,
            username: true,
            active: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    });
    return users.map((user: User) => ({
        id: user.id,
        role: user.role,
        username: user.username,
        active: user.active,
        name: user.name ?? undefined,
        email: user.email ?? undefined,
        image: user.image ?? undefined,
    }));
}

export default async function UsersTable() {
    const data = await getData();

    return (
        <div className=" bg-background">
            <DataTable columns={columns} data={data} />
        </div>
    );
}