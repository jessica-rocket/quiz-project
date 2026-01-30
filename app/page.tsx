"use client";

import { useState } from "react";
import Image from "next/image";
import {
  questions,
  personalities,
  type PersonalityType,
  type Personality,
} from "./data/quizData";

type QuizState = "welcome" | "quiz" | "results";

interface PersonalityScore {
  personality: Personality;
  percentage: number;
}

export default function Home() {
  const [state, setState] = useState<QuizState>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<PersonalityType[]>([]);

  const handleStart = () => {
    setState("quiz");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleAnswer = (personality: PersonalityType) => {
    const newAnswers = [...answers, personality];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setState("results");
    }
  };

  const handleRetake = () => {
    setState("welcome");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const calculateResults = (): PersonalityScore[] => {
    const counts: Record<PersonalityType, number> = {
      explorer: 0,
      classic: 0,
      adventurer: 0,
      mindful: 0,
    };

    answers.forEach((answer) => {
      counts[answer]++;
    });

    const total = answers.length;
    const results: PersonalityScore[] = Object.entries(counts)
      .map(([type, count]) => ({
        personality: personalities[type as PersonalityType],
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage);

    return results;
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 fade-in">
        {state === "welcome" && <WelcomeScreen onStart={handleStart} />}
        {state === "quiz" && (
          <QuizScreen
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        )}
        {state === "results" && (
          <ResultsScreen results={calculateResults()} onRetake={handleRetake} />
        )}
      </div>
    </div>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center fade-in">
      <div className="text-6xl mb-6">☕</div>
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
        What&apos;s Your Coffee Personality?
      </h1>
      <p className="text-gray-600 mb-8 text-lg">
        Answer 6 quick questions to discover your unique coffee identity and get
        personalized drink recommendations.
      </p>
      <button
        onClick={onStart}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-full text-lg hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
      >
        Start the Quiz
      </button>
      <p className="text-gray-400 text-sm mt-6">Takes less than a minute</p>
    </div>
  );
}

function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: {
  question: (typeof questions)[0];
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (personality: PersonalityType) => void;
}) {
  return (
    <div className="fade-in" key={question.id}>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <span>{Math.round((questionNumber / totalQuestions) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full progress-bar"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-6">
        <span className="text-4xl mb-4 block">{question.emoji}</span>
        <h2 className="text-xl font-bold text-gray-800">{question.question}</h2>
      </div>

      {/* Answers */}
      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer.personality)}
            className="answer-btn w-full text-left p-4 rounded-xl border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 flex items-center gap-3"
          >
            <span className="text-2xl">{answer.emoji}</span>
            <span className="text-gray-700 font-medium">{answer.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ResultsScreen({
  results,
  onRetake,
}: {
  results: PersonalityScore[];
  onRetake: () => void;
}) {
  const topResult = results[0];

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-4xl mb-2 block">🎉</span>
        <h2 className="text-xl font-bold text-gray-800">You&apos;re a...</h2>
      </div>

      {/* Top personality */}
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
          <Image
            src={topResult.personality.image}
            alt={topResult.personality.name}
            fill
            className="object-cover"
          />
        </div>
        <h1
          className="text-2xl font-extrabold mb-2"
          style={{ color: topResult.personality.color }}
        >
          {topResult.personality.name}
        </h1>
        <p className="text-gray-500 italic mb-3">
          &ldquo;{topResult.personality.tagline}&rdquo;
        </p>
        <p className="text-gray-600 text-sm">{topResult.personality.description}</p>
      </div>

      {/* Drink recommendation */}
      <div
        className="p-4 rounded-xl mb-6"
        style={{ backgroundColor: `${topResult.personality.color}20` }}
      >
        <p className="text-sm font-semibold text-gray-700 mb-1">
          Your Perfect Drink
        </p>
        <p
          className="font-bold text-lg"
          style={{ color: topResult.personality.color }}
        >
          {topResult.personality.drink}
        </p>
        <p className="text-gray-600 text-sm">
          {topResult.personality.drinkDescription}
        </p>
      </div>

      {/* All results breakdown */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Your Full Profile
        </p>
        <div className="space-y-2">
          {results.map((result) => (
            <div key={result.personality.id} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{result.personality.name}</span>
                  <span className="text-gray-500">{result.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${result.percentage}%`,
                      backgroundColor: result.personality.color,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retake button */}
      <button
        onClick={onRetake}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105"
      >
        Retake Quiz
      </button>
    </div>
  );
}
