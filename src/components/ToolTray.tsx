'use client'
import { useTool } from "@/context/ToolContext";
import Notepad from "@/components/tools/notepad";
import Vault from "@/components/tools/vault";
import Music from "@/components/tools/visualiser";
import Tasks from "@/components/tools/todo";

export default function ToolTray() {
  const { tool } = useTool();

  switch (tool) {
    case "notepad":
      return <Notepad />;
    case "vault":
      return <Vault />;
    case "music":
      return <Music />;
    case "tasks":
      return <Tasks />;
    default:
      return <div>Select a tool</div>;
  }
}
