import Link from "next/link";

export interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string;
  publishedAt: string;
  category?: string;
  categoryColor?: string;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  coverUrl,
  publishedAt,
  category = "Blog",
  categoryColor = "bg-blue-100 text-blue-700",
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-100 transition-all duration-200"
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverUrl}
          alt={title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <span
          className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${categoryColor}`}
        >
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed flex-1">
          {excerpt}
        </p>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
          <span className="text-[11px] text-gray-400">{publishedAt}</span>
          <span className="text-[11px] font-semibold text-blue-600 group-hover:underline">
            Baca →
          </span>
        </div>
      </div>
    </Link>
  );
}
