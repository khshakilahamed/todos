"use client";

import { useForm } from "react-hook-form";
import { Camera, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function AccountPage() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      contactNumber: "",
      birthday: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Account updated:", data);
  };

  return (
    <Card className="p-4 md:p-8 w-full bg-white">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
          Account Information
        </h1>
        <div className="border-b-2 border-blue-600 w-32 md:w-36"></div>
      </div>

      {/* Profile Section */}
      <Card className="border-slate-200 mb-4 sm:w-max">
        <CardContent className="">
          <div className="flex flex-wrap sm:flex-row items-center gap-4 md:gap-8">
            <div className="relative shrink-0">
              <Avatar className="w-24 h-24 md:w-24 md:h-24">
                <AvatarImage src="/user-profile.jpg" alt="Profile" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <Input id="file" accept="image/png, image/jpg" type="file" className="hidden"/>
              <Label htmlFor="file" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg cursor-pointer">
                <Camera className="w-3 h-3 md:w-4 md:h-4" />
              </Label>
            </div>

            <Button className="text-sm md:text-base w-full sm:w-auto cursor-pointer">
              <Upload className="w-3 h-3 md:w-4 md:h-4" />
              Upload New Photo
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Form Section */}
      <Card className="">
        <CardContent className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 font-semibold text-sm md:text-base">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          className="bg-slate-50 border-slate-200 h-9 md:h-10 text-sm md:text-base"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 font-semibold text-sm md:text-base">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
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
                        placeholder="john@example.com"
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
                          placeholder="123 Main St"
                          {...field}
                          className="bg-slate-50 border-slate-200 h-9 md:h-10 text-sm md:text-base"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-900 font-semibold text-sm md:text-base">
                        Contact Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 (555) 000-0000"
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
                >
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="md:w-44 bg-[#8CA3CD] text-white cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Card>
  );
}
