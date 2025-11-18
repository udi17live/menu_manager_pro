import { Spinner } from "@/components/ui/spinner";

export function LoadingState() {
  return (
    <div className="w-full h-[400px] flex flex-col gap-3 items-center justify-center">
      <Spinner className="size-16" />
      <h3 className="font-semibold text-xl">Processing request</h3>
      <p>Please wait while we process your request...</p>
    </div>
  );
}
