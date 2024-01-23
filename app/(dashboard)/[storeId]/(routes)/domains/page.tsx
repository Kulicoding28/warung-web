import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { formatter } from "@/lib/utils";
import { DomainColumn } from "./components/columns";
import { DomainsClient } from "./components/client";

const DomainsPage = async ({ params }: { params: { storeId: string } }) => {
  const domains = await prismadb.domain.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedDomains: DomainColumn[] = domains.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatter.format(item.price.toNumber()),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DomainsClient data={formattedDomains} />
      </div>
    </div>
  );
};

export default DomainsPage;
