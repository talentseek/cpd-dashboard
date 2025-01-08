import { redirect } from 'next/navigation';

export default async function CampaignDefaultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Await params to resolve the dynamic API behavior

  // Redirect to the 'Progress' tab by default
  redirect(`/admin/campaigns/${id}/progress`);
  return null;
}