export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const guillermoSalgadoTestimonial: Testimonial = {
  quote: "I recommend Tammy Summers and the DISC assessment for any organization that seeks understanding on how to better understand staff (personnel).",
  author: "Guillermo Salgado",
  role: "Business Owner"
};

const giselaSanchezTestimonial: Testimonial = {
  quote: "I had the pleasure of hiring Tammy Summers to conduct a DISC assessment for our real estate team. We gained invaluable insights to each other's personalities.",
  author: "Gisela Sanchez",
  role: "Business Owner"
};

const austinMoralesHomeTestimonial: Testimonial = {
  quote: "I enjoy working with my public speaking coach. I'm autistic and she understands how to help me become a better public speaker.",
  author: "Austin Morales",
  role: "Public Speaking Client"
};

export const homeTestimonials: Testimonial[] = [
  guillermoSalgadoTestimonial,
  giselaSanchezTestimonial,
  austinMoralesHomeTestimonial
];

export const corporateTestimonials: Testimonial[] = [
  guillermoSalgadoTestimonial,
  giselaSanchezTestimonial
];

export const individualTestimonials: Testimonial[] = [
  {
    quote: "I enjoy working with my public speaking coach. I'm autistic and she understands how to help me become a better public speaker. It's my new job.",
    author: "Austin Morales",
    role: "Public Speaking Client"
  },
  {
    quote: "Tammy is very supportive and she provides techniques that are easy to learn which helped me gain confidence. I enhanced my public speaking for work and learned how to respond to questions concisely.",
    author: "Angela Jones",
    role: "Professional Coaching Client"
  }
];
