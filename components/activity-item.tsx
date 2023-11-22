import { format, isToday, isYesterday } from "date-fns";
import { AuditLog } from "@prisma/client"

import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ActivityItemProps {
  data: AuditLog;
};

const DATE_FORMAT = "d MMM yyyy, HH:mm";

const getFormattedDate = (createdAt: Date) => {
  if (isToday(createdAt)) {
      return `Today at ${format(createdAt, "hh:mm a")}`;
  } else if (isYesterday(createdAt)) {
      return `Yesterday at ${format(createdAt, "hh:mm a")}`;
  } else {
      return format(createdAt, "dd/MM/yyyy 'at' hh:mm a");
  }
};

export const ActivityItem = ({
  data,
}: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={data.userImage} />
      </Avatar>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold lowercase text-neutral-700">
            {data.userName}
          </span> {generateLogMessage(data)}
        </p>
        <p className="text-xs text-muted-foreground">
          {getFormattedDate(new Date(format(new Date(data.createdAt), DATE_FORMAT)))}
        </p>
      </div>
    </li>
  );
};
