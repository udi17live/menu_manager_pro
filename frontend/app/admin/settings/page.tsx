"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { useMetaContext } from "@/providers/MetaContextProvider";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { getMySettings, updateSettings } from "@/actions/settingsActions";
import { da } from "zod/v4/locales";
import { LoadingState } from "@/components/other/LoadingState";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function SettingsPage() {
  const context = useMetaContext();
  const { data: session, status } = useSession();
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [settingId, setSettingId] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function getSettings() {
      console.log(session?.strapiToken);
      try {
        const response = await getMySettings();

        if (!response.success) {
          setError(response?.error.message);
        }

        const data = response.data;

        console.log("DATA SETTINGS: ", data);

        if (data?.theme) setSelectedTheme(data.theme);
        if (data?.currency) setSelectedCurrency(data.currency);
        if (data?.id) setSettingId(data.id);
      } catch (error) {
        console.error("Failed to fetch Meta Details: ", error);
      }
    }

    if (session?.strapiToken) {
      getSettings();
    }
  }, [session]);

  if (!context || status === "loading") {
    return <LoadingState />;
  }

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const response = await updateSettings(settingId, {
        data: {
          theme: selectedTheme,
          currency: selectedCurrency,
        },
      });
      if (!response.success) {
        toast.error(error?.error?.message! || "Error saving settings");
      } else {
        toast.success("Update Completed");
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error updating:", error);
      toast.error(error?.error?.message! || "Error saving settings");
    }
  };

  return (
    <div className="flex flex-col max-w-[900px] w-full mx-auto">
      <Card className="rounded">
        <CardHeader>
          <CardTitle className="text-2xl">Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col space-y-6">
            <Field>
              <FieldLabel htmlFor="email">Theme Mode</FieldLabel>
              <Select
                value={selectedTheme}
                onValueChange={setSelectedTheme}
                disabled={isSubmitting}
              >
                <SelectTrigger className="w-full rounded p-6">
                  <SelectValue placeholder="select theme mode" />
                </SelectTrigger>
                <SelectContent>
                  {context.theme.map((mode, index) => (
                    <SelectItem key={index} value={mode}>
                      {mode.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <FieldSeparator className="mb-5" />

            <Field>
              <FieldLabel htmlFor="email">Default Currency</FieldLabel>
              <Select
                value={selectedCurrency}
                onValueChange={setSelectedCurrency}
                disabled={isSubmitting}
              >
                <SelectTrigger className="w-full rounded p-6">
                  <SelectValue placeholder="select default currency" />
                </SelectTrigger>
                <SelectContent>
                  {context.currency.map((curr, index) => (
                    <SelectItem key={index} value={curr}>
                      {curr.toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </form>
        </CardContent>
        <CardFooter className="">
          <Button
            className="p-6 rounded font-bold uppercase tracking-widest cursor-pointer"
            type="button"
            onClick={() => {
              handleSave();
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ?? <Spinner />}
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
