"use client";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
// import Header from "./Header";

const sections = ["general", "pricing", "hotel", "transportation"];

const general = [
  {
    question:
      "Are language barriers causing misunderstandings between the tourist and the guide?",
    answer:
      "Yes, language barriers can sometimes cause misunderstandings between tourists and guides. If they don’t share a common language or struggle with accents, it may lead to confusion. This can affect the tourist’s experience and make it difficult to fully understand the information being shared. Using simple language, translation tools, or hiring multilingual guides can help improve communication.",
  },
  {
    question:
      "Are tourists' specific questions or interests being overlooked during the tour?",
    answer:
      "Sometimes, tourists' specific questions or interests may be overlooked during the tour, especially if the guide is following a set itinerary or managing a large group. To ensure a better experience, tourists can communicate their interests in advance or ask questions directly to the guide when possible.",
  },
  {
    question: "Can I get a full refund if I cancel my booking?",
    answer:
      "It depends on the hotel's refund policy. Some hotels offer a full refund if you cancel within a specific time frame, while others may charge a cancellation fee or have non-refundable bookings. It’s best to check the hotel's terms and conditions or contact them directly for clarification.",
  },
  {
    question: "Is the refund policy different for group bookings or events?",
    answer:
      "Yes, the refund policy is often different for group bookings or events. Many hotels have stricter cancellation policies for large reservations, requiring advance notice or non-refundable deposits. Some may offer partial refunds depending on the cancellation timeline. It’s best to check with the hotel for specific terms regarding group bookings or events.",
  },
  {
    question: "How long does it take to process a refund?",
    answer:
      "The time it takes to process a refund depends on the hotel's policy and the payment method used. Generally, it can take anywhere from a few days to several weeks. Credit card refunds may take 5–10 business days, while bank transfers or other payment methods might take longer. It's best to check with the hotel for specific details.",
  },
];

const pricing = [
  {
    question: "Why is this product/service more expensive than competitors?",
    answer:
      "Pricing can vary based on quality, brand reputation, additional features, or location. It’s always good to compare the value offered rather than just the price.",
  },
  {
    question: "What happens if I find a lower price after my purchase?",
    answer:
      "Some businesses offer price-match guarantees or partial refunds if you find a lower price within a certain period. It’s best to check their policy before making a purchase.",
  },
  {
    question: "Are there any hidden fees I should know about?",
    answer:
      "Some businesses charge extra for services like delivery, processing, or additional features. Reading the terms and conditions carefully can help identify any hidden costs.",
  },
  {
    question: "Why is the refund or cancellation fee so high?",
    answer:
      "Many businesses have strict refund policies to cover administrative costs or compensate for lost sales. Checking the cancellation policy before purchasing can help avoid unexpected charges.",
  },
  {
    question: "Why is the final price higher than the advertised price?",
    answer:
      "The final price may include taxes, service charges, or hidden fees that were not clearly stated upfront. It’s best to review the breakdown of costs before making a purchase.",
  },
];

const hotel = [
  {
    question: "Why was my booking canceled even after confirmation?",
    answer:
      "This can happen due to payment issues, overbooking, or technical errors. Contact the hotel or booking platform immediately to resolve the issue.",
  },
  {
    question: "Why is my room not available even though I booked in advance?",
    answer:
      "Overbooking can sometimes lead to this issue. If this happens, the hotel should offer you an alternative room or compensation.",
  },
  {
    question:
      "Why is there a difference between the pictures online and the actual hotel?",
    answer:
      "Hotels sometimes use edited or outdated images in their promotions. Reading recent guest reviews can help you get a more accurate idea of the hotel’s condition.",
  },
  {
    question: "Why can’t I get a refund for my canceled booking?",
    answer:
      "If you booked a non-refundable rate, the hotel may not offer a refund. Always check the cancellation policy before booking.",
  },
  {
    question: "What should I do if I was charged twice for the same booking?",
    answer:
      "Contact the hotel or booking platform immediately with proof of double charges. They should process a refund if the mistake is confirmed.",
  },
];

const transportation = [
  {
    question: "What should I do if I miss my bus/train/flight?",
    answer:
      "If you miss your transport, check the next available schedule and contact customer service for options. Some services allow rescheduling or refunds depending on their policy.",
  },
  {
    question: "Why are taxi and ride-hailing prices higher during peak hours?",
    answer:
      "Prices increase due to high demand, limited availability, and surge pricing algorithms. Booking in advance or using alternative transport options can help save money.",
  },
  {
    question: "What can I do if my luggage gets lost during travel?",
    answer:
      "Report the issue immediately to the transport provider or airline. Provide details of your luggage and tracking number, and they will assist in locating it or compensating you.",
  },
  {
    question:
      "Why are there frequent strikes or disruptions in transportation services?",
    answer:
      "Strikes usually happen due to labor disputes, salary issues, or working conditions. Checking the news and transport apps can help plan alternative routes.",
  },
  {
    question: "What should I do if my transportation app is not working?",
    answer:
      "Restart the app, check your internet connection, or try updating it. If the issue continues, use an alternative app or contact customer support.",
  },
];

function FAQ() {
  const [data, setData] = useState(general);
  const [activeSection, setActiveSection] = useState("general");

  return (
    <div
      className="  font-poppins min-h-[700px] bg-[center_100px] sm:bg-[center_0px] md:bg-[center_-260px]  pb-[50px] bg-[#000000e7]  bg-cover  text-white"
      style={{
        backgroundImage: "url('/pyr.svg')",
      }}
    >

      <div className="text-center max-w-[750px] mx-auto ">
        <Typography
          variant="h4"
          gutterBottom
          className="  text-[22px] sm:text-[30px] md:text-[40px] lg:text-[50px] font-medium leading-[50px] py-[50px]"
        >
          Frequently Asked Questions
        </Typography>
        <div className=" grid grid-cols-2 md:grid-cols-4 justify-center ">
          {sections.map((sec) => (
            <button
              key={sec}
              className={`text-[22px] font-normal mx-auto w-[170px] sm:w-[182px] h-[50px] m-3 capitalize rounded-[20px] border-[2px]   ${
                activeSection === sec
                  ? "text-bgBlueColor bg-white"
                  : " bg-transparent text-white "
              }`}
              onClick={() => {
                setActiveSection(sec);
                if (sec === "general") setData(general);
                if (sec === "pricing") setData(pricing);
                if (sec === "hotel") setData(hotel);
                if (sec === "transportation") setData(transportation);
              }}
            >
              {sec}
            </button>
          ))}
        </div>

        {data.length > 0 ? (
          data.map((item, index) => (
            <Accordion
              key={index}
              sx={{ backgroundColor: "transparent", boxShadow: "none" ,color:"white"}}
              className="mt-[10px] ml-[30px] md:ml-[10px]"
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              >
                <Typography variant="subtitle1">{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className="text-[#F2C166] text-start">
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography style={{ marginTop: "20px" }}>
            Please select a section to view the questions.
          </Typography>
        )}
      </div>
    </div>
  );
}

export default FAQ;
