import React from "react";

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center px-4 py-12 bg-white rounded-2xl shadow-xl max-w-3xl mx-auto">
      <p className="text-3xl font-semibold text-gray-800 tracking-tight">
        Subscribe now & get <span className="text-pink-500">20% off</span>
      </p>
      <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm sm:text-base">
        Join our newsletter for exclusive offers, latest styles, and insider
        updates.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full mt-8 border border-gray-300 rounded-2xl px-4 py-3 shadow-sm bg-gray-50 focus-within:border-pink-500 transition flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-4"
      >
        <input
          type="email"
          placeholder="Enter your email"
          required
          className="flex-1 outline-none bg-transparent text-sm text-gray-700 placeholder-gray-400 px-2 py-2 sm:py-0"
        />
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 transition-colors text-white text-xs sm:text-sm font-medium px-6 py-3 rounded-xl w-full sm:w-auto"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
