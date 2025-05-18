import db from "@/lib/db";
import { Articles, columns } from "./columns";
import { Article } from "@/lib/types/all";
import { DataTable } from "./data-table";

async function getData(): Promise<Articles[]> {
    const articles = await db.article.findMany({
        select: {
            id: true,
            title: true,
            subtitle: true,
            content: true,
            status: true,
            slug: true,
            author: true,
            createdAt: true,
            updatedAt: true,
            createdByUser: {
                select: {
                    name: true,
                    username: true,
                    email: true,
                    role: true,
                    image: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });


    return articles.map((article: Article) => ({
        id: article.id,
        title: article.title,
        subtitle: article.subtitle,
        content: article.content ?? undefined,
        status: article.status,
        author: article.author,
        slug: article.slug,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        createdBy: {
            name: article.createdByUser.name ?? "",
            username: article.createdByUser.username,
            role: article.createdByUser.role,
            email: article.createdByUser.email,
            image: article.createdByUser.image ?? "",
        },
    }));

}
const ArticlesTable = async () => {
    const data = await getData()

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default ArticlesTable;