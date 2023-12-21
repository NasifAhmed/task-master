import { TodoType } from "@/types/todo";
import { Card } from "./ui/card";

export default function TaskCard({ taskData }: { taskData: TodoType }) {
    function handleOnDrag(e: React.DragEvent, widgetType: string) {
        e.dataTransfer.setData("widgetType", widgetType);
    }
    return (
        <div
            draggable
            onDragStart={(e) => handleOnDrag(e, taskData._id as string)}
        >
            <Card className="">
                <div>
                    <h3>{taskData.title}</h3>
                </div>
                <div>
                    <h3>{taskData.status}</h3>
                </div>
                <div>
                    <h3>{taskData.deadline}</h3>
                </div>
                <div>
                    <h3>{taskData.desc}</h3>
                </div>
            </Card>
        </div>
    );
}
