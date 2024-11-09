import proForecastData from "@/mocks/proForecastData";
import { AbmLandingPage } from "@/components/abm/AbmLandingPage";

export default function TestProForecastPage() {
  return <AbmLandingPage {...proForecastData} />;
}