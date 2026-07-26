import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/gameData';
import { ASSET_IMAGES } from '../../assets/images/assetsMap';
import { soundFx } from '../../utils/audio';

interface FinalQuizProps {
  playerName: string;
  onCompleteQuiz: (score: number) => void;
  onBackToMap: () => void;
}

export const FinalQuiz: React.FC<FinalQuizProps> = ({
  playerName,
  onCompleteQuiz,
  onBackToMap,
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === question.correctIndex) {
      soundFx.playSuccess();
      setScore((prev) => prev + 1);
    } else {
      soundFx.playWrong();
    }
  };

  const handleNextQuestion = () => {
    soundFx.playButtonClick();
    setIsAnswered(false);
    setSelectedOption(null);

    if (currentQuestionIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
      soundFx.playMagicChime();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-br from-amber-100 via-pink-100 to-purple-200 select-none overflow-y-auto">
      {/* Top Banner */}
      <div className="relative z-20 w-full max-w-4xl flex justify-between items-center bg-white/90 backdrop-blur-md p-4 rounded-2xl border-3 border-amber-300 shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={ASSET_IMAGES.lion_king}
            alt="Lion King"
            className="w-14 h-14 rounded-full border-2 border-amber-400 object-cover shadow"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="font-bold text-amber-950 text-base sm:text-lg">
              Final Phase: Lion King's Castle Gate 👑
            </h2>
            <p className="text-xs sm:text-sm text-amber-800">
              Pass the 5 Royal Questions to enter Rainbow Blossom Kingdom!
            </p>
          </div>
        </div>

        <button
          onClick={onBackToMap}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm rounded-xl border border-gray-300 cursor-pointer"
        >
          Map 🗺️
        </button>
      </div>

      {/* Quiz Card */}
      {!isFinished ? (
        <motion.div
          key={currentQuestionIdx}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-20 w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl flex flex-col items-center text-center gap-4 my-auto"
        >
          <div className="flex justify-between items-center w-full">
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              Question {currentQuestionIdx + 1} of {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-xs font-bold text-purple-800 bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              Score: {score}
            </span>
          </div>

          <div className="text-5xl my-1">{question.icon}</div>

          <h3 className="font-black text-purple-950 text-lg sm:text-xl leading-relaxed">
            {question.question}
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full my-2">
            {question.options.map((optionText, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === question.correctIndex;

              let btnStyle = 'bg-amber-50/80 border-amber-200 hover:bg-amber-100 text-amber-950';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-100 border-rose-500 text-rose-950';
                } else {
                  btnStyle = 'bg-gray-100 border-gray-200 text-gray-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(idx)}
                  className={`p-4 rounded-2xl border-3 font-bold text-sm text-left flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                >
                  <span>{optionText}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600" />}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation */}
          {isAnswered && (
            <div className="w-full bg-purple-50 p-4 rounded-2xl border border-purple-200 text-purple-900 text-xs sm:text-sm font-medium flex flex-col items-center gap-3 animate-fade-in">
              <p>{question.explanation}</p>
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-white font-bold text-sm rounded-xl shadow cursor-pointer flex items-center gap-2"
              >
                <span>{currentQuestionIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'See Royal Results'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      ) : (
        /* Quiz Finished Summary */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-30 bg-white/95 backdrop-blur-md rounded-3xl p-8 border-4 border-amber-400 shadow-2xl text-center max-w-md flex flex-col items-center gap-4 my-auto"
        >
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-4xl border-2 border-amber-300">
            👑
          </div>

          <h3 className="font-black text-amber-950 text-2xl">
            {score >= 3 ? 'Welcome Home, Princess!' : 'Try Again for Castle Entrance!'}
          </h3>

          <p className="text-purple-900 font-bold text-lg">
            Your Score: {score} / 5
          </p>

          <p className="text-amber-800 text-sm font-medium">
            {score >= 3
              ? `Lion King: "Wonderful, Princess ${playerName}! You have answered wisely and demonstrated great animal love!"`
              : 'Lion King: "You tried well, darling! Let us review our animal facts and try once more!"'}
          </p>

          {score >= 3 ? (
            <button
              id="btn-quiz-win"
              onClick={() => onCompleteQuiz(score)}
              className="w-full py-4 bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 hover:from-amber-300 hover:to-purple-500 text-white font-black text-lg rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Enter Castle Celebration 🎉</span>
              <Sparkles className="w-5 h-5 text-yellow-200" />
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentQuestionIdx(0);
                setScore(0);
                setIsAnswered(false);
                setIsFinished(false);
              }}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-white font-bold text-base rounded-2xl shadow transition-all cursor-pointer"
            >
              Retake Quiz
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};
