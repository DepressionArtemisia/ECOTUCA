"use client";

import { Database, HardDrive } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { checkDataSourceStatus, getDataSourceStatusSync, type DataSourceStatus } from "@/lib/data/data-source-status";

export function DataSourceBadge() {
  const [status, setStatus] = useState<DataSourceStatus>(() => getDataSourceStatusSync());

  useEffect(() => {
    checkDataSourceStatus().then(setStatus).catch(() => setStatus(getDataSourceStatusSync()));
  }, []);

  const tone = status.label === "Supabase conectado" ? "mint" : status.label === "Modo demo" ? "yellow" : "coral";
  const Icon = status.label === "Supabase conectado" ? Database : HardDrive;

  return (
    <Badge tone={tone} className="gap-1">
      <Icon size={13} />
      {status.label}
      {status.localStorageActive ? " + localStorage" : ""}
    </Badge>
  );
}
