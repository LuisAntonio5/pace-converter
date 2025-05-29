"use client";

import { ArrowRightLeft, Clock } from "lucide-react";
import { useState } from "react";

const PaceConverter = () => {
  const [kmPace, setKmPace] = useState("");
  const [milePace, setMilePace] = useState("");

  // Convert min/km to min/mile
  const convertKmToMile = (kmPaceStr: string) => {
    if (!kmPaceStr) return "";

    const parts = kmPaceStr.split(":");
    if (parts.length !== 2) return "";

    const minutes = parseInt(parts[0]);
    const seconds = parseInt(parts[1]);

    if (isNaN(minutes) || isNaN(seconds) || seconds >= 60) return "";

    const totalSeconds = minutes * 60 + seconds;
    const mileSeconds = totalSeconds * 1.609344;

    const mileMinutes = Math.floor(mileSeconds / 60);
    const remainingSeconds = Math.round(mileSeconds % 60);

    return `${mileMinutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Convert min/mile to min/km
  const convertMileToKm = (milePaceStr: string) => {
    if (!milePaceStr) return "";

    const parts = milePaceStr.split(":");
    if (parts.length !== 2) return "";

    const minutes = parseInt(parts[0]);
    const seconds = parseInt(parts[1]);

    if (isNaN(minutes) || isNaN(seconds) || seconds >= 60) return "";

    const totalSeconds = minutes * 60 + seconds;
    const kmSeconds = totalSeconds / 1.609344;

    const kmMinutes = Math.floor(kmSeconds / 60);
    const remainingSeconds = Math.round(kmSeconds % 60);

    return `${kmMinutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  // Handle km/min input change
  const handleKmPaceChange = (value: string) => {
    setKmPace(value);
    const converted = convertKmToMile(value);
    setMilePace(converted);
  };

  // Handle mile/min input change
  const handleMilePaceChange = (value: string) => {
    setMilePace(value);
    const converted = convertMileToKm(value);
    setKmPace(converted);
  };

  // Format input to ensure MM:SS format
  const formatPaceInput = (value: string) => {
    let cleaned = value.replace(/[^\d:]/g, "");

    const colonCount = (cleaned.match(/:/g) || []).length;
    if (colonCount > 1) {
      const firstColonIndex = cleaned.indexOf(":");
      cleaned =
        cleaned.substring(0, firstColonIndex + 1) +
        cleaned.substring(firstColonIndex + 1).replace(/:/g, "");
    }

    if (cleaned.length === 3 && !cleaned.includes(":")) {
      cleaned = cleaned.substring(0, 2) + ":" + cleaned.substring(2);
    }

    const parts = cleaned.split(":");
    if (parts.length === 2) {
      const minutes = parts[0].substring(0, 2);
      const seconds = parts[1].substring(0, 2);
      cleaned = minutes + (seconds ? ":" + seconds : ":");
    } else if (parts.length === 1 && parts[0].length > 2) {
      cleaned = parts[0].substring(0, 2) + ":" + parts[0].substring(2, 4);
    }

    return cleaned;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Clock className="hidden md:block w-8 h-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">
              Running Pace Converter
            </h1>
          </div>
          <p className="text-gray-600">
            Convert your running pace between minutes per kilometer and minutes
            per mile
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minutes per Kilometer
                </label>
                <input
                  type="text"
                  value={kmPace}
                  onChange={(e) =>
                    handleKmPaceChange(formatPaceInput(e.target.value))
                  }
                  placeholder="5:30"
                  className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Format: MM:SS</p>
              </div>

              <div className="flex justify-center">
                <ArrowRightLeft className="w-6 h-6 text-gray-400 transform rotate-90 md:rotate-0" />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minutes per Mile
                </label>
                <div className="w-full px-4 py-3 text-lg bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700">
                  {milePace || "0:00"}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Converted automatically
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minutes per Mile
                </label>
                <input
                  type="text"
                  value={milePace}
                  onChange={(e) =>
                    handleMilePaceChange(formatPaceInput(e.target.value))
                  }
                  placeholder="8:45"
                  className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Format: MM:SS</p>
              </div>

              <div className="flex justify-center">
                <ArrowRightLeft className="w-6 h-6 text-gray-400 transform rotate-90 md:rotate-0" />
              </div>

              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Minutes per Kilometer
                </label>
                <div className="w-full px-4 py-3 text-lg bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-700">
                  {kmPace || "0:00"}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Converted automatically
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Reference</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">
                Common Pace Conversions:
              </h4>
              <div className="space-y-1 text-gray-600">
                <div className="flex justify-between">
                  <span>4:00 min/km</span>
                  <span>6:26 min/mile</span>
                </div>
                <div className="flex justify-between">
                  <span>5:00 min/km</span>
                  <span>8:03 min/mile</span>
                </div>
                <div className="flex justify-between">
                  <span>6:00 min/km</span>
                  <span>9:39 min/mile</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">
                Conversion Factor:
              </h4>
              <p className="text-gray-600">1 kilometer = 0.621371 miles</p>
              <p className="text-gray-600">1 mile = 1.609344 kilometers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaceConverter;
