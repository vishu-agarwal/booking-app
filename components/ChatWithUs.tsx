'use client'

import { FC } from "react";
const ChatWithUs: FC = () => {
  return (
    <section className="fixed bottom-4 right-4 bg-lime-600 text-white p-4 rounded-full shadow-lg">
      <button
        onClick={() => alert("ChatGPT Integration coming soon!")}
        className="text-lg font-semibold"
      >
        💬 Chat with Us
      </button>
    </section>
  );
}

export default ChatWithUs