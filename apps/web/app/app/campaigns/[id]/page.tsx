export default function CampaignPage({
  params,
}: {
  params: { campaignId: string };
}) {
  return <div>Campaign ID: {params.campaignId}</div>;
}
