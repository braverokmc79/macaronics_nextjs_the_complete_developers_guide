import React from "react";

interface TopicsSlugPageProps {
  params: Promise<{ slug: string }>;
}

const TopicsSlugPage: React.FC<TopicsSlugPageProps> = async ({ params }) => {
  const { slug } = await params;

  return <div>
    TopicsPage - {slug}
  </div>;
};



export default TopicsSlugPage;
