import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What brands do you offer in your store?',
    answer:
      'We deal in 15+ trusted brands like Jaquar, Hindware, Grohe, and Kohler ensuring authentic, premium-quality products for every style and budget.',
  },
  {
    question: 'Can I visit your outlet?',
    answer:
      'Yes, we welcome all our customers to visit our outlet and explore our wide range of products in person.',
  },
  {
    question: 'Are the products under warranty?',
    answer:
      'All our products come with manufacturer warranties. The duration and coverage vary based on the brand.',
  },
  {
    question: 'Do you provide installation or service support?',
    answer:
      'Yes, we offer professional installation and support services for most of our products. Please contact us for more details.',
  },
];

const FAQItem = ({ faq, isOpen, onClick }: any) => (
  <div className="border rounded-lg overflow-hidden transition-all">
    <button
      className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-100 transition"
      onClick={onClick}
    >
      <span className="font-medium text-gray-900">{faq.question}</span>
      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
    </button>
    <div
      className={`transition-all px-6 overflow-hidden bg-white text-sm text-gray-700 ${
        isOpen ? 'max-h-60 py-4' : 'max-h-0'
      }`}
    >
      {isOpen && <p>{faq.answer}</p>}
    </div>
  </div>
);

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Previous content here... (unchanged) */}

        {/* FAQ Section */}
        <div className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-gray-400">
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
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
