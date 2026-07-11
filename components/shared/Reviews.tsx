import { FiStar } from "react-icons/fi";

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Tech Enthusiast",
    rating: 5,
    comment:
      "PhoneTone made buying my new iPhone seamless. The delivery was incredibly fast, and the phone was perfectly sealed. Highly recommend!",
  },
  {
    name: "Marcus Chen",
    role: "Photographer",
    rating: 5,
    comment:
      "I needed a specific camera setup for my work. The support team helped me pick the exact right Galaxy Ultra. Fantastic service.",
  },
  {
    name: "Elena Rodriguez",
    role: "Student",
    rating: 4,
    comment:
      "Great prices and the trade-in process for my old phone was so easy. Got a great deal on my new Pixel. Will definitely buy here again.",
  },
];

export function Reviews() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral">
            What Our <span className="text-secondary">Customers</span> Say
          </h2>
          <p className="mt-3 text-lg text-neutral/60">
            Join thousands of satisfied tech lovers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-neutral/5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <FiStar
                    key={i}
                    className="fill-secondary text-secondary"
                    size={18}
                  />
                ))}
              </div>
              <p className="text-neutral/80 leading-relaxed mb-6 italic">
                &quot;{review.comment}&quot;
              </p>
              <div className="border-t border-neutral/10 pt-4">
                <p className="font-bold text-neutral">{review.name}</p>
                <p className="text-sm text-neutral/50">{review.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
