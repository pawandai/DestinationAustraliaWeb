import Image from "next/image";
import ModeToggle from "~/components/shared/modeToggle";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getServerAuthSession();

  return (
    <HydrateClient>
      <main>
        <div>
          <p>{hello.greeting}</p>
          <p>{session?.user?.name}</p>
          <p>{session?.user?.id}</p>
          {session?.user && (
            <Image
              src={String(session?.user.image)}
              alt="Avatar Image"
              width={500}
              height={500}
              className="rounded-full"
            />
          )}
        </div>
        <ModeToggle />
      </main>
    </HydrateClient>
  );
}
