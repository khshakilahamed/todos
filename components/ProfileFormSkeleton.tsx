import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const ProfileFormSkeleton = () => {
  return (
    <Card>
      <CardContent className="space-y-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        <Skeleton className="h-10 w-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        <Skeleton className="h-10 w-full" />

        <div className="flex gap-4 justify-center pt-4">
          <Skeleton className="h-10 w-44" />
          <Skeleton className="h-10 w-44" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileFormSkeleton;
