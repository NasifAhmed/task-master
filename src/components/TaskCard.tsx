import { cn } from "@/lib/utils";
import { TodoType } from "@/types/todo";
import { ChevronsDown, Flame, Wind } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";

export default function TaskCard({ taskData }: { taskData: TodoType }) {
    const [dragging, setDragging] = useState(false);
    function handleOnDrag(e: React.DragEvent, widgetType: string) {
        e.dataTransfer.setData("widgetType", widgetType);
    }
    return (
        <div
            draggable
            onDragStart={(e) => {
                setDragging(true);
                handleOnDrag(e, taskData._id as string);
            }}
            onDragEnd={() => {
                setDragging(false);
            }}
            className="cursor-pointer"
        >
            <Card
                className={cn(
                    {
                        "scale-90 opacity-60 transition-all ": dragging,
                        "bg-red-100": taskData.status === "todo",
                        "bg-yellow-100": taskData.status === "ongoing",
                        "bg-green-100": taskData.status === "completed",
                    },
                    "p-3"
                )}
            >
                <div>
                    <h3 className="font-semibold text-lg">{taskData.title}</h3>
                </div>
                <div>
                    <h3 className="text-sm">
                        {moment(taskData.deadline).format("h:mm A, MM-D-YY ")}
                    </h3>
                </div>
                <div>
                    <Badge
                        className={cn("my-1 uppercase text-sm", {
                            "bg-red-700": taskData.priority === "high",
                            "bg-yellow-700": taskData.priority === "moderate",
                            "bg-green-700": taskData.priority === "low",
                        })}
                    >
                        {taskData.priority === "high" && <Flame />}
                        {taskData.priority === "moderate" && <Wind />}
                        {taskData.priority === "low" && <ChevronsDown />}
                        {taskData.priority}
                    </Badge>
                </div>
                <hr className="my-1" />
                <div>
                    <h3>{taskData.desc}</h3>
                </div>
            </Card>
        </div>
    );
}
