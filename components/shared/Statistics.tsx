const stats = [
  { value: "50K+", label: "Happy Customers", color: "text-primary" },
  { value: "200+", label: "Phone Models", color: "text-secondary" },
  { value: "99%", label: "Satisfaction Rate", color: "text-primary" },
  { value: "24/7", label: "Expert Support", color: "text-secondary" },
];

export function Statistics() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-bg-light border border-neutral/5"
            >
              <p
                className={`text-4xl sm:text-5xl font-extrabold ${stat.color} mb-2`}
              >
                {stat.value}
              </p>
              <p className="text-sm font-medium text-neutral/70 uppercase tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
