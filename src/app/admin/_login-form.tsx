"use client";

import { login } from "./actions";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { ActionResponse } from "@/utils/types";

const initialState: ActionResponse = { success: false };

export function LoginForm() {
  const [state, action, isPending] = useActionState(login, initialState);

  return (
    <form action={action} className="p-4 w-full">
      <Input
        name="passcode"
        placeholder="Enter passcode"
        type="password"
        autoFocus
        className="text-center"
        disabled={isPending}
      />

      {state.message ? (
        <p className="text-center mt-2 text-xs text-destructive">
          {state.message}
        </p>
      ) : null}

      <button type="submit" />
    </form>
  );
}
