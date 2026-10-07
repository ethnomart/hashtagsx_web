// Customer comments collected outside the store (for example by message), shown with the customer's permission.
// Add city for each one when you have it. No star rating is shown unless one is given.
export interface Testimonial {
  id: string;
  productId: string;
  productTitle: string;
  name: string;
  city?: string;
  rating?: number;
  comment: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'ali-box-fit-baggy-shirt',
    productId: 'hx-box-fit-baggy-shirt',
    productTitle: 'Box Fit Baggy Shirt',
    name: 'Ali',
    city: 'Islamabad',
    comment:
      "Came here after seeing my friend's Instagram story, and I'm really impressed! The clothes are great quality and definitely worth it. Highly recommend!",
  },
  {
    id: 'ali-razan-desert-oud',
    productId: 'razan-essence-desert-oud',
    productTitle: 'Razan Essence Desert Oud',
    name: 'Ali',
    city: 'Islamabad',
    comment:
      "I tried this perfume on a friend's recommendation and absolutely loved the scent. It smells so good and feels really premium. Definitely one to try!",
  },
  {
    id: 'zohaib-knitted-quarter-zip-sweater',
    productId: 'hx-knitted-quarter-zip-sweater',
    productTitle: 'Knitted Quarter Zip Sweater',
    name: 'Zohaib',
    city: 'Lahore',
    comment:
      'Today I received the sweater. The quality of sweater is so good and I am really satisfied with the product.',
  },
];
