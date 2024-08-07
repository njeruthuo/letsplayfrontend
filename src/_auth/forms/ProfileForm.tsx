import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserContext } from "@/lib/context/authContext/UserContext";
import {
  CREATE_USER_PROFILE,
  LOAD_ON_PROFILE_UPDATE,
} from "@/lib/context/authContext/actions";
import { createProfile } from "@/lib/actions/createProfile";
import Loader from "@/components/shared/Loader";

const formSchema = z.object({
  dob: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  location: z.string().min(1, {
    message: "Location cannot be empty.",
  }),
  gender: z.string().min(1, {
    message: "Gender must be chosen.",
  }),
  phone: z.string().min(10, {
    message: "Phone must be at least 10 characters.",
  }),
});

const ProfileForm = () => {
  const { state, dispatch } = useUserContext();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bio: state.user_profile.bio,
      dob: state.user_profile.dob,
      location: state.user_profile.location,
      gender: "",
      phone: state.user_profile.phone,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    dispatch({ type: LOAD_ON_PROFILE_UPDATE });

    console.log(values);
    try {
      const profileData = await createProfile({
        ...values,
        user: state.user.id,
      });

      dispatch({ type: CREATE_USER_PROFILE, payload: profileData?.data });
    } catch (error) {
      console.log(error);
    }

    dispatch({ type: LOAD_ON_PROFILE_UPDATE });
  }

  return (
    <div className="mx-auto w-3/5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            {state.isUpdatingProfile ? <Loader /> : ""}
            {state.user_profile.dob === ""
              ? "Create profile"
              : "Update profile"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default ProfileForm;
