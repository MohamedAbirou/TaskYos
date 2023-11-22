"use client";

import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { useProModal } from "@/hooks/use-pro-modal";
import { Loader2 } from "lucide-react";

interface SubscriptionButtonProps {
  isPro: boolean;
};

export const SubscriptionButton = ({ 
  isPro,
 }: SubscriptionButtonProps) => {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  }

  return (
    <Button
      variant="primary"
      onClick={onClick}
      disabled={isLoading}
    >
      {isPro ? "Manage subscription" : "Upgrade to pro"}
      {isLoading && <Loader2 className="w-3 h-3 ml-2 animate-spin" />}
    </Button>
  )
};