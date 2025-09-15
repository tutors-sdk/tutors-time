import { redirect, type PageServerLoad } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, url }) => {
  const session = await locals?.auth?.();
  const user = session?.user;

  if (user) {
    const to = url.searchParams.get("redirect") ?? "/";
    throw redirect(302, to);
  }

  return {};
};


