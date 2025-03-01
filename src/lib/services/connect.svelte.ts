import { signOut } from "@auth/sveltekit/client";
import { signIn } from "@auth/sveltekit/client";
import { rune } from "./utils/runes.svelte";
import { browser } from "$app/environment";
import type { TutorsConnectService, TutorsId } from "./types.svelte";
import { goto } from "$app/navigation";

export const tutorsConnectService: TutorsConnectService = {
  tutorsId: rune<TutorsId | null>(null),

  async connect(redirectStr: string) {
    return await signIn("github", { callbackUrl: redirectStr });
  },

  reconnect(user: TutorsId) {
    if (user) {
      this.tutorsId.value = user;
      if (browser) {
        if (!localStorage.share) {
          localStorage.share = true;
        }
        this.tutorsId.value.share = localStorage.share;
        if (localStorage.loginCourse) {
          const courseId = localStorage.loginCourse;
          localStorage.removeItem("loginCourse");
          goto(`/${courseId}`);
        }
      }
    }
  },

  disconnect(redirectStr: string) {
    signOut({ callbackUrl: redirectStr });
  }
};
