import ProfilePhoto from "@/components/ProfilePhoto";
import { Card, CardContent } from "@/components/ui/card";
import UpdateProfileForm from "@/components/UpdateProfileForm";

export default function AccountPage() {
  return (
    <Card className="p-4 md:p-8 w-full bg-white">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          Account Information
        </h1>
        <div className="border-b-2 border-blue-600 w-32 md:w-36"></div>
      </div>

      {/* Profile Photo Section */}
      <ProfilePhoto />

      {/* Form Section */}
      <UpdateProfileForm />
    </Card>
  );
}
