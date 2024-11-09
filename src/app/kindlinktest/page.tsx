import kindLinkData from "@/mocks/kindLinkData";
import { AbmLandingPage } from "@/components/abm/AbmLandingPage";

export default function TestKindLinkPage() {
  return <AbmLandingPage {...kindLinkData} />;
}