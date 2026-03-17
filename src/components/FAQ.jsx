import { useState } from "react";
import "./FAQ.css";

const faqs = [
  {
    id: 1,
    question: "What is Netflix?",
    answer:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more.",
  },
  {
    id: 2,
    question: "How much does Netflix cost?",
    answer:
      "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee.",
  },
  {
    id: 3,
    question: "Where can I watch?",
    answer:
      "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web or on any internet-connected device.",
  },
  {
    id: 4,
    question: "How do I cancel?",
    answer:
      "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks.",
  },
  {
    id: 5,
    question: "What can I watch on Netflix?",
    answer:
      "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.",
  },
  {
    id: 6,
    question: "Is Netflix good for kids?",
    answer:
      "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films.",
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);
  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <section className="FAQs">
      <h2 className="faq_title">Frequently Asked Questions</h2>
      <div className="faq_container">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="faq_item"
            onClick={() => handleToggle(faq.id)}
          >
            <div className="faq_question">
              <h3>{faq.question}</h3>
              <span className="faq_icon">{openId === faq.id ? "✕" : "+"}</span>
            </div>
            {openId === faq.id && <p className="faq_answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
