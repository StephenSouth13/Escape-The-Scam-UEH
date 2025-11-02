"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Question } from "@/lib/level-data"

interface QuizPopupProps {
  question: Question
  onAnswer: (correct: boolean) => void
}

export default function QuizPopup({ question, onAnswer }: QuizPopupProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleSelectAnswer = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    const correct = selectedAnswer === question.correctAnswer
    setShowResult(true)

    setTimeout(() => {
      onAnswer(correct)
    }, 1500)
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-md z-40 p-2 sm:p-4">
      <Card className="glass-panel rounded-lg p-3 sm:p-6 w-full max-w-sm sm:max-w-2xl space-y-3 sm:space-y-6 border-2 border-primary/50">
        {/* Villain Icon */}
        <div className="flex justify-center">
          <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-danger-red/20 border-2 border-danger-red flex items-center justify-center text-2xl sm:text-4xl">
            {question.villainIcon}
          </div>
        </div>

        {/* Question */}
        <div className="space-y-1 sm:space-y-2">
          <h3 className="text-sm sm:text-xl font-bold text-neon-cyan text-center">{question.title}</h3>
          <p className="text-[11px] sm:text-base text-foreground/90 text-center leading-relaxed">{question.scenario}</p>
        </div>

        {/* Answers */}
        {!showResult ? (
          <div className="space-y-1.5 sm:space-y-3">
            {question.answers.map((answer, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className="w-full text-left justify-start h-auto py-2 sm:py-4 px-3 sm:px-6 text-[10px] sm:text-base"
                onClick={() => handleSelectAnswer(index)}
              >
                <span className="font-mono mr-2 sm:mr-3 text-neon-cyan flex-shrink-0">{String.fromCharCode(65 + index)}.</span>
                <span className="break-words">{answer}</span>
              </Button>
            ))}
          </div>
        ) : (
          <div className="text-center space-y-2 sm:space-y-4 py-2 sm:py-4">
            {selectedAnswer === question.correctAnswer ? (
              <>
                <div className="text-4xl sm:text-6xl">✅</div>
                <h4 className="text-lg sm:text-2xl font-bold text-neon-green">CHÍNH XÁC!</h4>
                <p className="text-[10px] sm:text-base text-foreground/90 leading-relaxed">{question.explanation}</p>
              </>
            ) : (
              <>
                <div className="text-4xl sm:text-6xl">❌</div>
                <h4 className="text-lg sm:text-2xl font-bold text-danger-red">SAI RỒI!</h4>
                <p className="text-[10px] sm:text-base text-foreground/90 leading-relaxed">{question.explanation}</p>
              </>
            )}
          </div>
        )}

        {/* Submit Button */}
        {!showResult && (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 sm:py-6 text-xs sm:text-base"
          >
            XÁC NHẬN
          </Button>
        )}
      </Card>
    </div>
  )
}
