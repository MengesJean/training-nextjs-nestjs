"use client";

import {ButtonHTMLAttributes} from "react";

type ButtonProps = {
    item: {id: number}
    callback: ({}) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const DeleteButton = ({item, callback, children, ...props} : ButtonProps) => {
    const handleDelete = async () => {
        await callback(item);
    }
    return (
            <button
                onClick={handleDelete}
                {...props}
            >
                {children}
            </button>
    );
};

export default DeleteButton;