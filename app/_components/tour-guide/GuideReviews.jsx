import { useState } from "react";
import StarRating from "../StarRating";

export default function GuideReviews({ guide }) {
  const [state, setState] = useState({
    showForm: false,
    rating: 0,
    comment: "",
    loading: false,
    message: { type: "", text: "" },
  });

  const token = JSON.parse(localStorage.getItem("User"))?.tokens || "";

  const updateState = (newState) =>
    setState((prev) => ({ ...prev, ...newState }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token)
      return updateState({
        message: { type: "error", text: "Please log in first." },
      });

    updateState({ loading: true, message: { type: "", text: "" } });

    try {
      const response = await fetch(
        "https://egyptos.runasp.net/api/TourGuideReviews/Add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tourGuideId: guide.id,
            rate: state.rating,
            comment: state.comment,
          }),
        }
      );

      const data = await response.json();
      response.ok
        ? updateState({
            message: { type: "success", text: "Review added successfully!" },
          })
        : updateState({
            message: {
              type: "error",
              text: data.message || "Failed to add review.",
            },
          });

      if (response.ok)
        setTimeout(
          () => updateState({ showForm: false, rating: 0, comment: "" }),
          1500
        );
    } catch {
      updateState({
        message: {
          type: "error",
          text: "An error occurred while submitting your review.",
        },
      });
    } finally {
      updateState({ loading: false });
    }
  };

  return (
    <div className="w-[320px] md:w-[600px] pb-5">
      <h2 className="font-bold text-[20px]">Reviews</h2>
      <div className="max-h-[300px] overflow-y-auto mt-2 scrollbar-hide">
        {guide?.tourGuideReviews?.map((review, i) => (
          <div key={i} className="mb-3 p-3 rounded-lg">
            <h6 className="font-semibold">{review.userName}</h6>
            <StarRating rating={review.rate} />
            <p className="text-gray-600">{review.comment}</p>
            <p className="text-gray-500 text-sm">{review.date}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => updateState({ showForm: true })}
          className="border-2 border-[#020032] text-[#020032] px-6 py-2 mt-4 rounded-lg hover:bg-[#020032] hover:text-white transition duration-700"
          disabled={state.loading}
        >
          {state.loading ? "Loading..." : "Add review"}
        </button>
      </div>

      {state.showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="font-semibold text-lg mb-4 text-center">
              Add your rating
            </h3>

            <div className="mb-3 text-center">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Evaluation:
              </label>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-2xl cursor-pointer ${
                      state.rating >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                    onMouseEnter={() => updateState({ rating: star })}
                    onClick={() => updateState({ rating: star })}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <textarea
              value={state.comment}
              onChange={(e) => updateState({ comment: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 mb-3"
              placeholder="Write your comment here..."
            ></textarea>

            {state.message.text && (
              <p
                className={`text-center ${
                  state.message.type === "error"
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {state.message.text}
              </p>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => updateState({ showForm: false })}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                disabled={state.loading}
              >
                {state.loading ? "Sending..." : "Submit Rating"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
