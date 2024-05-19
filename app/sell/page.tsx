"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import SelectCategory from "../components/SelectCategory";
import { Textarea } from "@/components/ui/textarea";
import { TipTapEditor } from "../components/Editor";
import { UploadDropzone } from "../lib/uploadthing";
import { JSONContent } from "@tiptap/react";
import { useFormState } from "react-dom";
import { SellProduct, State } from "../actions";
import { toast } from "sonner";
import SubmitButton from "../components/SubmitButton";
import { redirect } from "next/navigation";

type Props = {};

const SellRoute = (props: Props) => {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(SellProduct, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, setProductFile] = useState<null | string>(null);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
      redirect("/");
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Sell your products with ease</CardTitle>
            <CardDescription>
              Please describbe your product here in detail so that it can be
              sold
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Name of your product"
                required
                minLength={3}
              />
              {state?.errors?.["name"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["name"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
              {state?.errors?.["category"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["category"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input
                placeholder="$45"
                type="number"
                name="price"
                required
                min={1}
              />
              {state?.errors?.["price"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["price"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Label>Short summary</Label>
              <Textarea
                name="smallDescription"
                placeholder="Please briefly describe your product"
                required
                minLength={10}
              />
              {state?.errors?.["smallDescription"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["smallDescription"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Input
                type="hidden"
                name="description"
                value={JSON.stringify(json)}
              />
              <Label>Description</Label>
              <TipTapEditor json={json} setJson={setJson} />
              {state?.errors?.["description"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["description"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Input
                type="hidden"
                name="images"
                value={JSON.stringify(images)}
              />
              <Label>Product Images</Label>
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImages(res.map((item) => item.url));
                  toast.success("Images successfully uploaded.");
                }}
                onUploadError={(error: Error) => {
                  toast.error("Something went wrong, try again.");
                }}
              />
              {state?.errors?.["images"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["images"]?.[0]}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-y-2">
              <Input
                type="hidden"
                name="productFile"
                value={productFile ?? ""}
              />
              <Label>Product File</Label>
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setProductFile(res[0].url);
                  toast.success("Product file successfully uploaded.");
                }}
                endpoint="productFileUpload"
                onUploadError={(error: Error) => {
                  toast.error("Something went wrong, try again.");
                }}
              />
              {state?.errors?.["productFile"]?.[0] && (
                <p className="text-destructive">
                  {state?.errors?.["productFile"]?.[0]}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <SubmitButton
              title="Create your product"
              status="Uploading product"
            />
          </CardFooter>
        </form>
      </Card>
    </section>
  );
};

export default SellRoute;
