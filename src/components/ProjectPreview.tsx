export default function ProjectPreview({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  return (
    <div className={"project-preview preview-" + slug}>
      <img
        src={"/previews/" + slug + ".webp"}
        alt={name + " landing page preview"}
        width="1600"
        height="900"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
