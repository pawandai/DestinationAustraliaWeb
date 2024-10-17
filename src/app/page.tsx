import FormBuilder from "~/components/shared/Form";
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
          <p>{session?.expires}</p>
        </div>
        <ModeToggle />
      </main>
    </HydrateClient>
  );
}
