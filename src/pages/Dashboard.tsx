import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useAxios } from "@/hooks/useAxios";
import { TodoType } from "@/types/todo";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

export default function Dashboard() {
    const [todo, setTodo] = useState<TodoType[]>();
    const [ongoing, setOngoing] = useState<TodoType[]>();
    const [completed, setCompleted] = useState<TodoType[]>();
    const [open, setOpen] = useState(false);
    const axios = useAxios();

    async function fetchData() {
        await axios
            .get<TodoType[]>("/todo")
            .then((res) => {
                const todoArray: TodoType[] = [];
                const ongoingArray: TodoType[] = [];
                const completedArray: TodoType[] = [];
                const data = res.data.reverse();
                data.forEach((task) => {
                    if (task.status === "todo") {
                        todoArray.push(task);
                        setTodo(todoArray);
                    } else if (task.status === "ongoing") {
                        ongoingArray.push(task);
                        setOngoing(ongoingArray);
                    } else if (task.status === "completed") {
                        completedArray.push(task);
                        setCompleted(completedArray);
                    }
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const queryClient = useQueryClient();
    const query = useQuery("tasks", fetchData);

    function handleDragOver(e: React.DragEvent) {
        e.preventDefault();
    }

    async function updateDB(
        task: TodoType,
        status: "todo" | "ongoing" | "completed"
    ) {
        const payload = {
            ...task,
            status: status,
        };
        await axios
            .post("/todo", payload)
            .then((res) => {
                console.log(res);
                queryClient.invalidateQueries("tasks");
                return res;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // For handling drops to todo list
    function handleOnDropTodo(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        console.log("widgetType", widgetType);

        // Drop ongoing --> todo
        ongoing?.forEach((task) => {
            if (task._id === widgetType) {
                if (todo) {
                    setTodo([...todo, task]);
                } else {
                    setTodo([task]);
                }
                setOngoing([
                    ...ongoing.filter((task) => task._id !== widgetType),
                ]);
                updateDB(task, "todo");
            }
        });

        // Drop completed --> todo
        completed?.forEach((task) => {
            if (task._id === widgetType) {
                if (todo) {
                    setTodo([...todo, task]);
                } else {
                    setTodo([task]);
                }
                setCompleted([
                    ...completed.filter((task) => task._id !== widgetType),
                ]);
                updateDB(task, "todo");
            }
        });
    }

    // For handling drops to ongoing list
    function handleOnDropOngoing(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        console.log("widgetType", widgetType);

        // Drop todo --> ongoing
        todo?.forEach((task) => {
            if (task._id === widgetType) {
                if (ongoing) {
                    setOngoing([...ongoing, task]);
                } else {
                    setOngoing([task]);
                }
                setTodo([...todo.filter((task) => task._id !== widgetType)]);
                updateDB(task, "ongoing");
            }
        });

        // Drop completed --> ongoing
        completed?.forEach((task) => {
            if (task._id === widgetType) {
                if (ongoing) {
                    setOngoing([...ongoing, task]);
                } else {
                    setOngoing([task]);
                }
                setCompleted([
                    ...completed.filter((task) => task._id !== widgetType),
                ]);
                updateDB(task, "ongoing");
            }
        });
    }

    // For handling drops to completed list
    function handleOnDropCompleted(e: React.DragEvent) {
        const widgetType = e.dataTransfer.getData("widgetType") as string;
        console.log("widgetType", widgetType);

        // Drop todo --> completed
        todo?.forEach((task) => {
            if (task._id === widgetType) {
                if (completed) {
                    setCompleted([...completed, task]);
                } else {
                    setCompleted([task]);
                }
                setTodo([...todo.filter((task) => task._id !== widgetType)]);
                updateDB(task, "completed");
            }
        });

        // Drop ongoing --> completed
        ongoing?.forEach((task) => {
            if (task._id === widgetType) {
                if (completed) {
                    setCompleted([...completed, task]);
                } else {
                    setCompleted([task]);
                }
                setOngoing([
                    ...ongoing.filter((task) => task._id !== widgetType),
                ]);
                updateDB(task, "completed");
            }
        });
    }
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild className="w-full flex justify-center">
                    <div>
                        <Button>Create a task</Button>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create a task</DialogTitle>
                    </DialogHeader>
                    <TaskForm modalControl={setOpen} />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="grid grid-cols-1 md:grid-cols-3 min-h-[100vh]">
                <div className="border p-4 flex flex-col gap-5 m-8 drop-shadow-lg shadow-md rounded-lg">
                    <h2 className="text-center font-bold text-2xl">Todo</h2>
                    <Separator className="my-3" />
                    <div
                        onDrop={handleOnDropTodo}
                        onDragOver={handleDragOver}
                        className="h-full overflow-y-auto flex flex-col gap-4"
                    >
                        {todo &&
                            todo.map((task) => {
                                return (
                                    <TaskCard key={task._id} taskData={task} />
                                );
                            })}
                    </div>
                </div>
                <div className="border p-4 flex flex-col gap-5 m-8 drop-shadow-lg shadow-md rounded-lg">
                    <h2 className="text-center font-bold text-2xl">Ongoing</h2>
                    <Separator className="my-3" />
                    <div
                        onDrop={handleOnDropOngoing}
                        onDragOver={handleDragOver}
                        className="h-full overflow-y-auto  flex flex-col gap-4"
                    >
                        {ongoing &&
                            ongoing.map((task) => {
                                return (
                                    <TaskCard key={task._id} taskData={task} />
                                );
                            })}
                    </div>
                </div>
                <div className="border p-4 flex flex-col gap-5 m-8 drop-shadow-lg shadow-md rounded-lg">
                    <h2 className="text-center font-bold text-2xl">
                        Completed
                    </h2>
                    <Separator className="my-3" />
                    <div
                        onDrop={handleOnDropCompleted}
                        onDragOver={handleDragOver}
                        className="h-full overflow-y-auto  flex flex-col gap-4"
                    >
                        {completed &&
                            completed.map((task) => {
                                return (
                                    <TaskCard key={task._id} taskData={task} />
                                );
                            })}
                    </div>
                </div>
            </div>
        </>
    );
}
