import { ClientComponent } from "@/app/client.page";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ServerComponent />
      </Suspense>
    </>
  );
}

const ServerComponent = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <div>
      Server Component
      <ClientComponent />
    </div>
  );
};
