import {
  IPropMyTimeLine,
  IPropMyTimelineContainer,
} from "@/interfaces/propsComponent.interface";

function MyTimeline({
  date,
  title,
  description,
  datePosition,
}: IPropMyTimeLine) {
  if (datePosition === "start") {
    return (
      <div className="flex">
        <div className="flex flex-col items-end mr-6 min-w-24">
          <div className="font-medium text-gray-700 text-right">{date}</div>
        </div>
        <div className="flex flex-col items-center mr-4">
          <div className="w-4 h-4 bg-primary rounded-full"></div>
          <div className="h-full w-0.5 bg-primary"></div>
        </div>
        <div className="pb-8">
          <div className="font-bold text-gray-900">{title}</div>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex flex-col items-center mr-4">
        <div className="w-4 h-4 bg-primary rounded-full"></div>
        <div className="h-full w-0.5 bg-primary"></div>
      </div>
      <div>
        <div className="font-medium text-gray-700">{date}</div>
        <div className="font-bold text-gray-900">{title}</div>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  );
}

export function MyTimelineContainer({
  items,
  datePosition = "end",
}: IPropMyTimelineContainer) {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        {items.map((item, index) => (
          <MyTimeline
            key={index}
            date={item.date}
            title={item.title}
            description={item.description}
            datePosition={datePosition}
          />
        ))}
      </div>
    </div>
  );
}
