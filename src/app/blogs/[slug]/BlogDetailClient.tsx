'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock, User, Share2, ArrowLeft, Tag, Heart } from 'lucide-react';
import { format } from 'date-fns';

interface BlogDetailClientProps {
  blog: any;
}

export default function BlogDetailClient({ blog }: BlogDetailClientProps) {
  const formattedDate = format(new Date(blog.publishDate), 'MMMM d, yyyy');

  return (
    <article className="min-h-screen bg-stone-950 text-white">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
        </div>

        <div className="relative z-10 w-full container-main pb-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-goldAccent transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/blogs" className="hover:text-goldAccent transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white/80 truncate max-w-xs">{blog.title}</span>
          </nav>

          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag: string, i: number) => (
                <Link
                  key={i}
                  href={`/blogs?tag=${encodeURIComponent(tag.toLowerCase())}`}
                  className="px-3 py-1 bg-white/10 border border-white/20 text-white/80 text-sm rounded-full hover:bg-goldAccent/20 hover:border-goldAccent/30 hover:text-goldAccent transition-all"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <h1 className="hero-title text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-hidden="true">
          <ChevronRight className="w-6 h-6 text-white/60 rotate-90" />
        </div>
      </section>

      {/* Content */}
      <div className="container-main py-16">
        <div className="max-w-3xl">
          {/* Author Bio */}
          <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl mb-12">
            <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-white font-bold text-xl">
              {blog.author.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-white">{blog.author}</p>
              <p className="text-white/60 text-sm">{blog.authorRole}</p>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors" aria-label="Share">
                <Share2 className="w-5 h-5 text-white/70" />
              </button>
              <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors" aria-label="Save">
                <Heart className="w-5 h-5 text-white/70" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-img:rounded-2xl prose-a:text-goldAccent prose-a:no-underline hover:prose-a:underline prose-h2:text-white prose-h3:text-white prose-strong:text-white">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              <Tag className="w-5 h-5 text-white/50" />
              {blog.tags.map((tag: string, i: number) => (
                <Link
                  key={i}
                  href={`/blogs?tag=${encodeURIComponent(tag.toLowerCase())}`}
                  className="px-3 py-1 bg-white/10 border border-white/20 text-white/80 text-sm rounded-full hover:bg-goldAccent/20 hover:border-goldAccent/30 hover:text-goldAccent transition-all"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-4">
            <span className="font-medium text-white">Share:</span>
            <div className="flex gap-3">
              {['Twitter', 'Facebook', 'LinkedIn', 'WhatsApp'].map((platform) => (
                <button key={platform} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors" aria-label={`Share on ${platform}`}>
                  <Share2 className="w-5 h-5 text-white/70" />
                </button>
              ))}
            </div>
          </div>

          {/* Related Posts */}
          {blog.relatedPosts && blog.relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blog.relatedPosts.map((post: any, i: number) => (
                  <Link
                    key={i}
                    href={`/blogs/${post.slug}`}
                    className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-goldAccent/30 hover:bg-white/10 transition-all"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-goldAccent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-white/60 text-sm">Read more →</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-white/70 hover:text-goldAccent transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Articles
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}