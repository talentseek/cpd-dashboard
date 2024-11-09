// src/app/testlanding/page.tsx
import hotelFriendData from "@/mocks/hotelFriendData"
import { AbmLandingPage } from "@/components/abm/AbmLandingPage"

export default function TestLandingPage() {
  return <AbmLandingPage {...hotelFriendData} />
}