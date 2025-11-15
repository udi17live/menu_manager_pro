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
import { strapiClient } from "@/lib/strapiClient";
import { Button } from "@/components/ui/button";
import { getMySettings, updateSettings } from "@/actions/settingsActions";

export default function SettingsPage() {
  const context = useMetaContext();
  const { data: session, status } = useSession();
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [settingId, setSettingId] = useState("");

  useEffect(() => {
    async function getSettings() {
      console.log(session?.strapiToken);
      try {
        const data = await getMySettings();
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
    return <div>Error: Context not available</div>;
  }

  const handleSave = async () => {
    try {
      console.log("handleSave");
      const response = await updateSettings(settingId, {
        data: {
          theme: selectedTheme,
          currency: selectedCurrency,
        },
      });

      console.log(response);
    } catch (error) {
      console.error("Error updating:", error);
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
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
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
              console.log("clicked");
              handleSave();
            }}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
