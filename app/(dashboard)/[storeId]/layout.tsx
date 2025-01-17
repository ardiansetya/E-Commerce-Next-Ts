import db from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({
  children,
  storeId,
}: {
  children: React.ReactNode;
  storeId: string;
}) => {
  const { userId } = await auth();
  console.log(userId);

  if (!userId) {
    redirect("sign-in");
  }

  const store = await db.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });
  return (
    <>
      <div>ini navbar</div>
      {children}
    </>
  );
};

export default DashboardLayout;
