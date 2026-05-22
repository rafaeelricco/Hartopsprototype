import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CampaignProvider } from "./staff/components/campaign-context";
import { Toaster } from "sonner";
import { PersonaSwitcher } from "./shared/components/persona-switcher";

export default function App() {
  return (
    <CampaignProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" richColors closeButton />
      <PersonaSwitcher />
    </CampaignProvider>
  );
}
