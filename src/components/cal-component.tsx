import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { Button } from "./ui/button";
export default function CalComButton() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "intro" });
      cal("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#0a0a0a" },
          dark: { "cal-brand": "#fffefe" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);
  return (
    <Button
      data-cal-namespace="intro"
      data-cal-link="prnvtripathi/intro"
      data-cal-config='{"layout":"month_view","theme":"auto"}'
      className="md:w-1/3 w-full mt-2 md:mt-0"
      variant={"secondary"}
    >
      Book a call!
    </Button>
  );
}
