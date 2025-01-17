"use client";
import * as z from "zod";
import Modal from "../ui/modal";
import { useStoreModal } from "@/hooks/useStoreModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useState } from "react";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      toast.success(`Berhasil Membuat toko "${response.data.name}"`);
      window.location.assign(`/${response.data.id}`);
    } catch (error) {
      toast.error('Gagal Membuat Toko')
    } finally {
      setLoading(false);
    }
  };

  const storeModal = useStoreModal();
  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}>
      Store Form
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Store Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full ">
                <Button
                  disabled={loading}
                  variant={"destructive"}
                  onClick={storeModal.onClose}>
                  Cancel
                </Button>
                {loading ? (
                  <Loader className="animate-spin w-10 " />
                ) : (
                  <Button disabled={loading} type="submit">
                    Continue
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
