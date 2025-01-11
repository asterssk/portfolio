"use client";

import { login, logout } from "./actions";
import { Input } from "@/components/ui/input";
import { useActionState, useTransition } from "react";
import { ActionResponse } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Loader2, LogOutIcon } from "lucide-react";

const initialState: ActionResponse = { success: false };

export function LoginForm() {
  const [state, action, isPending] = useActionState(login, initialState);

  return (
    <form action={action} className="p-4 w-full">
      <Input
        name="passcode"
        placeholder="Enter passcode"
        type="password"
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

export function LogoutForm() {
  const [loading, startTransition] = useTransition();

  return (
    <Button
      disabled={loading}
      onClick={() => {
        startTransition(async () => {
          await logout();
        });
      }}
      size="sm"
      className="rounded-lg"
    >
      {loading ? <Loader2 className="animate-spin" /> : <LogOutIcon />}
      Logout
    </Button>
  );
}
