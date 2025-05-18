import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUser } from "lucide-react";

/**
 * Renderiza o avatar de um usuário.
 *
 * @returns Componente de Avatar
 */
const getInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names.map(n => n.charAt(0)).join('');
    return initials.toUpperCase();
};

export default function AvatarDashboard({ user }: any) {
    return (
        <Avatar>
            <AvatarImage
                src={user?.image || undefined}
                alt="User Avatar"
            />
            <AvatarFallback>
                {user?.name ? getInitials(user.name) : <CircleUser />}
            </AvatarFallback>
        </Avatar>
    )
}