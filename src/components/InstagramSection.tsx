import { useState } from "react";
import { Instagram, ExternalLink, Play } from "lucide-react";
import { site } from "@/data/site";
import {
  getRecentPosts,
  getRecentReels,
  instagramEmbedUrl,
  type InstagramPost,
} from "@/data/instagram-posts";
import { instagramHighlights } from "@/data/instagram-highlights";
import { Section, SectionHeading } from "@/components/Section";
import { Button, ButtonAnchor } from "@/components/Button";
import { track } from "@/lib/analytics";

/**
 * Card de publicação: usa a incorporação oficial do Instagram e, se ela não
 * carregar (post removido, bloqueio de terceiros, rede), mostra um fallback
 * elegante com link para a publicação original.
 */
function PostCard({ post }: { post: InstagramPost }) {
  const [failed, setFailed] = useState(false);

  return (
    <li className="flex flex-col border border-border bg-background">
      <div className="relative h-[520px] w-full bg-secondary">
        {failed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
            <Instagram className="h-6 w-6 text-accent" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              Não foi possível carregar esta publicação aqui.
            </p>
            <ButtonAnchor
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
            >
              Abrir no Instagram
            </ButtonAnchor>
          </div>
        ) : (
          <iframe
            title={`Publicação do Instagram da ${site.shortName}`}
            src={instagramEmbedUrl(post)}
            loading="lazy"
            scrolling="no"
            onError={() => setFailed(true)}
            className="h-full w-full border-0"
          />
        )}
      </div>

      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("instagram_click", { post: post.shortcode })}
        className="link-underline flex items-center justify-between gap-2 border-t border-border px-4 py-3 text-[0.75rem] uppercase tracking-[0.14em] text-foreground"
      >
        <span className="flex items-center gap-2">
          {post.type === "REEL" ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : null}
          Ver publicação original
        </span>
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </li>
  );
}

export function InstagramSection({
  initialCount = 3,
  showReels = true,
}: {
  initialCount?: number;
  showReels?: boolean;
}) {
  const [visible, setVisible] = useState(initialCount);
  const posts = getRecentPosts(visible);
  const reels = showReels ? getRecentReels(3) : [];
  const profile = site.links.instagram;

  return (
    <Section tone="sand" id="instagram">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="@mora.feminina"
          title="Siga a Mora no Instagram"
          description="Novidades, looks e avisos da loja são publicados primeiro no nosso perfil."
        />
        <ButtonAnchor
          href={profile}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("instagram_click", { area: "perfil" })}
          variant="outline"
          size="md"
        >
          <Instagram className="h-4 w-4" aria-hidden="true" />
          Seguir no Instagram
        </ButtonAnchor>
      </div>

      {instagramHighlights.length > 0 ? (
        <nav aria-label="Destaques do Instagram" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {instagramHighlights.map((highlight) => (
              <li key={highlight.id}>
                <a
                  href={highlight.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("instagram_click", { highlight: highlight.id })}
                  className="inline-flex h-9 items-center rounded-full border border-border bg-background px-4 text-xs tracking-[0.08em] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {highlight.label ?? `Destaque ${highlight.name}`}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.shortcode} post={post} />
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button variant="outline" size="md" onClick={() => setVisible((v) => v + 3)}>
          Ver mais publicações
        </Button>
        {reels.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span>Reels recentes:</span>
            {reels.map((reel, index) => (
              <a
                key={reel.shortcode}
                href={reel.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("instagram_click", { reel: reel.shortcode })}
                className="link-underline text-foreground"
              >
                Reel {index + 1}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
