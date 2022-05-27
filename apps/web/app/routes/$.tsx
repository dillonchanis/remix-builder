import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BuilderComponent, builder, Builder } from "@builder.io/react";

builder.init("0a89e12b402f4021bc5be6ff54f0471a");

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data?.page?.data?.title ?? "Fallback Title",
    description: data?.page?.data?.description ?? "Fallback Description",
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const routePath = params["*"] ?? "";

  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + routePath,
      },
    })
    .toPromise();

  return json({
    page: page || null,
  });
};

export default function Page() {
  const { page } = useLoaderData();

  if (!page && !Builder.isPreviewing) {
    return (
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <h1>404 No Page Found.</h1>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <BuilderComponent model="page" content={page} />
    </div>
  );
}
