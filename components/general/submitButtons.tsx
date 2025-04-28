"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
interface GenerelSubmitButtonProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "link"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
    width?:string;
    icon?:ReactNode;
}

export default function GeneralSubmitButton({
  text,
  variant,
  icon,
  width,
}: GenerelSubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button variant={variant} className={width} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>submitting..</span>
        </>
      ) : (
        <>
            {icon && <div>{icon}</div>}
          <span>{text}</span>
        </>
      )}
    </Button>
  );
}
