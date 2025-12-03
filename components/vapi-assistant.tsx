"use client";

import { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Button } from "@/components/ui/button";
import { Phone, PhoneOff, Loader2 } from "lucide-react";

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || "");

export const VapiAssistant = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onCallStart = () => {
      setIsCallActive(true);
      setIsLoading(false);
    };

    const onCallEnd = () => {
      setIsCallActive(false);
      setIsLoading(false);
    };

    const onError = (e: any) => {
      console.error("Vapi Error:", e);
      setIsLoading(false);
      setIsCallActive(false);
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("error", onError);
    };
  }, []);

  const startCall = () => {
    const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
    if (!assistantId) {
      console.error(
        "Vapi Assistant ID is missing. Please check your environment variables."
      );
      return;
    }
    setIsLoading(true);
    vapi.start(assistantId);
  };

  const stopCall = () => {
    setIsLoading(true);
    vapi.stop();
  };

  const toggleCall = () => {
    if (isCallActive) {
      stopCall();
    } else {
      startCall();
    }
  };

  return (
    <Button
      onClick={toggleCall}
      disabled={isLoading}
      className={`fixed bottom-4 right-4 rounded-full w-16 h-16 shadow-lg transition-all duration-300 z-50 ${
        isCallActive
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-primary hover:bg-primary/90 text-primary-foreground"
      }`}
      aria-label={isCallActive ? "End Call" : "Start Call"}
    >
      {isLoading ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : isCallActive ? (
        <PhoneOff className="h-6 w-6" />
      ) : (
        <Phone className="h-6 w-6" />
      )}
    </Button>
  );
};
