import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypewriter({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000,
}: UseTypewriterOptions) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      setDisplayText((prev) => prev.slice(0, -1));
      if (displayText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      setDisplayText(currentWord.slice(0, displayText.length + 1));
      if (displayText === currentWord) {
        setIsComplete(true);
        setTimeout(() => {
          setIsComplete(false);
          setIsDeleting(true);
        }, pauseDuration);
        return;
      }
    }
  }, [displayText, isDeleting, wordIndex, words, pauseDuration]);

  useEffect(() => {
    if (isComplete) return;

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);

    return () => clearTimeout(timer);
  }, [tick, isDeleting, isComplete, typingSpeed, deletingSpeed]);

  return { displayText, isComplete };
}
