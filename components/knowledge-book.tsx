"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { levelData } from "@/lib/level-data"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface KnowledgeBookProps {
  onClose: () => void
}

export default function KnowledgeBook({ onClose }: KnowledgeBookProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const allQuestions = levelData.flatMap((level, levelIndex) =>
    level.questions.map((q, qIndex) => ({
      ...q,
      levelName: level.name,
      levelNumber: levelIndex + 1,
      questionNumber: qIndex + 1,
    })),
  )

  const currentQuestion = allQuestions[currentPage]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-lg p-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.9, opacity: 0, rotateY: 15 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="relative">
          {/* Hiệu ứng viền sáng */}
          <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan/20 via-neon-magenta/20 to-neon-green/20 rounded-2xl blur-xl" />

          <div className="relative glass-panel rounded-2xl border-2 border-primary/50 overflow-hidden max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-neon-cyan/20 to-neon-magenta/20 border-b border-primary/30 p-4 sm:p-6 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-neon-cyan mb-1 sm:mb-2">
                    📚 SÁCH KIẾN THỨC AN TOÀN MẠNG
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Trang {currentPage + 1} / {allQuestions.length}
                  </p>
                </div>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-neon-cyan"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>
            </div>

            {/* Nội dung cuộn */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Level badge */}
                  <div className="inline-block px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
                    <span className="text-sm font-mono">
                      TẦNG {currentQuestion.levelNumber}: {currentQuestion.levelName}
                    </span>
                  </div>

                  {/* Câu hỏi */}
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl sm:text-4xl">{currentQuestion.villainIcon}</div>
                      <h3 className="text-lg sm:text-2xl font-bold text-neon-magenta">
                        {currentQuestion.title}
                      </h3>
                    </div>
                    <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
                      {currentQuestion.scenario}
                    </p>
                  </div>

                  {/* Đáp án */}
                  <div className="space-y-3">
                    <div className="text-xs sm:text-sm font-bold text-neon-green uppercase">
                      Các lựa chọn:
                    </div>
                    {currentQuestion.answers.map((answer, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          index === currentQuestion.correctAnswer
                            ? "bg-neon-green/10 border-neon-green/50"
                            : "bg-background/50 border-primary/20"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-neon-cyan">{String.fromCharCode(65 + index)}.</span>
                          <span className="flex-1">{answer}</span>
                          {index === currentQuestion.correctAnswer && (
                            <span className="text-neon-green">✓</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Giải thích */}
                  <div className="bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">💡</span>
                      <span className="font-bold text-neon-cyan">GIẢI THÍCH:</span>
                    </div>
                    <p className="text-foreground/90 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Điều hướng */}
            <div className="border-t border-primary/30 p-3 sm:p-4 flex items-center justify-between bg-background/50 flex-shrink-0">
              <Button
                onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                variant="outline"
                className="gap-2 text-xs sm:text-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Trang trước
              </Button>

              <div className="text-xs sm:text-sm text-muted-foreground font-mono">
                {currentPage + 1} / {allQuestions.length}
              </div>

              <Button
                onClick={() => setCurrentPage((p) => Math.min(allQuestions.length - 1, p + 1))}
                disabled={currentPage === allQuestions.length - 1}
                variant="outline"
                className="gap-2 text-xs sm:text-sm"
              >
                Trang sau
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
