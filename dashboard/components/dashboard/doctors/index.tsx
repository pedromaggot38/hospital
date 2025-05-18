import db from "@/lib/db";
import { columns, Doctors } from "./columns";
import { DataTable } from "./data-table";
import { Doctor } from "@/lib/types/all";

async function getDoctorsData(): Promise<Doctors[]> {
    const doctors = await db.doctor.findMany({
        select: {
            id: true,
            name: true,
            specialty: true,
            state: true,
            crm: true,
            phone: true,
            email: true,
            createdAt: true,
            visible: true,
            schedules: {
                select: {
                    dayOfWeek: true,
                    startTime: true,
                    endTime: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return doctors.map((doctor: Doctor) => ({
        id: doctor.id,
        name: doctor.name,
        specialty: doctor.specialty,
        state: doctor.state as string,
        crm: doctor.crm,
        createdAt: doctor.createdAt,
        visibility: doctor.visible,
        phone: doctor.phone ?? "",
        email: doctor.email ?? "",
        schedules: doctor.schedules.map(schedule => ({
            dayOfWeek: schedule.dayOfWeek,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
        })),
    }));
}

const DoctorsTable = async () => {
    const data = await getDoctorsData();

    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default DoctorsTable;