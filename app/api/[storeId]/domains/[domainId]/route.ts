import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { domainId: string } }
) {
  try {
    if (!params.domainId) {
      return new NextResponse("Domain id is required", { status: 400 });
    }

    const domain = await prismadb.domain.findUnique({
      where: {
        id: params.domainId,
      },
    });

    return NextResponse.json(domain);
  } catch (error) {
    console.log("[DOMAIN_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { domainId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.domainId) {
      return new NextResponse("domain id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const domain = await prismadb.domain.delete({
      where: {
        id: params.domainId,
      },
    });

    return NextResponse.json(domain);
  } catch (error) {
    console.log("[DOMAIN_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { domainId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, price } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!params.domainId) {
      return new NextResponse("domain id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const Domain = await prismadb.domain.update({
      where: {
        id: params.domainId,
      },
      data: {
        name,
        price,
      },
    });

    return NextResponse.json(Domain);
  } catch (error) {
    console.log("[DOMAIN_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
