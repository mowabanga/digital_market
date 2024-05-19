"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type Props = {};

const SubmitButton = (props: Props) => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Uploading
        </Button>
      ) : (
        <Button type="submit">Create Your Product</Button>
      )}
    </>
  );
};

export default SubmitButton;
