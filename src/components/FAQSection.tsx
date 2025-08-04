import React, { useState } from 'react';

const faqs = [
  {
    question: 'What brands do you offer in your store?',
    answer:
      'We deal in 15+ trusted brands like Jaquar, Hindware, Grohe, and Kohler ensuring authentic, premium-quality products for every style and budget.',
  },
  {
    question: 'Can I visit your outlet?',
    answer:
      'Absolutely! Visit our showroom to explore a wide variety of sanitaryware with personalized guidance from our experts to help you make the right choice.',
  },
  {
    question: 'Are the products under warranty?',
    answer:
      'While we don’t install directly, we connect you with reliable local technicians and offer complete after-sales service support for any issues or questions.',
  },
  {
    question: 'Do you provide installation or service support?',
    answer:
      'Yes, all our products come with official manufacturer warranties that cover defects and ensure you receive lasting performance and satisfaction.',
  },
];

const FAQItem = ({ faq, isOpen, onClick }: any) => (
  <div className="overflow-hidden transition-all">
    <button
      className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <span className="font-[Poppins] font-medium text-[18px] leading-[28px] tracking-[0] pb-0">{faq.question}</span>
      <span className="text-2xl text-gray-700">{isOpen ? '−' : '+'}</span>
    </button>
    <div
      className={`transition-all px-6 overflow-hidden bg-white text-sm text-gray-700 ${
        isOpen ? 'max-h-60 pb-4' : 'max-h-0'
      }`}
    >
      {isOpen && <p className="font-[Poppins] text-[16px] leading-[24px] tracking-[0] text-gray-800 text-justify">{faq.answer}</p>}
    </div>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[rgba(68,68,68,0.1)] p-14 relative z-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 py-8">
        <div className="grid md:grid-cols-[1.3fr_1fr_1fr] gap-12">
          <div>
            <h2 className="font-[Poppins] font-semibold text-4xl tracking-[0] mb-4 text-[#1c1c1c]">
              Frequently Asked Questions
            </h2>
            <p className="font-[Poppins] text-gray-800 text-[14px] leading-[24px] text-justify">
              We're always happy to discuss your questions directly, but here are answers to some
              of the most common queries we receive about residential and buy-to-let mortgages.
            </p>
          </div>
          <div className="md:col-span-2 space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </div>
        <img
        src="/src/assets/Spiral2.png"
        alt="Decoration"
        className="absolute bottom-0 left-0 h-1/4 object-cover pointer-events-none z-30 "
      />
      </div>
    </section>
  );
};

export default FAQSection;
