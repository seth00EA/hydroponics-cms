import type { ContactInfo } from "@/types";

export const contactInfo: ContactInfo = {
  email: "hello@verdantroots.example",
  phone: "(555) 012-3456",
  address: "124 Greenhouse Lane, Portland, OR 97201",
  hours: "Mon–Fri 9am–6pm · Sat 10am–4pm · Sun closed",
  socialLinks: [
    {
      platform: "facebook",
      label: "Facebook Page",
      url: "https://facebook.com/verdantroots.example",
    },
    {
      platform: "messenger",
      label: "Message on Messenger",
      url: "https://m.me/verdantroots.example",
    },
  ],
};

export const contactPageContent = {
  title: "Contact",
  description:
    "Questions about systems, nutrients, or commercial setups? Reach out by form, phone, email, or social—we are here to help.",
  formTitle: "Send a message",
  formNote:
    "Form submission will be wired up in a later phase. This is a preview UI only.",
  formSubmitLabel: "Send message",
  formSuccessMessage:
    "Thanks for reaching out! In Phase 5 this form will send your message to our team.",
  detailsTitle: "Get in touch",
  addressTitle: "Visit us",
  socialTitle: "Social & chat",
};

export const contactFaqs = [
  {
    question: "Do you offer installation support?",
    answer:
      "Yes. We provide remote setup guidance and on-site installation for commercial projects within our service region.",
  },
  {
    question: "Can I visit the showroom?",
    answer:
      "Walk-ins are welcome during business hours. We recommend booking a demo for commercial system planning.",
  },
  {
    question: "Do you ship nationwide?",
    answer:
      "Most kits and nutrients ship within 3–5 business days. Large systems may require freight scheduling.",
  },
];
