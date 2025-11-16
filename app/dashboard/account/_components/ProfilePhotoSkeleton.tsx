import { Card, CardContent } from "../../../../components/ui/card";
import { Skeleton } from "../../../../components/ui/skeleton";

const ProfilePhotoSkeleton = () => {
  return (
    <Card className="border-slate-200 mb-4 sm:w-max">
      <CardContent>
        <div className="flex flex-wrap sm:flex-row items-center gap-4 md:gap-8">
          <div className="relative shrink-0">
            <Skeleton className="w-24 h-24 md:w-24 md:h-24 rounded-full" />

            <Skeleton className="absolute bottom-0 right-0 w-8 h-8 md:w-9 md:h-9 rounded-lg" />
          </div>

          <Skeleton className="h-10 w-full sm:w-40 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePhotoSkeleton;
