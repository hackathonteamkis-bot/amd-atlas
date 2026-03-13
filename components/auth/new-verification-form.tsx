"use client";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

export const NewVerificationForm = () => {
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (!token) {
      toast.error("Missing Token!");
      setLoading(false);
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data.success) toast.success(data.success);
        if (data.error) toast.error(data.error);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Something went wrong!");
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center ">
        {loading && <BeatLoader />}
        {!loading && (
          <p className="text-sm text-muted-foreground">
            Verification process completed. You can now login.
          </p>
        )}
      </div>
    </CardWrapper>
  );
};
