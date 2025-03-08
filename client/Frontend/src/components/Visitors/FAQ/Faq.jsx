import { useState } from "react";
import "./Faq.css";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is the check-in time for your villas?",
      answer: "Our check-in time is typically at 2:00 PM. Early check-ins can be arranged based on availability.",
    },
    {
      question: "Are pets allowed at your properties?",
      answer: "Yes, pets are allowed at select properties. Please check with us while making a reservation.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellations made 7 days prior to check-in are fully refundable. Later cancellations may incur a fee.",
    },
  ];

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      {faqData.map((item, index) => (
        <div className="faq-item" key={index}>
          <button
            className={`faq-question ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFaq(index)}
          >
            {item.question}
          </button>
          <div
            className="faq-answer"
            style={{ display: activeIndex === index ? "block" : "none" }}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq;
