"use client";

import {Button} from "@/components/ui/button";

const DeleteButton = ({id, callback}) => {
    const handleDelete = async () => {
        await callback(id);
    }
    return (
            <Button
                className={"w-full"}
                variant="destructive"
                type={"submit"}
                onClick={handleDelete}
            >
                Delete
            </Button>
    );
};

export default DeleteButton;