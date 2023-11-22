import NotificationLayout from "@/components/ui/NotificationLayout";
import { NotificationContextProvider } from "@/context/notification-context";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <NotificationContextProvider>
        <NotificationLayout>
          <Component {...pageProps} />
        </NotificationLayout>
      </NotificationContextProvider>
    </SessionProvider>
  );
}
