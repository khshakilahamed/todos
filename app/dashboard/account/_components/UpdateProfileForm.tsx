"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import ProfileFormSkeleton from "./ProfileFormSkeleton";

interface updateInfoFormData {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  contact_number: string;
  birthday?: string;
}

const UpdateProfileForm = () => {
  const { user, refetchUserInfo } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialUserData, setInitialUserData] =
    useState<updateInfoFormData | null>(null);

  const form = useForm<updateInfoFormData>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      contact_number: "",
      birthday: "",
    },
  });

  useEffect(() => {
    if (user) {
      const defaultValues = {
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        address: user.address || "",
        contact_number: user.contact_number || "",
        birthday: user.birthday || "",
      };

      setInitialUserData(defaultValues); // store original
      form.reset(defaultValues); // update form
    }
  }, [user, form]);

  const onSubmit = async (payload: updateInfoFormData) => {
    setIsLoading(true);
    try {
      if (!payload?.birthday) {
        delete payload["birthday"];
      }

      const { data } = await axiosInstance.patch("/users/me/", payload);

      refetchUserInfo(data);

      toast.success("Profile updated successful!");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!initialUserData || isLoading) {
    return <ProfileFormSkeleton />;
  }

  return (
    <Card className="">
      <CardContent className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-900 font-semibold text-sm md:text-base">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        className="bg-slate-50 border-slate-200 h-9 md:h-10 text-sm md:text-base"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-900 font-semibold text-sm md:text-base">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        className="bg-slate-50 border-slate-200 h-9 md:h-10 text-sm md:text-base"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-semibold text-sm md:text-base">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder=""
                      {...field}
                      className="bg-slate-50 border-slate-200 h-9 md:h-10 text-sm md:text-base"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Address & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-900 font-semibold text-sm md:text-base">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        className="bg-slate-50 border-slate-200 h-9 md:h-10 text-sm md:text-base"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contact_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-900 font-semibold text-sm md:text-base">
                      Contact Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder=""
                        {...field}
                        className="bg-slate-50 border-slate-200 h-9 md:h-10 text-sm md:text-base"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* Birthday */}
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-900 font-semibold text-sm md:text-base">
                    Birthday
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="bg-slate-50 border-slate-200 h-9 md:h-10 text-sm md:text-base"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 pt-4 md:pt-6 border-slate-100">
              <Button
                type="submit"
                className="md:w-44 cursor-pointer"
                disabled={!form.formState.isDirty || isLoading}
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                className="md:w-44 bg-[#8CA3CD] text-white cursor-pointer"
                disabled={isLoading}
                onClick={() => {
                  if (initialUserData) {
                    form.reset(initialUserData);
                  }
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdateProfileForm;
