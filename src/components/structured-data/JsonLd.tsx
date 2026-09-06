type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Renders a single JSON-LD `<script>` tag. `JSON.stringify` output is safe
 * to inline here because we only ever pass our own generated objects (see
 * `src/lib/structured-data.ts`) — never raw user input.
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
