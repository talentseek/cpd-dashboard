// /Users/mbeckett/Documents/codeprojects/website_projects/cpd-dashboard/src/app/testweagle/page.tsx

import weagleData from "@/mocks/weagleData";
import { AbmLandingPage } from "@/components/abm/AbmLandingPage";

export default function TestWeaglePage() {
  return <AbmLandingPage {...weagleData} />;
}