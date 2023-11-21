const {
  default: NotificationContext,
} = require("@/context/notification-context");
const { useContext, Fragment } = require("react");
const { default: Notification } = require("./notification");

const NotificationLayout = (props) => {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        ></Notification>
      )}
    </Fragment>
  );
};

export default NotificationLayout;
