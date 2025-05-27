import { auth } from "./src/lib/auth";

type HonoRouterVariables = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
