import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAxios } from "@/hooks/useAxios";
import { AuthContext } from "@/provider/AuthProvider";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

type taskData = {
    title: string;
    deadline: string;
    desc: string;
    priority: "low" | "moderate" | "high";
};

export default function TaskForm({
    modalControl,
}: {
    modalControl: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { control, handleSubmit } = useForm<taskData>();
    const axios = useAxios();
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const submitHandler = async (data: taskData) => {
        console.log(`Trying to log in ${data}`);
        const payload = {
            title: data.title,
            owner: user?.email,
            status: "todo",
            deadline: data.deadline,
            desc: data.desc,
            priority: data.priority,
        };
        await axios
            .post("/todo", payload)
            .then((res) => {
                console.log(res);
                queryClient.invalidateQueries("tasks");
                modalControl(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-4 md:mx-auto">
            <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
            <p className="text-sm text-muted-foreground">
                Enter your credentials below to log in
            </p>
            <div className="grid gap-6 w-full">
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <div>
                        <Label>Title</Label>
                        <Controller
                            control={control}
                            name="title"
                            defaultValue=""
                            rules={{
                                required: "Title is required",
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="title"
                                    placeholder="Title"
                                    type="text"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <Label>Select Priority :</Label>
                        <Controller
                            control={control}
                            name="priority"
                            rules={{
                                required: "Priority is required",
                            }}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue=""
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="moderate">
                                            Moderate
                                        </SelectItem>
                                        <SelectItem value="high">
                                            High
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                    <div>
                        <Label>Deadline</Label>
                        <Controller
                            control={control}
                            name="deadline"
                            defaultValue=""
                            rules={{
                                required: "Deadline is mandatory",
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="deadline"
                                    type="datetime-local"
                                    placeholder="Deadline"
                                />
                            )}
                        />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Controller
                            control={control}
                            name="desc"
                            defaultValue=""
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    id="desc"
                                    placeholder="Description"
                                />
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Add
                    </Button>
                </form>
            </div>
        </div>
    );
}
