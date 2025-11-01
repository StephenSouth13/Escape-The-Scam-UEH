"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

//
// 1️⃣ DỮ LIỆU TOÀN BỘ 12 CÂU HỎI
//
const questionData = [
  {
    title: "Câu 1: Sau khi bị lừa chiếm đoạt tài sản, bạn cần làm gì đầu tiên?",
    scenario: "Ba ngày trước, Linh nhận được một email từ 'Khách sạn Paradise'...",
    answers: [
      "A. Báo ngay với công an nơi gần nhất.",
      "B. Đăng lên Facebook nhờ mọi người chia sẻ.",
      "C. Gửi email phản hồi lại cho kẻ lừa đảo.",
      "D. Không làm gì, chờ họ liên lạc lại.",
    ],
    correctAnswer: 0,
    explanation:
      "Báo ngay với công an là hành động đúng đắn và nhanh nhất để ngăn chặn hậu quả.",
  },
  // ... thêm 11 câu khác ngay dưới
]

//
// 2️⃣ COMPONENT CHÍNH
//
export default function KnowledgeBook({ onClose }: { onClose?: () => void }) {
  const [currentPage, setCurrentPage] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)

  const q = questionData[currentPage]
  const isCorrect = selected === q.correctAnswer

  const nextPage = () => {
    setSelected(null)
    setShowResult(false)
    setCurrentPage((p) => (p + 1 < questionData.length ? p + 1 : p))
  }
  const prevPage = () => {
    setSelected(null)
    setShowResult(false)
    setCurrentPage((p) => (p > 0 ? p - 1 : p))
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl w-[90%] max-w-3xl p-8 relative overflow-hidden"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 15 }}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">📘 BẢN KẾ HOẠCH CHẶNG GAME ONLINE</h1>
          <p className="text-sm text-gray-400">
            Chương trình hỗ trợ tân sinh viên K51 – KQM LEGAL NET ALERT
          </p>
        </div>

        {/* Tiêu đề câu hỏi */}
        <h2 className="text-xl font-semibold mb-3">{q.title}</h2>
        <p className="text-gray-400 mb-4 italic">{q.scenario}</p>

        {/* Đáp án */}
        <div className="grid gap-3 mb-4">
          {q.answers.map((ans, i) => (
            <Button
              key={i}
              onClick={() => {
                setSelected(i)
                setShowResult(true)
              }}
              variant={selected === i ? "default" : "outline"}
              className={`w-full justify-start text-left ${showResult && i === q.correctAnswer
                  ? "bg-green-600 hover:bg-green-700"
                  : showResult && i === selected
                    ? "bg-red-600 hover:bg-red-700"
                    : ""
                }`}
            >
              {ans}
            </Button>
          ))}
        </div>

        {/* Giải thích */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              className={`p-3 rounded-lg mb-4 ${isCorrect ? "bg-green-700/30" : "bg-red-700/30"
                }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {isCorrect ? "🎉 Chính xác!" : "❌ Chưa đúng!"}
              <br />
              <span className="text-sm text-gray-300">{q.explanation}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nút điều hướng */}
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" onClick={prevPage} disabled={currentPage === 0}>
            <ChevronLeft size={18} className="mr-1" /> Trước
          </Button>
          <span className="text-gray-400 text-sm">
            {currentPage + 1} / {questionData.length}
          </span>
          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === questionData.length - 1}
          >
            Tiếp <ChevronRight size={18} className="ml-1" />
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
