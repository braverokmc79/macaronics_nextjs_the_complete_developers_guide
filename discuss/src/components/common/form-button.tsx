"use client";

import { Button } from "../ui/button";

 
interface FormButtonProps {
  children: React.ReactNode;
  type ?: "submit" | "reset" | "button";
  className?: string;
  isLoading: boolean;
}
 
export default function FormButton({ children, type="submit",  className, isLoading }: FormButtonProps) {
  return (
    <Button type={type} disabled={isLoading} className={className}>
      {isLoading ? "처리중..." : children }
    </Button>
  );
}