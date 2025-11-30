"use client";

import { setting } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

const SettingPage = () => {
  const { update } = useSession();
  const [isPending, StartTransition] = useTransition();

  const onClick = () => {
    StartTransition(() => {
      setting({
        name: "New Nsaawdaame!",
      })
      .then(()=>{
        update()
      })
    });
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p> Setting </p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>
          Update Name
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingPage;
