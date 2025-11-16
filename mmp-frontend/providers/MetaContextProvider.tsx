"use client";

import { getMeta } from "@/actions/settingsActions";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface MetaContextProviderInterface {
  theme: string[];
  currency: string[];
  country: string[];
}

const MetaContext = createContext<MetaContextProviderInterface | null>(null);

export function MetaContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [meta, setMeta] = useState<MetaContextProviderInterface | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    async function getMetaObject() {
      const response = await getMeta();
      if (!response.success) {
        setIsLoading(false);
        return;
      }
      setMeta(response.data.data);
      setIsLoading(false);
    }

    getMetaObject();
  }, [session?.strapiToken]);

  return <MetaContext.Provider value={meta}>{children}</MetaContext.Provider>;
}

export function useMetaContext() {
  const context = useContext(MetaContext);
  if (context === undefined) {
    throw new Error("useMeta must be used within MetaContextProvider");
  }
  return context;
}
