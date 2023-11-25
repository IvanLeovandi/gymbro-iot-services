import { BellIcon, TrashIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function NotificationAlert(props) {
  const jadwalNotification = new Date(props.notification.tanggal);
  const tahunNotification = jadwalNotification.getFullYear();
  const bulanNotification = jadwalNotification.getMonth() + 1;
  const tanggalNotification = jadwalNotification.getDate();
  const jamNotification = jadwalNotification.getHours();
  const menitNotification =
    (jadwalNotification.getMinutes() < 10 ? "0" : "") +
    jadwalNotification.getMinutes();

  const jadwalfix = `${tanggalNotification}-${bulanNotification}-${tahunNotification} ${jamNotification}:${menitNotification}`;
  return (
    <div className="mb-4">
      <Alert>
        <BellIcon className="h-4 w-4" />
        <AlertTitle>{jadwalfix}</AlertTitle>
        <AlertDescription>{props.notification.message}</AlertDescription>
      </Alert>
    </div>
  );
}
