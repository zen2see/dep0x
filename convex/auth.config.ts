import type { AuthConfig } from 'convex/server';
import { getAuthConfigProvider } from "@convex-dev/better-auth/auth-config";
export default {
  providers: [
    getAuthConfigProvider(), 
  ],
} satisfies AuthConfig;

// old way (see README why above is better)
// const authConfig = {
//     providers: [ // Fixed typo from 'providers ['
//         {
//           domain: process.env.CONVEX_SITE_URL,
//           applicationID: "convex", // Fixed typo from 'appplicationID'
//        }
//     ]
// }
// export default authConfig;