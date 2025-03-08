import { Card, CardContent, CardFooter } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const testimonials = [
  {
    quote:
      "HairBookPro has completely transformed how we manage appointments. Our clients love the easy booking process, and we've seen a significant reduction in no-shows.",
    author: "Emma Johnson",
    role: "Salon Owner, Style Studio",
    avatar: "EJ",
  },
  {
    quote:
      "I used to spend hours each week managing our appointment book. Now with HairBookPro, I can focus on what I love - cutting hair and taking care of my clients.",
    author: "Michael Chen",
    role: "Head Stylist, Chic Cuts",
    avatar: "MC",
  },
  {
    quote:
      "As a customer, I love being able to book my appointments online anytime. The interface is so easy to use, and I can see all available times instantly.",
    author: "Sarah Williams",
    role: "Regular Customer",
    avatar: "SW",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">
            What People Are Saying
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from the salons and customers
            using HairBookPro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <p className="italic text-muted-foreground">
                  "{testimonial.quote}"
                </p>
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.author}`}
                    />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
