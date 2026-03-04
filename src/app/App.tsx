import { RouterProvider } from "react-router";
import { router } from "./routes";
import { CampaignProvider } from "./staff/components/campaign-context";
import { Toaster } from "sonner";

export default function App() {
  return (
    <CampaignProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" richColors closeButton />
    </CampaignProvider>
  );
}
