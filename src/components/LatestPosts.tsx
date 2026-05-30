const posts = [
  {
    id: '1',
    title: "Consiga alguns gadgets fixes em 2023",
    date: "22 Fev, 2023",
    category: "Gadgets",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: '2',
    title: "Truques tecnológicos que você não vai acreditar",
    date: "25 Fev, 2023",
    category: "Tecnologia",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: '3',
    title: "As 10 melhores câmeras pequenas do mundo",
    date: "28 Fev, 2023",
    category: "Câmera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop"
  }
];

export default function LatestPosts() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <h2 className="text-4xl font-light tracking-tight uppercase">Posts Recentes</h2>
          <a
            href="#"
            className="border-b-2 border-black pb-1 text-sm uppercase font-bold tracking-widest hover:text-gray-500 hover:border-gray-500 transition-all mt-4 md:mt-0"
          >
            Ver Blog
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div key={post.id} className="group">
              <div className="aspect-video overflow-hidden mb-6 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] uppercase font-bold tracking-widest">
                  {post.date}
                </div>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2">{post.category}</span>
              <h3 className="text-xl font-medium tracking-tight mb-4">
                <a href="#" className="hover:text-gray-600 transition-colors uppercase leading-snug">
                  {post.title}
                </a>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
