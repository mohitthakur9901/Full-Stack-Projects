import React from "react";
import {Button, Spinner} from "@nextui-org/react";

type ButtonType = "button" | "submit" | "reset" | undefined;
type Variant = "ghost" | "bordered" | "light" | "flat" | "faded" | "shadow" | undefined;
type Color = "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined;
type Size = "sm" | "md" | "lg" | undefined


interface MyButtonProps {
    className?: string;
    color?: Color;
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    type?: ButtonType;
    variant?: Variant;
    isLoading?: boolean;
    size:Size
}

const MyButton: React.FC<MyButtonProps> = ({
    className,
    color,
    children,
    onClick,
    disabled = false,
    size= "lg",
    type = "button",
    variant = "bordered",
    isLoading = false
}: MyButtonProps) => {
    return (
        <Button className={className} color={color} onClick={onClick} disabled={disabled} type={type}
                variant={variant}>
            {isLoading ? <Spinner size={size}/> : children}
        </Button>
    )
}

export default MyButton;
